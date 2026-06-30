import { ScrollReveal } from "@/components/scroll-reveal";

export function ClosingStatement() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32 overflow-hidden">
      {/* Giant background number */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none" aria-hidden="true">
        <p className="font-[family-name:var(--font-mono)] text-[30vw] font-light leading-none text-[var(--text)] opacity-[0.03]">
          10
        </p>
      </div>

      <div className="relative z-10">
        <ScrollReveal>
          <p className="label-mono">WHAT I BELIEVE</p>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="mt-8 font-[family-name:var(--font-geist)] text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[var(--text)]">
            Less, but better.
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p className="mt-8 max-w-xl text-lg text-[var(--text-muted)] leading-relaxed">
            I don&apos;t add features — I remove friction. I don&apos;t decorate interfaces — I clarify them. Every decision I make is in service of the person using the product.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <a href="/contact" className="cta-underline w-fit mt-10">
            Let&apos;s work together <span aria-hidden="true">&rarr;</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
