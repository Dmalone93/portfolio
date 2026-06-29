export type ProjectStat = {
  key?: string;
  value: string;
  label: string;
  detail?: string;
};

export type ProjectProcessStep = {
  key?: string;
  title: string;
  text: string;
};

export type ProjectNarrativeSection = {
  key?: string;
  title: string;
  paragraphs: string[];
};

export type ProjectComparison = {
  intro?: string;
  before: string[];
  after: string[];
};

export type Project = {
  slug: string;
  title: string;
  company: string;
  sortOrder?: number;
  portfolioVisible?: boolean;
  eyebrow?: string;
  summary: string;
  stats?: ProjectStat[];
  narrativeSections?: ProjectNarrativeSection[];
  challenge?: string[];
  whatChanged?: string[];
  impact?: string[];
  processSteps?: ProjectProcessStep[];
  comparison?: ProjectComparison;
  liveUrl?: string;
  embedMode?: "iframe" | "external-only";
  prototypeViewport?: "mobile" | "desktop";
  hasMobilePrototype?: boolean;
  hasDesktopPrototype?: boolean;
  previousVersionUrl?: string;
  previousVersionLabel?: string;
  previousVersionEmbedMode?: "iframe" | "external-only";
};

export const projects: Project[] = [
  {
    slug: "cardconomy",
    title: "Cardconomy",
    company: "PERSONAL PROJECT",
    sortOrder: 0,
    portfolioVisible: true,
    eyebrow: "UK Trading Card Marketplace",
    summary:
      "Designed a UK-native trading card marketplace connecting buyers, sellers, and local game shops — 50+ screens, interactive prototype, and the lowest fee model in TCG.",
    stats: [
      { key: "screens", value: "50+", label: "Screens designed" },
      { key: "fee", value: "6%", label: "Total seller fee", detail: "Lowest in UK TCG" },
      { key: "timeline", value: "3", label: "Week sprint" },
      { key: "tcgs", value: "5", label: "TCGs supported" },
    ],
    challenge: [
      "UK trading card collectors have no home. eBay charges 12–15% fees with zero community features. Cardmarket is EU-focused with post-Brexit friction — customs delays, euro-only pricing, and prohibitive shipping on low-value trades.",
      "TCGplayer doesn't operate in the UK at all. The closure of GAME's 300 standalone stores in 2026 left a physical retail gap too.",
      "Three communities — collectors, individual sellers, and local game shops — are forced onto platforms that weren't built for any of them.",
    ],
    processSteps: [
      {
        key: "research",
        title: "Competitive audit",
        text: "Mapped fee structures, feature gaps, and UX pain points across eBay UK, Cardmarket, TCGplayer, Whatnot, and CardNexus. Identified the core differentiator: no platform bridges buyers, sellers, and local shops in one place.",
      },
      {
        key: "ia",
        title: "Information architecture",
        text: "Designed three distinct dashboard experiences (buyer/seller/shop) within one app, each with purpose-built tools. Created multi-seller product pages — one card, every seller's price and condition compared at a glance.",
      },
      {
        key: "interaction",
        title: "Interaction design",
        text: "Pack-rip loading animation, game landing pages with visual set browsers, persistent navigation architecture, and a scan-to-sell flow for card identification and instant pricing.",
      },
      {
        key: "visual",
        title: "Visual design",
        text: "Evolved the brand through multiple iterations: from colour-heavy to a refined B&W palette with Inter for text and Space Grotesk for prices. Typography audit — stripped extra-bold weights across the entire UI in favour of bold for a cleaner feel.",
      },
    ],
    whatChanged: [
      "Multi-seller product pages over individual listings: buyers see every option for a card on one screen — price, condition, seller rating, shipping.",
      "Trade-as-a-first-class-feature: card trading is built into the product page, not buried in a separate section.",
      "Local game shop integration: shops get a digital storefront, bulk card intake tools, and buylist management — turning them from competitors into ecosystem partners.",
      "Fee transparency as a feature: an interactive fee comparison slider (drag from £1–500, see live per-platform breakdowns) turned a business model decision into a persuasion tool.",
    ],
    impact: [
      "50+ screen walkable prototype with realistic mock data (64 card listings across 5 TCGs), working navigation, cart, watchlist, and state persistence.",
      "Designed for trade show demos and investor conversations — every user flow is end-to-end interactive.",
    ],
    liveUrl: "https://cardconomyy.vercel.app",
    embedMode: "external-only",
    prototypeViewport: "desktop",
  },
  {
    slug: "gallery-design-bedrooms",
    title: "Gallery Design Bedrooms",
    company: "CONTRACT",
    sortOrder: 6,
    portfolioVisible: true,
    eyebrow: "Gallery Design - Client Project",
    summary:
      "Rebranding and rebuilding the web presence for a Glasgow-based fitted bedroom company, from competitive positioning to service journey clarity to a website that reflects how the business actually works.",
    stats: [
      { key: "market", value: "Mid-market", label: "Positioning gap", detail: "Between nationals and generic locals" },
      { key: "journey", value: "4-step", label: "Service journey", detail: "Now visible on the site" },
      { key: "channel", value: "WhatsApp", label: "Direct enquiry path", detail: "Reported to drive new client enquiries" },
    ],
    narrativeSections: [
      {
        key: "discovery",
        title: "Discovery",
        paragraphs: [
          "Gallery Design Bedrooms operated in a crowded category where nearly every competitor described itself as bespoke, making the language feel generic and unconvincing. Research showed a split between polished national brands with vague messaging and local competitors with little differentiation or personality.",
          "The real opportunity sat in what the business was already good at: solving awkward, everyday storage problems in real homes. The repositioning moved the brand away from overused bespoke language and toward a clearer promise of practical problem-solving.",
        ],
      },
      {
        key: "business",
        title: "Understanding the Business",
        paragraphs: [
          "A workshop with the two owners changed the brief. An online booking flow looked sensible at first, but it clashed with how the business actually built trust and managed enquiries. Rather than forcing a digital pattern onto them, the process work surfaced the real service journey that customers needed to understand.",
          "That journey, showroom visit, home visit, quote and deposit, then fitting, became a central part of the redesign because it explained how the business worked and reduced uncertainty for new customers.",
        ],
      },
      {
        key: "solution",
        title: "The Solution",
        paragraphs: [
          "The site was rebuilt around visibility, trust, and direct contact. The service journey was documented clearly, showroom opening hours became live and contextual, reviews and TikTok proof-of-work were surfaced on the site, and WhatsApp replaced the more intrusive booking system as the primary digital contact path.",
          "That made the website feel more like the business itself: practical, responsive, and personal, instead of another generic fitted furniture brochure site.",
        ],
      },
      {
        key: "reflection",
        title: "Reflection",
        paragraphs: [
          "The key design decision was not pushing the most technically complete solution. The booking system would have solved an organisational problem, but it did not fit the owners' working style or the personal interaction that helped them win business.",
          "Using WhatsApp instead was simpler, but it matched existing behaviour and still delivered the core outcome: faster, more direct customer conversations with less friction for both sides.",
        ],
      },
    ],
    challenge: [
      "The business was using generic bespoke positioning that did not distinguish it from competitors.",
      "The real service process was invisible on the existing website, leaving customers unsure what to expect.",
      "The showroom, a critical trust-building step, had no clear digital support such as live opening status.",
      "The site lacked strong social proof and a direct communication path that matched how the owners actually worked.",
    ],
    whatChanged: [
      "Reframed the brand around 'Everyday Storage, Built Better' to emphasise practical problem-solving.",
      "Mapped the four-step service journey directly into the website so customers could understand the process before enquiring.",
      "Added live showroom open and closed messaging based on local opening hours.",
      "Integrated Google reviews and TikTok project content to build trust through proof of work.",
      "Replaced the proposed booking flow with WhatsApp so enquiries fit the owners' real workflow.",
    ],
    impact: [
      "Created clearer differentiation from both national fitted furniture brands and local generic competitors.",
      "Reduced uncertainty by showing customers exactly how the service works from showroom visit through fitting.",
      "Made the showroom easier to act on as a conversion step through live availability messaging.",
      "WhatsApp integration gave customers a faster route to speak directly with the business and was reported by the owners to contribute to new enquiries.",
    ],
    processSteps: [
      { key: "research", title: "Competitive research", text: "Mapped the gap between polished national players and undifferentiated local competitors to identify a stronger positioning angle." },
      { key: "workshop", title: "Owner workshop", text: "Used conversations with both owners to understand business constraints, service flow, and what kind of digital support would actually be adopted." },
      { key: "journey", title: "Service journey mapping", text: "Documented the showroom visit, home visit, quote and deposit, and fitting flow so the website could explain the real customer journey." },
      { key: "implementation", title: "Practical implementation", text: "Shaped the site around trust-building features such as live opening status, visible reviews, TikTok content, and direct WhatsApp contact." },
    ],
    comparison: {
      intro: "The redesign shifted the site from generic fitted furniture marketing to a clearer, more useful service experience built around how the business actually operates.",
      before: [
        "Generic 'bespoke storage' messaging",
        "Service process not documented anywhere",
        "No indication of showroom opening hours",
        "No reviews or social proof on site",
        "No direct communication channel",
        "Little differentiation from local competitors",
      ],
      after: [
        "'Everyday Storage, Built Better' positioning",
        "Four-step service journey clearly mapped",
        "Live open and closed status with next opening time",
        "Google reviews and TikTok proof-of-work surfaced on site",
        "WhatsApp integration to the owners' workflow",
        "Clearer differentiation as practical problem-solvers",
      ],
    },
    hasMobilePrototype: true,
    hasDesktopPrototype: true,
  },
  {
    slug: "quick-add",
    title: "Quick Add",
    company: "DFYNE",
    sortOrder: 1,
    portfolioVisible: true,
    eyebrow: "DFYNE - Feature Case Study",
    summary:
      "How rethinking the add-to-cart experience helped customers build matching sets faster, increasing average order value by 13% and items per order by 20%.",
    stats: [
      { key: "aov", value: "+13%", label: "Average order value", detail: "Year-on-year" },
      { key: "items", value: "+20%", label: "Average items per order", detail: "2.0 to 2.4 items" },
      { key: "speed", value: "Down", label: "Set-building friction", detail: "Fewer clicks and less time to complete a set" },
    ],
    narrativeSections: [
      {
        key: "problem",
        title: "The Problem",
        paragraphs: [
          "DFYNE's customers arrive on collection pages with strong intent, especially on drop days when matching sets can sell out quickly. But building a full set meant opening a product page, choosing a size, adding to cart, then repeating the process across multiple PDPs.",
          "The friction was amplified by steep collection drop-off, missing quick-add controls on product cards, and a predominantly mobile audience. For customers who already knew what they wanted, the PDP was adding delay rather than helping them convert.",
        ],
      },
      {
        key: "solution",
        title: "The Solution",
        paragraphs: [
          "Quick Add was redesigned as a set-building flow instead of a single-item shortcut. The interface was stripped back to the minimum information needed to decide quickly, and size selection became progressive so users only had to focus on one item at a time.",
          "That let customers build a matching outfit directly from the collection page in a few fast interactions, preserving momentum during high-intent shopping and making set completion materially easier.",
        ],
      },
      {
        key: "results",
        title: "Results",
        paragraphs: [
          "Year-on-year performance showed a 13% increase in average order value and a 20% increase in items per order, moving from 2.0 to 2.4 items per transaction.",
          "While broader commercial factors also influence those numbers, the uplift in items per order strongly supports the core thesis of the feature: reducing friction in set-building leads customers to complete larger coordinated baskets.",
        ],
      },
    ],
    challenge: [
      "Building a matching set required multiple product page visits, repeated size selection, and repeated add-to-cart steps.",
      "Every additional page load increased the risk of losing items during high-intent drop-day shopping.",
      "Collection pages had steep drop-off and product cards exposed no quick-add path, swatches, or available sizes.",
      "The PDP was optimised for consideration, not for the speed high-intent customers needed.",
    ],
    whatChanged: [
      "Reframed quick-add as a set-building tool rather than a shortcut for single-item purchase.",
      "Reduced the UI to only the information needed to make a decision quickly.",
      "Made size selection progressive so users committed to one product at a time instead of processing the whole set at once.",
      "Kept the full set-building flow on the collection page so users could preserve momentum.",
    ],
    impact: [
      "Average order value increased 13% year on year.",
      "Average items per order increased 20%, from 2.0 to 2.4.",
      "Users could assemble matching outfits from one page in fewer steps.",
      "The uplift in items per order suggests the set-building flow increased basket size rather than just spend per item.",
    ],
    processSteps: [
      { key: "audit", title: "Competitive audit", text: "Mapped quick-add patterns across 15 plus brands and identified that nobody was really solving for set-building." },
      { key: "prototype", title: "Working prototypes", text: "Built interactive prototypes that simulated real purchase flows rather than static modal mockups." },
      { key: "testing", title: "Internal user testing", text: "Used DFYNE staff who matched the target persona to pressure-test the pace and clarity of the flow." },
      { key: "reduction", title: "Iterative reduction", text: "Stripped the UI back from a mini-homepage concept to only the information needed to decide and move." },
    ],
    comparison: {
      intro: "The strongest change was turning quick-add from a single-item shortcut into a coordinated set-building flow.",
      before: [
        "Open product page",
        "Select colour and size",
        "Add to cart",
        "Scroll to related products",
        "Click through to next PDP",
        "Repeat for each item in the set",
      ],
      after: [
        'Tap "Add" on the collection page',
        "Select size",
        "Item added and matching set surfaces",
        "Repeat inline for each item",
        "Checkout from one page",
      ],
    },
    liveUrl: "https://heart-engine-07151053.figma.site/",
    embedMode: "iframe",
    prototypeViewport: "mobile",
    hasMobilePrototype: true,
    hasDesktopPrototype: false,
  },
  {
    slug: "product-details-page",
    title: "Product Page Redesign",
    company: "DFYNE",
    sortOrder: 2,
    portfolioVisible: true,
    eyebrow: "DFYNE - Feature Case Study",
    summary:
      "Redesigning DFYNE's highest-traffic page to reduce size-related returns, clean up information hierarchy, and let customers build matching sets without ever leaving the product page.",
    stats: [
      { key: "landing", value: "52%", label: "Traffic lands on PDPs", detail: "Direct product-page entries" },
      { key: "returns", value: "60%", label: "Returns cite sizing", detail: "Primary returns driver" },
      { key: "mobile", value: "95%", label: "Sessions are mobile", detail: "Mobile-first buying context" },
      { key: "sessions", value: "4M+", label: "Monthly sessions", detail: "Across storefronts" },
    ],
    narrativeSections: [
      {
        key: "problem",
        title: "The Problem",
        paragraphs: [
          "The PDP had been designed as the end of a browse journey, but most users were landing on it directly from search, paid social, or other entry points. That meant one of DFYNE's most important pages was acting as a first impression without giving users enough orientation, navigation, or decision support.",
          "At the same time, sizing guidance was weak despite size-related issues driving most returns. Small mobile tap targets, buried model information, and long stacked content made the page harder to use for the audience that mattered most.",
        ],
      },
      {
        key: "solution",
        title: "The Redesign",
        paragraphs: [
          "The page was restructured around a tighter buying flow: secondary content moved behind modals, sizing guidance became contextual and visible near the selector, and Complete the Look became a true inline set-building tool with independent sizing per item.",
          "The redesign also expanded the PDP's role as a landing page by adding breadcrumbs, better discovery surfaces, and a custom review experience that supports real purchase questions rather than passive social proof.",
        ],
      },
      {
        key: "deeper-system",
        title: "What Sits Underneath",
        paragraphs: [
          "While redesigning the page, a deeper catalogue architecture issue surfaced: colourways were stored as separate products rather than true variants, which forces full page reloads every time a shopper changes colour.",
          "That turned colour switching into an infrastructure problem rather than just a UI problem, and the redesign now frames that backend restructure as the next major step in improving PDP performance and usability.",
        ],
      },
    ],
    challenge: [
      "The PDP assumed users arrived through a browse flow, even though most users landed directly from search or ads.",
      "Long stacked content pushed reviews, sizing guidance, and matching products far below the fold.",
      "Small size pills and buried model information created unnecessary friction on a 95 percent mobile audience.",
      "Sizing guidance was weak despite size-related issues driving 60 percent of returns.",
    ],
    whatChanged: [
      "Moved secondary information like delivery, returns, BNPL, and full specs into modals to keep the buy flow compact.",
      "Added contextual sizing guidance with visible model info and larger mobile-friendly size pills.",
      "Turned Complete the Look into an inline set-building flow with independent sizing per item.",
      "Added breadcrumbs, same-colour cross-collection discovery, and custom filterable reviews.",
      "Surfaced the deeper catalogue architecture issue blocking instant colour switching and started the infrastructure work behind it.",
    ],
    impact: [
      "Targets lower size-related returns through stronger fit guidance and upcoming Fit Analytics integration.",
      "Extends proven set-building behaviour to the page where 52 percent of traffic already arrives.",
      "Improves navigation and discovery for direct-landing users who never pass through collection pages.",
      "Turns the remaining colour-switching friction into a defined infrastructure project instead of leaving it as a front-end symptom.",
    ],
    processSteps: [
      { key: "analytics", title: "Behavioural analytics", text: "Used Clarity recordings, heatmaps, and traffic analysis to understand how users actually arrived on and moved through the PDP." },
      { key: "returns", title: "Returns and ticket review", text: "Used customer care and returns data to identify sizing as the main source of downstream friction." },
      { key: "prototype", title: "Prototype testing", text: "Built interactive prototypes and tested them with users who matched the target persona to validate hierarchy and sizing changes." },
      { key: "consultation", title: "Cross-functional consultation", text: "Worked across marketing, operations, buying, customer care, and development to shape a redesign that solved multiple business and user problems together." },
    ],
    comparison: {
      intro: "The redesign turns the PDP into a stronger landing page, buying flow, and set-building surface at the same time.",
      before: [
        "Information stacked in a long list structure",
        "No breadcrumbs for direct-landing users",
        "Small size pills and weak mobile tap targets",
        "Model info buried in an accordion",
        "Generic fit guidance disconnected from the decision point",
        "BNPL messaging cluttering the buy flow",
        "Basic product carousel for cross-sell",
        "Same product in other colours for recommendations",
        "Default Judge.me review widget",
        "Full page reload on every colour change",
      ],
      after: [
        "Clean hierarchy with secondary information moved into modals",
        "Breadcrumb navigation back to collections",
        "Enlarged size pills optimised for mobile",
        "Model info visible at the top of the product section",
        "Contextual fit note beside the size selector",
        "BNPL moved out of the primary buy flow",
        "Inline set-building with independent sizing per item",
        "Cross-collection discovery in the same colourway",
        "Custom reviews with filterable dimensions",
        "Instant colour switching defined as an in-progress infrastructure fix",
      ],
    },
    liveUrl: "https://dfyne-product-details-page-flame.vercel.app/",
    embedMode: "iframe",
    prototypeViewport: "mobile",
    hasMobilePrototype: true,
    hasDesktopPrototype: true,
    previousVersionUrl: "https://uk.dfyne.com/collections/impact/products/dfyne-impact-midnight-black-sports-bras-250202?_pos=2&_fid=4ab45975d&_ss=c",
    previousVersionLabel: "Live site",
    previousVersionEmbedMode: "external-only",
  },
  {
    slug: "support-hub",
    title: "Support Hub",
    company: "DFYNE",
    sortOrder: 3,
    portfolioVisible: true,
    eyebrow: "DFYNE - Feature Case Study",
    summary:
      "Replacing a broken help desk with a custom-built support hub that lets customers self-serve, gives teams autonomy over content, and keeps the human connection close at hand.",
    stats: [
      { key: "l1", value: "~50%", label: "Of tickets were L1", detail: "And self-serviceable" },
      { key: "severity", value: "3", label: "Severity tiers mapped", detail: "Into the support IA" },
      { key: "teams", value: "3", label: "Teams can update support", detail: "Content without dev" },
    ],
    narrativeSections: [
      {
        key: "problem",
        title: "The Problem",
        paragraphs: [
          "DFYNE had two broken support states at once. The US store relied on a generic Zendesk widget that pushed simple questions into a ticket flow, while the international store had no FAQ or self-service support at all after the old help desk was removed.",
          "That meant a large share of incoming tickets were basic L1 questions about orders, sizing, shipping, and policies. The challenge was to reduce that support load without making the experience feel like deflection. It still had to feel like DFYNE.",
        ],
      },
      {
        key: "approach",
        title: "Approach",
        paragraphs: [
          "The project started with ticket taxonomy. I worked with customer care to map L1, L2, and L3 support flows so the information architecture reflected the questions customers were actually asking rather than internal policy structures.",
        ],
      },
      {
        key: "solution",
        title: "Solution",
        paragraphs: [
          "The final direction is a structured support hub with search, topic-based FAQs, and immediate access to chat. Instead of forcing customers into a ticket flow, the hub answers high-frequency questions quickly while keeping escalation close by.",
        ],
      },
    ],
    challenge: [
      "Generic widget on one store, nothing on the other.",
      "L1 tickets were consuming agent time.",
      "No structured search or FAQ flow existed.",
      "Content updates depended on development.",
    ],
    whatChanged: [
      "Custom support hub with search and topic categories.",
      "L1 questions answered through self-service.",
      "Chat available from the start of the journey.",
      "Teams can manage support content directly.",
    ],
    impact: [
      "Reduce avoidable L1 ticket volume so agents can focus on complex issues.",
      "Keep a clear path back to chat so the support relationship stays personal.",
      "Make policy and FAQ content resilient as tools change behind the scenes.",
      "Keep the customer-facing support experience stable during platform migration.",
    ],
    processSteps: [
      { key: "severity-mapping", title: "Severity mapping", text: "Defined the difference between self-serviceable L1 issues and agent-led L2/L3 support." },
      { key: "third-party-poc", title: "Third-party POC", text: "Tested a lighter-weight solution and ruled it out because it would not support the UX or autonomy required." },
      { key: "custom-structure", title: "Custom structure", text: "Designed a Shopify-native support model with search, topic grouping, and editable content." },
      { key: "platform-resilience", title: "Platform resilience", text: "Scoped the system so the FAQ layer could stay stable while support tooling moved from Zendesk to Sprinklr." },
    ],
    comparison: {
      intro: "The support experience moved from broken or absent help to a structured self-service hub that still keeps human support close at hand.",
      before: [
        "Generic widget on one store, nothing on the other",
        "L1 tickets consuming agent time",
        "No structured search or FAQ flow",
        "Content updates depended on dev",
      ],
      after: [
        "Custom support hub with search and topic categories",
        "L1 questions answered through self-service",
        "Chat available from the start of the journey",
        "Teams can manage support content directly",
      ],
    },
    hasMobilePrototype: true,
    hasDesktopPrototype: true,
  },
  {
    slug: "athlete-styles",
    title: "Athlete Styles",
    company: "DFYNE",
    sortOrder: 4,
    portfolioVisible: true,
    eyebrow: "DFYNE - Feature Case Study",
    summary:
      "A homepage feature that lets customers shop real athlete fits while giving DFYNE a more natural path into cross-collection discovery and set building.",
    stats: [
      { key: "sessions", value: "4M+", label: "Monthly sessions", detail: "Across DFYNE storefronts" },
      { key: "impact", value: "48%", label: "Of product views focused", detail: "On Impact" },
      { key: "target", value: "Up", label: "Targeting AOV and items", detail: "Per transaction" },
    ],
    narrativeSections: [
      {
        key: "problem",
        title: "The Problem",
        paragraphs: [
          "DFYNE's athletes were already doing the work of discovery and persuasion on social, but the website gave customers no way to move directly from athlete content to the products in those looks. Social and ecommerce were operating as separate systems.",
          "At the same time, product attention was heavily concentrated in a few familiar ranges. The opportunity was to use athlete styling as a more natural route into catalogue exploration rather than relying on merchandising blocks alone.",
        ],
      },
      {
        key: "approach",
        title: "Approach",
        paragraphs: [
          "Competitive review showed a repeated UX problem: most shop-the-look experiences force customers to buy a complete outfit, which breaks down quickly when stock or sizing differs across items. The DFYNE version needed to preserve flexibility.",
        ],
      },
      {
        key: "solution",
        title: "The Solution",
        paragraphs: [
          "The feature brings athlete content into the homepage through a curated carousel. Tapping into a fit opens a modal where customers can browse every item in the look, switch between products, and buy items individually rather than being locked into the full set.",
        ],
      },
    ],
    challenge: [
      "Athlete content lived on social, separate from shopping.",
      "No way to shop what a specific athlete was wearing.",
      "Same athletes repeatedly surfaced on site.",
      "Impact dominated product attention.",
    ],
    whatChanged: [
      "Athlete content enters the homepage shopping flow.",
      "Customers can shop items from an athlete fit individually.",
      "Curation broadens athlete representation.",
      "Real fits create cross-collection exposure.",
    ],
    impact: [
      "Increase average order value and items per transaction through social-led discovery.",
      "Give DFYNE a more diverse and useful community surface on the homepage.",
      "Improve sizing context and browsing paths for customers.",
      "Create a stronger incentive loop around athlete content quality and visibility.",
    ],
    processSteps: [
      { key: "audit", title: "Competitive audit", text: "Mapped shop-the-look patterns and identified forced bundle logic as the core failure." },
      { key: "alignment", title: "Stakeholder alignment", text: "Worked with athlete, social, and marketing teams on curation and launch logic." },
      { key: "prototype", title: "Prototype testing", text: "Built working flows and tested them with users matching the target gym-going audience." },
      { key: "iterate", title: "Interaction refinement", text: "Iterated on product switching and independent sizing to reduce friction inside the fit modal." },
    ],
    comparison: {
      intro: "The feature closes the gap between social discovery and ecommerce by turning athlete content into a shoppable, flexible buying flow.",
      before: [
        "Athlete content lived on social, separate from shopping",
        "No way to shop what a specific athlete was wearing",
        "Same athletes repeatedly surfaced on site",
        "Impact dominated product attention",
      ],
      after: [
        "Athlete content enters the homepage shopping flow",
        "Customers can shop items from an athlete fit individually",
        "Curation broadens athlete representation",
        "Real fits create cross-collection exposure",
      ],
    },
    hasMobilePrototype: true,
    hasDesktopPrototype: true,
  },
  {
    slug: "homepage-refresh",
    title: "Homepage Refresh",
    company: "DFYNE",
    sortOrder: 5,
    portfolioVisible: true,
    eyebrow: "DFYNE - Feature Case Study",
    summary:
      "How months of trust-building, data-driven advocacy, and incremental design improvements transformed DFYNE's template homepage into a premium shopping experience for a 150M+ brand.",
    stats: [
      { key: "revenue", value: "£150M+", label: "Annual revenue", detail: "UK's fastest growing 2025" },
      { key: "sessions", value: "4M+", label: "Monthly sessions", detail: "Across storefronts" },
      { key: "carousel", value: "Top 6", label: "Category carousel ranking", detail: "Most-clicked homepage section" },
    ],
    narrativeSections: [
      {
        key: "problem",
        title: "The Problem",
        paragraphs: [
          "DFYNE's homepage was built on a simple hero-and-grid formula that worked in the brand's early growth stage, when demand was driven by social and influencer traffic. But as the company scaled, the homepage remained a basic storefront rather than a product discovery experience.",
          "That created both UX and brand problems: men's content could disappear during women's campaigns, there was no structured route into categories or collections, and repeated 'Shop Now' CTAs made the page feel noisier and less premium than the brand now wanted. The harder challenge was political as well as design-led, because changing the homepage meant changing something the CEO had originally built himself.",
        ],
      },
      {
        key: "approach",
        title: "Approach",
        paragraphs: [
          "The refresh was built through progressive trust-building rather than a single redesign pitch. I worked closely with the CEO to understand what was core to the brand, used category search and sales reporting to show where discovery gaps existed, and validated each release through Clarity and post-launch performance signals.",
          "The work also shifted homepage ownership into the digital team, bringing section strategy, content curation, and asset briefing closer to user behaviour rather than campaign schedules alone.",
        ],
      },
      {
        key: "solution",
        title: "The Solution",
        paragraphs: [
          "The result was not a visual rebrand but a systematic elevation of the existing experience. Gutters were reduced, product cards were sharpened, category and collection carousels introduced stronger discovery pathways, and repetitive CTA noise was replaced with more premium navigation patterns.",
          "The homepage also became more intentional in how it handled audience context, including separate men's and women's landing experiences and denser, more purposeful section pacing that respected user time while improving the quality of discovery.",
        ],
      },
      {
        key: "stakeholders",
        title: "Brand Partnership",
        paragraphs: [
          "A major part of the project was earning the right to change the homepage at all. Rather than framing changes as corrections, I connected each decision to the CEO's own brand ambitions and to business outcomes he cared about, which shifted conversations from personal preference to evidence-backed evolution.",
          "Over time, the relationship moved from cautious gatekeeping to active collaboration, with homepage strategy becoming a shared discussion rather than a defended legacy structure.",
        ],
      },
    ],
    challenge: [
      "The homepage still followed an early hero-grid template that had not evolved with the scale of the business.",
      "Women's campaigns could push men's content so far down the page that the brand looked single-gendered to some visitors.",
      "There was no structured entry into categories, best sellers, new arrivals, or collection-level discovery.",
      "Repeated 'Shop Now' CTAs, oversized gutters, and inconsistent layout spacing weakened the premium positioning the brand wanted.",
      "The homepage was politically sensitive because the CEO had originally built it himself.",
    ],
    whatChanged: [
      "Reset the desktop layout defaults to a 24px gutter, 24px section gap, and 40px spacing for hero buttons and hero title/logo lockups, while keeping the logo centred consistently on desktop and mobile.",
      "Tightened product card geometry from 8px radius to 2px to better align with the brand's sharper visual language.",
      "Introduced a category carousel with hover video previews to create stronger product-type discovery from the homepage.",
      "Added a collection carousel so ranges like Impact, Origin, Vision, Dynamic, and Signature could be explored as distinct destinations.",
      "Replaced repeated 'Shop Now' buttons with quieter chevron navigation and reduced inter-section spacing to make the page feel denser and more premium.",
      "Created separate men's and women's landing paths so paid traffic could land on content that matched intent more closely.",
    ],
    impact: [
      "The category carousel became one of the top six most-clicked homepage sections, helping validate the direction through behaviour rather than opinion alone.",
      "The homepage moved from being a basic storefront to a stronger product discovery layer for a brand doing more than 150M in annual revenue.",
      "The digital team took greater ownership of homepage strategy, content curation, and asset briefing.",
      "The project built trust with leadership through incremental delivery and data-backed advocacy rather than a single redesign moment.",
    ],
    processSteps: [
      { key: "trust", title: "Relationship building", text: "Worked closely with the CEO over time to understand brand parameters and earn trust before larger homepage changes were proposed." },
      { key: "data", title: "Data-backed advocacy", text: "Used category search data, sales reporting, and Clarity heatmaps to make the case for each change with evidence." },
      { key: "delivery", title: "Incremental delivery", text: "Shipped changes progressively so each small win made the next change easier to support." },
      { key: "coordination", title: "Cross-functional coordination", text: "Worked with campaign, marketing, developers, and the digital team to execute a more coherent homepage system." },
    ],
    comparison: {
      intro: "The homepage evolved from a repeated template into a more structured, premium product discovery experience.",
      before: [
        "Hero image then product grid repeated across the whole homepage",
        "250px margin gutters and inconsistent spacing defaults wasting screen space",
        "8px rounded product cards that clashed with the brand's sharper geometry",
        "'Shop Now' on every hero section creating visual noise",
        "No categories, best sellers, or collection structure",
        "Women's drops pushing men's content off-screen",
        "Excessive spacing between sections",
        "Homepage content primarily managed by marketing",
      ],
      after: [
        "Structured sections built around heroes, categories, collections, and clearer discovery routes",
        "24px desktop gutters and section gaps with 40px hero spacing, with the logo centred consistently across desktop and mobile",
        "2px corner radius aligned with logo geometry and premium positioning",
        "Chevron navigation replacing repetitive CTA noise",
        "Category carousel that became a top-clicked homepage section",
        "Separate men's and women's landing paths",
        "Reduced spacing and fewer redundant captions",
        "Digital team ownership of homepage strategy and curation",
      ],
    },
    hasMobilePrototype: true,
    hasDesktopPrototype: true,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
