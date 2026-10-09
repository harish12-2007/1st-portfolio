import { useState } from "react";
import { SKILL_GROUPS, type SkillGroup } from "../data/content";
import { Reveal, Section } from "./ui";

/** Ring of nodes: the centre is the category, each outer node is a skill. */
function Constellation({ group, selected }: { group: SkillGroup; selected: number }) {
  const n = group.skills.length;
  const pts = group.skills.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: 60 + Math.cos(a) * 38, y: 60 + Math.sin(a) * 38 };
  });
  return (
    <svg viewBox="0 0 120 120" className="size-24 shrink-0" aria-hidden="true">
      {pts.map((p, i) => (
        <line
          key={`l${i}`}
          x1="60"
          y1="60"
          x2={p.x}
          y2={p.y}
          stroke={i === selected ? "#5ce1e6" : "#8b9cff"}
          strokeOpacity={i === selected ? 0.9 : 0.25}
          style={{ transition: "stroke-opacity .25s, stroke .25s" }}
        />
      ))}
      {pts.map((p, i) => (
        <circle
          key={`c${i}`}
          cx={p.x}
          cy={p.y}
          r={i === selected ? 6 : 4}
          fill={i === selected ? "#5ce1e6" : "#8b9cff"}
          fillOpacity={i === selected ? 1 : 0.6}
          style={{ transition: "r .25s, fill .25s" }}
        />
      ))}
      <circle cx="60" cy="60" r="8" fill="#0f1526" stroke="#8b9cff" strokeOpacity=".7" />
    </svg>
  );
}

function SkillCard({ group, delay }: { group: SkillGroup; delay: number }) {
  const [sel, setSel] = useState(0);
  const skill = group.skills[sel];
  return (
    <Reveal delay={delay} className="h-full">
      <article className="glass flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-white/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight">{group.name}</h3>
            <p className="mt-1 text-sm text-mute">{group.blurb}</p>
          </div>
          <Constellation group={group} selected={sel} />
        </div>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.name} skills`}>
          {group.skills.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                aria-pressed={i === sel}
                onClick={() => setSel(i)}
                onMouseEnter={() => setSel(i)}
                onFocus={() => setSel(i)}
                className={`min-h-9 rounded-full border px-3.5 text-[0.9rem] transition-colors ${
                  i === sel
                    ? "border-aqua/50 bg-aqua/10 text-fg"
                    : "border-white/10 bg-white/[0.03] text-fg/80 hover:border-white/25"
                }`}
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-5 text-sm text-mute" aria-live="polite">
          {skill.usedIn ? (
            <>
              <span className="text-fg/90">{skill.name}</span> is used in {skill.usedIn.join(", ")}.
            </>
          ) : (
            <>
              <span className="text-fg/90">{skill.name}</span>: part of my learning path, no project linked yet.
            </>
          )}
        </p>
      </article>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      title="What I work with"
      intro="Select a skill to see which of my projects use it. Skills with no project yet say so."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {SKILL_GROUPS.map((g, i) => (
          <div key={g.name} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
            <SkillCard group={g} delay={(i % 3) * 70} />
          </div>
        ))}
      </div>
    </Section>
  );
}
