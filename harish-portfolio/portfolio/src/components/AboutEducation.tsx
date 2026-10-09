import { ABOUT, ABOUT_FACTS, EDUCATION } from "../data/content";
import { Chip, Reveal, Section } from "./ui";

export function About() {
  return (
    <Section id="about" title="I build things, then work out why they broke.">
      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <div className="space-y-5 text-[1.075rem] leading-[1.75] text-fg/85">
          {ABOUT.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className="max-w-[62ch]">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <dl className="glass divide-y divide-white/[0.07] rounded-2xl">
            {ABOUT_FACTS.map((f) => (
              <div key={f.k} className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-4 sm:grid-cols-[8.5rem_1fr]">
                <dt className="text-sm text-mute">{f.k}</dt>
                <dd className="text-[0.95rem] text-fg">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" title="Where I've studied" intro="From a school diploma pathway into an AI & ML engineering degree.">
      <ol className="relative ml-2 space-y-10 border-l border-white/10 pl-8 sm:ml-3 sm:pl-10">
        {EDUCATION.map((e, i) => (
          <li key={e.title} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-2 -left-[2.4rem] size-3 rounded-full border-2 sm:-left-[2.9rem] ${
                e.current ? "border-aqua bg-aqua shadow-[0_0_14px_rgba(92,225,230,0.7)]" : "border-iris bg-ink"
              }`}
            />
            <Reveal delay={i * 80}>
              <div className="glass rounded-2xl p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="text-sm text-mute">{e.period}</p>
                  {e.current && <Chip tone="aqua">In progress</Chip>}
                </div>
                <h3 className="mt-2 max-w-[44ch] font-display text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
                  {e.title}
                </h3>
                {e.place && <p className="mt-1.5 text-fg/80">{e.place}</p>}
                {e.note && <p className="mt-3 text-[0.95rem] text-mute">{e.note}</p>}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
