import { ROLES } from "../data/content";
import { SITE } from "../config";
import { useTyping } from "../hooks/hooks";
import NetworkCanvas from "./NetworkCanvas";
import { Button, external } from "./ui";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "./Icons";

function Avatar() {
  if (SITE.avatar) {
    return (
      <img
        src={`./${SITE.avatar}`}
        alt={`Portrait of ${SITE.name}`}
        width={320}
        height={320}
        fetchPriority="high"
        className="size-full rounded-[1.6rem] object-cover"
      />
    );
  }
  return (
    <svg
      role="img"
      aria-label={`Monogram avatar for ${SITE.name}`}
      viewBox="0 0 320 320"
      className="size-full rounded-[1.6rem]"
    >
      <defs>
        <linearGradient id="av-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#141b33" />
          <stop offset="1" stopColor="#0a0f20" />
        </linearGradient>
        <linearGradient id="av-fg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b9cff" />
          <stop offset="1" stopColor="#5ce1e6" />
        </linearGradient>
      </defs>
      <rect width="320" height="320" fill="url(#av-bg)" />
      <g stroke="#8b9cff" strokeOpacity=".22" fill="none">
        <path d="M40 70 120 40 210 80 290 50M40 70 90 160 40 250M90 160 210 80M90 160 190 230 290 190M210 80 290 190M190 230 120 285 40 250" />
      </g>
      <g fill="#8b9cff" fillOpacity=".55">
        {[[40, 70], [120, 40], [210, 80], [290, 50], [90, 160], [40, 250], [190, 230], [290, 190], [120, 285]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
        ))}
      </g>
      <path d="M98 100v120M222 100v120M98 160h124" stroke="url(#av-fg)" strokeWidth="26" strokeLinecap="round" fill="none" />
      <circle cx="98" cy="100" r="9" fill="#5ce1e6" />
      <circle cx="222" cy="220" r="9" fill="#8b9cff" />
    </svg>
  );
}

export default function Hero() {
  const typed = useTyping(ROLES);
  return (
    <section id="home" aria-label="Introduction" className="relative isolate min-h-[100svh] overflow-hidden">
      <NetworkCanvas />
      <div className="mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-12 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div>
          {SITE.availability && (
            <p className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-sm text-fg/90">
              <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-aqua" />
              {SITE.availability}
            </p>
          )}
          <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(2.7rem,8.2vw,5.6rem)] leading-[0.98] font-semibold tracking-[-0.035em]">
            Building Intelligent Systems for the Real World.
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg text-mute sm:text-xl">
            CSE (AI &amp; ML) Engineer focused on Artificial Intelligence, Machine Learning, Python and solving real-world
            problems with technology.
          </p>
          <p className="mt-5 font-display text-xl font-medium text-fg sm:text-2xl" aria-live="off">
            <span aria-hidden="true">
              {typed}
              <span className="caret" />
            </span>
            <span className="sr-only">{ROLES.join(", ")}</span>
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button variant="solid" href="#projects">
              View Projects
            </Button>
            <Button href={`./${SITE.resumeFile}`} download>
              <DownloadIcon /> Download Resume
            </Button>
            <span className="mx-1 hidden h-6 w-px bg-white/10 sm:block" aria-hidden="true" />
            <a
              {...external}
              href={SITE.github}
              aria-label="GitHub profile"
              className="glass inline-flex size-11 items-center justify-center rounded-xl text-fg transition-colors hover:bg-white/[0.07]"
            >
              <GitHubIcon />
            </a>
            <a
              {...external}
              href={SITE.linkedin}
              aria-label="LinkedIn profile"
              className="glass inline-flex size-11 items-center justify-center rounded-xl text-fg transition-colors hover:bg-white/[0.07]"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <aside className="glass hidden rounded-[2rem] p-3 lg:block" aria-label="Profile">
          <div className="aspect-square w-full">
            <Avatar />
          </div>
          <div className="px-3 pb-3 pt-4">
            <p className="font-display text-xl font-semibold tracking-tight">{SITE.name}</p>
            <p className="mt-0.5 text-sm text-mute">{SITE.role}</p>
            <p className="mt-0.5 text-sm text-mute">{SITE.location}</p>
          </div>
        </aside>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-7 left-5 hidden items-center gap-3 text-sm text-mute transition-colors hover:text-fg sm:left-8 sm:flex"
      >
        <span className="scroll-line block h-10 w-px bg-white/15" aria-hidden="true" />
        Scroll
      </a>
    </section>
  );
}
