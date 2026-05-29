// Server component — pure markup. All interactive behavior comes from
// /public/script.js, loaded by app/layout.js after hydration. Structure
// mirrors the original index.html 1:1 so styles in globals.css apply
// without any selector changes.

export default function Home() {
  // U+00A0 (non-breaking space) — used in a few labels where the original
  // markup had &nbsp; entities. JSX text strips entities, so we splice the
  // literal character via a JS expression.
  const NBSP = " ";

  // Social + contact links. Sourced from environment variables so they
  // can be set per-deploy (Vercel project env -> Production) without
  // touching code. The fallbacks below are placeholders; configure the
  // env vars on Vercel before pointing real traffic at this site.
  const TIKTOK_URL    = process.env.NEXT_PUBLIC_TIKTOK_URL    || "https://www.tiktok.com/@antigoon";
  const X_URL         = process.env.NEXT_PUBLIC_X_URL         || "https://x.com/antigoon";
  const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/antigoon";
  const DISCORD_URL   = process.env.NEXT_PUBLIC_DISCORD_URL   || "https://discord.gg/antigoon";
  const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@anti-goon.app";


  return (
    <>
      {/* Soft animated background */}
      <div className="bg-aurora">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="grain"></div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title fade-in">Anti Goon</h1>

          <p className="hero-tagline fade-in delay-1">
            <span className="tag-line-top">
              {/* Two phrasings: full sentence on tablets+, shorter on
                  phones (the long version overflows 375px viewports
                  even at 13px font). CSS .tag-line-top-phone is
                  hidden above 560px and shown below. */}
              <span className="tag-line-top-desktop">
                AI that can see your screen and blur all of the
              </span>
              <span className="tag-line-top-phone">
                Sees your screen. Blurs every
              </span>
            </span>
            <span className="tag-line-bottom">
              <span className="rot-wrap">
                <span className="rot-word" id="rotWord">{`naked${NBSP}`}</span>
              </span>
              <span className="rot-wrap" id="rotNounWrap">
                <span className="rot-word tag-women" id="rotNoun">women</span>
              </span>
            </span>
          </p>

          <div className="hero-buttons fade-in delay-2">
            <a href="/install" className="btn btn-mac btn-lg">
              <svg
                className="btn-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.1zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Download for macOS
            </a>
            <span
              className="btn btn-win btn-lg"
              style={{ opacity: 0.45, cursor: "not-allowed" }}
              title="Windows version is coming soon"
            >
              <svg
                className="btn-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3 5.5L10.5 4.4v7.1H3V5.5zm8.5-1.2L21 3v8.5h-9.5V4.3zM3 12.5h7.5v7L3 18.5v-6zm8.5 0H21V21l-9.5-1.3v-7.2z" />
              </svg>
              Windows — coming soon
            </span>
          </div>

          <p className="hero-trust fade-in delay-2">
            <span className="ht-dot"></span>
            Runs locally
            <span className="ht-sep">·</span>
            Nothing leaves your machine
            <span className="ht-sep">·</span>
            macOS 12+ &amp; Windows 10+
          </p>
        </div>
      </section>

      {/* Punchline divider — single bold line between the hero and How it works. */}
      <section className="punchline reveal">
        <p className="punchline-text">
          Stop glazing <span className="punchline-accent">chicks</span>.
          Stop <span className="punchline-accent">jerking off</span>.
          Stop being a <span className="punchline-accent">gay</span>.
        </p>
      </section>

      {/* How it works */}
      <section id="how" className="section">
        <div className="section-head">
          <span className="eyebrow">
            <span className="eyebrow-num">01</span>
            <span className="eyebrow-text">How it works</span>
          </span>
          <h2 className="section-title">
            Three layers between you and a{" "}
            <span className="hl-woman">WOMAN</span>.
          </h2>
          <p className="section-sub">
            Anti-Goon runs silently on your machine. No browser extension, no
            DNS hacks, no router setup. Just open it once and forget it exists.
          </p>
        </div>

        <div className="how-grid">
          {/* Connector rail centered vertically behind the three cards. */}
          <div className="how-connector" aria-hidden="true">
            <div className="hc-line"></div>
            <span className="hc-dot" style={{ left: "33.333%" }}></span>
            <span className="hc-dot" style={{ left: "66.667%" }}></span>
          </div>

          {/* Card 1 — Watch */}
          <div className="how-card reveal">
            <div className="how-num">01 — WATCH</div>
            <h3>It watches your screen.</h3>
            <p>
              A lightweight on-device model scans your screen three times
              per second. Your pixels never leave your computer.
            </p>
            <div className="how-visual hv-1">
              <div className="hv-monitor">
                <div className="hv-screen">
                  <svg
                    className="hv-mini-fig"
                    viewBox="0 0 120 220"
                    aria-hidden="true"
                  >
                    <circle cx="60" cy="30" r="18" />
                    <path d="M 48 54 L 72 54 L 100 142 Q 100 148 94 148 L 76 148 L 71 214 L 49 214 L 44 148 L 26 148 Q 20 148 20 142 Z" />
                  </svg>
                  <div className="hv-scan"></div>
                  <div className="hv-corners">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="hv-status">
                  <span className="hv-led"></span>
                  {`ANALYZING${NBSP}·${NBSP}3${NBSP}FPS`}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — Detect */}
          <div className="how-card reveal">
            <div className="how-num">02 — DETECT</div>
            <h3>It detects the moment.</h3>
            <p>
              Tuned for the categories that actually trip people up: complete
              nudity, bikinis, revealing tops, tight clothing — your choice.
            </p>
            <div className="how-visual hv-2">
              <div className="hv-detect">
                <svg
                  className="hv-fig"
                  viewBox="0 0 120 220"
                  aria-hidden="true"
                >
                  <circle cx="60" cy="30" r="18" />
                  <path d="M 48 54 L 72 54 L 100 142 Q 100 148 94 148 L 76 148 L 71 214 L 49 214 L 44 148 L 26 148 Q 20 148 20 142 Z" />
                </svg>
                <div className="hv-bbox"></div>
                <div className="hv-tag" id="detectTag">
                  {`BIKINI${NBSP}·${NBSP}0.94`}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 — Blur */}
          <div className="how-card reveal">
            <div className="how-num">03 — BLUR</div>
            <h3>It blurs before you flinch.</h3>
            <p>
              A frosted overlay drops in on top of the trigger area in under
              500ms — invisible to the content, visible to you.
            </p>
            <div className="how-visual hv-3">
              <div className="hv-blurcard">
                <svg
                  className="hv-fig"
                  viewBox="0 0 120 220"
                  aria-hidden="true"
                >
                  <circle cx="60" cy="30" r="18" />
                  <path d="M 48 54 L 72 54 L 100 142 Q 100 148 94 148 L 76 148 L 71 214 L 49 214 L 44 148 L 26 148 Q 20 148 20 142 Z" />
                </svg>
                <div className="hv-blur-drop"></div>
                <div className="hv-tag hv-tag-ok">{`⬢${NBSP}PROTECTED`}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modes */}
      <section id="modes" className="section">
        <div className="section-head">
          <span className="eyebrow">
            <span className="eyebrow-num">02</span>
            <span className="eyebrow-text">Modes</span>
          </span>
          <h2 className="section-title">
            Pick how she <span className="hl-woman">vanishes</span>.
          </h2>
          <p className="section-sub">
            Three shields built into Anti-Goon. Anchor one blur to your screen,
            let the detector hunt every trigger individually, or drop a blur
            wherever you want with a single hotkey.
          </p>
        </div>

        <div className="modes-grid modes-grid-3">
          {/* Fixed mode */}
          <div className="mode-card reveal">
            <div className="mode-meta">
              <span className="mode-pill mode-pill-fixed">FIXED MODE</span>
              <h3>One zone. Always covered.</h3>
              <p>
                A single blur region anchored to your screen — the safest
                choice for sites you don't want to peek at, even by accident.
                Set the box once, forget it's there.
              </p>
            </div>
            <div className="mode-window">
              <div className="mode-titlebar">
                <span className="dot r"></span>
                <span className="dot y"></span>
                <span className="dot g"></span>
                <span className="mode-url">your-screen.app</span>
              </div>
              <div className="mode-body">
                <div className="skel-grid">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div className="skel-card" key={`fx-${n}`}>
                      <div className={`sk-img sk-i${n}`}></div>
                      <div className="sk-h"></div>
                      <div className="sk-t"></div>
                      <div className="sk-t sk-t-2"></div>
                    </div>
                  ))}
                </div>
                <div className="fixed-blur" aria-hidden="true">
                  <span className="fb-corner tl"></span>
                  <span className="fb-corner tr"></span>
                  <span className="fb-corner bl"></span>
                  <span className="fb-corner br"></span>
                  <span className="fixed-blur-label">{`FIXED${NBSP}ZONE`}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Auto mode */}
          <div className="mode-card reveal">
            <div className="mode-meta">
              <span className="mode-pill mode-pill-auto">AUTO MODE</span>
              <h3>Targets. Tracked. Covered.</h3>
              <p>
                The detector lands a frosted patch on every trigger
                individually, anywhere on screen — content around it stays
                readable while she disappears.
              </p>
            </div>
            <div className="mode-window">
              <div className="mode-titlebar">
                <span className="dot r"></span>
                <span className="dot y"></span>
                <span className="dot g"></span>
                <span className="mode-url">your-screen.app</span>
              </div>
              <div className="mode-body">
                <div className="skel-grid">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div className="skel-card" key={`au-${n}`}>
                      <div className={`sk-img sk-i${n}`}></div>
                      <div className="sk-h"></div>
                      <div className="sk-t"></div>
                      <div className="sk-t sk-t-2"></div>
                    </div>
                  ))}
                </div>
                <div className="auto-blur auto-blur-1" aria-hidden="true">
                  <span className="auto-blur-label">DETECTED</span>
                </div>
                <div className="auto-blur auto-blur-2" aria-hidden="true">
                  <span className="auto-blur-label">DETECTED</span>
                </div>
                <div className="auto-blur auto-blur-3" aria-hidden="true">
                  <span className="auto-blur-label">DETECTED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Manual mode */}
          <div className="mode-card reveal">
            <div className="mode-meta">
              <span className="mode-pill mode-pill-manual">MANUAL MODE</span>
              <h3>You point. It blurs.</h3>
              <p>
                Detection off. Drop a blur anywhere with{" "}
                <kbd className="inline-kbd">⌘⇧S</kbd> — the detector
                snaps it around the person under your cursor, or places
                a default rectangle if nothing's there. Drag, resize,
                dismiss.
              </p>
            </div>
            <div className="mode-window">
              <div className="mode-titlebar">
                <span className="dot r"></span>
                <span className="dot y"></span>
                <span className="dot g"></span>
                <span className="mode-url">your-screen.app</span>
              </div>
              <div className="mode-body">
                <div className="skel-grid">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div className="skel-card" key={`mn-${n}`}>
                      <div className={`sk-img sk-i${n}`}></div>
                      <div className="sk-h"></div>
                      <div className="sk-t"></div>
                      <div className="sk-t sk-t-2"></div>
                    </div>
                  ))}
                </div>
                <div className="manual-blur" aria-hidden="true">
                  <span className="mb-corner tl"></span>
                  <span className="mb-corner tr"></span>
                  <span className="mb-corner bl"></span>
                  <span className="mb-corner br"></span>
                  <span className="manual-blur-label">PLACED</span>
                </div>
                <div className="manual-cursor" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 2 L4 18 L9 14 L12 21 L15 19 L11 13 L18 13 Z"
                          fill="white" stroke="#1a1426" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="manual-hotkey" aria-hidden="true">
                  <span className="hk-key">⌘</span>
                  <span className="hk-plus">+</span>
                  <span className="hk-key">⇧</span>
                  <span className="hk-plus">+</span>
                  <span className="hk-key">S</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blur triggers */}
      <section id="triggers" className="section">
        <div className="section-head">
          <span className="eyebrow">
            <span className="eyebrow-num">03</span>
            <span className="eyebrow-text">Blur triggers</span>
          </span>
          <h2 className="section-title">
            Four triggers.{" "}
            <span className="hl-woman">Stack any combination.</span>
          </h2>
          <p className="section-sub">
            Tune Anti-Goon to your exact fight. Pick one, pick all four, or
            anything between — each trigger fires independently.
          </p>
        </div>

        <div className="triggers-grid">
          <article className="trig-card reveal">
            <span className="trig-number">01</span>
            <h3 className="trig-title">Complete nudity</h3>
            <p className="trig-desc">
              The most aggressive trigger. Any exposed breasts, genitals, or
              buttocks anywhere on screen — instantly covered.
            </p>
          </article>

          <article className="trig-card reveal">
            <span className="trig-number">02</span>
            <h3 className="trig-title">Bikini</h3>
            <p className="trig-desc">
              Two-piece swimwear and similar coverage. Catches beach scenes,
              pool content, lingerie modeling.
            </p>
          </article>

          <article className="trig-card reveal">
            <span className="trig-number">03</span>
            <h3 className="trig-title">Exposed breasts</h3>
            <p className="trig-desc">
              Low-cut tops, lingerie, open shirts. The borderline content that
              classifies as "tasteful" but trips most people up.
            </p>
          </article>

          <article className="trig-card reveal">
            <span className="trig-number">04</span>
            <h3 className="trig-title">Tight clothing</h3>
            <p className="trig-desc">
              Form-fitting outfits that reveal body shape. Yoga pants, bodycon
              dresses, athletic wear — all caught.
            </p>
          </article>

        </div>
      </section>

      {/* Hotkeys */}
      <section id="hotkeys" className="section">
        <div className="section-head">
          <span className="eyebrow">
            <span className="eyebrow-num">04</span>
            <span className="eyebrow-text">Global hotkeys</span>
          </span>
          <h2 className="section-title">
            Five keys. <span className="hl-woman">Total control.</span>
          </h2>
          <p className="section-sub">
            Every action you need is one keystroke away — even when
            Anti-Goon is in the background. Rebind any of them from
            Settings → Shortcuts.
          </p>
        </div>

        <div className="hk-grid">
          <div className="hk-card reveal">
            <div className="hk-keys">
              <span className="hk-key">⌘</span>
              <span className="hk-plus">+</span>
              <span className="hk-key">⇧</span>
              <span className="hk-plus">+</span>
              <span className="hk-key">Z</span>
            </div>
            <h3>Toggle protection</h3>
            <p>Master on/off — flip it without opening the app.</p>
          </div>

          <div className="hk-card reveal">
            <div className="hk-keys">
              <span className="hk-key">⌘</span>
              <span className="hk-plus">+</span>
              <span className="hk-key">⇧</span>
              <span className="hk-plus">+</span>
              <span className="hk-key">P</span>
            </div>
            <h3>Pause for N seconds</h3>
            <p>Snooze the detector for a configurable window. Comes back on its own.</p>
          </div>

          <div className="hk-card reveal">
            <div className="hk-keys">
              <span className="hk-key">⌘</span>
              <span className="hk-plus">+</span>
              <span className="hk-key">⇧</span>
              <span className="hk-plus">+</span>
              <span className="hk-key">S</span>
            </div>
            <h3>Drop a manual blur</h3>
            <p>Place a blur at the cursor — snaps to a body if one is there.</p>
          </div>

          <div className="hk-card reveal">
            <div className="hk-keys">
              <span className="hk-key">⌘</span>
              <span className="hk-plus">+</span>
              <span className="hk-key">⇧</span>
              <span className="hk-plus">+</span>
              <span className="hk-key">L</span>
            </div>
            <h3>Remove a specific blur</h3>
            <p>Enter remove-mode, click the one you want gone. Esc cancels.</p>
          </div>

          <div className="hk-card reveal">
            <div className="hk-keys">
              <span className="hk-key">⌘</span>
              <span className="hk-plus">+</span>
              <span className="hk-key">⇧</span>
              <span className="hk-plus">+</span>
              <span className="hk-key">X</span>
            </div>
            <h3>Clear every manual blur</h3>
            <p>Wipe the slate. Detection-driven blurs stay untouched.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="section-head">
          <span className="eyebrow">
            <span className="eyebrow-num">05</span>
            <span className="eyebrow-text">FAQ</span>
          </span>
          <h2 className="section-title">Honest answers.</h2>
        </div>

        <div className="faq-list">
          <details className="faq-item reveal">
            <summary>Does Anti-Goon send my screen to a server?</summary>
            <p>
              No. Every frame is processed locally on your CPU/GPU. We
              literally cannot see your screen because nothing leaves your
              machine. The model lives in the app bundle.
            </p>
          </details>
          <details className="faq-item reveal">
            <summary>How accurate is the detection?</summary>
            <p>
              A tuned NudeNet model with custom per-class thresholds and a
              male-figure veto to suppress false positives. Blurs land in
              under half a second on small thumbnails, video frames, and
              full-screen content alike.
            </p>
          </details>
          <details className="faq-item reveal">
            <summary>Will it slow my computer down?</summary>
            <p>
              It runs at 3 frames per second and skips inference entirely when
              the screen hasn't changed. On an M-series Mac it leans on Apple's
              Neural Engine via CoreML and sits well under 5% CPU.
            </p>
          </details>
          <details className="faq-item reveal">
            <summary>Does it open on its own when I turn on my Mac?</summary>
            <p>
              Yes. Anti-Goon adds a LaunchAgent on first install so it
              opens automatically every time you log in — protection is on
              before you can even open a browser. Don't want it? One
              toggle in Settings → General → <em>Open at login</em>{" "}
              turns it off.
            </p>
          </details>
          <details className="faq-item reveal">
            <summary>Can I turn it off?</summary>
            <p>
              One toggle in the dashboard pauses it.{" "}
              <kbd className="inline-kbd">⌘⇧Z</kbd> does the same from
              anywhere on your Mac. Sign out and it's fully dormant.
              You're always in control — Anti-Goon is a tool, not a
              jailer.
            </p>
          </details>
          <details className="faq-item reveal">
            <summary>What if it triggers on stuff I don't want it to?</summary>
            <p>
              You pick the categories. Stick to “complete nudity” if you only
              want explicit content blurred. Disable “tight clothing” if you
              want to see workout videos. Tune it to your fight.
            </p>
          </details>
          <details className="faq-item reveal">
            <summary>Can I move or remove a blur the detector placed?</summary>
            <p>
              Yes — drag any blur to reposition, grab a corner to resize.
              <kbd className="inline-kbd">⌘⇧L</kbd> enters remove-mode
              for picking a specific blur to dismiss, and{" "}
              <kbd className="inline-kbd">⌘⇧X</kbd> clears every
              manual blur you placed.
            </p>
          </details>
          <details className="faq-item reveal">
            <summary>Can I cancel anytime?</summary>
            <p>
              Yes. Cancel from inside the app's Settings → Subscription in one
              click. Your access stays active until the end of the period you
              already paid for — no lock-in, no phone calls.
            </p>
          </details>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-final">
        <div className="cta-card reveal">
          <h2 className="cta-title">Install it. Forget it's there.</h2>
          <p className="cta-sub">
            Anti-Goon runs quietly in the background. The detector watches, the
            blur lands, you keep scrolling.
          </p>
          <div className="cta-buttons">
            <a href="/install" className="btn btn-mac btn-lg">
              Download for macOS
            </a>
            <span
              className="btn btn-win btn-lg"
              style={{ opacity: 0.45, cursor: "not-allowed" }}
              title="Windows version is coming soon"
            >
              Windows — coming soon
            </span>
          </div>
          <p className="cta-fine">
            macOS 12+ · Windows 10+ · 100% on-device.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand">
              <span className="brand-mark"></span>
              <span className="brand-name">Anti-Goon</span>
            </div>
            <p className="footer-tagline">
              AI that sees your screen and blurs every woman it detects.
            </p>
            <a className="footer-email" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <div className="footer-socials" aria-label="Social media">
              <a
                className="footer-social"
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/tiktok-icon.png"
                  alt=""
                  aria-hidden="true"
                  className="footer-social-img"
                />
              </a>
              <a
                className="footer-social"
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.7 3H21l-7.2 8.2L22 21h-6.5l-5-6.4L4.6 21H1.3l7.7-8.8L1.3 3H8l4.6 5.9L17.7 3zm-2.3 16h1.9L7.6 5H5.6l9.8 14z" />
                </svg>
              </a>
              <a
                className="footer-social"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.6" />
                  <circle cx="12" cy="12" r="4.1" />
                  <circle cx="17.4" cy="6.6" r="1.05" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                className="footer-social"
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.6 5.5A17 17 0 0 0 15.4 4l-.2.4a14.7 14.7 0 0 0-6.4 0L8.6 4A17 17 0 0 0 4.4 5.5C2 9.2 1.3 12.8 1.6 16.4a17 17 0 0 0 5.2 2.7l.4-.5c-.9-.3-1.7-.7-2.4-1.2.2-.1.4-.3.6-.4 4.6 2.1 9.6 2.1 14.2 0 .2.1.4.3.6.4-.8.5-1.6.9-2.5 1.2l.4.5a17 17 0 0 0 5.2-2.7c.4-4.2-.6-7.8-3.7-10.9zM8.7 14.3c-1 0-1.9-1-1.9-2.2 0-1.2.8-2.2 1.9-2.2 1.1 0 1.9 1 1.9 2.2 0 1.3-.8 2.2-1.9 2.2zm6.6 0c-1 0-1.9-1-1.9-2.2 0-1.2.8-2.2 1.9-2.2 1.1 0 1.9 1 1.9 2.2 0 1.3-.8 2.2-1.9 2.2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <a href="#how">How it works</a>
            <a href="#modes">Modes</a>
            <a href="#triggers">Triggers</a>
            <a href="#hotkeys">Hotkeys</a>
            <a href="#faq">FAQ</a>
            <a href="/privacy">Privacy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Anti-Goon. Built quietly, for people who chose better.</p>
        </div>
      </footer>
    </>
  );
}
