# Start with v0 -- The Vibe Coding Manifesto

A mobile-friendly, single-page manifesto explaining why **v0** is the best starting point for your vibe coding journey.

**[Use the template](https://v0.dev/chat/community/vercel/start-with-v0-b1JMV5w5cVK)** -- Token-efficient prompts to get started fast.

## The Thesis

The best workflow for AI-assisted development:

1. **Prompt v0** -- Describe your app in plain language. Get a real Next.js project with shadcn/ui, Tailwind, and TypeScript.
2. **Push to GitHub** -- One click from v0 to a proper GitHub repo.
3. **Pull locally** -- Clone it down, open in your editor of choice.
4. **Build with any AI tool** -- Claude Code, Cursor, Copilot -- they all work better with real project context.

### Bonus

v0 excels at wiring up chatbots and AI features using the **Vercel AI SDK** and the **AI Gateway**, giving you zero-config access to OpenAI, Anthropic, Google, and more.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** with semantic design tokens
- **shadcn/ui** component library
- **Bricolage Grotesque** + **DM Mono** fonts
- Dark theme with warm amber palette and dot-grid texture

## Getting Started

```bash
# Clone the repo
git clone <your-repo-url>
cd v0-manifesto

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the manifesto.

## Project Structure

```
app/
  layout.tsx          # Root layout with fonts + metadata
  page.tsx            # Main page composing all sections
  globals.css         # Warm dark theme tokens + animations

components/
  hero.tsx            # Hero with staggered entrance animation
  thesis-section.tsx  # The core argument + blockquote
  flow-section.tsx    # Timeline (mobile) / tab interface (desktop)
  why-section.tsx     # v0 vs scratch comparison cards
  bonus-section.tsx   # AI SDK / chatbot bonus feature
  cta-section.tsx     # Final call to action
  site-footer.tsx     # Footer
```

## License

MIT
