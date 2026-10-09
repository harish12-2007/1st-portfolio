import { SITE } from "../config";

export const ROLES = [
  "AI/ML Engineer",
  "Machine Learning Enthusiast",
  "Python Developer",
  "Problem Solver",
];

export const ABOUT = [
  "I'm a Computer Science & Engineering student specialising in Artificial Intelligence and Machine Learning, based in Karnataka. I started with a diploma in Computer Science and I'm now continuing into an AI & ML engineering degree.",
  "I like problems where data, systems and decisions meet. Most of my project work is in Python: backtesting engines, data pipelines and services that have to stay correct under load.",
  "I learn by building something, then working out exactly why it broke. Right now I'm focused on machine learning fundamentals, data analysis and the engineering around models: testing, validation and reliable systems.",
  "My goal is to become an AI/ML engineer who builds systems that hold up outside a notebook.",
];

export const ABOUT_FACTS = [
  { k: "Studying", v: "CSE (Artificial Intelligence & Machine Learning)" },
  { k: "Based in", v: SITE.location },
  { k: "Main language", v: "Python" },
  { k: "Interested in", v: "ML, data science, cloud and AI systems" },
  { k: "Aiming for", v: "AI/ML Engineer" },
];

export type EducationItem = {
  title: string;
  place?: string;
  period: string;
  note?: string;
  current?: boolean;
};

export const EDUCATION: EducationItem[] = [
  {
    title: "B.E. Computer Science & Engineering (Artificial Intelligence & Machine Learning)",
    period: "Current",
    note: "Engineering degree with an AI & ML specialisation.",
    current: true,
  },
  {
    title: "Diploma in Computer Science & Engineering",
    place: "Government Polytechnic, Turuvekere",
    period: "2023 – 2026",
    note: "Programming, databases and core computer science.",
  },
  {
    title: "SSLC",
    place: "Government Junior College, Gubbi",
    period: "2023",
    note: "80.96%",
  },
];

export type SkillGroup = {
  name: string;
  blurb: string;
  skills: { name: string; usedIn?: string[] }[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Programming",
    blurb: "Languages I write code in.",
    skills: [
      { name: "Python", usedIn: ["Trading research suite", "Chronos", "Solana arbitrage"] },
      { name: "Java" },
      { name: "SQL", usedIn: ["Chronos"] },
    ],
  },
  {
    name: "AI / ML",
    blurb: "The area I'm specialising in.",
    skills: [
      { name: "Machine Learning", usedIn: ["Solana arbitrage", "Trading research suite"] },
      { name: "Artificial Intelligence" },
      { name: "Data Science" },
      { name: "Model Development" },
      { name: "Data Analysis", usedIn: ["Trading research suite"] },
    ],
  },
  {
    name: "Web",
    blurb: "Front-end basics.",
    skills: [{ name: "HTML", usedIn: ["ORACLE"] }, { name: "CSS", usedIn: ["ORACLE"] }],
  },
  {
    name: "Developer tools",
    blurb: "How I work day to day.",
    skills: [{ name: "Git" }, { name: "GitHub" }, { name: "VS Code" }, { name: "Jupyter" }],
  },
  {
    name: "Databases",
    blurb: "Storing and querying data.",
    skills: [{ name: "MySQL" }],
  },
];

export type ProjectVisualKey = "signal" | "voice" | "orderbook" | "routes";
export type Project = {
  id: string;
  title: string;
  category: string;
  status: "In Progress" | "Prototype" | "Completed";
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  learned: string[];
  tech: string[];
  visual: ProjectVisualKey;
  /** Add a repository URL to link straight to the code. */
  repoUrl?: string;
  liveUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "trading-suite",
    title: "Systematic trading research suite",
    category: "Quantitative research",
    status: "In Progress",
    summary:
      "A Python suite for testing crypto-perpetual strategies on Binance data, built around honest validation.",
    problem:
      "Strategy ideas are easy to curve-fit. A backtest that looks good on one stretch of history says very little about whether an edge is real.",
    solution:
      "A modular codebase that tests each strategy on real aggressor-side order flow and price data, then stress-tests it with walk-forward validation and Monte Carlo simulation before anything is trusted.",
    features: [
      "Order Flow Liquidity Sweep strategy built as a sequential state machine",
      "Walk-forward validation across several folds, plus Monte Carlo simulation",
      "One shared risk framework: ATR stops, per-trade risk cap and daily loss halt",
      "Backtest engines that export Excel reports and equity and drawdown charts",
      "Streamlit dashboard concept with an ML signal filter (XGBoost / LSTM) in design",
    ],
    learned: [
      "Validation design matters more than the strategy itself.",
      "Replacing a fragile dependency with native pandas code made the suite easier to reproduce.",
      "Writing risk rules once and reusing them keeps strategies comparable.",
    ],
    tech: ["Python", "pandas", "ccxt", "Streamlit", "XGBoost (exploring)"],
    visual: "signal",
    repoUrl: undefined,
  },
  {
    id: "oracle",
    title: "ORACLE voice assistant",
    category: "Personal AI assistant",
    status: "Prototype",
    summary:
      "A voice-driven, terminal-style interface for asking about live crypto futures markets.",
    problem:
      "Getting a quick read on several markets means jumping between tabs and tables, which is slow when you only want a short answer.",
    solution:
      "A single-file web interface that pulls public USDT-M futures data from Binance and refreshes it every 15 seconds. It detects a local backend automatically and falls back to public data when none is running.",
    features: [
      "Voice interface with a terminal-style UI",
      "Live public market data on a 15-second refresh cycle",
      "Automatic detection of a local backend",
      "Runs from one HTML file with no build step",
    ],
    learned: [
      "Designing a clean fallback for when a backend isn't there.",
      "Working with public exchange REST APIs and sensible polling.",
      "Next step: a FastAPI and ccxt companion backend.",
    ],
    tech: ["JavaScript", "HTML", "CSS", "Binance public API"],
    visual: "voice",
  },
  {
    id: "chronos",
    title: "Chronos matching engine",
    category: "Systems engineering",
    status: "In Progress",
    summary: "A low-latency matching engine for multi-symbol crypto derivatives.",
    problem:
      "An exchange lives or dies on how quickly and how correctly it matches orders. Getting both right under load is the hard part.",
    solution:
      "A Python matching engine built on sorted price levels and first-in-first-out queues, fed by a Kafka event stream and backed by a TimescaleDB schema, with correctness checks and load tests in the pipeline.",
    features: [
      "Multi-symbol order book using SortedDict and deque",
      "FastAPI service layer with Kafka (KRaft) event streaming",
      "PostgreSQL and TimescaleDB schema for trades and time-series data",
      "k6 load tests and a GitHub Actions CI/CD pipeline",
    ],
    learned: [
      "Choosing data structures around the access pattern, in this case price-time priority.",
      "Proving correctness first, then measuring speed.",
      "How streaming, storage and the engine fit together as one system.",
    ],
    tech: ["Python 3.12", "FastAPI", "Kafka", "PostgreSQL", "TimescaleDB", "Redis", "k6"],
    visual: "orderbook",
  },
  {
    id: "solana-arbitrage",
    title: "Multi-DEX arbitrage scaffold",
    category: "AI-assisted DeFi tooling",
    status: "In Progress",
    summary:
      "An async Python scaffold that looks for SOL/USDC price gaps across Jupiter, Raydium and Orca.",
    problem:
      "A visible price gap is not the same as a profitable trade: price impact, fees and execution risk can remove most of it.",
    solution:
      "A profit calculator that models AMM price impact, plus an opportunity scorer designed to take an XGBoost model, all on an asyncio architecture.",
    features: [
      "asyncio architecture for fetching quotes concurrently",
      "ProfitCalculator with AMM price-impact maths",
      "AIOpportunityScorer ready for an XGBoost model",
      "Nine-phase production roadmap: Jito bundles, transaction building, RPC benchmarks",
    ],
    learned: [
      "How constant-product AMM pricing creates price impact.",
      "Why infrastructure choices decide whether an idea is viable at all.",
      "Writing the roadmap before the code that touches real money.",
    ],
    tech: ["Python", "asyncio", "XGBoost", "Solana", "Jupiter / Raydium / Orca"],
    visual: "routes",
  },
];

export type JourneyStep = { title: string; when?: string; text: string };

export const JOURNEY: JourneyStep[] = [
  {
    title: "Diploma in Computer Science",
    when: "2023 – 2026",
    text: "Programming fundamentals, databases and the habit of building small things to understand big ones.",
  },
  {
    title: "Transition to engineering",
    text: "Moving from the diploma into an engineering degree to go deeper into theory and mathematics.",
  },
  {
    title: "AI/ML specialisation",
    text: "Choosing AI & ML as the focus: statistics, model development and data analysis.",
  },
  {
    title: "Projects",
    text: "Applying Python to larger systems: a strategy research suite, a matching engine and a market-data assistant.",
  },
  {
    title: "Technical learning",
    text: "Python first, then SQL, Java and the Git workflow around them, with Jupyter for experiments.",
  },
  {
    title: "Coding and problem solving",
    text: "Building problem-solving practice. Coding-platform profiles will be linked here once there is something to show.",
  },
];

export type AchievementCategory =
  | "Coding platforms"
  | "Hackathons"
  | "Certifications"
  | "Internships"
  | "Awards"
  | "Open source";

export type Achievement = {
  category: AchievementCategory;
  title: string;
  issuer?: string;
  date?: string;
  url?: string;
};

export const ACHIEVEMENT_CATEGORIES: AchievementCategory[] = [
  "Coding platforms",
  "Hackathons",
  "Certifications",
  "Internships",
  "Awards",
  "Open source",
];

/**
 * Add only verified entries. Anything added here appears automatically,
 * and its category stops showing as empty.
 */
export const ACHIEVEMENTS: Achievement[] = [];

export const RESUME = {
  summary:
    "CSE (AI & ML) engineering student with a Python-first project portfolio in research tooling, data analysis and backend systems.",
};
