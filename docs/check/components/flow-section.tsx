"use client";

import { useState } from "react";
import { Sparkles, GitBranch, ArrowDownToLine, Hammer } from "lucide-react";

const steps = [
  {
    icon: Sparkles,
    num: "01",
    label: "Prompt v0",
    title: "Describe what you want to build",
    description:
      "Tell v0 what you need in plain language. It generates a full Next.js app with shadcn/ui, Tailwind, TypeScript, and proper project structure. Not a toy \u2014 real, production-grade boilerplate.",
    code: `> "Build me a dashboard with auth,
   a sidebar, and a settings page"

  v0 generates:
  \u251C\u2500\u2500 app/
  \u2502   \u251C\u2500\u2500 layout.tsx
  \u2502   \u251C\u2500\u2500 page.tsx
  \u2502   \u251C\u2500\u2500 dashboard/
  \u2502   \u2514\u2500\u2500 settings/
  \u251C\u2500\u2500 components/ui/
  \u251C\u2500\u2500 lib/
  \u2514\u2500\u2500 package.json`,
  },
  {
    icon: GitBranch,
    num: "02",
    label: "Push to GitHub",
    title: "One click to a real repo",
    description:
      "On the left rail of your v0 chat, you'll see a \"Git\" tab. In there, it's a few simple clicks to create a repo and push your code to it. No copy-pasting, no manual git init, no fighting with project scaffolding.",
    code: null,
  },
  {
    icon: ArrowDownToLine,
    num: "03",
    label: "Pull Locally",
    title: "Clone and open your editor",
    description:
      "Now you have a real codebase on your machine. Open it in VS Code, Cursor, or whatever you prefer. The project structure is clean, the dependencies are installed, and everything just works.",
    code: `$ git clone git@github.com:you/my-app.git
  $ cd my-app
  $ npm install
  $ npm run dev

  \u2713 Ready in 1.2s
  \u279E Local: http://localhost:3000`,
  },
  {
    icon: Hammer,
    num: "04",
    label: "Build with Any AI",
    title: "Claude Code, Cursor, whatever",
    description:
      "This is where it clicks. Claude Code, Cursor, Copilot \u2014 they all work dramatically better when they have real project context. You're not starting from scratch. You're iterating on a solid foundation.",
    code: `$ claude

  > "Add Stripe to the settings page
     for subscription management"

  Claude sees your project structure,
  understands your patterns, and writes
  code that actually fits.

  Context is everything.`,
  },
];

export function FlowSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <span className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
            The Flow
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-5xl">
            Four steps to vibe coding nirvana
          </h2>
        </div>

        {/* Mobile: timeline cards */}
        <div className="flex flex-col md:hidden">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="relative flex gap-5 pb-10 last:pb-0">
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />
                )}
                {/* Icon dot */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <span className="font-mono text-[10px] tracking-widest text-primary/60">
                    {step.num}
                  </span>
                  <h3 className="mb-1 text-base font-bold text-foreground">
                    {step.label}
                  </h3>
                  <p className="mb-4 font-mono text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  {step.code && (
                    <pre className="overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                      {step.code}
                    </pre>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: tab interface */}
        <div className="hidden gap-10 md:grid md:grid-cols-12">
          <div className="col-span-4 flex flex-col gap-1">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              return (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={`group flex items-center gap-4 rounded-lg px-4 py-4 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-primary/8 border border-primary/20"
                      : "border border-transparent hover:bg-secondary/50"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "bg-secondary text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block font-mono text-[10px] tracking-widest text-primary/50">
                      {step.num}
                    </span>
                    <span
                      className={`block text-sm font-semibold transition-colors ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="col-span-8 rounded-xl border border-border bg-card/60 p-8 backdrop-blur-sm">
            <span className="font-mono text-[10px] tracking-widest text-primary/50">
              {steps[activeStep].num}
            </span>
            <h3 className="mb-3 text-2xl font-semibold tracking-[-0.02em] text-foreground">
              {steps[activeStep].title}
            </h3>
            <p className="mb-8 font-mono text-sm leading-relaxed text-muted-foreground">
              {steps[activeStep].description}
            </p>
            {steps[activeStep].code && (
              <pre className="overflow-x-auto rounded-lg border border-border bg-background p-6 font-mono text-sm leading-relaxed text-muted-foreground">
                {steps[activeStep].code}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
