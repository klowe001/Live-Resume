import { motion } from 'framer-motion';

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
    skills: ["React 19 & Next.js", "TypeScript", "Tailwind CSS", "Supabase (PostgreSQL)", "OpenAI API Integration", "Agentic Workflows", "Microsoft Office Suite", "Claude Code"]
  },
  {
    title: "Leadership",
    skills: ["Program Leadership", "Team Building", "Stakeholder Alignment", "Executive Communication", "Cross-functional Coordination"]
  }
];

export function Skills() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
