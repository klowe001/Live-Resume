import { motion } from 'framer-motion';

const experiences = [
  {
    company: "Boston Consulting Group",
    role: "Principal & Gen AI Node Lead",
    period: "Jan 2025 – Present",
    location: "New York, NY",
    description: "Owner of multi-workstream strategy-to-execution programs. Led end-to-end loyalty redesigns for programs touching tens of millions of members. Introduced practical agentic tools and workflows to enhance consumer research effectiveness.",
    skills: ["Enterprise Loyalty", "Gen AI Enablement", "Technical Translation", "Financial Modeling"]
  },
  {
    company: "Boston Consulting Group",
    role: "Project Leader",
    period: "2023 – Dec 2024",
    location: "New York, NY",
    description: "Owned multi-workstream programs. Led pricing and competitor analytics to prioritize 30+ value plays. Coached senior client leaders through negotiations that reduced run-rate costs by $3M.",
    skills: ["Program Leadership", "Category Strategy", "Stakeholder Alignment"]
  },
  {
    company: "Boston Consulting Group",
    role: "Senior Consultant",
    period: "2019 – 2023",
    location: "Dallas, TX → New York, NY",
    description: "Delivered growth strategies across retail, beauty, travel, hospitality, and airlines. Built detailed economic models for $3B+ loyalty programs to capture shifting industry trends.",
    skills: ["Growth Strategy", "Loyalty Economics", "Data Analysis (Alteryx)"]
  },
  {
    company: "Boston Consulting Group",
    role: "Associate",
    period: "2017 – 2019",
    location: "Dallas, TX",
    description: "Built rigorous financial models, synthesized complex data, and delivered client-ready materials. Transitioned from industry with hands-on analytical skills.",
    skills: ["Financial Modeling", "Client Delivery"]
  },
  {
    company: "Pizza Hut (Yum! Brands)",
    role: "Associate Financial Analyst",
    period: "2015 – 2017",
    location: "Plano, TX",
    description: "Designed novel Tableau dashboards that transformed how leadership consumed performance data. Reduced recurring workloads for 30+ colleagues from weeks to one day.",
    skills: ["Tableau Automation", "BI & Reporting", "Process Improvement"]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex items-baseline gap-4 mb-20 border-b border-warm pb-8">
        <span className="font-serif text-accent-dark italic text-lg">02</span>
        <h2 className="font-serif text-4xl md:text-5xl text-ink">Experience</h2>
      </div>

      <div className="relative pl-8 md:pl-12 border-l border-warm space-y-16">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            <div className="absolute -left-[41px] md:-left-[57px] top-2 w-4 h-4 rounded-full bg-accent border-4 border-paper shadow-sm" />
            
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
              <h3 className="font-serif text-2xl text-ink">{exp.company}</h3>
              <span className="text-sm font-medium text-accent-dark tracking-wider uppercase">{exp.period}</span>
            </div>
            
            <div className="text-lg font-medium text-ink mb-4">{exp.role} <span className="text-muted font-normal">• {exp.location}</span></div>
            
            <p className="text-muted leading-relaxed mb-6 max-w-3xl">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {exp.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-warm/50 text-xs font-medium uppercase tracking-wide text-ink">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
