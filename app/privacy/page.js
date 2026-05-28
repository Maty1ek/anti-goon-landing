// /privacy — privacy policy. Static markup, no client behaviour.
//
// Reuses the same dark-card / aurora-orb visual language as /install so
// the navigation feels coherent. Substantive content reflects the
// actual data flow:
//   - Auth + plan state in Supabase (email + Whop subscription mirror).
//   - Payments + cancellation through Whop.
//   - Screen capture happens on-device only; pixels never leave the
//     user's machine.
//   - No analytics, no telemetry, no third-party trackers.

export const metadata = {
  title: "Privacy — Anti-Goon",
  description:
    "How Anti-Goon handles your data: on-device screen processing, account info in Supabase, payments through Whop, and nothing else.",
};

const LAST_UPDATED = "May 28, 2026";

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-aurora">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="grain"></div>
      </div>

      <section
        className="section"
        style={{ paddingTop: "120px", maxWidth: 760, margin: "0 auto" }}
      >
        <div className="section-head">
          <span className="eyebrow">
            <span className="eyebrow-num">→</span>
            <span className="eyebrow-text">Privacy policy</span>
          </span>
          <h2 className="section-title">
            Your screen stays on your screen.
          </h2>
          <p className="section-sub">
            Anti-Goon is built so the smallest amount of data leaves your
            machine. Here's exactly what does, what doesn't, and why.
          </p>
          <p style={{ marginTop: 10, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="privacy-content">
          <article className="priv-block">
            <h3>The short version</h3>
            <ul>
              <li>
                <strong>Your screen pixels never leave your computer.</strong>
                {" "}The AI model that detects content runs entirely on your
                CPU/GPU. We literally cannot see your screen.
              </li>
              <li>
                <strong>We store the minimum to make payments and logins
                work:</strong> your email address, an encrypted password
                hash, and your subscription status.
              </li>
              <li>
                <strong>No analytics, no telemetry, no third-party
                trackers</strong> are included in the desktop app. The
                website uses no cookies beyond what your browser keeps for
                a normal HTTPS visit.
              </li>
              <li>
                <strong>You can delete your account and all associated
                data in one click</strong> from Settings → Session →
                Delete account inside the app.
              </li>
            </ul>
          </article>

          <article className="priv-block">
            <h3>What runs on your device only</h3>
            <p>
              The detector loop captures your screen three times per
              second, runs an on-device neural network (a quantised
              NudeNet model that ships inside the app bundle), and paints
              blur overlays on top of any content that matches the
              triggers you selected. Every part of this happens locally:
            </p>
            <ul>
              <li>Screen captures are stored in RAM only and discarded after each frame.</li>
              <li>The detection model is loaded from inside the <code>.app</code> bundle — no model download, no model update calls.</li>
              <li>No frame, no detection result, no inference latency, no error trace is ever transmitted anywhere.</li>
              <li>Anti-Goon does not contain any analytics SDKs, crash reporters, or background telemetry.</li>
            </ul>
            <p>
              You can verify this by running Anti-Goon offline — protection
              works identically without an internet connection. The only
              network calls the app ever makes are the account / payment
              calls listed below.
            </p>
          </article>

          <article className="priv-block">
            <h3>What we store, and where</h3>
            <p>
              We use two third-party services. Both are scoped strictly to
              the function listed below; neither has access to your screen
              data.
            </p>

            <h4>Supabase — accounts</h4>
            <p>
              Supabase hosts our authentication database (PostgreSQL +
              their Auth service). When you sign up we store:
            </p>
            <ul>
              <li>Your email address.</li>
              <li>An encrypted hash of your password (Argon2id; we never see your plaintext password).</li>
              <li>Account creation and last-sign-in timestamps.</li>
              <li>Your plan status (<code>active</code> / <code>inactive</code>) and the Whop membership ID it's linked to.</li>
              <li>Whether you've ever started the 5-minute trial, and when.</li>
            </ul>
            <p>
              That's the entire row in our <code>profiles</code> table.
              Supabase's privacy policy is at{" "}
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
                supabase.com/privacy
              </a>.
            </p>

            <h4>Whop — payments</h4>
            <p>
              Payments and subscription management run through Whop.com.
              When you upgrade, Whop handles your card details directly —
              we never see, store, or transmit card numbers. Whop sends
              us a webhook with your subscription status, which we mirror
              into your Supabase profile. We can see:
            </p>
            <ul>
              <li>Your Whop membership ID.</li>
              <li>Whether the membership is active or cancelled, and when each event happened.</li>
              <li>Which plan (monthly or annual) you're on.</li>
            </ul>
            <p>
              Whop's privacy policy is at{" "}
              <a href="https://whop.com/privacy" target="_blank" rel="noopener noreferrer">
                whop.com/privacy
              </a>.
            </p>
          </article>

          <article className="priv-block">
            <h3>What we don't store</h3>
            <ul>
              <li>Any screen capture, detection event, or inference output — not even an aggregate count.</li>
              <li>Your card number, expiry, or CVC (Whop holds those, not us).</li>
              <li>Your name, IP address, device identifier, or location.</li>
              <li>Your browsing history, app usage patterns, or feature-level analytics.</li>
              <li>Any keystroke data — the global hotkey listener only reacts to the configured combos and discards everything else.</li>
            </ul>
          </article>

          <article className="priv-block">
            <h3>Your rights</h3>
            <p>
              You can <strong>change your email or password</strong> from
              Settings → Account inside the app.
            </p>
            <p>
              You can <strong>cancel your subscription</strong> from
              Settings → Subscription. Cancellation is end-of-period —
              your access stays active until the date you've already paid
              for, then turns off automatically.
            </p>
            <p>
              You can <strong>delete your account and every associated
              record</strong> from Settings → Session → Delete account.
              This cancels your Whop subscription, then irreversibly
              removes your Supabase profile row and authentication
              record. After deletion we keep nothing.
            </p>
            <p>
              If you can't reach the in-app controls (locked out, app
              broken, anything) email us directly and we'll handle it
              manually.
            </p>
          </article>

          <article className="priv-block">
            <h3>Permissions Anti-Goon asks for</h3>
            <ul>
              <li>
                <strong>Screen Recording</strong> (macOS) — required for
                the detector to see what's on your screen. Without it the
                app cannot function. Captures stay in RAM.
              </li>
              <li>
                <strong>Accessibility</strong> (macOS) — required so the
                global hotkeys (toggle, pause, place manual blur, remove
                blur, clear manual blurs) fire while you're using other
                applications. The accessibility permission is used only
                to listen for those specific key combinations.
              </li>
              <li>
                <strong>Open at login</strong> — opt-in on first launch.
                Installs a per-user LaunchAgent that opens Anti-Goon
                when you log in. Disable it any time in Settings →
                General → Open at login.
              </li>
            </ul>
          </article>

          <article className="priv-block">
            <h3>Contact</h3>
            <p>
              Questions, deletion requests, or anything else:{" "}
              <a href="mailto:hello@anti-goon.app">hello@anti-goon.app</a>.
            </p>
          </article>

          <article className="priv-block">
            <h3>Changes to this policy</h3>
            <p>
              If the data we collect or how we handle it changes, this
              page is updated and the "Last updated" date at the top
              changes with it. Material changes get an in-app notice on
              your next launch.
            </p>
          </article>
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href="/" className="btn btn-win" style={{ display: "inline-flex" }}>
            ← Back to home
          </a>
        </div>
      </section>

      <style>{`
        .privacy-content {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .priv-block {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 26px 30px;
        }
        .priv-block h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 14px;
          color: #fff;
          letter-spacing: -0.2px;
        }
        .priv-block h4 {
          font-size: 0.98rem;
          font-weight: 700;
          margin: 16px 0 8px;
          color: rgba(255,255,255,0.88);
        }
        .priv-block p,
        .priv-block li {
          color: rgba(255,255,255,0.66);
          line-height: 1.65;
          font-size: 14.5px;
        }
        .priv-block p { margin: 0 0 10px; }
        .priv-block ul {
          margin: 6px 0 12px;
          padding-left: 20px;
        }
        .priv-block li { margin-bottom: 6px; }
        .priv-block strong { color: rgba(255,255,255,0.92); font-weight: 600; }
        .priv-block code {
          background: rgba(255,255,255,0.08);
          padding: 1.5px 6px;
          border-radius: 5px;
          font-size: 0.86em;
          color: #e8e8ff;
        }
        .priv-block a {
          color: #c4b5fd;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .priv-block a:hover { color: #fff; }
      `}</style>
    </>
  );
}
