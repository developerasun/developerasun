"use client";

import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-24 text-center">
      {/* Warm glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-8">
        <div className="animate-fade-up stagger-1 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="font-mono text-xs tracking-wide text-primary/80">
            a vibe coding manifesto
          </span>
        </div>

        <h1 className="animate-fade-up stagger-2 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground md:text-7xl lg:text-8xl">
          Start with{" "}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text italic text-transparent">
            v0
          </span>
        </h1>

        <p className="animate-fade-up stagger-3 max-w-lg text-pretty font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
          The fastest way to go from idea to a real codebase you can hack on
          with any AI tool. It&apos;s all about the boilerplate.
        </p>

        <button
          type="button"
          onClick={() =>
            document
              .getElementById("thesis")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="animate-fade-up stagger-4 mt-2 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <span className="font-mono text-xs tracking-wider uppercase">
            Read the thesis
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
