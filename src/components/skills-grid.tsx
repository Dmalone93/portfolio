import { ScrollReveal } from "@/components/scroll-reveal";

const skills = [
  "Figma", "React", "TypeScript", "Next.js", "Shopify Plus",
  "Tailwind CSS", "Design Systems", "CRO", "User Research",
  "Prototyping", "A/B Testing", "AG Grid", "Information Architecture",
  "Accessibility", "Clerk", "Vercel", "Postgres",
];

export function SkillsGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <ScrollReveal>
        <p className="label-mono text-center">TOOLS & SKILLS</p>
      </ScrollReveal>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {skills.map((skill, i) => (
          <ScrollReveal key={skill} delay={i * 30}>
            <span className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--text)] hover:text-[var(--text)]">
              {skill}
            </span>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
