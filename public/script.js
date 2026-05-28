// ============================================================
// Scroll-reveal: add .in when elements enter the viewport.
// ============================================================
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ============================================================
// Mouse-parallax on the background orbs.
// ============================================================
const orbs = document.querySelectorAll(".orb");
let mx = 0, my = 0, cx = 0, cy = 0;
window.addEventListener("mousemove", (e) => {
  mx = (e.clientX / window.innerWidth - 0.5) * 2;
  my = (e.clientY / window.innerHeight - 0.5) * 2;
});
function tickOrbs() {
  cx += (mx - cx) * 0.04;
  cy += (my - cy) * 0.04;
  orbs.forEach((orb, i) => {
    const depth = (i + 1) * 12;
    orb.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
  });
  requestAnimationFrame(tickOrbs);
}
tickOrbs();

// ============================================================
// Hero word rotator — two-axis cycle.
//   Line reads: <ADJ> <NOUN>
//   Cycles through four states, one swap per tick, looping:
//     naked women → half-naked women → half-naked boobs →
//     naked boobs → naked women → …
//
// Each tick rotates exactly one of the two words so the change
// is legible. JS animates each wrap's width alongside the text
// swap so the layout settles smoothly.
// ============================================================
function startRotator() {
  const adjWord = document.getElementById("rotWord");
  const adjWrap = adjWord ? adjWord.closest(".rot-wrap") : null;
  const nounWord = document.getElementById("rotNoun");
  const nounWrap = nounWord ? nounWord.closest(".rot-wrap") : null;
  if (!adjWord || !adjWrap || !nounWord || !nounWrap) return;

  const NBSP = " ";
  const states = [
    { adj: "naked" + NBSP,      noun: "women" },
    { adj: "half-naked" + NBSP, noun: "women" },
    { adj: "half-naked" + NBSP, noun: "boobs" },
    { adj: "naked" + NBSP,      noun: "boobs" },
  ];
  let idx = 0;

  const probe = document.createElement("span");
  probe.style.cssText =
    "position:absolute;visibility:hidden;white-space:nowrap;" +
    "pointer-events:none;left:-99999px;top:0";
  document.body.appendChild(probe);

  function syncProbe(refEl) {
    const cs = getComputedStyle(refEl);
    probe.style.fontFamily    = cs.fontFamily;
    probe.style.fontStyle     = cs.fontStyle;
    probe.style.fontWeight    = cs.fontWeight;
    probe.style.fontSize      = cs.fontSize;
    probe.style.letterSpacing = cs.letterSpacing;
  }
  function widthOf(refEl, text) {
    syncProbe(refEl);
    probe.textContent = text;
    return probe.getBoundingClientRect().width;
  }
  function setWrapWidth(wrap, refEl, text) {
    wrap.style.width = widthOf(refEl, text) + "px";
  }

  function applyState(prevIdx, nextIdx) {
    const prev = states[prevIdx];
    const next = states[nextIdx];
    const adjChanged = prev.adj !== next.adj;
    const nounChanged = prev.noun !== next.noun;

    function swap(target, wrap, text) {
      target.classList.add("swapping");
      setTimeout(() => {
        target.textContent = text;
        setWrapWidth(wrap, target, text);
        requestAnimationFrame(() => target.classList.remove("swapping"));
      }, 300);
    }
    if (adjChanged) swap(adjWord, adjWrap, next.adj);
    if (nounChanged) swap(nounWord, nounWrap, next.noun);
  }

  function tick() {
    const prev = idx;
    idx = (idx + 1) % states.length;
    applyState(prev, idx);
  }

  function begin() {
    const s = states[idx];
    adjWord.textContent = s.adj;
    nounWord.textContent = s.noun;
    setWrapWidth(adjWrap, adjWord, s.adj);
    setWrapWidth(nounWrap, nounWord, s.noun);
    setInterval(tick, 2200);
  }

  window.addEventListener("resize", () => {
    const s = states[idx];
    setWrapWidth(adjWrap, adjWord, s.adj);
    setWrapWidth(nounWrap, nounWord, s.noun);
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(begin);
  } else {
    begin();
  }
}
startRotator();

// ============================================================
// How-it-works card 2: cycle the detection label so the visual
// reads as a live detector firing on different categories.
// Timed to land in the middle of the bbox-lock animation (~3.2s).
// ============================================================
function startDetectLabel() {
  const tag = document.getElementById("detectTag");
  if (!tag) return;
  const labels = [
    "BIKINI · 0.94",
    "OPEN_BREASTS · 0.87",
    "FEMALE_BREAST · 0.91",
    "TIGHT · 0.76",
  ];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % labels.length;
    tag.textContent = labels[idx];
  }, 3200);
}
startDetectLabel();

// ============================================================
// Hotkeys section: pulse one hotkey caption at a time so the
// section reads as live keys firing instead of a static cheat-
// sheet. No-ops if the section isn't on the page.
// ============================================================
function startHotkeyPulse() {
  const items = document.querySelectorAll(".hk-card");
  if (!items.length) return;
  let i = 0;
  setInterval(() => {
    items.forEach((el) => el.classList.remove("pulsing"));
    items[i].classList.add("pulsing");
    i = (i + 1) % items.length;
  }, 1600);
}
startHotkeyPulse();

// ============================================================
// Smooth in-page anchor scrolling.
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});
