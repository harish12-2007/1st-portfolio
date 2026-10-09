// Single place for personal details. Empty strings are treated as "not set yet"
// and the UI adapts, so nothing placeholder-ish ever reaches a recruiter.
export const SITE = {
  name: "Harish H C",
  role: "CSE (AI & ML) Engineering Student",
  location: "Karnataka, India",
  githubUser: "harish12-2007",
  github: "https://github.com/harish12-2007",
  portfolioRepo: "https://github.com/harish12-2007/Portfolio",
  linkedin: "https://www.linkedin.com/in/harish-h-c-230694406/",
  /** Add a public contact email to enable the Email button and mailto fallback. */
  email: "",
  /** Path under /public, e.g. "avatar.jpg". Empty shows the monogram. */
  avatar: "",
  resumeFile: "Harish_H_C_Resume.pdf",
  /** Shown in the hero status pill. Set to "" to hide it. */
  availability: "Open to internships and entry-level roles",
  siteUrl: import.meta.env.VITE_SITE_URL ?? "",
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT ?? "",
} as const;

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

/** Sections that have no nav link highlight the nav item they sit under. */
export const NAV_PARENT: Record<string, string> = {
  achievements: "journey",
  github: "journey",
};
