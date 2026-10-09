import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div data-reveal style={{ "--d": `${delay}ms` } as CSSProperties} className={className}>
      {children}
    </div>
  );
}

export function Section({
  id,
  title,
  intro,
  children,
  narrow = false,
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  narrow?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2
            id={`${id}-title`}
            className={`font-display text-[2rem] leading-[1.1] font-semibold tracking-tight sm:text-5xl ${
              narrow ? "max-w-[22ch]" : "max-w-[20ch]"
            }`}
          >
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-[62ch] text-lg text-mute">{intro}</p>}
        </Reveal>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}

type BtnProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "solid" | "ghost" };

export function Button({ variant = "ghost", className = "", children, ...rest }: BtnProps) {
  const look =
    variant === "solid"
      ? "bg-fg text-ink hover:bg-white"
      : "glass text-fg hover:border-white/25 hover:bg-white/[0.06]";
  return (
    <a
      {...rest}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-[0.95rem] font-medium transition-colors duration-200 ${look} ${className}`}
    >
      {children}
    </a>
  );
}

export function Chip({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "amber" | "aqua" }) {
  const tones = {
    plain: "border-white/10 bg-white/[0.04] text-fg/85",
    amber: "border-amber/35 bg-amber/10 text-amber",
    aqua: "border-aqua/35 bg-aqua/10 text-aqua",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.8rem] leading-5 ${tones[tone]}`}>
      {children}
    </span>
  );
}

export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
