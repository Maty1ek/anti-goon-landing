// Shared helpers for the account-self-service API routes.
// Co-located under app/api/_lib so they don't add a public URL — Next.js
// only routes folders that contain a `route.js`.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const WHOP_API_KEY = process.env.WHOP_API_KEY;

// Whop's V2 REST API. V5's /cancel path doesn't exist (we tested — it
// 404s); V2 is the stable, well-documented surface for membership
// lifecycle actions. The `membership:cancel` scope on the company API
// key applies regardless of which API version you call.
const WHOP_API_BASE = "https://api.whop.com/api/v2";

export function envCheck() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return { ok: false, status: 500, body: { error: "server_misconfigured" } };
  }
  return { ok: true };
}

/**
 * Extract the user's Supabase access token from the Authorization header,
 * verify it against Supabase Auth, and return the user record (or an
 * error response shape the caller can pass through).
 */
export async function authenticate(request) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return { error: { status: 401, body: { error: "missing_bearer" } } };
  }
  const token = match[1];
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return { error: { status: 401, body: { error: "invalid_token" } } };
  }
  const user = await res.json();
  if (!user?.id) {
    return { error: { status: 401, body: { error: "invalid_token" } } };
  }
  return { user };
}

/**
 * Read the user's profile row (with the service-role key so RLS doesn't
 * matter here). Returns `null` if no row exists yet — the account-deletion
 * path treats that as fine since there's nothing to clean up on Whop.
 */
export async function fetchProfile(userId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(
      userId,
    )}&select=plan_status,plan_expires_at,subscription_id`,
    {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error(`profile fetch failed: ${res.status}`);
  }
  const rows = await res.json();
  return Array.isArray(rows) && rows[0] ? rows[0] : null;
}

/**
 * Schedule cancellation of a Whop membership at the end of the current
 * billing period. Whop's V2 `/cancel` endpoint defaults to this behavior,
 * which is exactly what we want — users keep what they paid for, and
 * the next renewal simply doesn't happen.
 *
 * Returns { ok, status, body }. The caller decides how strict to be:
 * delete-account, for instance, treats "membership_already_cancelled"
 * as fine because the auth-user delete still has to proceed.
 */
export async function cancelWhopMembership(membershipId) {
  if (!WHOP_API_KEY) {
    return {
      ok: false,
      status: 500,
      body: { error: "whop_not_configured" },
    };
  }
  const url = `${WHOP_API_BASE}/memberships/${encodeURIComponent(membershipId)}/cancel`;
  console.log("[whop-cancel] POST", url, "membership=", membershipId);
  // V2's /cancel takes no body — it always schedules end-of-period
  // cancellation, which is the behaviour we want.
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHOP_API_KEY}`,
      Accept: "application/json",
    },
  });
  // Always read as text first so we can log the raw response even when
  // it isn't valid JSON (Whop's error pages are sometimes HTML).
  const text = await res.text();
  let body = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    console.error(
      "[whop-cancel] FAILED",
      res.status,
      "url=", url,
      "body=", text.slice(0, 800),
    );
  } else {
    console.log("[whop-cancel] OK", res.status);
  }
  return { ok: res.ok, status: res.status, body };
}

/**
 * Delete a Supabase auth user by id. Uses the admin endpoint (only
 * reachable with the service-role key), which removes the row from
 * `auth.users` and — via the profiles_id_fkey foreign key — cascades
 * the public.profiles row away too.
 */
export async function deleteAuthUser(userId) {
  const res = await fetch(
    `${SUPABASE_URL}/auth/v1/admin/users/${encodeURIComponent(userId)}`,
    {
      method: "DELETE",
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
    },
  );
  // 200 (with body) or 204 (no body) both mean success.
  if (!res.ok && res.status !== 204) {
    let text = "";
    try {
      text = await res.text();
    } catch {}
    throw new Error(`admin delete failed: ${res.status} ${text}`);
  }
}
