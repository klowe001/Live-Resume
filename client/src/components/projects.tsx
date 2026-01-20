import { motion } from 'framer-motion';
import { Github, Globe } from 'lucide-react';
import wanderLuxeImg from '@assets/generated_images/minimalist_travel_app_interface_with_maps_and_itinerary.png';
import cpfDanceImg from '@assets/generated_images/modern_dance_studio_management_dashboard.png';
import builderImg from '@assets/generated_images/abstract_digital_building_blocks_concept.png';

const projects = [
  {
    title: "WanderLuxe",
    role: "Founder",
    type: "AI Travel Platform",
    description: "AI-native travel planning platform with real-time collaboration, AI-assisted itinerary building, and professional PDF export. Founded LLC, filed trademark, and built from zero to launch.",
    tech: ["React 19", "Supabase", "OpenAI API", "Google Places", "Vite"],
    links: [
      { label: "Website", url: "https://wanderluxe.io", icon: Globe },
      { label: "Code", url: "https://github.com/reminiscent-io/wanderluxe", icon: Github }
    ],
    image: wanderLuxeImg
  },
  {
    title: "CPF Dance",
    role: "Technical Co-Founder",
    type: "SaaS Platform",
    description: "Comprehensive platform for professional dance instruction. Multi-portal system with role-based access control, digital waivers, and class scheduling.",
    tech: ["Next.js 16", "Supabase RLS", "Tailwind v4", "TipTap"],
    links: [
      { label: "Code", url: "https://github.com/reminiscent-io/CPF-Dance", icon: Github }
    ],
    image: cpfDanceImg
  },
  {
    title: "Top 1% Replit Builder",
    role: "Achievement",
    type: "2025",
    description: "Achieved top 1% user status on Replit through intensive AI-assisted development. Mastered the workflow of translating product vision into shipped code using agentic AI tools.",
    tech: ["Replit Agent", "Claude Code", "Agentic Workflows"],
    links: [],
    image: builderImg
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto bg-paper">
      <div className="flex items-baseline gap-4 mb-16 border-b border-warm pb-8">
        <span className="font-serif text-accent-dark italic text-lg">03</span>
        <h2 className="font-serif text-4xl md:text-5xl text-ink">Selected Work</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white border border-warm overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-lg flex flex-col h-full"
          >
            <div className="h-48 relative overflow-hidden group-hover:opacity-90 transition-opacity">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 backdrop-blur-[2px]">
                <span className="font-serif text-2xl text-paper drop-shadow-md italic">
                  {project.type}
                </span>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <div className="text-xs font-bold text-accent-dark tracking-widest uppercase mb-2">
                {project.role}
              </div>
              <h3 className="font-serif text-3xl mb-3 text-ink group-hover:text-accent-dark transition-colors">
                {project.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-1 bg-warm/30 text-[10px] font-medium uppercase tracking-wide text-ink/70">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4 border-t border-warm/50">
                {project.links.length > 0 ? (
                  project.links.map(link => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </a>
                  ))
                ) : (
                  <span className="text-sm font-semibold text-muted italic">Internal Initiative</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
