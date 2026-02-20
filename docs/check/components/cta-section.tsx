import { ArrowUpRight } from "lucide-react";

const TEMPLATE_URL =
  "https://v0.app/templates/v0-system-instructions-RutwgOGrI7y";

export function CtaSection() {
  return (
    <section className="px-6 py-20 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-10 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
            TL;DR
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        <h2 className="mb-6 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-5xl">
          v0 is your on-ramp to vibe coding
        </h2>
        <p className="mb-12 font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
          Generate the boilerplate. Push to GitHub. Pull locally. Build with
          whatever AI tool speaks to you. The best code comes from starting with
          a real foundation.
        </p>

        <a
          href={TEMPLATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-mono text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_hsl(38_86%_57%_/_0.25)]"
        >
          Start with v0
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
