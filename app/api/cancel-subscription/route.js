// POST /api/cancel-subscription
//
// Auth: the caller must send their Supabase access token as a Bearer
// header. We resolve it to a user id, look up their `subscription_id`
// from `profiles`, then ask Whop to cancel at end of period.
//
// We deliberately don't write to `profiles` here — the existing
// `whop-webhook` edge function flips `plan_status` to 'inactive' when
// Whop signals the membership actually ended, so we keep a single
// writer for that column and avoid optimistic-but-wrong UI.

import { NextResponse } from "next/server";

import {
  authenticate,
  cancelWhopMembership,
  envCheck,
  fetchProfile,
} from "../_lib/account-ops";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const env = envCheck();
  if (!env.ok) return NextResponse.json(env.body, { status: env.status });

  const auth = await authenticate(request);
  if (auth.error) {
    console.warn("[cancel] auth failed:", auth.error.body);
    return NextResponse.json(auth.error.body, { status: auth.error.status });
  }
  console.log("[cancel] user=", auth.user.id, "email=", auth.user.email);

  let profile;
  try {
    profile = await fetchProfile(auth.user.id);
  } catch (e) {
    console.error("[cancel] profile lookup failed:", e);
    return NextResponse.json({ error: "profile_lookup_failed" }, { status: 502 });
  }
  console.log(
    "[cancel] profile subscription_id=", profile?.subscription_id,
    "plan_status=", profile?.plan_status,
  );

  if (!profile?.subscription_id) {
    // No subscription to cancel. From the user's perspective this is a
    // success (they're already not subscribed); from ours it means
    // either webhook never landed, plan_id was used instead of the
    // membership id, or they're on the free plan.
    return NextResponse.json(
      { ok: true, message: "No active subscription found." },
      { status: 200 },
    );
  }

  const result = await cancelWhopMembership(profile.subscription_id);
  if (!result.ok) {
    return NextResponse.json(
      {
        error: "whop_cancel_failed",
        whop_status: result.status,
        whop_body: result.body,
        // Surface the exact membership id we tried so the dev console
        // can match it against whop.com's dashboard immediately.
        membership_id: profile.subscription_id,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Subscription scheduled to cancel at the end of the current billing period.",
  });
}
