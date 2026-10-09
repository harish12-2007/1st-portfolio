import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES, JOURNEY } from "../data/content";
import { Reveal, Section, external } from "./ui";

export function Journey() {
  return (
    <Section id="journey" title="How I got here" intro="The order things happened in, and what I took from each step.">
      <ol className="grid gap-x-12 gap-y-9 md:grid-cols-2">
        {JOURNEY.map((s, i) => (
          <li key={s.title} className="relative border-l border-white/10 pl-6">
            <span aria-hidden="true" className="absolute top-1.5 -left-[5px] size-[9px] rounded-full bg-iris" />
            <Reveal delay={(i % 2) * 80}>
              {s.when && <p className="text-sm text-aqua">{s.when}</p>}
              <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1.5 max-w-[48ch] text-mute">{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Achievements() {
  const verified = ACHIEVEMENTS;
  const empty = ACHIEVEMENT_CATEGORIES.filter((c) => !verified.some((a) => a.category === c));
  return (
    <Section
      id="achievements"
      title="Achievements"
      intro="Only verified entries appear here. Empty categories stay empty until there is something real to add."
    >
      {verified.length > 0 && (
        <ul className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {verified.map((a) => (
            <li key={`${a.category}-${a.title}`} className="glass rounded-2xl p-5">
              <p className="text-sm text-mute">{a.category}</p>
              <p className="mt-1 font-semibold">
                {a.url ? (
                  <a {...external} href={a.url} className="underline decoration-white/30 underline-offset-4 hover:decoration-aqua">
                    {a.title}
                  </a>
                ) : (
                  a.title
                )}
              </p>
              {(a.issuer || a.date) && <p className="mt-1 text-sm text-mute">{[a.issuer, a.date].filter(Boolean).join(", ")}</p>}
            </li>
          ))}
        </ul>
      )}
      {empty.length > 0 && (
        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Categories with nothing to show yet">
            {empty.map((c) => (
              <li
                key={c}
                className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-white/15 px-5 py-4"
              >
                <span className="text-fg/90">{c}</span>
                <span className="text-sm text-mute">None yet</span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}
