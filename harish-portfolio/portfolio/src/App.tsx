import { useMemo, useRef } from "react";
import { NAV, NAV_PARENT, SITE } from "./config";
import { useActiveSection, usePointerLight, useRevealOnScroll } from "./hooks/hooks";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { About, Education } from "./components/AboutEducation";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import { Achievements, Journey } from "./components/Journey";
import GitHubSection from "./components/GitHubSection";
import Resume from "./components/Resume";
import Contact from "./components/Contact";

const SECTION_IDS = [...NAV.map((n) => n.id), ...Object.keys(NAV_PARENT)];

export default function App() {
  const glow = useRef<HTMLDivElement>(null);
  const ids = useMemo(() => SECTION_IDS, []);
  const current = useActiveSection(ids);
  const active = NAV_PARENT[current] ?? current;

  usePointerLight(glow);
  useRevealOnScroll();

  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <div ref={glow} className="cursor-glow" aria-hidden="true" />
      <a
        href="#about"
        className="sr-only z-[60] rounded-lg bg-fg px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar active={active} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Journey />
        <Achievements />
        <GitHubSection />
        <Resume />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-white/[0.07] py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 text-sm text-mute sm:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p>Built with React, TypeScript and Tailwind CSS.</p>
        </div>
      </footer>
    </>
  );
}
