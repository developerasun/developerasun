import { Check, Minus } from "lucide-react";

const withV0 = [
  "Real Next.js app with proper structure",
  "shadcn/ui + Tailwind pre-configured",
  "Push to GitHub in one click",
  "Pull locally and use any AI tool",
  "AI SDK + chatbot wiring built-in",
  "Deploy to Vercel instantly",
];

const withoutV0 = [
  "npx create-next-app, then configure everything",
  "Install and set up component libraries manually",
  "git init, git remote add, first commit...",
  "Still just a blank starter template",
  "Wire up AI SDK, API routes, streaming yourself",
  "Configure deployment from scratch",
];

export function WhySection() {
  return (
    <section className="px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <span className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
            The Comparison
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-5xl">
            Skip the setup ceremony
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* v0 column */}
          <div className="rounded-xl border border-primary/25 bg-primary/5 p-6 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Check className="h-4 w-4" strokeWidth={3} />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Start with v0
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {withV0.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                  <span className="font-mono text-xs leading-relaxed text-foreground md:text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* From-scratch column */}
          <div className="rounded-xl border border-border bg-card/40 p-6 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                <Minus className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold text-muted-foreground">
                Start from scratch
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {withoutV0.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                  <span className="font-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
