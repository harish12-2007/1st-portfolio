import { useEffect, useState } from "react";
import { SITE } from "../config";
import { Button, Reveal, Section, external } from "./ui";
import { ExternalIcon, GitHubIcon, StarIcon } from "./Icons";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
};

const CACHE_KEY = "gh-repos-v1";

/** Unauthenticated public API: no key needed, so nothing secret ships in the bundle. */
async function loadRepos(signal: AbortSignal): Promise<Repo[]> {
  try {
    const hit = sessionStorage.getItem(CACHE_KEY);
    if (hit) return JSON.parse(hit) as Repo[];
  } catch {
    /* storage unavailable: just fetch */
  }
  const res = await fetch(`https://api.github.com/users/${SITE.githubUser}/repos?per_page=100&sort=pushed`, {
    signal,
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(String(res.status));
  const data = (await res.json()) as Repo[];
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
  return data;
}

export default function GitHubSection() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [graphOk, setGraphOk] = useState(true);

  useEffect(() => {
    const ctl = new AbortController();
    loadRepos(ctl.signal)
      .then((r) => setRepos(r.filter((x) => !x.fork)))
      .catch((e: unknown) => {
        if ((e as Error)?.name !== "AbortError") setFailed(true);
      });
    return () => ctl.abort();
  }, []);

  const langs = new Map<string, number>();
  repos?.forEach((r) => r.language && langs.set(r.language, (langs.get(r.language) ?? 0) + 1));
  const langList = [...langs.entries()].sort((a, b) => b[1] - a[1]);
  const total = langList.reduce((n, [, c]) => n + c, 0);
  const top = (repos ?? []).slice(0, 4);

  return (
    <Section
      id="github"
      title="Open on GitHub"
      intro="Live from the public GitHub API: repositories and languages update on their own."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="glass flex h-full flex-col rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/[0.06]">
                <GitHubIcon width={22} height={22} />
              </span>
              <div>
                <p className="font-display text-lg font-semibold leading-tight">@{SITE.githubUser}</p>
                {repos && <p className="text-sm text-mute">{repos.length} public repositories</p>}
              </div>
            </div>

            {langList.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold">Languages across repositories</h3>
                <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-white/[0.06]" role="img" aria-label={`Language mix: ${langList.map(([l, c]) => `${l} ${c}`).join(", ")}`}>
                  {langList.map(([l, c], i) => (
                    <span key={l} style={{ width: `${(c / total) * 100}%`, opacity: 1 - i * 0.14 }} className="bg-gradient-to-r from-iris to-aqua" />
                  ))}
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-mute">
                  {langList.map(([l, c]) => (
                    <li key={l}>
                      <span className="text-fg/90">{l}</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {graphOk && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold">Contribution activity</h3>
                <img
                  src={`https://ghchart.rshah.org/8b9cff/${SITE.githubUser}`}
                  alt={`GitHub contribution chart for ${SITE.githubUser}`}
                  loading="lazy"
                  decoding="async"
                  width={720}
                  height={112}
                  onError={() => setGraphOk(false)}
                  className="mt-3 h-auto w-full rounded-lg bg-white/[0.04] p-2"
                />
              </div>
            )}

            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <Button {...external} href={SITE.github}>
                <GitHubIcon /> Profile
              </Button>
              <Button {...external} href={SITE.portfolioRepo}>
                This site's code <ExternalIcon />
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="glass h-full rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold">Recently active repositories</h3>
            {repos === null && !failed && <p className="mt-4 text-mute">Loading repositories…</p>}
            {failed && (
              <p className="mt-4 text-mute">
                GitHub's API couldn't be reached just now. Every repository is on the{" "}
                <a {...external} className="text-fg underline decoration-white/30 underline-offset-4" href={SITE.github}>
                  GitHub profile
                </a>
                .
              </p>
            )}
            {repos && top.length === 0 && (
              <p className="mt-4 text-mute">No public repositories to list yet. New work will appear here automatically.</p>
            )}
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {top.map((r) => (
                <li key={r.name}>
                  <a
                    {...external}
                    href={r.html_url}
                    className="block h-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-aqua/40 hover:bg-white/[0.05]"
                  >
                    <p className="font-semibold">{r.name}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-mute">{r.description ?? "No description yet."}</p>
                    <p className="mt-3 flex items-center gap-4 text-sm text-mute">
                      {r.language && <span>{r.language}</span>}
                      <span className="inline-flex items-center gap-1">
                        <StarIcon /> {r.stargazers_count}
                      </span>
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
