"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// /success — landing page Whop redirects the browser to after checkout.
// We don't write to Supabase from here; the `whop-webhook` edge function
// is the source of truth for plan_status. This page just *verifies* the
// status (via /api/check-status, which uses the service-role key on the
// server) so we can show a confident "you're in" message and also catch
// the rare case where the user lands here before the webhook fired.

function PollState({ status }) {
  if (status === "active") {
    return (
      <div className="su-status su-status-ok">
        <span className="su-dot" />
        Subscription active
      </div>
    );
  }
  if (status === "waiting") {
    return (
      <div className="su-status su-status-wait">
        <span className="su-dot su-dot-pulse" />
        Confirming with Whop…
      </div>
    );
  }
  if (status === "no_id") {
    return (
      <div className="su-status su-status-wait">
        <span className="su-dot" />
        Payment received
      </div>
    );
  }
  return (
    <div className="su-status su-status-err">
      <span className="su-dot" />
      Still confirming — see below
    </div>
  );
}

function SuccessInner() {
  const params = useSearchParams();
  const userId = params.get("user_id");
  const [status, setStatus] = useState(userId ? "waiting" : "no_id");
  const [tries, setTries] = useState(0);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    let timer;
    const poll = async () => {
      try {
        const res = await fetch(
          `/api/check-status?user_id=${encodeURIComponent(userId)}`,
          { cache: "no-store" },
        );
        const data = await res.json();
        if (cancelled) return;
        if (data?.active) {
          setStatus("active");
          return;
        }
      } catch {
        // Network blip — keep polling.
      }
      if (cancelled) return;
      setTries((t) => {
        const next = t + 1;
        // Poll for ~60s (15 × 4s). After that show the soft fallback
        // message; the webhook will still land eventually and the
        // desktop app picks it up on its own polling loop.
        if (next < 15) {
          timer = setTimeout(poll, 4000);
        } else {
          setStatus("timeout");
        }
        return next;
      });
    };
    poll();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [userId]);

  return (
    <main className="su-wrap">
      <div className="bg-aurora" aria-hidden="true">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="grain"></div>
      </div>

      <div className="su-card">
        <div className="su-brand">
          <span className="brand-mark"></span>
          <span className="su-brand-name">Anti-Goon</span>
        </div>

        <div className="su-check" aria-hidden="true">
          <svg viewBox="0 0 64 64" width="56" height="56">
            <circle cx="32" cy="32" r="30" fill="none" strokeWidth="3" />
            <path
              d="M20 33 L29 42 L46 24"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="su-title">
          Payment confirmed.
          <br />
          <span className="su-title-accent">You're protected.</span>
        </h1>

        <p className="su-sub">
          Thanks for upgrading. Return to the Anti-Goon desktop app — it's
          already polling for your new subscription and will unlock
          automatically within a few seconds.
        </p>

        <PollState status={status} />

        <ol className="su-steps">
          <li>
            <span className="su-step-num">1</span>
            <div>
              <strong>Switch back to the Anti-Goon app.</strong>
              <span>
                It's still waiting on the "Finish in your browser" screen.
              </span>
            </div>
          </li>
          <li>
            <span className="su-step-num">2</span>
            <div>
              <strong>It unlocks on its own.</strong>
              <span>
                No code to enter — the app sees the active plan and the
                paywall closes.
              </span>
            </div>
          </li>
          <li>
            <span className="su-step-num">3</span>
            <div>
              <strong>If it's still locked after a minute…</strong>
              <span>
                Quit the app and reopen it. The next launch always picks up
                the active plan.
              </span>
            </div>
          </li>
        </ol>

        {status === "timeout" && (
          <div className="su-fallback">
            We haven't seen the webhook from Whop yet. Don't worry — your
            payment went through. The desktop app will unlock as soon as
            Whop's confirmation lands (usually under a minute). You can
            close this tab.
          </div>
        )}

        <p className="su-fine">
          You can safely close this tab.
        </p>
      </div>
    </main>
  );
}

// useSearchParams() must live inside Suspense for the app-router build.
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="su-wrap" />}>
      <SuccessInner />
    </Suspense>
  );
}
