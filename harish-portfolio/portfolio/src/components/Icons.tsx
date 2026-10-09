import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { "aria-hidden": true, focusable: false, width: 18, height: 18 } as const;

export const GitHubIcon = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

export const LinkedInIcon = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.05c.53-.95 1.84-1.95 3.78-1.95 4.04 0 4.79 2.66 4.79 6.1V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.59V21h-4V9.75Z" />
  </svg>
);

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const MailIcon = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" {...stroke} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
export const DownloadIcon = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
  </svg>
);
export const ExternalIcon = (p: P) => (
  <svg {...base} width={15} height={15} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);
export const ChevronIcon = (p: P) => (
  <svg {...base} width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const StarIcon = (p: P) => (
  <svg {...base} width={14} height={14} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
  </svg>
);
