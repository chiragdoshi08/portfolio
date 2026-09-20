// Single source of truth for everything the site says about Chirag.
// Edit this file to update the bio, roles, projects, skills and contact details —
// the chat engine, the pages and the AI fallback all read from here.

export type Metric = { value: string; label: string };

export type Role = {
  id: string;
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  bullets: string[];
  aliases: string[]; // words a visitor might use to refer to this role
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  company: string;
  period: string;
  category: "AI" | "Growth" | "Operations" | "Product" | "Entrepreneurship" | "Side project";
  metrics: Metric[];
  summary: string;
  problem: string;
  approach: string[];
  outcome: string[];
  aliases: string[];
  featured?: boolean;
};

export const profile = {
  name: "Chirag Doshi",
  firstName: "Chirag",
  pronoun: "he",
  headline: "Strategy & Operations Leader",
  subheadline: "P&L ownership · Operational excellence · Enterprise AI adoption",
  location: "Gurgaon, India",
  intro:
    "Hi, I'm Chirag. I build and scale businesses — and these days I spend most of my time bringing Generative AI into how they actually run.",
  summary:
    "Strategy and operations leader with 13+ years building and scaling businesses across India — consumer technology, healthcare, retail and real estate. I've owned an ₹80Cr+ monthly P&L and led organisations of 600+ people, partnering with senior leadership to turn business priorities into expansion plans, operating models and cross-functional execution. I set up KPI dashboards, operating reviews and scalable processes across multi-city businesses, and now lead enterprise transformation and GenAI adoption across three M3M Group companies.",
  currently:
    "AI Transformation Lead in the Management Office at M3M India, leading enterprise-wide business transformation and GenAI adoption across three group companies. Completed the one-year MBA (PGPX) at IIM Ahmedabad in 2026, graduating in the top 5% of the batch.",
  focusAreas: [
    "Enterprise GenAI adoption",
    "AI-powered decision tools",
    "P&L turnarounds",
    "0→1 business launches",
    "Operating-model design",
  ],
  // Identity line for the Classic hero: a point of view, not a job title (Warikoo's "awareness is everything").
  identity: "I build businesses. Now I build with AI.",
  // Four words that describe the person, shown as a strip under the identity line.
  fourWords: ["Operator", "Product", "AI", "Advisor"],
  // Offer-led headline used by the Desktop readme (the chat keeps the friendlier intro).
  offerHeadline: "I help businesses put AI to work — from the adoption roadmap to the deployed workflow.",
  offerSub:
    "Operator first, advisor second: I've owned an ₹80Cr+ monthly P&L, led teams of 600+, launched businesses from zero — and now lead enterprise GenAI adoption at M3M.",
  // How the chat answers "is he open to roles?" — an open door, not a sign in the window.
  openTo:
    "Chirag is at M3M and takes on select advisory work through Topmate. For anything beyond that, the fastest route is a short note on LinkedIn or email.",
  email: "chiragdoshi2008@gmail.com",
  phone: "+91 7709786158",
  showPhone: false,
  linkedin: "https://www.linkedin.com/in/chiragdoshi08",
  linkedinHandle: "chiragdoshi08",
  topmate: "https://topmate.io/chiragdoshi08",
  github: "",
  siteUrl: "https://chiragdoshi.com",
  topmateDm: "https://topmate.io/chiragdoshi08/2015787", // Priority DM — quick questions
  avatar: "/images/avatar.jpg",
  aboutPhoto: "/images/about.jpg",
  iimaPhoto: "/images/iima-books.jpg",
};

/**
 * Lines Chirag keeps coming back to. Attribution is deliberately honest: the first is a
 * film line he can't source, the second has no single author, the third is usually pinned
 * on Drucker but the Drucker Institute says he never said it — and Deming called it a myth.
 */
export type Motto = { text: string; source: string };
export const mottos: Motto[] = [
  { text: "Never miss a train, even if you don't have a ticket.", source: "a line from a film, remembered better than the film" },
  { text: "The answer to every fear is action.", source: "folk wisdom; Dale Carnegie said it longer" },
  { text: "You can't manage what you can't measure.", source: "usually credited to Drucker — he never said it, and I use it anyway" },
];

/** The career as a ribbon of chapters — shown instead of a scoreboard of numbers. */
export type Chapter = { year: string; name: string; note: string; roleId?: string };
export const journeyLine = "Thirteen years, seven chapters: from dealer networks to enterprise AI.";
export const journey: Chapter[] = [
  { year: "2013", name: "General Motors", note: "After-sales", roleId: "gm" },
  { year: "2015", name: "OYO Rooms", note: "Market P&L", roleId: "oyo" },
  { year: "2018", name: "TOIKIT", note: "Founder", roleId: "toikit" },
  { year: "2019", name: "Medtrail", note: "VP Operations", roleId: "medtrail" },
  { year: "2021", name: "PharmEasy", note: "Ops & Business Head", roleId: "pharmeasy-bh" },
  { year: "2025", name: "IIM Ahmedabad", note: "PGPX" },
  { year: "2026", name: "M3M", note: "AI Transformation", roleId: "m3m" },
];

/** Quick-scan facts (kept for the terminal's whoami; no longer shown as a strip). */
export const glance: Metric[] = [
  { value: "13+ yrs", label: "Building & scaling businesses" },
  { value: "₹80Cr+", label: "Monthly P&L owned" },
  { value: "600+", label: "People led" },
  { value: "300+", label: "GenAI users at M3M" },
  { value: "IIM A", label: "PGPX · top 5%" },
];

export type Offer = {
  id: string;
  title: string;
  who: string;
  what: string[];
  format: string;
  proof: string; // the project/role that backs this offer
  topmatePath: string; // Topmate service id, appended to profile.topmate (e.g. "2276465")
  topmateService: string; // the service name as it appears on Topmate
  aliases: string[];
};

/** "How I can help" — the consulting / mentoring offers. Prices live on Topmate, not here. */
export const offers: Offer[] = [
  {
    id: "genai-adoption",
    title: "GenAI adoption for leadership teams",
    who: "CXOs and function heads who want AI in the operating model, not in a pilot.",
    what: ["Use-case mapping by impact and feasibility", "Platform and governance choices", "Capability-building so teams ship their own workflows"],
    format: "Start with a 45-min session; longer engagements by arrangement",
    proof: "Rolled out GenAI to 300+ users across 23 departments at M3M.",
    topmatePath: "2276465",
    topmateService: "Practical AI Strategy Session",
    aliases: ["genai adoption", "ai adoption", "ai roadmap", "ai strategy", "rollout", "leadership team"],
  },
  {
    id: "decision-tools",
    title: "AI decision tools & workflow automation",
    who: "Teams with a slow, judgement-heavy process that runs on spreadsheets and email.",
    what: ["Map the process and its decision points", "Design the tool: rules where rules work, models where judgement is needed", "Ship a working version and measure the time saved"],
    format: "45-min scoping session first; build engagements by arrangement",
    proof: "A 2-day land-deal evaluation now runs in under 5 minutes and powers 50+ deals a month.",
    topmatePath: "2276465",
    topmateService: "Practical AI Strategy Session",
    aliases: ["automation", "workflow", "decision tool", "internal tool", "process", "spreadsheet", "manual process"],
  },
  {
    id: "ops-turnaround",
    title: "Ops & P&L turnaround, 0→1 launches",
    who: "Founders and business heads scaling a new vertical or fixing unit economics.",
    what: ["Operating playbooks, cadences and dashboards", "Margin and working-capital levers", "Launch sequencing across cities and channels"],
    format: "45-min problem-solving session; ongoing advisory by arrangement",
    proof: "FOCO retail to CM2 in 8 months; Quick Commerce to ₹1.2Cr monthly GMV in 4 months; PharmEasyOne to ₹60Cr GMV in 12.",
    topmatePath: "2276464",
    topmateService: "Operations & Business Strategy Consultation",
    aliases: ["turnaround", "unit economics", "p&l help", "operations help", "launch", "scale", "expansion", "new vertical"],
  },
  {
    id: "mentoring",
    title: "Career mentoring — MBA and ops → strategy moves",
    who: "PGPX/MBA aspirants and mid-career operators moving into strategy or transformation roles.",
    what: ["Application and essay reviews", "Career-move planning", "Mock interviews for ops, strategy and PM roles"],
    format: "45-min video call; quick questions via Priority DM",
    proof: "IIM Ahmedabad PGPX 2025–26, Academic Merit Award and Exit Scholarship (top 5%).",
    topmatePath: "2015768",
    topmateService: "MBA Prep & Career Strategy",
    aliases: ["mentor", "mentoring", "mentorship", "pgpx", "mba admission", "essay", "mock interview", "career advice", "guidance"],
  },
];

export const roles: Role[] = [
  {
    id: "m3m",
    company: "M3M India",
    title: "AI Transformation Lead — Management Office",
    location: "Gurgaon",
    start: "May 2026",
    end: "Present",
    summary:
      "Leading enterprise-wide business transformation and AI strategy across M3M Group — redesigning workflows, governance and decision processes with business and functional leaders.",
    bullets: [
      "Lead enterprise-wide business transformation and AI strategy across M3M Group, redesigning workflows, governance and decision processes with business and functional leaders.",
      "Scaled generative AI adoption across 23 departments and three group companies; deployed a single enterprise GenAI platform for 300+ users.",
      "Designed enterprise AI capability-building programmes and workflow-automation training, enabling teams to build AI-enabled solutions independently.",
      "Built an AI-powered land-deal evaluation engine covering zoning, policy checks, development mix and cash-flow, IRR and NPV scenarios; a two-day manual process now runs in under five minutes and supports 50+ deal evaluations a month.",
    ],
    aliases: ["m3m", "real estate", "management office", "ai transformation", "current role"],
  },
  {
    id: "pharmeasy-qc",
    company: "PharmEasy",
    title: "Operations Head — Quick Commerce & Aknamed",
    location: "Gurgaon",
    start: "Aug 2024",
    end: "Apr 2025",
    summary:
      "Owned the ₹80Cr+ monthly Aknamed P&L and launched PharmEasy's quick-commerce business with Swiggy Instamart.",
    bullets: [
      "Owned ₹80Cr+ monthly P&L for Aknamed, leading an organisation of 600+ people, restructured to approximately 430, across 21 warehouses and managing ₹76Cr in inventory.",
      "Launched Quick Commerce with Swiggy Instamart — financial model, annual operating plan, commercial structure and partner governance; scaled to ₹1.2Cr monthly GMV within four months.",
      "Opened 19 pharma dark stores across Bangalore, Delhi NCR, Mumbai and Chennai: store setup, regulatory compliance, medicine supply and daily operations, with launch playbooks covering hiring, training, service levels and KPIs.",
      "Ran leadership reviews and dashboards on growth, unit economics, service performance and execution risk; improved same-day delivery SLA from 76% to 92% and cut operating costs by 16%.",
      "Partnered with product and engineering to migrate 21 warehouses to a unified WMS/ERP — business requirements, process mapping, rollout sequencing and post-launch stabilisation.",
      "Managed enterprise relationships and service governance for Roche and Cipla in the Patient Assistance Program.",
    ],
    aliases: ["quick commerce", "aknamed", "instamart", "swiggy", "dark store", "dark stores", "b2h", "hospital", "warehouse"],
  },
  {
    id: "pharmeasy-bh",
    company: "PharmEasy",
    title: "Business Head — Retail, Docon & Health Partners",
    location: "Gurgaon / Mumbai",
    start: "Sep 2022",
    end: "Aug 2024",
    summary:
      "Ran three businesses — offline retail, the Docon EMR and the health-partner network — aligning product, supply chain, finance and operations behind one set of reviews.",
    bullets: [
      "Aligned product, supply chain, finance and operations priorities across three businesses; established monthly reviews and dashboards for city performance, unit economics and expansion readiness.",
      "Built a franchise-owned, company-operated retail chain across four cities, reaching CM2 profitability within eight months and ₹80 lakh combined monthly GMV; standardised store setup, vendor coordination and audit processes.",
      "Managed an 800+ health-partner network generating ₹4Cr+ monthly business; doubled revenue in four months and reached CM2 break-even through partner incentives and operating playbooks.",
      "Revived Docon EMR for 3,500+ monthly active doctors; tripled payment collections and reduced issue tickets by 66% within three months through performance dashboards and structured engagement.",
    ],
    aliases: ["retail", "foco", "franchise", "docon", "health partner", "health partners", "emr", "medical stores", "pharmacies"],
  },
  {
    id: "pharmeasy-docon",
    company: "PharmEasy",
    title: "Head of Operations — Docon",
    location: "Gurgaon / Mumbai",
    start: "Jun 2021",
    end: "Sep 2022",
    summary:
      "Launched PharmEasyOne, a doctor-led distribution platform, and ran the cost-transformation programme that took it from deep losses to near break-even.",
    bullets: [
      "Launched PharmEasyOne across 500+ clinics in 27 cities; defined the business model, success metrics and cross-functional execution plan with leadership, scaling to ₹60Cr annual GMV within 12 months.",
      "Delivered a cost-transformation programme through process redesign, procurement efficiencies, automation and governance; reduced losses by 40% in six months and improved contribution margin from −11% to −3%.",
      "Built an automated procurement engine on 9-Box analytics, shortening the working-capital cycle by 83%; introduced digital audit controls that kept inventory leakage below 1% of inventory value.",
      "Developed training and payroll automation for 300+ pharmacists across 27 cities; integrated CRM and workflow tools so sales, operations and field teams shared one view.",
    ],
    aliases: ["pharmeasyone", "pharmeasy one", "doctor-led", "clinics", "distribution platform", "docon ops"],
  },
  {
    id: "medtrail",
    company: "Medtrail Technologies",
    title: "Vice President — Operations",
    location: "Delhi",
    start: "Aug 2019",
    end: "May 2021",
    summary:
      "Scaled five functions for a doctor-clinic pharmacy network and its prescription-digitisation business; promoted from AVP to VP within 10 months.",
    bullets: [
      "Worked with founders and leadership to scale five functions — doctor-led distribution, digitisation, HR, administration and tech support; built the clinic-pharmacy operating model across 120 stores with 95% customer satisfaction.",
      "Led 200+ digitisers and redesigned prescription-processing workflows with automation and AI-backed validation; throughput rose from 150 prescriptions per 30 minutes to 250 per five minutes and net cost fell 66% to ₹5 per prescription.",
      "Co-developed digital tools for clinic operations, logistics, stock audits and ordering, creating real-time visibility and accountability; built a learning platform that shortened new-hire training by 30 days.",
      "Redesigned last-mile delivery with route-planning algorithms aligned to clinic schedules, cutting workforce and logistics costs by 33% and improving SLA adherence.",
      "Strengthened pharmaceutical supplier partnerships, improving procurement margins by 5%; standardised a centralised medicine master covering 2.5 lakh+ SKUs.",
    ],
    aliases: ["medtrail", "digitisation", "digitization", "prescription", "clinic pharmacy", "vp operations"],
  },
  {
    id: "toikit",
    company: "TOIKIT",
    title: "Founder & CEO",
    location: "Mumbai",
    start: "Jan 2018",
    end: "Aug 2019",
    summary: "Founded a D2C hygiene brand — India's first disposable toilet kits — sold online and offline, and launched on Indian Railways.",
    bullets: [
      "Launched the first disposable toilet kits for the Indian market — 7 products at an accessible price band so people could use public toilets with confidence.",
      "Reached ₹2 lakh monthly revenue in under six months through Amazon, Flipkart, Netmeds, Paytm Mall and Shop Clues, and built offline presence across major Mumbai retailers.",
      "Onboarded Central Railways; the product was launched by Shri Piyush Goyal on the Mumbai Rajdhani Express.",
    ],
    aliases: ["toikit", "startup", "founder", "d2c", "toilet kit", "hygiene", "entrepreneur", "own company"],
  },
  {
    id: "oyo",
    company: "OYO Rooms",
    title: "Micro Market CEO — CyberHub Gurgaon",
    location: "Gurgaon",
    start: "Aug 2015",
    end: "Dec 2017",
    summary: "Owned the CyberHub market P&L and led a revenue turnaround; promoted from BD Manager to Micro Market CEO in five months.",
    bullets: [
      "Owned market P&L and led a revenue turnaround; scaled online monthly GMV from ₹55 lakh to ₹1.7Cr and built a ₹50 lakh monthly offline business within six months.",
      "Improved core KPIs — Shifting by 60% and NPS by 12% — through process diagnostics and incentive realignment; eliminated ₹10 lakh a month of revenue leakage via audit-driven controls.",
      "Renegotiated 50+ partner contracts within a month to remove minimum guarantees, improving the commercial model and risk allocation.",
      "Partnered with product teams to co-create a corporate booking portal, the Tout App and an offline-channel booking platform, improving sales workflows and conversion tracking.",
    ],
    aliases: ["oyo", "oyo rooms", "hotels", "hospitality", "cyberhub", "cybercity", "micro market"],
  },
  {
    id: "gm",
    company: "General Motors",
    title: "Assistant Manager — Aftersales",
    location: "Gurgaon",
    start: "Aug 2013",
    end: "Aug 2015",
    summary: "First job out of engineering: after-sales operations across 11 dealers in North India, recognised with the President's Award.",
    bullets: [
      "Managed service and spare-parts operations across 11 dealers in Uttar Pradesh, Haryana, Rajasthan and Delhi NCR.",
      "Handled the highest number of daily job orders among all after-sales managers in India — 800+ — and grew month-on-month revenue by 20%; received the President's Award for dealer performance and business growth.",
      "Upgraded 4 dealers to the Grand Master category within a year.",
    ],
    aliases: ["general motors", "gm", "chevrolet", "automotive", "after-sales", "aftersales", "dealers", "first job"],
  },
];

export const projects: Project[] = [
  {
    slug: "enterprise-genai-m3m",
    title: "Enterprise GenAI adoption at M3M",
    tagline: "Deploying GenAI as the enterprise platform across 23 departments",
    company: "M3M Group",
    period: "2026 – Present",
    category: "AI",
    featured: true,
    metrics: [
      { value: "300+", label: "Active users" },
      { value: "23", label: "Departments" },
      { value: "3", label: "Group companies" },
    ],
    summary:
      "Led enterprise-wide Generative AI adoption for a large real-estate group: mapped high-impact use cases, deployed a single enterprise GenAI platform, and trained functions to build their own AI workflows.",
    problem:
      "GenAI interest was high but scattered — pockets of individual experimentation, no shared platform, no governance and no repeatable way to turn a use case into a working workflow.",
    approach: [
      "Mapped the use-case landscape function by function and prioritised by impact and feasibility.",
      "Deployed one enterprise GenAI platform across three group companies.",
      "Designed a capability-building programme: hands-on training on GenAI tools, prompt engineering and AI workflow development so teams could ship their own workflows without a central bottleneck.",
    ],
    outcome: [
      "Adoption scaled to 300+ users across 23 departments.",
      "Functions now build and run AI-enabled workflows independently.",
    ],
    aliases: ["genai adoption", "claude rollout", "enterprise ai", "ai adoption", "training", "capability building"],
  },
  {
    slug: "ai-land-deal-engine",
    title: "AI land-deal evaluation engine",
    tagline: "A 2-day manual underwriting process, now under 5 minutes",
    company: "M3M Group",
    period: "2026",
    category: "AI",
    featured: true,
    metrics: [
      { value: "2 days → <5 min", label: "Evaluation time" },
      { value: "50+", label: "Deals / month" },
      { value: "Multi-scenario", label: "IRR · NPV · Cash flow" },
    ],
    summary:
      "Built an AI-powered engine that evaluates land deals end to end — development mix based on zoning, policy and licence eligibility checks, and multi-scenario IRR/NPV/cash-flow modelling.",
    problem:
      "Evaluating a land parcel meant two days of manual work across zoning rules, state policies (Delhi / Haryana / UP), FAR intelligence and spreadsheet P&Ls — too slow for the volume of deals the business wanted to screen.",
    approach: [
      "Encoded the policy rule-base and licence-eligibility logic for each state as reusable rules.",
      "Built a calculation engine for static P&L and dynamic cash flow, with scenario switching for development mix and pricing assumptions.",
      "Added a location screener to draw a parcel and look up its zone, feeding FAR intelligence straight into the model.",
    ],
    outcome: [
      "A two-day manual process now completes in under five minutes.",
      "Powers 50+ deal evaluations every month and gives leadership consistent, comparable outputs across deals.",
    ],
    aliases: ["deal analyzer", "deal analyser", "land deal", "irr", "npv", "underwriting", "deal evaluation", "real estate ai"],
  },
  {
    slug: "ai-voice-agent",
    title: "AI voice agent for dormant leads",
    tagline: "Re-engaging 4,000 leads without adding manual outreach",
    company: "M3M Group",
    period: "2026 – In progress",
    category: "AI",
    metrics: [
      { value: "4,000", label: "Dormant leads" },
      { value: "10%", label: "Target site-visit conversion" },
      { value: "0", label: "Added manual calls" },
    ],
    summary:
      "Building an AI voice agent that calls dormant real-estate leads, qualifies interest and books site visits — unlocking incremental pipeline from leads sales teams had stopped working.",
    problem:
      "Thousands of older leads sat untouched because manual follow-up didn't justify the sales team's time, yet a fraction of them were still in-market.",
    approach: [
      "Designed the conversation flows and qualification logic with the sales team.",
      "Integrated with the lead pipeline so outcomes flow back to CRM without manual entry.",
    ],
    outcome: ["Targeting a 10% site-visit conversion on the dormant base — currently in build and pilot."],
    aliases: ["voice agent", "voice ai", "dormant leads", "calling agent", "lead reactivation"],
  },
  {
    slug: "pharmeasy-quick-commerce",
    title: "Launching PharmEasy Quick Commerce with Swiggy Instamart",
    tagline: "From financial model to ₹1.2Cr monthly GMV in four months",
    company: "PharmEasy",
    period: "2024 – 2025",
    category: "Growth",
    featured: true,
    metrics: [
      { value: "₹1.2Cr", label: "Monthly GMV" },
      { value: "4 months", label: "To scale" },
      { value: "19", label: "Dark stores, 4 cities" },
    ],
    summary:
      "Spearheaded PharmEasy's entry into quick commerce through a partnership with Swiggy Instamart — from the commercial model to the technical integration and the GTM.",
    problem:
      "Medicine delivery was moving to 10–30 minute expectations. PharmEasy needed a quick-commerce play without building a dark-store network from scratch.",
    approach: [
      "Designed the financial model, AOP and P&L structure that anchored the commercial negotiation with Swiggy.",
      "Led the product integration of PharmEasy's inventory and fulfilment stack with Instamart — API handshake, failure handling, SLA tracking and a doctor-consultation module for prescription medicines.",
      "Opened 19 pharma dark stores across Bangalore, Delhi NCR, Mumbai and Chennai — store setup, drug-licence compliance, supply and daily operations — with launch playbooks for hiring, training, service levels and KPIs.",
      "Defined the GTM: assortment, city sequencing and operating cadence.",
    ],
    outcome: ["Scaled to ₹1.2Cr monthly GMV within four months of launch."],
    aliases: ["quick commerce", "instamart", "swiggy", "q-commerce", "qcommerce", "10 minute delivery"],
  },
  {
    slug: "aknamed-pnl",
    title: "Owning an ₹80Cr+ monthly P&L at Aknamed",
    tagline: "Hospital supply chain across 21 warehouses, with service and cost improvements",
    company: "PharmEasy (Aknamed)",
    period: "2024 – 2025",
    category: "Operations",
    featured: true,
    metrics: [
      { value: "₹80Cr+", label: "Monthly P&L" },
      { value: "21", label: "Warehouses" },
      { value: "₹76Cr", label: "Inventory managed" },
    ],
    summary:
      "Ran end-to-end supply chain and warehouse operations for Aknamed, PharmEasy's business-to-hospital entity, with full P&L ownership and an organisation of 600+ people, restructured to approximately 430.",
    problem:
      "A high-volume, low-margin B2H business where working-capital efficiency, stock visibility and SLA adherence across 21 warehouses decided whether growth was profitable.",
    approach: [
      "Owned the P&L end to end, with a performance-governance cadence across supply chain, warehousing and finance.",
      "Migrated 21 warehouses to a unified WMS/ERP with product and engineering — business requirements, process mapping, rollout sequencing and post-launch stabilisation.",
      "Ran leadership reviews and dashboards on growth, unit economics, service performance and execution risk.",
      "Managed enterprise relationships and service governance for Roche and Cipla in the Patient Assistance Program.",
      "Focused the organisation on margin and working-capital levers rather than top-line alone.",
    ],
    outcome: ["Same-day delivery SLA improved from 76% to 92% and operating costs fell 16%.", "Tighter working-capital efficiency across ₹76Cr of inventory."],
    aliases: ["aknamed", "hospital", "b2h", "supply chain", "warehouse", "wms", "p&l", "pnl"],
  },
  {
    slug: "pharmeasy-foco-retail",
    title: "Building PharmEasy's FOCO retail chain",
    tagline: "A FOCO retail chain across four cities, CM2-positive in eight months",
    company: "PharmEasy",
    period: "2022 – 2024",
    category: "Growth",
    metrics: [
      { value: "4", label: "Cities" },
      { value: "8 months", label: "To CM2 profitability" },
      { value: "₹80L", label: "Combined monthly GMV" },
    ],
    summary:
      "Launched and scaled a franchise-owned, company-operated chain of physical medical stores for PharmEasy.",
    problem:
      "Offline pharmacies still captured most of the market; PharmEasy needed a capital-light way to own physical presence and drive app adoption.",
    approach: [
      "Wrote the operational playbook for launching and running stores and built a 140+ member team.",
      "Negotiated store layouts and interiors with vendors to optimise capex.",
      "Lifted first-fill procurement rate from 63% to 92% through sales-trend analysis and warehouse availability; streamlined audits to keep losses under 1% of inventory value.",
      "Implemented Leadsquared for franchise onboarding, an automated 9-Box ordering flow integrated with the POS, and a cloud mPOS billing app.",
    ],
    outcome: [
      "Reached CM2 profitability within eight months.",
      "Combined monthly GMV scaled to ₹80 lakh; the separate Health Partner Network generated ₹4Cr+ monthly business.",
    ],
    aliases: ["foco", "franchise", "retail chain", "medical stores", "offline retail", "stores"],
  },
  {
    slug: "docon-emr",
    title: "Reviving Docon EMR",
    tagline: "Tripled collections and cut support tickets by two-thirds",
    company: "PharmEasy (Docon)",
    period: "2022 – 2024",
    category: "Product",
    metrics: [
      { value: "3,500+", label: "Monthly active doctors" },
      { value: "3×", label: "Payment collections" },
      { value: "−66%", label: "Issue tickets" },
    ],
    summary:
      "Led the product revamp and operating turnaround of Docon, a doctor-facing EMR SaaS product.",
    problem: "An ageing EMR with weak collections, a heavy support load and a doctor base that needed to be retained.",
    approach: [
      "Defined the roadmap, prioritised the backlog and shipped features that removed the biggest sources of doctor friction.",
      "Fixed the payment-collection flow and built analytics dashboards for performance tracking.",
    ],
    outcome: ["Tripled doctor payment collections and reduced issue tickets by 66% within three months."],
    aliases: ["docon", "emr", "doctors", "saas"],
  },
  {
    slug: "pharmeasyone",
    title: "PharmEasyOne — doctor-led distribution at scale",
    tagline: "500+ clinics in 27 cities, ₹60Cr annual GMV in 12 months",
    company: "PharmEasy",
    period: "2021 – 2022",
    category: "Growth",
    metrics: [
      { value: "₹60Cr", label: "Annual GMV" },
      { value: "500+", label: "Clinics" },
      { value: "27", label: "Cities" },
    ],
    summary:
      "Launched a tech-enabled, doctor-led B2B distribution platform for PharmEasy and scaled it across 27 cities with a 400+ team.",
    problem: "Clinic pharmacies were a fragmented, under-served channel with poor ordering, replenishment and logistics.",
    approach: [
      "Defined product requirements integrating clinic-facing digital ordering, logistics tracking and inventory replenishment.",
      "Built the cross-functional operating model across operations, logistics and clinic-facing tools.",
      "Delivered a cost-transformation programme — process redesign, procurement efficiencies, automation and governance — that reduced losses by 40% in six months and improved contribution margin from −11% to −3%.",
      "Built an automated 9-Box procurement engine that shortened the working-capital cycle by 83%, with digital audit controls keeping inventory leakage below 1%.",
      "Developed training and payroll automation for 300+ pharmacists across 27 cities and integrated CRM and workflow tools for shared visibility.",
    ],
    outcome: ["Scaled to ₹60Cr annual GMV across 500+ clinics in 27 cities within 12 months.", "Working-capital cycle shortened by 83%; losses down 40% in six months."],
    aliases: ["pharmeasyone", "pharmeasy one", "doctor led", "clinics", "distribution platform"],
  },
  {
    slug: "medtrail-digitisation",
    title: "AI-augmented prescription digitisation",
    tagline: "From 150 Rx per 30 minutes to 250 Rx per 5 minutes",
    company: "Medtrail Technologies",
    period: "2019 – 2021",
    category: "AI",
    featured: true,
    metrics: [
      { value: "10×", label: "Throughput" },
      { value: "−66%", label: "Cost per Rx (to ₹5)" },
      { value: "200+", label: "Digitisers led" },
    ],
    summary:
      "Redesigned the prescription-digitisation workflow with automation and AI-backed validation, and rebuilt the portal, training and LMS around it.",
    problem:
      "Handwritten prescriptions had to be digitised manually; throughput was 150 prescriptions every 30 minutes and unit cost was too high to scale.",
    approach: [
      "Built structured training datasets from doctor prescriptions to improve model accuracy.",
      "Redesigned the workflow around AI-backed validation and revamped the in-house portal to bring per-prescription time under 60 seconds.",
      "Designed an in-house LMS that shortened the digitiser learning curve by 30 days.",
    ],
    outcome: [
      "Throughput rose to 250 prescriptions every 5 minutes.",
      "Net digitisation cost fell 66% to ₹5 per prescription within 10 months.",
    ],
    aliases: ["digitisation", "digitization", "prescription", "ocr", "rx", "medtrail ai"],
  },
  {
    slug: "medtrail-product-suite",
    title: "Six internal products for a clinic-pharmacy network",
    tagline: "Dispensary app, POS, logistics, audit, ordering and LMS",
    company: "Medtrail Technologies",
    period: "2019 – 2021",
    category: "Product",
    metrics: [
      { value: "6", label: "Products shipped" },
      { value: "₹25Cr", label: "Annual GMV supported" },
      { value: "−33%", label: "Logistics cost" },
    ],
    summary:
      "Owned end-to-end product for the digital tools running a 120-store doctor-clinic pharmacy network.",
    problem:
      "Clinic dispensaries in low-connectivity environments had no real-time inventory, margin or fulfilment visibility, and last-mile delivery was manual.",
    approach: [
      "Smart Dispensaries app for doctors: real-time inventory, margin visibility and prescription fulfilment across 120 clinics.",
      "Clinic POS designed for low connectivity — billing, inventory deduction and patient receipts.",
      "Rider logistics app with route-optimised pickup and delivery plus digital handshake at drop-off.",
      "Field audit app with variance flagging — pilferage under 1%, audit time halved.",
      "AI-assisted 9-Box order-placement portal for zero stock-outs and an optimum 0.6:1 inventory ratio; centralised master data for 2.5 lakh+ SKUs.",
    ],
    outcome: [
      "Network scaled to ₹25Cr annual GMV with 95% customer satisfaction.",
      "Route optimisation cut workforce and logistics cost by 33%.",
    ],
    aliases: ["pos", "logistics app", "audit app", "dispensary", "internal tools", "medtrail products", "sku"],
  },
  {
    slug: "toikit",
    title: "TOIKIT — India's first disposable toilet kit",
    tagline: "A D2C brand from idea to Indian Railways in 18 months",
    company: "TOIKIT (Founder)",
    period: "2018 – 2019",
    category: "Entrepreneurship",
    metrics: [
      { value: "7", label: "Products launched" },
      { value: "₹2L", label: "Monthly revenue in <6 months" },
      { value: "Indian Railways", label: "Anchor client" },
    ],
    summary:
      "Founded and ran a D2C hygiene brand making public restrooms usable — sold across Amazon, Flipkart, Netmeds, Paytm Mall and Shop Clues, and launched on the Mumbai Rajdhani Express.",
    problem: "Public toilets in India are a hygiene problem nobody had productised for travellers.",
    approach: [
      "Designed 7 products at an accessible price band and launched across five online marketplaces.",
      "Built offline presence across major Mumbai retailers.",
      "Signed Central Railways; the product was launched by Minister Shri Piyush Goyal on the Mumbai Rajdhani Express.",
    ],
    outcome: ["₹2 Lakh monthly revenue within six months and a national anchor client."],
    aliases: ["toikit", "toilet kit", "d2c", "founder", "startup", "railways"],
  },
  {
    slug: "oyo-cyberhub",
    title: "Turning around OYO's CyberHub market",
    tagline: "Online GMV from ₹55L to ₹1.7Cr and a ₹50L offline business in six months",
    company: "OYO Rooms",
    period: "2015 – 2017",
    category: "Growth",
    metrics: [
      { value: "3×", label: "Online GMV" },
      { value: "₹50L", label: "Offline business built" },
      { value: "#2 of 53", label: "MM CEOs, two quarters running" },
    ],
    summary:
      "Owned the CyberHub (Gurgaon) market P&L as Micro Market CEO — promoted from BD Manager in five months — and led a revenue turnaround.",
    problem: "A high-potential business-district market that was under-supplied and under-monetised.",
    approach: [
      "Renegotiated 50+ partner contracts within a month to remove minimum guarantees, improving the commercial model and risk allocation.",
      "Improved Shifting by 60% and NPS by 12% through process diagnostics and incentive realignment; eliminated ₹10 lakh a month of revenue leakage via audit-driven controls.",
      "Co-created a corporate booking portal, the Tout App and an offline-channel booking platform with the product team.",
    ],
    outcome: [
      "Online monthly GMV grew from ₹55 lakh to ₹1.7Cr and a ₹50 lakh monthly offline business was built within six months.",
      "Ranked #2 of 53 micro-market CEOs for two consecutive quarters (OYO Champions League and Premier League).",
    ],
    aliases: ["oyo", "cyberhub", "hotels", "gurgaon market"],
  },
  {
    slug: "flatwalkie",
    title: "FlatWalkie — push-to-talk over the internet",
    tagline: "A weekend Android + Node.js prototype",
    company: "Side project",
    period: "2026",
    category: "Side project",
    metrics: [
      { value: "6-digit", label: "Private channels" },
      { value: "1", label: "Active speaker at a time" },
      { value: "WebSocket", label: "Audio relay" },
    ],
    summary:
      "A push-to-talk Android app where every phone on a private channel hears the active speaker — across Wi-Fi or mobile data, with a provider-neutral Node.js relay.",
    problem: "Wanted a walkie-talkie for small groups that works across networks without pairing devices.",
    approach: [
      "Android client with hold-to-talk PCM streaming, always-listening foreground mode and automatic reconnection.",
      "Node.js WebSocket relay that forwards live audio without storing it; token-based channel membership.",
    ],
    outcome: ["Working MVP — mostly an excuse to build something end to end with AI coding tools."],
    aliases: ["flatwalkie", "walkie", "push to talk", "android", "side project", "hobby project"],
  },
];

export const skills = {
  business: [
    "P&L management & resource allocation",
    "Business strategy & execution",
    "Operating-model design",
    "KPI frameworks & operating reviews",
    "Market expansion & operational readiness",
    "Strategic partnerships",
    "India & regional operations",
    "Executive stakeholder management",
    "Team building & leadership development",
    "Cross-functional leadership",
  ],
  ai: [
    "Enterprise AI adoption",
    "AI-enabled business transformation",
    "AI workflow design & automation",
    "Process improvement & automation",
    "Prompt engineering",
    "Decision-support tools",
  ],
  product: ["0→1 launches", "Business cases & BRDs", "B2B / SaaS platforms", "Third-party integrations", "Analytics dashboards"],
  tools: ["GenAI platforms", "Excel / financial models", "SQL", "WMS / ERP", "Leadsquared", "ClickUp", "Notion"],
};

export const education = [
  {
    degree: "MBA (PGPX), one-year full-time",
    school: "Indian Institute of Management Ahmedabad",
    years: "2025 – 2026",
    note: "Academic Merit Award and Exit Scholarship — top 5% of the batch",
  },
  {
    degree: "B.Tech, Mechanical Engineering",
    school: "VNIT Nagpur",
    years: "2009 – 2013",
    note: "Won the fastest Formula car award at the first SUPRA SAE India",
  },
];

export const achievements = [
  "President's Award, General Motors — dealer performance and business growth; upgraded 4 dealers to Grand Master within a year",
  "Promoted from BD Manager to Micro Market CEO in 5 months at OYO; ranked #2 of 53 MM CEOs for two consecutive quarters",
  "Promoted from AVP to VP Operations within 10 months at Medtrail",
  "IIM Ahmedabad Academic Merit Award and Exit Scholarship (top 5% of the batch)",
  "Fastest Formula car, SUPRA SAE India; 2nd at the Oxford Find Out quiz",
];

export const suggestions = {
  home: [
    "How can you help my company?",
    "Walk me through your career",
    "What are you working on at M3M?",
    "Show me your AI projects",
    "How do I book a call?",
  ],
  projects: [
    "Tell me about the land-deal engine",
    "How did the Quick Commerce launch work?",
    "What happened at Aknamed?",
    "Any side projects?",
  ],
  about: ["What are your key skills?", "Tell me about IIM Ahmedabad", "How can we work together?", "Show me your projects"],
  // One chip per section so the chat exposes everything Classic and Terminal show.
  sections: ["How can you help my company?", "Walk me through your career", "Show me all your projects", "What are your key skills?", "Where did you study?", "Any awards?", "How can I reach you?"],
  afterProject: ["Show me another project", "What was your role there?", "How can I reach you?"],
};

/** Public narrative distilled from the profile documents; shared with search and terminal. */
export const storyChapters = [
  { years: "2009—2015", title: "An engineer, out in the field.", text: "I studied mechanical engineering at VNIT Nagpur, where our team won the fastest Formula car award at SUPRA SAE India. My first professional chapter was at General Motors: service operations, dealer networks and the everyday work of keeping customers moving." },
  { years: "2015—2019", title: "From running a market to starting a brand.", text: "At OYO, I moved from Business Development Manager to Micro Market CEO and owned the CyberHub market P&L. Then came TOIKIT: a public-hygiene brand I founded, taking seven products through development, branding and distribution, including a launch on the Mumbai Rajdhani Express." },
  { years: "2019—2025", title: "Healthcare, at operating scale.", text: "At Medtrail and PharmEasy, my work connected business ownership with the products behind it: clinic platforms, prescription digitisation, retail operations and hospital supply chains. I launched PharmEasyOne across 27 cities, led the quick-commerce launch with Swiggy Instamart and owned Aknamed’s ₹80Cr+ monthly P&L." },
  { years: "2025—2026", title: "A year back in the classroom.", text: "I completed the full-time, one-year PGPX at IIM Ahmedabad, receiving the Academic Merit Award and Exit Scholarship for finishing in the top 5% of the batch. A new chapter in a career that has moved between engineering, entrepreneurship, operations and product." },
  { years: "NOW", title: "Putting AI to work.", text: "Today, I lead AI transformation at M3M, working across three group companies. That includes helping teams adopt GenAI and building tools such as a land-deal evaluation engine. Alongside that work, I take on select advisory conversations and keep building small experiments of my own." },
];

projects.push({
  slug: "conversational-portfolio", title: "This website, built to answer back", tagline: "One profile. A conversation, a reading experience and a working terminal.", company: "Personal project", period: "2026", category: "Side project", featured: true,
  metrics: [{value:"3",label:"Ways to explore"},{value:"Local",label:"Profile search"},{value:"No sign-up",label:"Open to explore"}],
  summary: "Designed and built an interactive personal website with AI coding tools. Visitors can read the work, ask about it or explore the same profile through a desktop and terminal.",
  problem: "A conventional profile makes every visitor read the same sequence. A founder, a hiring leader and a curious peer often want very different details. The site needed to make those details easy to find while keeping running costs close to zero.",
  approach: ["Kept roles, projects, services and contact information in a shared content model so the different interfaces draw on the same facts.","Built structured handlers for career dates, companies and common questions, with local keyword retrieval for questions outside the scripted set.","Connected project stories to the conversation and linked consulting offers to their corresponding Topmate sessions.","Made the reading experience work on phones, added keyboard navigation and supported reduced motion and light/dark themes."],
  outcome: ["A working portfolio that can be explored through reading, conversation or terminal commands.","Scripted answers and local retrieval run in the browser without a model API charge. The optional server-side model fallback is disabled on GitHub Pages."],
  aliases: ["this website","this site","portfolio","how was this built","chat engine","scripted answers","local retrieval"],
});
