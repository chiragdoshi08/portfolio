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
  headline: "Strategy & Business Transformation Leader",
  subheadline: "P&L ownership · Operating-model redesign · Digital & AI transformation",
  location: "Gurgaon, India",
  intro:
    "Hi, I'm Chirag. I build and scale businesses — and these days I spend most of my time bringing Generative AI into how they actually run.",
  summary:
    "Strategy and business transformation leader with 12+ years across consumer tech, healthcare and digital businesses. I've owned an ₹80Cr+ monthly P&L, led a 400+ member cross-functional organisation, launched businesses from zero, and now lead enterprise GenAI adoption — building AI-powered decision tools that compress multi-day processes into minutes.",
  currently:
    "Business Transformation Lead in the Management Office at M3M, where I lead enterprise-wide Generative AI adoption and build AI decision tools. Recently completed the one-year MBA (PGPX) at IIM Ahmedabad, graduating in the top 5% of the batch.",
  focusAreas: [
    "Enterprise GenAI adoption",
    "AI-powered decision tools",
    "P&L turnarounds",
    "0→1 business launches",
    "Operating-model design",
  ],
  // Offer-led headline used by the Classic and Desktop views (the chat keeps the friendlier intro).
  offerHeadline: "I help businesses put AI to work — from the adoption roadmap to the deployed workflow.",
  offerSub:
    "Operator first, advisor second: I've owned an ₹80Cr+ monthly P&L, led 400+ people, launched businesses from zero — and now lead enterprise GenAI adoption at M3M.",
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

/** Quick-scan facts for the Classic hero strip and the Desktop readme. */
export const glance: Metric[] = [
  { value: "12+ yrs", label: "Building & scaling businesses" },
  { value: "₹80Cr+", label: "Monthly P&L owned" },
  { value: "400+", label: "People led" },
  { value: "300+", label: "Users on Claude at M3M" },
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
    proof: "Rolled out Claude to 300+ users across 23 departments at M3M.",
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
    company: "M3M Group",
    title: "Business Transformation Lead — Management Office (AI Transformation)",
    location: "Gurgaon",
    start: "May 2026",
    end: "Present",
    summary:
      "Leading enterprise-wide Generative AI adoption for a large real-estate group, and building AI-powered decision tools for the business.",
    bullets: [
      "Led enterprise-wide Generative AI adoption across M3M Group — mapped high-impact use cases and deployed Claude as the enterprise AI platform; scaled adoption to 300+ users across 23 departments and three group companies.",
      "Designed and led GenAI capability-building: trained teams on Claude, prompt engineering and AI workflow development so functions can build their own AI-enabled workflows.",
      "Built an AI-powered land-deal evaluation engine covering development mix (zoning), policy checks and multi-scenario IRR/NPV/cash-flow modelling — a 2-day manual process now runs in under 5 minutes and powers 50+ deal evaluations a month.",
      "Building an AI voice agent to re-engage 4,000 dormant leads, targeting a 10% site-visit conversion rate without added manual outreach.",
    ],
    aliases: ["m3m", "real estate", "current role", "currently", "now", "management office", "ai transformation"],
  },
  {
    id: "pharmeasy",
    company: "PharmEasy",
    title: "Head — Quick Commerce, Aknamed, Retail & Docon",
    location: "Gurgaon / Mumbai",
    start: "Jun 2021",
    end: "Apr 2025",
    summary:
      "Directed strategy, operations and GTM across a multi-vertical portfolio: quick commerce, hospital supply (Aknamed), offline retail, SaaS (Docon EMR) and partner-led distribution.",
    bullets: [
      "Owned ₹80Cr+ monthly P&L for Aknamed (B2H entity) — end-to-end supply chain and warehouse operations across 21 cities, ₹76Cr inventory and a 400+ member organisation.",
      "Spearheaded the launch of PharmEasy's Quick Commerce vertical with Swiggy Instamart: built the financial model, AOP and P&L structure for commercial negotiations and defined the GTM that scaled to ₹1.2Cr monthly GMV within 4 months.",
      "Built a FOCO (franchise-owned, company-operated) retail chain across four cities — 25 franchises and 3 corporate stores with a 140+ team; CM2 profitability in eight months and ₹4Cr+ monthly GMV.",
      "Revived Docon EMR (3,500+ monthly active doctors): tripled doctor payment collections, cut issue tickets by 66% and built performance dashboards.",
      "Oversaw a network of 800+ health partners generating ₹4Cr+ monthly for the PharmEasy app; doubled revenue in 4 months and reached CM2 break-even.",
      "Earlier launched PharmEasyOne, a tech-enabled doctor-led distribution platform across 500+ clinics in 27 cities, scaled to ₹60Cr annual GMV.",
    ],
    aliases: ["pharmeasy", "pharm easy", "aknamed", "docon", "quick commerce", "instamart", "swiggy", "foco", "retail", "pharmeasyone", "pharmacy"],
  },
  {
    id: "medtrail",
    company: "Medtrail Technologies",
    title: "Vice President — Operations",
    location: "Delhi",
    start: "Aug 2019",
    end: "May 2021",
    summary:
      "Ran operations across five verticals for a doctor-clinic pharmacy network and its prescription-digitisation business; fast-tracked from AVP to VP.",
    bullets: [
      "Directed operations across doctor-led distribution, digitisation, HR, administration and tech support.",
      "Scaled the doctor-clinic pharmacy network to ₹25Cr annual GMV across 120 stores with 95% customer satisfaction.",
      "Improved prescription-digitisation throughput from 150 Rx/30 min to 250 Rx/5 min and cut net cost by 66% to ₹5 per prescription using automation, workflow redesign and AI-backed validation; led 200+ digitisers.",
      "Built six internal digital products — Smart Dispensaries app, clinic POS, logistics app, audit app, order-placement portal and an LMS.",
      "Re-engineered last-mile delivery with in-house route-optimisation, cutting workforce and logistics cost by 33% while improving SLA adherence.",
    ],
    aliases: ["medtrail", "vp operations", "digitisation", "digitization", "prescription"],
  },
  {
    id: "toikit",
    company: "TOIKIT",
    title: "Founder & CEO",
    location: "Mumbai",
    start: "Jan 2018",
    end: "Aug 2019",
    summary: "Founded a D2C hygiene brand — India's first disposable toilet kits for public restrooms.",
    bullets: [
      "Launched 7 products across Amazon, Flipkart, Netmeds, Paytm Mall and Shop Clues; scaled to ₹2 Lakh monthly revenue within 6 months and built offline presence across Mumbai retailers.",
      "Signed Indian Railways (Central Railways) as a client — product officially launched on the Mumbai Rajdhani Express by Minister Shri Piyush Goyal.",
    ],
    aliases: ["toikit", "founder", "startup", "d2c", "entrepreneur", "own company", "railways"],
  },
  {
    id: "oyo",
    company: "OYO Rooms",
    title: "Micro-Market CEO — CyberHub Gurgaon",
    location: "Gurgaon",
    start: "Aug 2015",
    end: "Dec 2017",
    summary: "Owned the P&L for the Cybercity (Gurgaon) market, from BD Manager to Micro-Market CEO.",
    bullets: [
      "Drove a revenue turnaround through channel and pricing strategy; ranked 2nd nationally in business performance twice.",
      "Scaled online GMV from ₹55 Lakh to ₹1.7Cr and built a ₹50 Lakh offline business within six months; fastest-growing market pan-India and first to achieve a positive take rate.",
      "Onboarded 10 large corporate clients, acquired 70+ properties, and partnered with the product team on the corporate booking portal, Tout app and offline-channel booking platform.",
    ],
    aliases: ["oyo", "hotels", "cyberhub", "cybercity", "micro market"],
  },
  {
    id: "gm",
    company: "General Motors",
    title: "Assistant Manager — After Sales",
    location: "Gurgaon",
    start: "Aug 2013",
    end: "Aug 2015",
    summary: "Managed after-sales operations for 11 dealers across UP, Haryana, Rajasthan and Delhi NCR.",
    bullets: [
      "Handled the highest daily job-order volume among after-sales managers in India (800+) and grew month-on-month revenue by 20%.",
      "Received the President's Award for dealer performance and business growth; upgraded 4 key dealers to Grand Master category within a year.",
      "Designed and launched 20 subsidised mobile service vans to cut vehicle breakdown time and improve retention.",
    ],
    aliases: ["general motors", "gm", "chevrolet", "automotive", "after sales", "first job"],
  },
];

export const projects: Project[] = [
  {
    slug: "enterprise-genai-m3m",
    title: "Enterprise GenAI adoption at M3M",
    tagline: "Deploying Claude as the enterprise AI platform across 23 departments",
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
      "Led enterprise-wide Generative AI adoption for a large real-estate group: mapped high-impact use cases, deployed Claude as the enterprise platform, and trained functions to build their own AI workflows.",
    problem:
      "GenAI interest was high but scattered — pockets of individual experimentation, no shared platform, no governance and no repeatable way to turn a use case into a working workflow.",
    approach: [
      "Mapped the use-case landscape function by function and prioritised by impact and feasibility.",
      "Deployed Claude as the single enterprise AI platform across three group companies.",
      "Designed a capability-building programme: hands-on training on Claude, prompt engineering and AI workflow development so teams could ship their own workflows without a central bottleneck.",
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
      { value: "3rd-party", label: "Platform integration" },
    ],
    summary:
      "Spearheaded PharmEasy's entry into quick commerce through a partnership with Swiggy Instamart — from the commercial model to the technical integration and the GTM.",
    problem:
      "Medicine delivery was moving to 10–30 minute expectations. PharmEasy needed a quick-commerce play without building a dark-store network from scratch.",
    approach: [
      "Designed the financial model, AOP and P&L structure that anchored the commercial negotiation with Swiggy.",
      "Led the product integration of PharmEasy's inventory and fulfilment stack with Instamart — API handshake, failure handling, SLA tracking and a doctor-consultation module for prescription medicines.",
      "Defined the GTM: assortment, city sequencing and operating cadence.",
    ],
    outcome: ["Scaled to ₹1.2Cr monthly GMV within four months of launch."],
    aliases: ["quick commerce", "instamart", "swiggy", "q-commerce", "qcommerce", "10 minute delivery"],
  },
  {
    slug: "aknamed-pnl",
    title: "Owning an ₹80Cr+ monthly P&L at Aknamed",
    tagline: "Hospital supply chain across 21 cities and a 400-person organisation",
    company: "PharmEasy (Aknamed)",
    period: "2023 – 2025",
    category: "Operations",
    featured: true,
    metrics: [
      { value: "₹80Cr+", label: "Monthly P&L" },
      { value: "21", label: "Cities" },
      { value: "₹76Cr", label: "Inventory managed" },
    ],
    summary:
      "Ran end-to-end supply chain and warehouse operations for Aknamed, PharmEasy's business-to-hospital entity, with full P&L ownership and a 400+ member team.",
    problem:
      "A high-volume, low-margin B2H business where working-capital efficiency, stock visibility and SLA adherence across 21 cities decided whether growth was profitable.",
    approach: [
      "Owned the P&L end to end, with a performance-governance cadence across supply chain, warehousing and finance.",
      "Led the WMS migration across 21 cities, building data-visibility systems for stock, SLA and working capital.",
      "Focused the organisation on margin and working-capital levers rather than top-line alone.",
    ],
    outcome: ["Profitable growth with tighter working-capital efficiency across ₹76Cr of inventory."],
    aliases: ["aknamed", "hospital", "b2h", "supply chain", "warehouse", "wms", "p&l", "pnl"],
  },
  {
    slug: "pharmeasy-foco-retail",
    title: "Building PharmEasy's FOCO retail chain",
    tagline: "25 franchises and 3 corporate stores, CM2-positive in eight months",
    company: "PharmEasy",
    period: "2022 – 2023",
    category: "Growth",
    metrics: [
      { value: "28", label: "Stores across 4–5 cities" },
      { value: "8 months", label: "To CM2 profitability" },
      { value: "₹4Cr+", label: "Monthly GMV" },
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
      "Built the training module for 500+ pharmacists across 27 cities.",
    ],
    outcome: [
      "Stores hit month-on-month revenue targets with 95% efficiency and reached CM2 profitability within eight months.",
      "Monthly GMV scaled past ₹4Cr in 12 months.",
    ],
    aliases: ["foco", "franchise", "retail chain", "medical stores", "offline retail", "stores"],
  },
  {
    slug: "docon-emr",
    title: "Reviving Docon EMR",
    tagline: "Tripled collections and cut support tickets by two-thirds",
    company: "PharmEasy (Docon)",
    period: "2023 – 2024",
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
      "Reduced losses by 40% in six months and improved contribution margin from −11% to −3% while growing 2.5× year on year.",
    ],
    outcome: ["Scaled to ₹60Cr annual GMV across 500+ clinics in 27 cities within 12 months."],
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
      { value: "#2", label: "Nationally, twice" },
    ],
    summary:
      "Owned the Cybercity (Gurgaon) P&L as Micro-Market CEO and drove a revenue turnaround through channel and pricing strategy.",
    problem: "A high-potential business-district market that was under-supplied and under-monetised.",
    approach: [
      "Acquired 70+ properties and re-negotiated 50 partner contracts in a month to build an MG-free cluster.",
      "Onboarded 10 large corporate clients and closed a 2,100-room-night sports event in a week.",
      "Improved shifting by 60% and NPS by 12%, and plugged ₹10L/month of revenue leakage through audits.",
    ],
    outcome: [
      "Fastest-growing market pan-India and the first to reach a positive take rate; ranked #1 of 12 regions on monthly revenue (₹4.34Cr).",
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
    "P&L ownership",
    "Business & growth strategy",
    "Operating-model design",
    "Financial modelling",
    "Revenue & margin optimisation",
    "Performance governance",
    "GTM & launch execution",
    "Cross-functional leadership",
  ],
  ai: [
    "Generative AI strategy & adoption",
    "AI-led business transformation",
    "AI-enabled process redesign",
    "Prompt engineering",
    "AI workflow development",
    "Decision-support tools",
  ],
  product: [
    "0→1 product builds",
    "Roadmaps & PRDs",
    "B2B / SaaS platforms",
    "Third-party integrations",
    "Analytics dashboards",
  ],
  tools: ["Claude", "Excel / financial models", "SQL", "Leadsquared", "ClickUp", "PAZO", "Notion"],
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
  "President's Award, General Motors — dealer performance and business growth",
  "Top-ranked Market Head at OYO (ranked #2 nationally, twice)",
  "Fast-track promotion from AVP to VP at Medtrail",
  "IIM Ahmedabad Academic Merit Award and Exit Scholarship (top 5%)",
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
