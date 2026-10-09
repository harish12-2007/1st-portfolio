import { useEffect, useState, type RefObject } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Types words one after another, then erases them. Static when motion is reduced. */
export function useTyping(words: readonly string[], speed = 70, hold = 1500) {
  const [text, setText] = useState(prefersReducedMotion() ? words[0] : "");
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 0;
    let j = 0;
    let erasing = false;
    let timer = 0;
    const tick = () => {
      const word = words[i];
      if (!erasing) {
        j += 1;
        setText(word.slice(0, j));
        if (j === word.length) {
          erasing = true;
          timer = window.setTimeout(tick, hold);
          return;
        }
        timer = window.setTimeout(tick, speed);
      } else {
        j -= 1;
        setText(word.slice(0, j));
        if (j === 0) {
          erasing = false;
          i = (i + 1) % words.length;
          timer = window.setTimeout(tick, 320);
          return;
        }
        timer = window.setTimeout(tick, speed / 2);
      }
    };
    timer = window.setTimeout(tick, 700);
    return () => window.clearTimeout(timer);
  }, [words, speed, hold]);
  return text;
}

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** Adds the "in" class to [data-reveal] elements the first time they scroll into view. */
export function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Soft light that follows the pointer. Updates CSS variables once per frame. */
export function usePointerLight(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.dataset.on = "true";
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => {
      el.dataset.on = "false";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}
