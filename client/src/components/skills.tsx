import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useAnimationContext } from '@/context/animation-context';
import { mobileMotion } from '@/lib/motion';

const skillCategories = [
  {
    title: "GTM & Strategy",
    skills: ["Customer Experience", "Loyalty Design", "Pricing & Packaging", "Launch Planning", "Experimentation Frameworks", "Retention Economics", "Brand Positioning"]
  },
  {
    title: "Analytics",
    skills: ["Financial Modeling", "Unit Economics", "Risk Assessment", "Tableau", "Alteryx", "Excel", "KPI Dashboards"]
  },
  {
    title: "Technical Stack",
    skills: ["Claude Code", "Microsoft Office Suite", "Supabase (PostgreSQL)", "VSCode", "API Integrations", "Agentic Workflows"]
  },
  {
    title: "Leadership",
    skills: ["Program Leadership", "Team Mentorship", "Stakeholder Alignment", "Executive Communication", "Cross-functional Coordination"]
  }
];

function MobileCollapsibleSkill({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMobile } = useAnimationContext();
  const m = mobileMotion(isMobile);

  return (
    <motion.div
      key={category.title}
      {...m.fadeUp(index)}
    >
      {/* Mobile: Collapsible header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full flex items-center justify-between text-left py-2"
      >
        <h3 className="font-serif text-xl text-accent-dark">
          {category.title}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted" />
        </motion.div>
      </button>

      {/* Mobile: Collapsible content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            {...m.expand}
            className="md:hidden overflow-hidden"
          >
            <ul className="space-y-2 pb-4 pt-2">
              {category.skills.map(skill => (
                <li key={skill} className="text-muted text-sm font-medium">
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: Always visible */}
      <div className="hidden md:block">
        <h3 className="font-serif text-2xl mb-6 text-accent-dark border-b border-warm pb-2 inline-block">
          {category.title}
        </h3>
        <ul className="space-y-3">
          {category.skills.map(skill => (
            <li key={skill} className="text-muted text-sm font-medium hover:text-ink transition-colors cursor-default">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const { isMobile } = useAnimationContext();
  const m = mobileMotion(isMobile);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-baseline gap-4 mb-16 border-b border-warm pb-8">
        <span className="font-serif text-accent-dark italic text-lg">06</span>
        <h2 className="font-serif text-4xl md:text-5xl text-ink">Kit</h2>
      </div>

      <div className="md:hidden space-y-2">
        {skillCategories.map((category, index) => (
          <MobileCollapsibleSkill key={category.title} category={category} index={index} />
        ))}
      </div>

      <dl className="hidden md:block divide-y divide-warm">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            {...m.fadeUp(index)}
            className="grid grid-cols-12 gap-8 py-8 first:pt-0"
          >
            <dt className="col-span-3 font-serif text-2xl text-accent-dark leading-tight">
              {category.title}
            </dt>
            <dd className="col-span-9 text-muted text-base leading-relaxed">
              {category.skills.map((skill, i) => (
                <span key={skill}>
                  {skill}
                  {i < category.skills.length - 1 && (
                    <span className="text-warm mx-2" aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
