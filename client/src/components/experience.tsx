import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import leCordonBleuImg from '@assets/Le Cordon Bleu.JPG';

interface Role {
  title: string;
  badge?: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
}

interface CareerBlock {
  type: 'career';
  company: string;
  roles: Role[];
}

interface GraduateSchool {
  type: 'graduate';
  school: string;
  degree: string;
  period: string;
  location: string;
  description: string;
  honors: string[];
  nested?: {
    name: string;
    credential: string;
    period: string;
    location: string;
    note: string;
  };
}

type TimelineItem = CareerBlock | GraduateSchool;

function LeCordonBleuCard({ nested }: { nested: NonNullable<GraduateSchool['nested']> }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mt-4 ml-4 pl-4 border-l border-warm/60 py-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-0.5">
        <span className="font-medium text-sm text-ink hover:text-accent-dark transition-colors">{nested.name}</span>
        <span className="text-xs text-muted uppercase tracking-wide">{nested.period}</span>
      </div>
      <div className="text-xs text-muted">
        {nested.credential} · {nested.location}
      </div>
      <p className="text-xs text-muted mt-1 italic">
        {nested.note}
      </p>

      {/* Hover image - appears below and pushes content down */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <div className="relative w-full max-w-xs border border-warm overflow-hidden">
                <img
                  src={leCordonBleuImg}
                  alt="Le Cordon Bleu Paris"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-amber-900/20 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const timeline: TimelineItem[] = [
  {
    type: 'career',
    company: "Boston Consulting Group",
    roles: [
      {
        title: "Principal",
        badge: "Gen AI Node Lead",
        period: "Jan 2025 – Present",
        location: "New York, NY",
        description: "Owner of multi-workstream strategy-to-execution programs. Led end-to-end loyalty redesigns for programs touching tens of millions of members. Introduced practical agentic tools and workflows to enhance consumer research effectiveness.",
        skills: ["Enterprise Loyalty", "Gen AI Enablement", "Technical Translation", "Financial Modeling"]
      },
      {
        title: "Project Leader",
        period: "2023 – Dec 2024",
        location: "New York, NY",
        description: "Owned multi-workstream programs. Led pricing and competitor analytics to prioritize 30+ value plays. Coached senior client leaders through negotiations that reduced run-rate costs by $3M.",
        skills: ["Program Leadership", "Category Strategy", "Stakeholder Alignment"]
      }
    ]
  },
  {
    type: 'graduate',
    school: "The Wharton School",
    degree: "MBA",
    period: "2020 – 2022",
    location: "Philadelphia, PA",
    description: "Strategic Management & Entrepreneurship. Built a network spanning finance, tech, consulting, and entrepreneurship.",
    honors: ["Director's List (top 10%)", "First-Year Honors (top 20%)", "GMAT: 740"],
    nested: {
      name: "Le Cordon Bleu",
      credential: "Pastry Certificate",
      period: "Summer 2021",
      location: "Paris",
      note: "Intensive patisserie program during MBA summer break"
    }
  },
  {
    type: 'career',
    company: "Boston Consulting Group",
    roles: [
      {
        title: "Consultant",
        period: "2019 – 2023",
        location: "Dallas, TX → New York, NY",
        description: "Delivered growth strategies across retail, beauty, travel, hospitality, and airlines. Built detailed economic models for $3B+ loyalty programs to capture shifting industry trends.",
        skills: ["Growth Strategy", "Loyalty Economics", "Data Analysis (Alteryx)"]
      },
      {
        title: "Associate",
        period: "2017 – 2019",
        location: "Dallas, TX",
        description: "Built rigorous financial models, synthesized complex data, and delivered client-ready materials. Transitioned from industry with hands-on analytical skills.",
        skills: ["Financial Modeling", "Client Delivery"]
      }
    ]
  },
  {
    type: 'career',
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
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-baseline gap-4 mb-20 border-b border-warm pb-8">
        <span className="font-serif text-accent-dark italic text-lg">02</span>
        <h2 className="font-serif text-4xl md:text-5xl text-ink">Experience</h2>
      </div>

      <div className="relative ml-4 md:ml-6 pl-8 md:pl-10 border-l border-warm">
        <div className="space-y-14">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative"
            >
              {item.type === 'career' ? (
                <>
                  {/* Company marker on timeline */}
                  <div className="absolute -left-[37px] md:-left-[47px] top-2 w-3 h-3 rounded-full bg-accent" />

                  <h3 className="font-serif text-2xl text-ink mb-5">{item.company}</h3>

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
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Graduate school marker */}
                  <div className="absolute -left-[39px] md:-left-[49px] top-1 w-3.5 h-3.5 rounded-full bg-paper border-2 border-accent" />

                  <div className="pl-2">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-accent-dark mb-2">Graduate School</div>

                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
                      <h3 className="font-serif text-xl text-ink">{item.school}</h3>
                      <span className="text-sm font-medium text-accent-dark tracking-wider uppercase">{item.period}</span>
                    </div>

                    <div className="text-base font-medium text-ink mb-2">
                      {item.degree} <span className="text-muted font-normal">· {item.location}</span>
                    </div>

                    <p className="text-muted leading-relaxed mb-3 max-w-2xl text-sm">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.honors.map(honor => (
                        <span key={honor} className="px-2.5 py-1 bg-accent/10 text-[11px] font-medium text-accent-dark">
                          {honor}
                        </span>
                      ))}
                    </div>

                    {/* Nested sub-experience (Le Cordon Bleu) */}
                    {item.nested && (
                      <LeCordonBleuCard nested={item.nested} />
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
