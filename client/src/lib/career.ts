import bcgLogo from '@assets/web/logos/bcg.png';
import siliconLabsLogo from '@assets/web/logos/silicon-labs.png';
import pizzaHutLogo from '@assets/web/logos/pizza-hut.png';
import whartonLogo from '@assets/web/logos/wharton.png';
import smuLogo from '@assets/web/logos/smu.png';

export interface Logo {
  src: string;
  width: number;
  height: number;
}

/**
 * How much taller than a wide wordmark (BCG, Wharton) a logo should be so
 * marks of different shapes look the same size. Squarer marks like SMU or
 * Pizza Hut get up to `max` times the height.
 */
export function logoScale(logo: Pick<Logo, 'width' | 'height'>, max = 1.6): number {
  return Math.min(max, Math.max(1, Math.sqrt(4 / (logo.width / logo.height))));
}

/** Logo height in rem, where `base` is the height of a wide wordmark. */
export function logoHeight(logo: Pick<Logo, 'width' | 'height'>, base: number, max?: number): string {
  return `${base * logoScale(logo, max)}rem`;
}

export interface Role {
  title: string;
  /** Earlier title in the same role, shown after the title in regular weight. */
  formerly?: string;
  period: string;
  /** Promotions or leave inside the role, shown under the title. */
  note?: string;
  location: string;
  summary: string;
  /** Always visible. Keep to the strongest two or three. */
  highlights: string[];
  /** Behind "More". */
  more?: string[];
  focus: string[];
}

export interface Employer {
  id: string;
  company: string;
  logo?: Logo;
  tenure: string;
  location: string;
  summary?: string;
  roles: Role[];
}

export interface School {
  id: string;
  school: string;
  university?: string;
  logo: Logo;
  degree: string;
  focus: string;
  period: string;
  location: string;
  note?: string;
  honors: string[];
}

// Facts marked "confirm" are waiting on Kevin: the 2026-10 audit found them
// either missing from his own profile or worded differently there.
export const employers: Employer[] = [
  {
    id: 'exp-bcg',
    company: 'Boston Consulting Group',
    logo: { src: bcgLogo, width: 730, height: 154 },
    tenure: '2017 – Present',
    location: 'New York, NY',
    // confirm: "$500M+" (annual or total), and "drives" vs "represents".
    summary:
      'Growth strategy and loyalty redesign for Fortune 500 retail, hospitality, and airline companies, on programs representing 50 to 70% of company revenue. $500M+ in identified impact.',
    roles: [
      {
        title: 'Principal',
        period: '2017 – Present',
        // confirm: exact title dates. Journey chart marks Consultant Sept 2019, Project Leader 2023, Principal 2025.
        note: 'Started as an Associate in 2017; promoted through Consultant and Project Leader',
        location: 'New York, NY',
        summary:
          'Leads high-performance teams on growth strategy and loyalty redesigns, and does the hands-on work himself, from customer insights and transaction-level analytics to business cases, financial models, executive alignment, and launch KPIs. Also leads GenAI enablement for BCG’s New York office.',
        highlights: [
          'Leads teams of 4 to 6 consultants and analysts for VP and C-suite clients, keeping 20 to 40 cross-functional stakeholders aligned; coached team members into repeat staffing and, in several cases, promotion',
          'Built the economic model for a $3B loyalty program redesign on 1.5B+ rows of transaction data',
          // confirm: profile files "30+ value plays" and "$3M" under Project Leader.
          'Led pricing and competitor analytics that prioritized 30 value plays, then coached senior client leaders through negotiations that cut run-rate costs by $3M',
        ],
        more: [
          'Built the company-wide financial model a $5B business used to set targets and track progress',
          'Delivered growth strategies across retail, beauty, travel, hospitality, and airlines',
          // confirm: CCO here may mean Chief Commercial Officer.
          'Built an interactive calculator in two days with AI coding tools, comparing member return across six airline loyalty programs; shared directly with the airline’s CCO',
          'Ran a three-hour Replit hackathon where 50 colleagues built working apps, and trained senior partners on AI workflows',
          'Coached an associate through building a branded, clickable version of a loyalty redesign with AI coding tools; the client shared it with the company’s Chief Customer Officer in week 5 of 14',
          'Turned business goals into engineering-ready requirements on a large data transformation and framed the technical trade-offs so executives could decide quickly',
        ],
        // confirm: badge title, "Node Lead" vs "Enablement Lead".
        focus: [
          'GenAI Enablement Lead, New York office',
          'Enterprise loyalty',
          'Team leadership',
          'Customer insights',
          'Financial modeling',
          'Pricing',
        ],
      },
    ],
  },
  {
    id: 'exp-pizza-hut',
    company: 'Pizza Hut (Yum! Brands)',
    logo: { src: pizzaHutLogo, width: 200, height: 160 },
    tenure: '2015 – 2017',
    location: 'Plano, TX',
    roles: [
      {
        title: 'Associate Financial Analyst',
        period: '2015 – 2017',
        location: 'Plano, TX',
        summary:
          'Built Tableau dashboards for leadership’s performance reporting, cutting a recurring workload for 30+ colleagues from weeks to one day.',
        highlights: [],
        focus: ['Tableau automation', 'BI and reporting', 'Process improvement'],
      },
    ],
  },
  {
    id: 'exp-silicon-labs',
    company: 'Silicon Labs',
    logo: { src: siliconLabsLogo, width: 242, height: 120 },
    tenure: 'Summer 2013',
    location: 'Austin, TX',
    roles: [
      {
        title: 'Engineering Intern',
        period: 'May – Aug 2013',
        location: 'Austin, TX',
        summary:
          'Built 3D CAD models in SolidWorks and supported the manufacturing team on special projects. Introduced and tested 3D printing techniques and materials, and built custom products for internal teams based on their requirements.',
        highlights: [],
        focus: ['SolidWorks', '3D printing', 'Manufacturing support'],
      },
    ],
  },
];

export const schools: School[] = [
  {
    id: 'edu-wharton',
    school: 'The Wharton School',
    university: 'University of Pennsylvania',
    logo: { src: whartonLogo, width: 641, height: 158 },
    degree: 'Master of Business Administration',
    // confirm: Wharton names the majors "Strategic Management" and "Entrepreneurship & Innovation".
    focus: 'Strategic Management & Entrepreneurship',
    period: '2020 – 2022',
    location: 'Philadelphia, PA',
    note: 'Sponsored by BCG',
    honors: ['Director’s List (top 10%)', 'First-Year Honors (top 20%)', 'GMAT 740'],
  },
  {
    id: 'edu-smu',
    school: 'Southern Methodist University',
    logo: { src: smuLogo, width: 201, height: 155 },
    degree: 'Bachelor of Science, Mechanical Engineering',
    focus: 'Minor in Business',
    period: '2011 – 2015',
    location: 'Dallas, TX',
    note: 'Senior design: a conduit-bending robot, from full CAD to multi-axis motion.',
    honors: ['Magna Cum Laude', 'Tau Beta Pi Engineering Honor Society', 'GPA 3.86'],
  },
];

/**
 * One stop on the career journey chart. Colors are each brand's own, sampled
 * from the logos in attached_assets/web/logos (SMU uses its official blue so
 * it reads apart from the Silicon Labs and Pizza Hut reds).
 */
export interface Stop {
  id: string;
  name: string;
  role: string;
  years: string;
  /** Decimal years. A year range "2015 – 2017" runs from 2015.0 to 2017.0. */
  start: number;
  /** null means ongoing. */
  end: number | null;
  color: string;
  logo: Logo;
}

const now = new Date();
export const TIMELINE_START = 2011;
export const TIMELINE_END = now.getFullYear() + now.getMonth() / 12;

export const stops: Stop[] = [
  {
    id: 'edu-smu',
    name: 'Southern Methodist University',
    role: 'B.S. Mechanical Engineering',
    years: '2011 – 2015',
    start: 2011,
    end: 2015,
    color: '#354ca1',
    logo: { src: smuLogo, width: 201, height: 155 },
  },
  {
    id: 'exp-silicon-labs',
    name: 'Silicon Labs',
    role: 'Engineering intern',
    years: 'Summer 2013',
    start: 2013 + 4 / 12,
    end: 2013 + 8 / 12,
    color: '#d80008',
    logo: { src: siliconLabsLogo, width: 242, height: 120 },
  },
  {
    id: 'exp-pizza-hut',
    name: 'Pizza Hut',
    role: 'Financial analyst',
    years: '2015 – 2017',
    start: 2015,
    end: 2017,
    color: '#bd0200',
    logo: { src: pizzaHutLogo, width: 200, height: 160 },
  },
  {
    id: 'exp-bcg',
    name: 'Boston Consulting Group',
    role: 'Principal (from Associate)',
    years: '2017 – Present',
    start: 2017,
    end: null,
    color: '#006c44',
    logo: { src: bcgLogo, width: 730, height: 154 },
  },
  {
    id: 'edu-wharton',
    name: 'The Wharton School',
    role: 'MBA, sponsored by BCG',
    years: '2020 – 2022',
    start: 2020,
    end: 2022,
    color: '#002c77',
    logo: { src: whartonLogo, width: 641, height: 158 },
  },
];

/** Promotions marked along the BCG stretch of the line. */
export const milestones = [
  { label: 'Consultant', year: 2019 + 8 / 12, display: 'Sept 2019' },
  { label: 'Project Leader', year: 2023, display: '2023' },
  { label: 'Principal', year: 2025, display: '2025' },
];
