import { Bot, Zap, Settings } from "lucide-react";

export function BonusSection() {
  return (
    <section className="px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent p-8 md:p-14">
          {/* Corner accent */}
          <div className="pointer-events-none absolute right-6 top-6 h-20 w-20 rounded-full bg-primary/5 blur-[40px]" />

          <div className="mb-10 flex items-center gap-4">
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
              Bonus
            </span>
            <div className="h-px flex-1 bg-primary/15" />
          </div>

          <h2 className="mb-4 text-balance text-2xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl">
            v0 is really good at wiring up chatbots
          </h2>
          <p className="mb-12 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
            Need an AI-powered feature in your app? v0 can scaffold a fully
            wired chatbot using the Vercel AI SDK and the AI Gateway &mdash;
            connected to any LLM you want &mdash; in a single prompt.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Bot,
                title: "AI SDK 6",
                desc: "Streaming responses, tool calling, structured outputs \u2014 all wired up with best practices out of the box.",
              },
              {
                icon: Zap,
                title: "Vercel AI Gateway",
                desc: "Zero-config access to OpenAI, Anthropic, Google, and more. Swap models with a single line change.",
              },
              {
                icon: Settings,
                title: "Agent-Ready",
                desc: "Model selector, temperature controls, system prompts, and tool configuration from the start.",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex flex-col gap-3 rounded-lg border border-border bg-card/60 p-5 backdrop-blur-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">
                    {card.title}
                  </h3>
                  <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-lg border border-border bg-background p-5">
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
              {`> "Add a chatbot to my app using GPT-4o
   with a settings panel for model selection"

  v0 generates:
  \u251C\u2500\u2500 app/api/chat/route.ts     \u2190 AI SDK streaming
  \u251C\u2500\u2500 components/chat.tsx        \u2190 Chat UI
  \u251C\u2500\u2500 components/chat-settings.tsx
  \u2514\u2500\u2500 Ready to deploy. No API keys to juggle.`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
