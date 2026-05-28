// /install — macOS download + first-launch guide.
//
// The .app is ad-hoc signed (no Apple Developer ID yet), so the first
// open is blocked by Gatekeeper. This page hands the user the download
// AND the exact "Open Anyway" steps so the block doesn't read as "the
// app is broken." When you notarise later, you can delete the Gatekeeper
// section and this page becomes a plain download/landing.

// Download URL served from a public GitHub Release. Repo is intentionally
// public so this asset is reachable without auth; product paywall lives
// in Supabase + Whop, not in the binary.
//
// To ship a new version: bump version in antigoon.spec, rebuild DMG,
// publish a new GitHub Release with the tag below updated, then change
// the constant here.
const MAC_DMG_URL =
  "https://github.com/Maty1ek/anti-goon-landing/releases/download/v0.1.0/Anti-Goon-0.1.0.dmg";

export const metadata = {
  title: "Install Anti-Goon for macOS",
  description: "Download Anti-Goon and finish the one-time macOS setup.",
};

export default function Install() {
  return (
    <>
      <div className="bg-aurora">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="grain"></div>
      </div>

      <section className="section" style={{ paddingTop: "120px", maxWidth: 820, margin: "0 auto" }}>
        <div className="section-head">
          <span className="eyebrow">
            <span className="eyebrow-num">→</span>
            <span className="eyebrow-text">Install · macOS</span>
          </span>
          <h2 className="section-title">Get Anti-Goon running.</h2>
          <p className="section-sub">
            One download, three one-time setup steps, then it opens on its
            own forever. Takes about two minutes.
          </p>
        </div>

        {/* Download */}
        <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 48px" }}>
          <a href={MAC_DMG_URL} className="btn btn-mac btn-lg" download>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.1zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Download for macOS
          </a>
        </div>

        {/* Steps */}
        <ol className="install-steps">
          <li>
            <h3>1 · Move it to Applications</h3>
            <p>
              Open the downloaded <code>Anti-Goon.dmg</code> and drag the
              Anti-Goon icon onto the <strong>Applications</strong> folder.
              Then eject the disk image.
            </p>
          </li>

          <li>
            <h3>2 · Run one setup command</h3>
            <p>
              Anti-Goon isn’t registered with Apple’s paid notarisation
              service yet, so macOS flags it as “unverified.” One command
              clears that flag — this is also what stops macOS from asking for
              permissions every time you open the app. Open{" "}
              <strong>Terminal</strong> (Spotlight → type “Terminal”), paste
              this line, and press Return:
            </p>
            <code className="install-cmd">xattr -dr com.apple.quarantine /Applications/Anti-Goon.app</code>
            <p className="install-fallback">
              Nothing visible happens — that’s correct. The command is safe: it
              only removes the “downloaded from the internet” marker from
              Anti-Goon.
            </p>
          </li>

          <li>
            <h3>3 · Open it and grant two permissions</h3>
            <p>
              Open Anti-Goon from Applications. It asks for two macOS
              permissions on first run:
            </p>
            <ul>
              <li>
                <strong>Screen Recording</strong> — lets the detector see your
                screen. Required for any blurring to work.
              </li>
              <li>
                <strong>Accessibility</strong> — lets the global hotkeys
                (toggle, pause, manual blur) fire while you’re in other apps.
              </li>
            </ul>
            <p>
              After enabling each one, <strong>quit Anti-Goon completely
              (⌘Q) and reopen it</strong> — macOS only applies a new permission
              to a freshly launched app. You only do this once.
            </p>
          </li>

          <li>
            <h3>4 · It opens on its own from now on</h3>
            <p>
              Anti-Goon registers itself to launch automatically every time
              you log in — protection is on before your browser is. You
              don't need to do anything for this; it's set up on first
              run.
            </p>
            <p className="install-fallback">
              Want to disable it? Open Anti-Goon → click the{" "}
              <strong>gear icon</strong> in the dashboard → Settings →{" "}
              <strong>General</strong> → toggle <em>Open at login</em> off.
              You can flip it back on from the same place.
            </p>
          </li>
        </ol>

        <p className="section-sub" style={{ marginTop: 40 }}>
          Everything runs on your machine. Nothing about your screen ever
          leaves your computer. Requires macOS 12 or later.
        </p>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <a href="/" className="btn btn-win" style={{ display: "inline-flex" }}>
            ← Back to home
          </a>
        </div>
      </section>

      {/* Scoped styles for the step list — kept here so we don't touch the
          shared globals.css. Uses the same dark-card vocabulary as the rest
          of the site. */}
      <style>{`
        .install-steps {
          list-style: none;
          margin: 0 auto;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 680px;
        }
        .install-steps > li {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px 28px;
        }
        .install-steps h3 {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0 0 10px;
          color: #fff;
        }
        .install-steps p { color: rgba(255,255,255,0.62); line-height: 1.6; margin: 0 0 8px; }
        .install-steps ul { margin: 8px 0 0; padding-left: 20px; color: rgba(255,255,255,0.62); line-height: 1.7; }
        .install-steps li li { margin-bottom: 4px; }
        .install-steps code {
          background: rgba(255,255,255,0.08);
          padding: 2px 7px;
          border-radius: 6px;
          font-size: 0.86em;
          color: #e8e8ff;
        }
        .install-cmd {
          display: block;
          margin: 10px 0 0;
          padding: 12px 14px !important;
          white-space: pre-wrap;
          word-break: break-all;
          user-select: all;
        }
        .install-fallback {
          margin-top: 14px !important;
          padding-top: 14px;
          border-top: 1px dashed rgba(255,255,255,0.12);
          font-size: 0.92rem;
        }
      `}</style>
    </>
  );
}
