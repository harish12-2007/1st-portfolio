import { useId, useState } from "react";
import { PROJECTS, type Project } from "../data/content";
import { SITE } from "../config";
import { Button, Chip, Reveal, Section, external } from "./ui";
import { ChevronIcon, ExternalIcon, GitHubIcon } from "./Icons";
import ProjectVisual from "./ProjectVisual";

function ProjectCard({ p, flip }: { p: Project; flip: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const statusTone = p.status === "Completed" ? "aqua" : "amber";
  return (
    <Reveal>
      <article
        aria-labelledby={`${p.id}-t`}
        className="glass group grid overflow-hidden rounded-3xl transition-colors duration-300 hover:border-white/20 lg:grid-cols-12"
      >
        <div
          className={`viz relative flex aspect-[460/270] items-center justify-center overflow-hidden lg:col-span-5 lg:aspect-auto lg:min-h-full ${
            flip ? "lg:order-2" : ""
          }`}
        >
          <div className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <ProjectVisual kind={p.visual} />
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-9 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <Chip tone={statusTone}>{p.status}</Chip>
            <span className="text-sm text-mute">{p.category}</span>
          </div>
          <h3 id={`${p.id}-t`} className="mt-4 font-display text-[1.7rem] leading-tight font-semibold tracking-tight sm:text-3xl">
            {p.title}
          </h3>
          <p className="mt-2 max-w-[58ch] text-fg/85">{p.summary}</p>

          <div className="mt-6 grid gap-5 text-[0.95rem] leading-relaxed text-mute sm:grid-cols-2 sm:gap-8">
            <p>
              <span className="mb-1 block font-semibold text-fg">Problem</span>
              {p.problem}
            </p>
            <p>
              <span className="mb-1 block font-semibold text-fg">Solution</span>
              {p.solution}
            </p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {p.tech.map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
          </ul>

          <div id={panelId} className="panel" data-open={open}>
            <div className="overflow-hidden" inert={!open}>
              <div className="grid gap-6 pt-7 text-[0.95rem] sm:grid-cols-2 sm:gap-8">
                <div>
                  <h4 className="font-semibold text-fg">Key features</h4>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-mute marker:text-iris">
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-fg">What I learned</h4>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-mute marker:text-aqua">
                    {p.learned.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((o) => !o)}
              className="glass inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-[0.95rem] font-medium transition-colors hover:bg-white/[0.07]"
            >
              {open ? "Hide details" : "Features and learnings"}
              <ChevronIcon className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            <Button {...external} href={p.repoUrl ?? SITE.github}>
              <GitHubIcon /> {p.repoUrl ? "View code" : "GitHub profile"}
            </Button>
            {p.liveUrl && (
              <Button {...external} href={p.liveUrl} variant="solid">
                Live demo <ExternalIcon />
              </Button>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Things I've built"
      intro="Each project starts from a real problem. Status labels are honest: nothing here is called finished until it is."
    >
      <div className="space-y-8">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} flip={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
