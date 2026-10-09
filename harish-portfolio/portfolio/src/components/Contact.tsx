import { useRef, useState, type FormEvent } from "react";
import { SITE } from "../config";
import { Button, Reveal, Section, external } from "./ui";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

type Status = { kind: "idle" | "sending" | "ok" | "error"; msg?: string };

const field =
  "mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-fg placeholder:text-mute/70 transition-colors focus:border-aqua/60 focus:outline-none focus-visible:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company")) return; // honeypot: real people never fill this in
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setStatus({ kind: "error", msg: "Please fill in your name, email and message." });
      return;
    }

    if (SITE.formEndpoint) {
      setStatus({ kind: "sending" });
      try {
        const res = await fetch(SITE.formEndpoint, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        if (!res.ok) throw new Error(String(res.status));
        formRef.current?.reset();
        setStatus({ kind: "ok", msg: "Thanks, your message was sent. I'll reply by email." });
      } catch {
        setStatus({ kind: "error", msg: `The message didn't send. Please message me on LinkedIn instead.` });
      }
      return;
    }

    if (SITE.email) {
      const body = `${message}\n\nFrom: ${name} (${email})`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Portfolio message from ${name}`)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "ok", msg: "Your email app should open with the message ready to send." });
      return;
    }

    setStatus({ kind: "error", msg: "This form isn't connected yet. Please reach me on LinkedIn." });
  };

  return (
    <Section id="contact" title="Have an opportunity or interesting problem to discuss?" narrow>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="max-w-[44ch] text-lg text-mute">
            I'm happy to talk about internships, entry-level roles, and anything involving Python, data or machine learning.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {SITE.email ? (
              <Button variant="solid" href={`mailto:${SITE.email}`}>
                <MailIcon /> Email
              </Button>
            ) : (
              <Button variant="solid" href="#contact-form">
                <MailIcon /> Email
              </Button>
            )}
            <Button {...external} href={SITE.linkedin}>
              <LinkedInIcon /> LinkedIn
            </Button>
            <Button {...external} href={SITE.github}>
              <GitHubIcon /> GitHub
            </Button>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <form
            id="contact-form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className="glass scroll-mt-24 space-y-5 rounded-2xl p-6 sm:p-8"
          >
            <div>
              <label htmlFor="c-name" className="text-sm font-medium">
                Name
              </label>
              <input id="c-name" name="name" type="text" autoComplete="name" required className={field} />
            </div>
            <div>
              <label htmlFor="c-email" className="text-sm font-medium">
                Email
              </label>
              <input id="c-email" name="email" type="email" autoComplete="email" required className={field} />
            </div>
            <div>
              <label htmlFor="c-msg" className="text-sm font-medium">
                Message
              </label>
              <textarea id="c-msg" name="message" rows={5} required className={`${field} resize-y`} />
            </div>
            {/* Honeypot field, hidden from people and assistive tech. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Company
                <input name="company" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="inline-flex min-h-11 items-center rounded-xl bg-fg px-6 font-medium text-ink transition-colors hover:bg-white disabled:opacity-60"
              >
                {status.kind === "sending" ? "Sending…" : "Send message"}
              </button>
              <p
                role="status"
                aria-live="polite"
                className={`text-sm ${status.kind === "error" ? "text-amber" : "text-aqua"}`}
              >
                {status.msg}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
