// Server-only endpoint hit by the /success page.
//
// Reads the requested profile from Supabase using the service-role key
// (so RLS doesn't block us — the page itself is unauthenticated) and
// returns just `{ active: boolean }`. We deliberately return nothing
// else: even though the service-role key has full read access, we only
// expose the single flag the success page actually needs, so an attacker
// guessing a user_id can't enumerate emails or plan history.

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user_id");

  if (!userId || !/^[0-9a-f-]{36}$/i.test(userId)) {
    return NextResponse.json({ active: false, reason: "bad_id" }, { status: 400 });
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { active: false, reason: "server_misconfigured" },
      { status: 500 },
    );
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(
      userId,
    )}&select=plan_status,plan_expires_at`,
    {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { active: false, reason: "db_error" },
      { status: 502 },
    );
  }

  const rows = await res.json();
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row) {
    return NextResponse.json({ active: false, reason: "no_profile" });
  }

  let active = row.plan_status === "active";
  // Mirror the desktop app's expiry check so an active-but-expired row
  // doesn't read as live here.
  if (active && row.plan_expires_at) {
    const expires = Date.parse(row.plan_expires_at);
    if (Number.isFinite(expires) && expires <= Date.now()) {
      active = false;
    }
  }

  return NextResponse.json({ active });
}
