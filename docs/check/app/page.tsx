import { Hero } from "@/components/hero";
import { ThesisSection } from "@/components/thesis-section";
import { FlowSection } from "@/components/flow-section";
import { BonusSection } from "@/components/bonus-section";
import { WhySection } from "@/components/why-section";
import { CtaSection } from "@/components/cta-section";

export default function Page() {
  return (
    <main className="min-h-dvh">
      <Hero />
      <ThesisSection />
      <FlowSection />
      <WhySection />
      <BonusSection />
      <CtaSection />
    </main>
  );
}
