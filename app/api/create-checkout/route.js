// POST /api/create-checkout
//
// Auth: the caller sends their Supabase access token as a Bearer header.
// Body: { "plan_id": "plan_..." }.
//
// We resolve the token to a user id, then ask Whop to create a checkout
// CONFIGURATION with that user_id attached as metadata, and return the hosted
// checkout URL for the app to open.
//
// Why this exists: the desktop app used to build the checkout URL itself with
// ?metadata[user_id]=... and ?email=... query params. Whop's hosted checkout
// drops the URL metadata and overrides the email with whatever Whop account
// the browser is signed into — so a buyer paying with a different email got no
// activation for their actual account. Binding user_id to a server-created
// checkout configuration makes the webhook able to identify the account every
// time, regardless of the email used.

import { NextResponse } from "next/server";

import { authenticate, createWhopCheckout, envCheck } from "../_lib/account-ops";

export const dynamic = "force-dynamic";

// Only these plans may be checked out. Keep in sync with whop_config.py
// (WHOP_MONTHLY_PLAN_ID / WHOP_ANNUAL_PLAN_ID) in the desktop app.
const ALLOWED_PLANS = new Set([
  "plan_dXuJFhYoPEYht", // monthly $14.99
  "plan_bDVCVdhNULbEW", // annual  $99
]);

// Where Whop sends the browser after a successful payment. The /success page
// reads ?user_id to poll Supabase and confirm activation. Overridable via env
// for preview deployments.
const SITE_URL = (process.env.SITE_URL || "https://anti-glaze.com").replace(/\/$/, "");

export async function POST(request) {
  const env = envCheck();
  if (!env.ok) return NextResponse.json(env.body, { status: env.status });

  const auth = await authenticate(request);
  if (auth.error) {
    console.warn("[create-checkout] auth failed:", auth.error.body);
    return NextResponse.json(auth.error.body, { status: auth.error.status });
  }

  let payload = {};
  try {
    payload = await request.json();
  } catch {
    // empty / non-JSON body — handled by the plan check below
  }
  const planId = payload?.plan_id;
  if (!planId || !ALLOWED_PLANS.has(planId)) {
    return NextResponse.json({ error: "invalid_plan" }, { status: 400 });
  }

  const redirectUrl = `${SITE_URL}/success?user_id=${encodeURIComponent(auth.user.id)}`;

  const result = await createWhopCheckout({
    planId,
    userId: auth.user.id,
    redirectUrl,
  });

  if (!result.ok) {
    console.error(
      "[create-checkout] whop failed",
      result.status,
      result.body,
    );
    return NextResponse.json(
      {
        error: "whop_checkout_failed",
        whop_status: result.status,
        whop_body: result.body,
      },
      { status: 502 },
    );
  }

  console.log("[create-checkout] ok user=", auth.user.id, "plan=", planId);
  return NextResponse.json(result.body); // { url, checkout_id }
}
