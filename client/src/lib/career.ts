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

export interface Role {
  title: string;
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
    location: 'Dallas → New York',
    // confirm: "five", "$500M+" (annual or total), and "drives" vs "represents".
    summary:
      'Five loyalty redesigns for Fortune 500 retail, hospitality, and airline companies, on programs representing 50 to 70% of company revenue. $500M+ in identified impact.',
    roles: [
      {
        title: 'Principal',
        period: '2023 – Present',
        note: 'Project Leader 2023 – 2024 · Principal since January 2025',
        location: 'New York, NY',
        summary:
          'Leads loyalty redesigns end to end, from consumer research and transaction-level analysis through financial modeling, executive alignment, and launch KPIs. Also leads GenAI enablement for BCG’s New York office.',
        highlights: [
          'Works directly for VP and C-suite clients while keeping 20 to 40 cross-functional stakeholders aligned.',
          'Leads teams of 4 to 6 consultants and analysts; coached team members into repeat staffing and, in several cases, promotion.',
          // confirm: CCO here may mean Chief Commercial Officer.
          'Built an interactive calculator in two days with AI coding tools, comparing member return across six airline loyalty programs; shared directly with the airline’s CCO.',
        ],
        more: [
          'Ran a three-hour Replit hackathon where 50 colleagues built working apps, and trained senior partners on AI workflows.',
          'Coached an associate through building a branded, clickable version of a loyalty redesign with AI coding tools; the client shared it with the company’s Chief Customer Officer in week 5 of 14.',
          'Turned business goals into engineering-ready requirements on a large data transformation and framed the technical trade-offs so executives could decide quickly.',
        ],
        // confirm: badge title, "Node Lead" vs "Enablement Lead".
        focus: ['GenAI Enablement Lead, New York office', 'Enterprise loyalty', 'Team leadership', 'Financial modeling'],
      },
      {
        title: 'Consultant · Associate',
        // confirm: exact title dates inside this span.
        period: '2017 – 2023',
        note: 'On BCG-sponsored leave for the Wharton MBA, 2020 – 2022',
        location: 'Dallas, TX → New York, NY',
        summary:
          // confirm: profile files "30+ value plays" and "$3M" under Project Leader.
          'Built the economic model for a $3B loyalty program redesign on 1.5B+ rows of transaction data. Led pricing and competitor analytics that prioritized 30 value plays, then coached senior client leaders through negotiations that cut run-rate costs by $3M.',
        highlights: [
          'Built the company-wide financial model a $5B business used to set targets and track progress.',
          'Delivered growth strategies across retail, beauty, travel, hospitality, and airlines.',
        ],
        focus: ['Loyalty economics', 'Pricing', 'Financial modeling', 'Alteryx'],
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

export interface Span {
  label: string;
  /** Decimal years. A year range "2015 – 2017" runs from 2015.0 to 2017.0. */
  start: number;
  /** null means ongoing. */
  end: number | null;
  years: string;
  href: string;
  logo: Logo;
  /** The logo's main color, used for the timeline bar. */
  color: string;
}

const now = new Date();
export const TIMELINE_START = 2011;
export const TIMELINE_END = now.getFullYear() + now.getMonth() / 12;

export const workSpans: Span[] = [
  { label: 'Silicon Labs', start: 2013 + 4 / 12, end: 2013 + 8 / 12, years: 'Summer 2013', href: '#exp-silicon-labs', logo: { src: siliconLabsLogo, width: 242, height: 120 }, color: 'oklch(0.575 0.22 26.5)' },
  { label: 'Pizza Hut', start: 2015, end: 2017, years: '2015 – 2017', href: '#exp-pizza-hut', logo: { src: pizzaHutLogo, width: 200, height: 160 }, color: 'oklch(0.556 0.188 25.8)' },
  { label: 'Boston Consulting Group', start: 2017, end: null, years: '2017 – Present', href: '#exp-bcg', logo: { src: bcgLogo, width: 730, height: 154 }, color: 'oklch(0.465 0.107 159.1)' },
];

export const schoolSpans: Span[] = [
  { label: 'SMU, Mechanical Engineering', start: 2011, end: 2015, years: '2011 – 2015', href: '#edu-smu', logo: { src: smuLogo, width: 201, height: 155 }, color: 'oklch(0.444 0.14 269.1)' },
  { label: 'Wharton MBA', start: 2020, end: 2022, years: '2020 – 2022', href: '#edu-wharton', logo: { src: whartonLogo, width: 641, height: 158 }, color: 'oklch(0.322 0.136 260.6)' },
];

/** "4 mo", "2 yrs", or "9+ yrs" for an ongoing span. */
export function tenure(span: Span): string {
  const months = Math.round(((span.end ?? TIMELINE_END) - span.start) * 12);
  if (months < 12) return `${months} mo`;
  const years = months / 12;
  return span.end === null ? `${Math.floor(years)}+ yrs` : `${Math.round(years)} yrs`;
}

/** The BCG-sponsored MBA, drawn inside the BCG band. */
export const leaveSpan = { start: 2020, end: 2022, label: 'MBA leave' };
