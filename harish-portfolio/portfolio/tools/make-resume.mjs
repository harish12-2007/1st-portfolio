// Builds public/Harish_H_C_Resume.pdf from the same data the site uses.
// Run: npm run resume   (needs `npx playwright install chromium` once)
import { build } from "esbuild";
import { chromium } from "playwright";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "resume-"));
const bundle = path.join(tmp, "content.mjs");

await build({
  stdin: {
    contents: `export * from "./src/data/content"; export { SITE } from "./src/config";`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  format: "esm",
  outfile: bundle,
  define: { "import.meta.env": "{}" },
  logLevel: "warning",
});
const { SITE, EDUCATION, SKILL_GROUPS, PROJECTS, RESUME } = await import(pathToFileURL(bundle).href);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const contact = [
  SITE.location,
  SITE.email,
  SITE.linkedin.replace("https://www.", ""),
  SITE.github.replace("https://", ""),
].filter(Boolean);

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(SITE.name)} - Resume</title>
<style>
  @page { size: A4; margin: 16mm 16mm; }
  * { box-sizing: border-box; }
  body { font: 10.2pt/1.45 "Helvetica Neue", Arial, sans-serif; color: #222a3a; margin: 0; }
  h1 { font-size: 22pt; margin: 0; color: #0b1020; letter-spacing: -0.02em; }
  .role { color: #4a5368; margin-top: 2px; }
  .contact { color: #4a5368; font-size: 9.2pt; margin-top: 4px; }
  h2 { font-size: 10.5pt; margin: 16px 0 6px; padding-bottom: 3px; border-bottom: 1px solid #c9cfdd; color: #0b1020; }
  .row { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 4px; }
  .muted { color: #667089; white-space: nowrap; }
  ul { margin: 0; padding-left: 16px; } li { margin-bottom: 3px; }
  dl { margin: 0; } .sk { display: flex; gap: 8px; margin-bottom: 2px; } dt { width: 110px; font-weight: 600; flex: none; }
  dd { margin: 0; }
</style></head><body>
<h1>${esc(SITE.name)}</h1>
<div class="role">${esc(SITE.role)}</div>
<div class="contact">${contact.map(esc).join(" &nbsp;|&nbsp; ")}</div>
<p style="margin-top:12px">${esc(RESUME.summary)}</p>
<h2>Education</h2>
${EDUCATION.map((e) => `<div class="row"><div><b>${esc(e.title)}</b>${e.place ? ", " + esc(e.place) : ""}${e.title === "SSLC" && e.note ? ", " + esc(e.note) : ""}</div><div class="muted">${esc(e.period)}</div></div>`).join("")}
<h2>Skills</h2>
<dl>${SKILL_GROUPS.map((g) => `<div class="sk"><dt>${esc(g.name)}</dt><dd>${g.skills.map((s) => esc(s.name)).join(", ")}</dd></div>`).join("")}</dl>
<h2>Projects</h2>
<ul>${PROJECTS.map((p) => `<li><b>${esc(p.title)}</b> (${esc(p.status)}). ${esc(p.summary)} <span class="muted" style="white-space:normal">Tech: ${p.tech.map(esc).join(", ")}.</span></li>`).join("")}</ul>
<h2>Certifications</h2>
<p style="margin:0;color:#667089">None to list yet.</p>
</body></html>`;

const page = path.join(tmp, "resume.html");
fs.writeFileSync(page, html);
const browser = await chromium.launch();
const p = await browser.newPage();
await p.goto(pathToFileURL(page).href);
await p.pdf({ path: path.join(root, "public", SITE.resumeFile), format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
console.log("wrote public/" + SITE.resumeFile);
