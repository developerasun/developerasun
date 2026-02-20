export function ThesisSection() {
  return (
    <section id="thesis" className="px-6 py-20 md:py-32">
      <div className="mx-auto max-w-2xl">
        <div className="mb-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
            The Thesis
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        <div className="flex flex-col gap-8 font-mono text-sm leading-[1.8] text-muted-foreground md:text-base">
          <p>
            You want to start{" "}
            <span className="text-foreground">vibe coding</span>. Maybe
            you&apos;ve heard about Claude Code, Cursor, Windsurf, or some
            other AI-powered dev tool. You&apos;re ready to dive in.
          </p>
          <p>
            But here&apos;s the thing &mdash; those tools work best when they
            have{" "}
            <span className="text-foreground">
              something to work with
            </span>
            . A real codebase. A real project structure. A real repo on GitHub.
          </p>
          <p>
            That&apos;s where{" "}
            <span className="font-semibold text-primary">v0</span> comes in.
          </p>

          <blockquote className="relative my-4 border-l-2 border-primary/60 pl-6">
            <p className="font-sans text-xl font-medium italic leading-relaxed text-foreground md:text-2xl">
              &ldquo;Stand up your boilerplate in v0, push it to GitHub, pull
              it down locally, and chip away with whatever AI tool you
              want.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
