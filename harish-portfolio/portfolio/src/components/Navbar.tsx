import { useEffect, useState } from "react";
import { NAV, SITE } from "../config";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const link = (id: string, label: string, mobile = false) => {
    const current = active === id;
    return (
      <a
        key={id}
        href={`#${id}`}
        aria-current={current ? "true" : undefined}
        onClick={() => setOpen(false)}
        className={
          mobile
            ? `block rounded-lg px-3 py-3 text-base ${current ? "bg-white/[0.06] text-fg" : "text-mute"}`
            : `relative rounded-md px-2.5 py-2 text-[0.9rem] transition-colors ${
                current ? "text-fg" : "text-mute hover:text-fg"
              }`
        }
      >
        {label}
        {!mobile && (
          <span
            aria-hidden="true"
            className={`absolute inset-x-2.5 -bottom-px h-px bg-gradient-to-r from-iris to-aqua transition-opacity duration-300 ${
              current ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </a>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-white/[0.07] bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-2.5 font-display text-[1.05rem] font-semibold tracking-tight">
          <img src="./favicon.svg" alt="" width={28} height={28} className="rounded-lg" />
          {SITE.name}
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => link(n.id, n.label))}
        </nav>
        <button
          type="button"
          className="glass inline-flex size-11 items-center justify-center rounded-xl lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="mx-auto max-w-6xl px-5 pb-4 sm:px-8 lg:hidden">
          {NAV.map((n) => link(n.id, n.label, true))}
        </nav>
      )}
    </header>
  );
}
