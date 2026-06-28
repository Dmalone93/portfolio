export type ResumeExperience = {
  company: string;
  role: string;
  timeframe: string;
  website?: string;
  bullets: string[];
};

export type ResumeSection = {
  heading: string;
  lines: string[];
};

export type ResumeContent = {
  headline: string;
  professionalSummary: string;
  contactLines: string[];
  experience: ResumeExperience[];
  education: string[];
  skillSections: ResumeSection[];
  portfolioUrl?: string;
  pdfUrl?: string;
  pdfFileName?: string;
};

export const resumeContent: ResumeContent = {
  headline: "Senior Product Designer",
  professionalSummary:
    "Product Designer with **6+ years of experience** building complex, data-driven digital products across **e-commerce, wealth management, and financial SaaS**. Specialise in **design systems, information architecture, and conversion-rate optimisation** at scale, with direct experience designing data-intensive interfaces for commodity traders and institutional investors at **JP Morgan** and **OpenGamma**. Proven leader who has **built and mentored design teams**, established **CRO and analytics practices** from the ground up, and partnered with engineering and product to ship measurable outcomes.",
  contactLines: [
    "Glasgow, UK",
    "declanamalone@gmail.com",
    "07483 272995",
  ],
  experience: [
    {
      company: "DFYNE",
      role: "Senior UX Designer",
      timeframe: "Apr 2025 - Present",
      bullets: [
        "Own **end-to-end UX strategy, design, and Liquid implementation** across two regional storefronts, leading information architecture, interaction design, and data-driven optimisation for a high-traffic platform.",
        "Redesigned the **PDP** to improve purchase confidence by restructuring content hierarchy, introducing feature chips, FAQ modules, and cross-sell components informed by **Clarity heatmap analysis** and behavioural data.",
        "Designed and shipped a **Quick Add modal** on collection pages to reduce browse-to-cart friction, alongside a matching set feature that **increased AOV by 5%** across both stores.",
        "Built a comprehensive **design system** from extracted theme tokens in Figma, Refore and HTML, establishing a single source of truth across design and engineering and improving component consistency across storefronts.",
        "Hired the **full digital team of 10**, onboarded and mentored junior and mid-level designers and developers, and created competency frameworks, structured development pathways, and design review workflows.",
        "Established **CRO and analytics practices from scratch** using Microsoft Clarity. Ran A/B experiments and competitive benchmarking against Gymshark and Nike, translating insights into measurable UX improvements.",
        "Led a cross-functional **taxonomy workshop** to restructure Shopify's collection and filtering architecture, improving navigation, discoverability, and SEO across all storefronts.",
        "Internal **Shopify Plus SME**. Upskilled cross-functional teams on platform capabilities, checkout extensibility, and theme architecture.",
      ],
    },
    {
      company: "Open Gamma",
      role: "Product Designer",
      timeframe: "Mar 2023 - Dec 2023",
      bullets: [
        "Led the **end-to-end redesign** of a data-intensive margin analytics platform, improving how traders visualise, compare, and act on margin cost data across complex financial instruments.",
        "Conducted **user research and stakeholder interviews** with traders and product managers, translating domain insights into interaction design decisions that shaped the product roadmap.",
        "Partnered with product managers and engineers to align design prioritisation with business objectives.",
        "Transitioned the team's design workflow to **Figma**, improving cross-functional collaboration between design and development.",
      ],
    },
    {
      company: "JP Morgan Chase & Co.",
      role: "Associate Product Designer",
      timeframe: "Sep 2021 - Mar 2023",
      bullets: [
        "Designed complex internal middle management software as part of the **KYC/Onboarding process** for Market and Prime Brokerage using internal design systems and **AG Grid**.",
        "Created wireframes, prototypes, and **high-fidelity UI designs** for complex data visualisation use cases, working within a mature enterprise design system.",
        "Collaborated with Product Managers and Engineers in agile squads to align design initiatives with operational and strategic goals.",
        "Advocated for user-centred design through usability testing and stakeholder workshops, embedding research into the product development lifecycle.",
      ],
    },
    {
      company: "Toolstop",
      role: "UX Designer",
      timeframe: "Aug 2020 - Sep 2021",
      bullets: [
        "Redesigned site navigation and user flows for **B2C and B2B e-commerce platforms**, delivering a **3% increase in conversion rates**.",
        "Ran **user testing and A/B testing** programmes to refine product features and improve experience across customer segments.",
        "Led UX strategy ensuring accessibility and usability best practices across dual-audience platforms.",
      ],
    },
    {
      company: "Verint",
      role: "Automation Engineer",
      timeframe: "Mar 2019 - Aug 2020",
      bullets: [
        "Built automated test frameworks using **Selenium WebDriver and C#**, integrating into **CI/CD pipelines**. Developed strong engineering collaboration and software development fluency that carries into design-engineering partnerships today.",
      ],
    },
  ],
  education: [
    "Full Stack Software Development | CodeClan | 2018 - 2019",
    "2:1 Fine Art Photography | Glasgow School of Art | 2014 - 2018",
  ],
  skillSections: [
    {
      heading: "Design & Prototyping",
      lines: [
        "**Figma, Figma MCP, Adobe Creative Suite**, rapid prototyping, wireframing, high-fidelity UI, interaction design, visual design, **LLM's, Refore**.",
      ],
    },
    {
      heading: "Data Visualisation",
      lines: [
        "**Complex data tables (AG Grid)**, dashboards, financial reporting interfaces, charting, information-dense enterprise layouts.",
      ],
    },
    {
      heading: "Design Systems",
      lines: [
        "**Token-based systems**, component libraries, design to engineering governance, systematic design at scale.",
      ],
    },
    {
      heading: "Research & Analytics",
      lines: ["**User interviews, usability testing, A/B testing**, heatmap analysis (**Microsoft Clarity**), GA4, journey mapping, empathy mapping."],
    },
    {
      heading: "Frontend",
      lines: ["**HTML, CSS, JavaScript, TypeScript, React**, Liquid (Shopify), Tailwind CSS, Git."],
    },
    {
      heading: "Domain Experience",
      lines: ["**E-commerce (Shopify Plus)**, wealth management, margin analytics, prime brokerage, **B2B SaaS**, enterprise platforms."],
    },
  ],
  portfolioUrl: "https://declanamalone.myportfolio.com/",
  pdfUrl: undefined,
  pdfFileName: undefined,
};
