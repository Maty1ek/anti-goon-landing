// POST /api/delete-account
//
// Two-step destructive flow:
//   1. Cancel any active Whop membership (end-of-period). The user has
//      explicitly chosen "no refund", so we leave the rest of the billed
//      period alone — Whop will not renew, but won't issue a refund.
//   2. Delete the Supabase auth user. The `profiles_id_fkey` foreign
//      key cascades the public.profiles row away, so we don't need a
//      separate DELETE on it.
//
// If the Whop call fails for any reason other than "membership not
// found / already cancelled" we abort *before* deleting the auth row —
// otherwise the user could end up unable to sign in but still being
// billed because we never told Whop to stop.

import { NextResponse } from "next/server";

import {
  authenticate,
  cancelWhopMembership,
  deleteAuthUser,
  envCheck,
  fetchProfile,
} from "../_lib/account-ops";

export const dynamic = "force-dynamic";

// Whop returns 404 when the membership has already been cancelled /
// doesn't exist. We treat both as "nothing to do, keep going."
function whopFailureIsBenign(result) {
  if (result.ok) return true;
  if (result.status === 404) return true;
  // Some Whop error payloads include a machine-readable code; allow
  // already-cancelled to be a no-op too.
  const code = result.body?.error?.code || result.body?.code;
  return code === "membership_already_cancelled";
}

export async function POST(request) {
  const env = envCheck();
  if (!env.ok) return NextResponse.json(env.body, { status: env.status });

  const auth = await authenticate(request);
  if (auth.error) {
    return NextResponse.json(auth.error.body, { status: auth.error.status });
  }

  let profile;
  try {
    profile = await fetchProfile(auth.user.id);
  } catch (e) {
    return NextResponse.json({ error: "profile_lookup_failed" }, { status: 502 });
  }

  if (profile?.subscription_id) {
    const cancelResult = await cancelWhopMembership(profile.subscription_id);
    if (!whopFailureIsBenign(cancelResult)) {
      return NextResponse.json(
        {
          error: "whop_cancel_failed",
          whop_status: cancelResult.status,
          whop_body: cancelResult.body,
          hint:
            "Account NOT deleted — we couldn't cancel the Whop subscription, " +
            "and deleting the account without cancelling could keep billing you.",
        },
        { status: 502 },
      );
    }
  }

  try {
    await deleteAuthUser(auth.user.id);
  } catch (e) {
    return NextResponse.json(
      { error: "auth_delete_failed", detail: String(e) },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Account deleted. Subscription cancelled, no refund issued.",
  });
}
