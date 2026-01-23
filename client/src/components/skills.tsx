import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
    skills: ["Claude Code", "Microsoft Office Suite", "Supabase (PostgreSQL)", "API Integrations", "Agentic Workflows", "React 19 & Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Leadership",
    skills: ["Program Leadership", "Team Mentorship", "Stakeholder Alignment", "Executive Communication", "Cross-functional Coordination"]
  }
];

function MobileCollapsibleSkill({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      key={category.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
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
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
        {skillCategories.map((category, index) => (
          <MobileCollapsibleSkill key={category.title} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}
