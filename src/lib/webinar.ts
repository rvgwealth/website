import {
  Baby,
  Calculator,
  Car,
  FileSpreadsheet,
  GraduationCap,
  Home,
  Landmark,
  Map,
  Receipt,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// EDIT ME: replace with the real WhatsApp group invite link before launch.
// ---------------------------------------------------------------------------
export const whatsappGroupUrl =
  "https://chat.whatsapp.com/IEDg7qrkQ2F30OK4GUgigv?s=cl&p=i&mlu=4&ilr=4";

// EDIT ME: schedule details shown across the registration + confirmation pages.
export const session = {
  name: "Free Financial Planning Webinar",
  duration: "90 minutes",
  format: "Live online session",
  cost: "100% free",
  schedule: "Saturdays & Sundays · 11:00 AM IST",
  seats: "Limited seats available",
};

// ---------------------------------------------------------------------------
// Session slots — every Saturday and Sunday at 11:00 AM IST, rolling forward
// so the dropdown never goes stale. Values are plain ISO dates (YYYY-MM-DD)
// so the server can re-derive and validate the label independently.
// ---------------------------------------------------------------------------
export const SLOT_TIME = "11:00 AM IST";

export type SessionSlot = { value: string; label: string };

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Returns the display label for an ISO date, or null if it isn't a weekend. */
export function formatSlotLabel(value: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (Number.isNaN(date.getTime())) return null;
  if (date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;

  const dow = date.getUTCDay();
  if (dow !== 0 && dow !== 6) return null;

  const weekday = dow === 6 ? "Saturday" : "Sunday";
  return `${weekday}, ${d} ${MONTHS[m - 1]} ${y} · ${SLOT_TIME}`;
}

/**
 * Compact variant for the registration dropdown — the full label overflows a
 * closed <select> on a phone. Emails and Supabase keep the long form.
 */
export function formatSlotShortLabel(value: string): string | null {
  if (!formatSlotLabel(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const weekday = dow === 6 ? "Sat" : "Sun";
  return `${weekday}, ${d} ${MONTHS[m - 1].slice(0, 3)} · 11 AM IST`;
}

/** Next `count` weekend slots, starting tomorrow. */
export function generateSessionSlots(count = 8, from = new Date()): SessionSlot[] {
  const slots: SessionSlot[] = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  cursor.setDate(cursor.getDate() + 1); // never offer a session starting today

  while (slots.length < count) {
    const dow = cursor.getDay();
    if (dow === 6 || dow === 0) {
      const value = [
        cursor.getFullYear(),
        String(cursor.getMonth() + 1).padStart(2, "0"),
        String(cursor.getDate()).padStart(2, "0"),
      ].join("-");
      const label = formatSlotShortLabel(value);
      if (label) slots.push({ value, label });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return slots;
}

export const hero = {
  eyebrow: "Free Financial Planning Webinar",
  heading: "How Much Money Is Enough for the Life You Want?",
  body: "You're earning. You're saving. You're investing. But do you actually know how much wealth you need to live the life you want — without financial stress?",
  support:
    "Join our free Wealth Planning Webinar and learn how to calculate your financial requirements, plan your major life goals, and build a roadmap toward financial freedom.",
};

export const painQuestions: string[] = [
  "Will I have enough for retirement?",
  "Should I buy a house or continue renting?",
  "How much should I invest every month?",
  "Can I afford my child's education and marriage?",
  "Am I saving enough for the lifestyle I want?",
  "How much wealth is actually enough?",
];

export type Discovery = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const discoveries: Discovery[] = [
  {
    number: "01",
    icon: Target,
    title: "Your Life Wealth Requirement",
    description:
      "Understand how much money you may actually need to achieve your important life goals.",
  },
  {
    number: "02",
    icon: Receipt,
    title: "The Impact of Inflation & Taxes",
    description:
      "Discover how inflation and taxes can silently reduce your future purchasing power.",
  },
  {
    number: "03",
    icon: Home,
    title: "House vs Rent",
    description:
      "Understand the financial impact of buying a home versus renting before making one of the biggest decisions of your life.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Why High Earners Still Struggle",
    description:
      "Learn why a high salary doesn't necessarily mean financial security.",
  },
  {
    number: "05",
    icon: Landmark,
    title: "EMIs + Investments + Retirement",
    description:
      "Learn how to balance today's commitments with tomorrow's financial goals.",
  },
  {
    number: "06",
    icon: Map,
    title: "Your Financial Freedom Roadmap",
    description:
      "Create a simple framework to move from earning and saving to consciously building wealth.",
  },
  {
    number: "07",
    icon: GraduationCap,
    title: "Child Education Planning",
    description:
      "Understand how to prepare financially for your child's future education costs.",
  },
  {
    number: "08",
    icon: Baby,
    title: "Child Marriage Planning",
    description:
      "Plan ahead for one of life's major financial milestones without compromising other goals.",
  },
  {
    number: "09",
    icon: Car,
    title: "Lifestyle Goals",
    description:
      "Learn how to plan for vehicles, vacations and lifestyle upgrades without creating unnecessary financial stress.",
  },
];

export const homeLoan = {
  heading: "Before You Take That Home Loan…",
  questions: [
    "Will this EMI affect my retirement?",
    "Am I sacrificing my future freedom for today's lifestyle?",
    "Can I comfortably manage my home loan AND my other financial goals?",
  ],
  punchline: "A House Can Be Financed. Retirement Cannot.",
  support:
    "Make major financial decisions based on numbers and planning — not pressure, fear or assumptions.",
};

export const earningMore = {
  heading: "Earning More ≠ Getting Richer",
  points: [
    "Your income grows. But your expenses may grow faster.",
    "Your EMIs increase.",
    "Your lifestyle expands.",
    "Your financial responsibilities grow.",
  ],
  closing:
    "Without a plan, more income can simply mean more expenses. Learn how to design your wealth consciously instead of leaving your financial future to chance.",
};

export type Bonus = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const bonuses: Bonus[] = [
  {
    icon: FileSpreadsheet,
    title: "Monthly & Annual Budget Templates",
    description:
      "Track your income, expenses, savings and investments with greater clarity.",
  },
  {
    icon: Calculator,
    title: "Simple Tax Calculator",
    description: "Estimate your tax liability based on your salary package.",
  },
  {
    icon: Target,
    title: "Goal Planning Templates",
    description:
      "Structure your financial goals for retirement, education, lifestyle and more.",
  },
];

export const presenter = {
  eyebrow: "Learn From a Certified Financial Planner",
  heading: "Your Financial Future Deserves a Plan.",
  body: "Learn from a Certified Financial Planner (CFP), recognized by the FPSB Board, with experience helping salaried professionals and business owners work toward financial freedom.",
  highlights: [
    "Practical insights",
    "Simple frameworks",
    "Goal-based financial planning",
  ],
};

export const whoShouldAttend: string[] = [
  "Salaried professionals",
  "Business owners",
  "Young working professionals",
  "Parents planning for their children's future",
  "Professionals considering buying a home",
  "High-income earners who want better financial clarity",
  "Anyone serious about achieving financial freedom",
];

export type Faq = { q: string; a: string };

export const webinarFaqs: Faq[] = [
  {
    q: "Is the webinar really free?",
    a: "Yes. Registration is completely free.",
  },
  {
    q: "Who is this webinar for?",
    a: "The session is designed primarily for salaried professionals and business owners who want greater clarity about their finances and long-term financial goals.",
  },
  {
    q: "What will I learn?",
    a: "You'll learn how to think about your life wealth requirement, inflation, taxes, home buying, EMIs, investments, retirement and major life goals.",
  },
  {
    q: "Will I receive anything after attending?",
    a: "Yes. Participants will receive the budget templates, tax calculator and goal-planning templates mentioned above.",
  },
  {
    q: "Do I need to be a financial expert?",
    a: "Not at all. The webinar is designed to make financial planning easier to understand and apply.",
  },
];

export const finalCta = {
  heading: "Your Future Doesn't Need More Guesswork. It Needs a Plan.",
  body: "Register for the free Wealth Planning Webinar today.",
  button: "Yes, I Want to Register",
  note: "No cost. No obligation. Just practical financial planning insights.",
};

export type JoinStep = { title: string; detail: string };

export const joinSteps: JoinStep[] = [
  {
    title: "Join the WhatsApp group",
    detail:
      "This is where the session link, reminders, and your free templates are shared. Registration is only complete once you have joined.",
  },
  {
    title: "Save the date",
    detail: `Block ${session.duration} in your calendar for ${session.schedule}. The joining link is posted in the group before we begin.`,
  },
  {
    title: "Come prepared",
    detail:
      "Bring a notebook, a rough idea of your monthly income and expenses, and the goals you want to plan for. You will be writing things down.",
  },
];
