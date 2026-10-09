# Harish H C: portfolio

React 19 + TypeScript + Tailwind CSS v4, built with Vite.

```bash
npm install
npm run dev        # local preview
npm run build      # production build in dist/
npm run typecheck
```

## What to edit

| File | What it controls |
| --- | --- |
| `src/config.ts` | Email, avatar photo, availability text, links |
| `src/data/content.ts` | About text, education, skills, projects, journey, achievements |
| `.env` | `VITE_SITE_URL` (for social previews) and optional `VITE_FORM_ENDPOINT` |

Things that are intentionally empty until you fill them:

- **Email** (`SITE.email`): when set, the Email button and the form's mailto fallback turn on.
- **Contact form**: set `VITE_FORM_ENDPOINT` to a Formspree/Web3Forms URL (public, not a secret). With no endpoint and no email, the form tells visitors to use LinkedIn.
- **Photo**: put `avatar.jpg` in `public/` and set `SITE.avatar = "avatar.jpg"`. Until then a monogram is shown.
- **Project repos / demos**: add `repoUrl` / `liveUrl` to a project. Until then its button links to your GitHub profile.
- **Project status**: `In Progress`, `Prototype` or `Completed`. Set these to match reality.
- **Achievements**: add verified entries to `ACHIEVEMENTS`. Categories with entries show them; the rest show "None yet".

## Resume PDF

`public/Harish_H_C_Resume.pdf` is generated from the same data as the site:

```bash
npx playwright install chromium   # once
npm run resume
```

## Deploy

`.github/workflows/deploy.yml` publishes to GitHub Pages on every push to `main`
(Settings → Pages → Source: GitHub Actions). The build uses relative paths, so it also works on any static host.
