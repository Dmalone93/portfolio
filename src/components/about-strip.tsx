import { ScrollReveal } from "@/components/scroll-reveal";

export function AboutStrip() {
  const stats = [
    { value: "6+", label: "Years experience" },
    { value: "50+", label: "Projects shipped" },
    { value: "10", label: "People hired" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
        {/* Intro */}
        <ScrollReveal className="flex-1">
          <p className="label-mono">ABOUT</p>
          <p className="mt-4 text-xl sm:text-2xl leading-relaxed text-[var(--text)]">
            I&apos;m a product and UX designer who builds from research to production code. I&apos;ve led UX teams, established CRO practices from zero, and designed data-intensive platforms across ecommerce, fintech, and SaaS.
          </p>
          <a href="/about" className="cta-underline w-fit mt-6">
            More about me <span aria-hidden="true">&rarr;</span>
          </a>
        </ScrollReveal>

        {/* Stats */}
        <div className="flex gap-8 lg:gap-12 lg:shrink-0">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="text-center">
                <p className="font-[family-name:var(--font-mono)] text-4xl sm:text-5xl font-light text-[var(--text)]">
                  {stat.value}
                </p>
                <p className="label-mono mt-2 text-[10px]">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
