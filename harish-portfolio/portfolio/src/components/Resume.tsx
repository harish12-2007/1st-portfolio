import { EDUCATION, PROJECTS, RESUME, SKILL_GROUPS } from "../data/content";
import { SITE } from "../config";
import { Button, Reveal, Section } from "./ui";
import { DownloadIcon } from "./Icons";

const H = ({ children }: { children: string }) => (
  <h3 className="border-b border-slate-300 pb-1 font-display text-[0.95rem] font-semibold text-slate-900">{children}</h3>
);

export default function Resume() {
  return (
    <Section id="resume" title="Resume" intro="A one-page summary. The PDF has the same content, ready to attach.">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_16rem]">
        <Reveal>
          <article
            aria-label="Resume preview"
            className="rounded-2xl bg-[#f6f7fb] p-6 text-[0.9rem] leading-relaxed text-slate-700 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-10"
          >
            <header>
              <p className="font-display text-2xl font-semibold tracking-tight text-slate-900">{SITE.name}</p>
              <p className="text-slate-600">{SITE.role}</p>
              <p className="mt-1 text-slate-600">
                {SITE.location} | {SITE.linkedin.replace("https://www.", "")} | {SITE.github.replace("https://", "")}
                {SITE.email && ` | ${SITE.email}`}
              </p>
            </header>

            <p className="mt-5">{RESUME.summary}</p>

            <div className="mt-5 space-y-5">
              <section>
                <H>Education</H>
                <ul className="mt-2 space-y-2">
                  {EDUCATION.map((e) => (
                    <li key={e.title} className="flex flex-wrap justify-between gap-x-4">
                      <span>
                        <span className="font-semibold text-slate-900">{e.title}</span>
                        {e.place && `, ${e.place}`}
                        {e.title === "SSLC" && e.note ? `, ${e.note}` : ""}
                      </span>
                      <span className="text-slate-500">{e.period}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <H>Skills</H>
                <dl className="mt-2 space-y-1">
                  {SKILL_GROUPS.map((g) => (
                    <div key={g.name} className="sm:flex sm:gap-3">
                      <dt className="w-36 shrink-0 font-semibold text-slate-900">{g.name}</dt>
                      <dd>{g.skills.map((s) => s.name).join(", ")}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section>
                <H>Projects</H>
                <ul className="mt-2 space-y-2">
                  {PROJECTS.map((p) => (
                    <li key={p.id}>
                      <span className="font-semibold text-slate-900">{p.title}</span>{" "}
                      <span className="text-slate-500">({p.status})</span>. {p.summary}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <H>Certifications</H>
                <p className="mt-2 text-slate-500">None to list yet. Entries will be added when earned.</p>
              </section>
            </div>
          </article>
        </Reveal>

        <Reveal delay={100}>
          <div className="glass rounded-2xl p-6 lg:sticky lg:top-24">
            <p className="font-display text-lg font-semibold">Take it with you</p>
            <p className="mt-2 text-sm text-mute">PDF, one page.</p>
            <Button variant="solid" href={`./${SITE.resumeFile}`} download className="mt-5 w-full">
              <DownloadIcon /> Download Resume
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
