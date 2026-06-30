import { ScrollReveal } from "@/components/scroll-reveal";

export function ClosingStatement() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <ScrollReveal>
        <p className="font-[family-name:var(--font-geist)] text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-[var(--text)]">
          I care about craft, clarity, and shipping things that actually work.
        </p>
        <a href="/contact" className="cta-underline w-fit mt-10">
          Get in touch <span aria-hidden="true">&rarr;</span>
        </a>
      </ScrollReveal>
    </section>
  );
}
