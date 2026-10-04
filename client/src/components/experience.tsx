import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useAnimationContext } from '@/context/animation-context';
import { mobileMotion } from '@/lib/motion';

interface Role {
  title: string;
  badge?: string;
  period: string;
  location: string;
  /** Short note shown after the location, e.g. a promotion date. */
  note?: string;
  description: string;
  skills: string[];
  expandedDetails?: string[];
}

interface CareerBlock {
  company: string;
  /** One-line tenure summary shown under the company name. */
  summary?: string;
  roles: Role[];
}

function ExpandableDetails({ details }: { details: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMobile } = useAnimationContext();
  const m = mobileMotion(isMobile);

  if (!details || details.length === 0) return null;

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex items-center gap-1.5 text-xs text-muted hover:text-accent-dark transition-colors focus-visible:outline-none focus-visible:text-accent-dark focus-visible:underline"
        aria-expanded={isExpanded}
      >
        <span className="font-medium">{isExpanded ? 'Show less' : 'Read more'}</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            {...m.expand}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2 pl-4 border-l border-warm/40">
              {details.map((detail, i) => (
                <motion.li
                  key={i}
                  {...m.detailItem(i)}
                  className="text-xs text-muted leading-relaxed"
                >
                  {detail}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const timeline: CareerBlock[] = [
  {
    company: "Boston Consulting Group",
    summary: "Five loyalty redesigns for Fortune 500 retail, hospitality, and airline companies, where the program drives 50 to 70% of revenue. $500M+ in identified impact.",
    roles: [
      {
        title: "Principal · Project Leader",
        badge: "GenAI Enablement Lead, New York",
        period: "2023 – Present",
        location: "New York, NY",
        note: "Principal since Jan 2025",
        description: "Lead loyalty redesigns end to end, from consumer research and transaction-level analysis through financial modeling, executive alignment, and launch KPIs. Lead GenAI enablement for BCG's New York office, driving grassroots adoption of AI tools.",
        skills: ["Enterprise Loyalty", "GenAI Enablement", "Team Leadership", "Financial Modeling"],
        expandedDetails: [
          "Work directly for VP and C-suite clients while keeping 20 to 40 cross-functional stakeholders aligned",
          "Lead teams of 4 to 6 consultants and analysts; coached team members into repeat staffing and, in several cases, promotion",
          "Turned business goals into engineering-ready requirements on a large data transformation and framed the technical trade-offs so executives could decide quickly",
          "Built an interactive calculator in two days with AI coding tools, comparing member return across six airline loyalty programs; shared directly with the airline's CCO",
          "Coached an associate through building a branded, clickable version of a loyalty redesign with AI coding tools; the client shared it with his Chief Customer Officer in week 5 of 14",
          "Ran a three-hour Replit hackathon where 50 colleagues built working apps, and trained senior partners on AI workflows"
        ]
      },
      {
        title: "Consultant · Associate",
        period: "2017 – 2021",
        location: "Dallas, TX → New York, NY",
        description: "Built the economic model for a $3B loyalty program redesign on 1.5B+ rows of transaction data. Led pricing and competitor analytics that prioritized 30 value plays, then coached senior client leaders through negotiations that cut run-rate costs by $3M.",
        skills: ["Loyalty Economics", "Pricing", "Financial Modeling", "Data Analysis (Alteryx)"],
        expandedDetails: [
          "Built the company-wide financial model a $5B business used to set targets and track progress",
          "Delivered growth strategies across retail, beauty, travel, hospitality, and airlines"
        ]
      }
    ]
  },
  {
    company: "Pizza Hut (Yum! Brands)",
    roles: [
      {
        title: "Associate Financial Analyst",
        period: "2015 – 2017",
        location: "Plano, TX",
        description: "Designed novel Tableau dashboards that transformed how leadership consumed performance data. Reduced recurring workloads for 30+ colleagues from weeks to one day.",
        skills: ["Tableau Automation", "BI & Reporting", "Process Improvement"]
      }
    ]
  },
  {
    company: "Silicon Labs",
    roles: [
      {
        title: "Engineering Intern",
        period: "May – Aug 2013",
        location: "Austin, TX",
        description: "Developed 3D CAD models in SolidWorks and supported manufacturing teams on special projects. Introduced and tested 3D printing techniques and materials. Worked with internal teams to gather customer needs and built custom products for them.",
        skills: ["SolidWorks CAD", "3D Printing", "Manufacturing Support", "Customer Requirements"]
      }
    ]
  }
];

export function Experience() {
  const { isMobile } = useAnimationContext();
  const m = mobileMotion(isMobile);

  return (
    <section id="experience" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-baseline gap-4 mb-12 border-b border-warm pb-8">
        <span className="font-serif text-accent-dark italic text-lg">02</span>
        <h2 className="font-serif text-4xl md:text-5xl text-ink">Experience</h2>
      </div>

      {/* Expertise Summary */}
      <div className="mb-16">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-accent-dark mb-3">Functional Expertise</h3>
        <p className="text-sm text-ink leading-relaxed">
          {['Program Leadership', 'Unit Economics', 'Loyalty & Pricing', 'Launches & Rollouts', 'Building with AI Agents'].map((item, index, arr) => (
            <span key={item}>
              {item}{index < arr.length - 1 && <span className="mx-2 text-muted">·</span>}
            </span>
          ))}
        </p>
      </div>

      <div className="relative ml-4 md:ml-6 pl-8 md:pl-10 border-l border-warm">
        <div className="space-y-14">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              {...m.fadeUp(index)}
              className="relative"
            >
              {/* Company marker on timeline */}
              <div className="absolute -left-[37px] md:-left-[47px] top-2 w-3 h-3 rounded-full bg-accent" />

              <h3 className={`font-serif text-2xl text-ink ${item.summary ? 'mb-2' : 'mb-5'}`}>{item.company}</h3>
              {item.summary && (
                <p className="text-sm text-muted leading-relaxed max-w-3xl mb-6">{item.summary}</p>
              )}

              {/* Roles within this company */}
              <div className="space-y-8 ml-4 border-l border-warm/50 pl-6">
                {item.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className="relative">
                    {/* Role marker dot */}
                    <div className={`absolute -left-[27px] top-1.5 w-2 h-2 rounded-full ${roleIndex === 0 ? 'bg-accent' : 'bg-warm'}`} />

                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-semibold text-ink">{role.title}</span>
                        {role.badge && (
                          <span className="px-2 py-0.5 bg-accent/20 text-[10px] font-semibold uppercase tracking-wide text-accent-dark">
                            {role.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-accent-dark tracking-wider uppercase">{role.period}</span>
                    </div>

                    <div className="text-sm text-muted mb-3">
                      {role.location}
                      {role.note && <span><span className="mx-2 text-warm" aria-hidden="true">·</span>{role.note}</span>}
                    </div>

                    <p className="text-muted leading-relaxed mb-4 max-w-3xl text-sm">
                      {role.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {role.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-warm/40 text-[11px] font-medium uppercase tracking-wide text-ink">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {role.expandedDetails && (
                      <ExpandableDetails details={role.expandedDetails} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
