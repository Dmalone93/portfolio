import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";

export function AboutStrip() {
  const stats = [
    { value: "6+", label: "Years experience" },
    { value: "50+", label: "Projects shipped" },
    { value: "10", label: "People hired" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
        {/* Photo */}
        <ScrollReveal className="lg:w-[280px] lg:shrink-0">
          <div className="relative mx-auto w-[240px] sm:w-[280px]">
            <Image
              src="/declan.png"
              alt="Declan Malone"
              width={560}
              height={700}
              className="rounded-2xl object-cover"
              priority
            />
          </div>
        </ScrollReveal>

        {/* Intro + stats */}
        <div className="flex-1">
          <ScrollReveal>
            <p className="label-mono">ABOUT</p>
            <p className="mt-4 text-xl sm:text-2xl leading-relaxed text-[var(--text)]">
              I&apos;m Declan — a product and UX designer based in Glasgow. Fine art photography background, full-stack development skills, and a thing for systems thinking. I build from research to production code.
            </p>
            <a href="/about" className="cta-underline w-fit mt-6">
              More about me <span aria-hidden="true">&rarr;</span>
            </a>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal className="mt-12">
            <div className="flex gap-8 lg:gap-12">
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 100}>
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-4xl sm:text-5xl font-light text-[var(--text)]">
                      {stat.value}
                    </p>
                    <p className="label-mono mt-2 text-[10px]">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
