const ORB_COLORS = [
  "var(--color-accent-lavender)",
  "var(--color-accent-mint)",
  "var(--color-accent-peach)",
];
const HOVER_ORB_COUNT = 4;
const MAX_ORBS_PER_HOST = 8;
const AMBIENT_ORB_COUNT = 3;

let isHoverListenerAttached = false;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function createOrb(host: HTMLElement, delay: number): HTMLSpanElement {
  const orb = document.createElement("span");
  orb.className = "orb";
  orb.setAttribute("aria-hidden", "true");
  const size = randomBetween(6, 14);
  orb.style.setProperty("--orb-x", `${randomBetween(10, 90)}%`);
  orb.style.setProperty("--orb-size", `${size}px`);
  orb.style.setProperty("--orb-drift", `${randomBetween(-12, 12)}px`);
  orb.style.setProperty("--orb-rise", `${host.offsetHeight * randomBetween(0.6, 1.2) + 24}px`);
  orb.style.setProperty("--orb-duration", `${randomBetween(1.1, 1.8)}s`);
  orb.style.setProperty("--orb-delay", `${delay}s`);
  orb.style.setProperty("--orb-color", ORB_COLORS[Math.floor(Math.random() * ORB_COLORS.length)]);
  return orb;
}

function spawnHoverOrbs(host: HTMLElement): void {
  if (host.querySelectorAll(":scope > .orb").length >= MAX_ORBS_PER_HOST) return;

  for (let i = 0; i < HOVER_ORB_COUNT; i++) {
    const orb = createOrb(host, i * 0.08);
    orb.addEventListener("animationend", () => orb.remove(), { once: true });
    host.appendChild(orb);
  }
}

/**
 * Bubbles orbs out of any `[data-orbs]` element on hover. One delegated
 * listener for the whole document; skipped on touch and reduced motion.
 */
export function initHoverOrbs(): void {
  if (isHoverListenerAttached) return;
  if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
    return;
  }

  isHoverListenerAttached = true;
  document.addEventListener("pointerover", (event) => {
    const target = event.target as Element | null;
    const host = target?.closest<HTMLElement>("[data-orbs]");
    if (!host) return;

    const from = event.relatedTarget as Node | null;
    if (from && host.contains(from)) return;

    spawnHoverOrbs(host);
  });
}

/**
 * Keeps a slow orb loop on `[data-orbs-ambient]` elements, running only while
 * they are on screen.
 */
export function initAmbientOrbs(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const hosts = document.querySelectorAll<HTMLElement>("[data-orbs-ambient]");
  if (hosts.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle("orb-visible", entry.isIntersecting);
    }
  });

  for (const host of hosts) {
    if (!host.classList.contains("orb-ambient")) {
      host.classList.add("orb-ambient");
      for (let i = 0; i < AMBIENT_ORB_COUNT; i++) {
        const orb = createOrb(host, i * 1.1);
        orb.style.setProperty("--orb-duration", `${randomBetween(2.8, 3.6)}s`);
        host.appendChild(orb);
      }
    }
    observer.observe(host);
  }
}
