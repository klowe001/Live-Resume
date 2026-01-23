import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Globe, ChevronDown } from 'lucide-react';
import replitImg from '@assets/Replit.jpg';

const projects = [
  {
    title: "WanderLuxe",
    role: "Founder",
    type: "AI Travel Platform",
    description: "AI-native travel planning platform with real-time collaboration, AI-assisted itinerary building, and professional PDF export. Founded LLC, filed trademark, and built from zero to launch.",
    problem: "Travel planning is fragmented across spreadsheets, docs, and screenshots. Existing tools are either too simple or too complex for collaborative trip planning.",
    why: "I built this because I was planning a month-long honeymoon across multiple countries and needed a way to keep track of every hotel reservation, wine-tasting, and tea time that we had. I also wanted to prove that the gap between 'strategy person' and 'builder' can be bridged. 200+ hours of hands-on development using agentic AI workflows, resulting in 18,000+ lines of production code.",
    tech: ["React 19", "Supabase", "OpenAI API", "Google Places", "Vite"],
    links: [
      { label: "Website", url: "https://wanderluxe.io", icon: Globe },
      { label: "Code", url: "https://github.com/reminiscent-io/wanderluxe", icon: Github }
    ],
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21"
  },
  {
    title: "CPF Dance",
    role: "Technical Co-Founder",
    type: "SaaS Platform",
    description: "Comprehensive platform for professional dance instruction. Multi-portal system with role-based access control, digital waivers, class scheduling, and AI note taking.",
    problem: "Professional dance instructors manage students via spreadsheets, text messages, and paper waivers. The operational infrastructure that exists for gyms and yoga studios doesn't exist for dance.",
    why: "My wife is a former Rockette. I saw the problem firsthand and built the solution—bringing modern SaaS tooling to professional dance education.",
    tech: ["Next.js 16", "Supabase RLS", "Tailwind v4", "TipTap"],
    links: [
      { label: "Website", url: "https://cpfdance.com", icon: Globe },
      { label: "Code", url: "https://github.com/reminiscent-io/CPF-Dance", icon: Github }
    ],
    image: "https://images.unsplash.com/photo-1674221525704-f4b2aa13df2c"
  },
  {
    title: "Top 1% Replit Builder",
    role: "Achievement",
    type: "2025",
    description: "Achieved top 1% user status on Replit through intensive AI-assisted development. Mastered the workflow of translating product vision into shipped code using agentic AI tools.",
    problem: null,
    why: "Proof that consultants can build. The gap between strategic thinking and technical execution can be bridged with the right tools and mindset.",
    tech: ["Replit Agent", "Claude Code", "Agentic Workflows"],
    links: [],
    image: replitImg
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-paper border border-warm overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-lg flex flex-col h-full"
    >
      <div className="h-48 relative overflow-hidden group-hover:opacity-90 transition-opacity">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Warm overlay for elegance */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-amber-900/20 pointer-events-none" />
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
        <p className="text-muted text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Expandable origin story */}
        {(project.problem || project.why) && (
          <div className="mb-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs font-semibold text-accent-dark hover:text-accent transition-colors uppercase tracking-wide"
            >
              <span>{expanded ? 'Less' : 'The Story'}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-3 border-l-2 border-accent/30 pl-3 mt-3">
                    {project.problem && (
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-1">Problem</div>
                        <p className="text-xs text-muted leading-relaxed">{project.problem}</p>
                      </div>
                    )}
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-1">Why I Built This</div>
                      <p className="text-xs text-muted leading-relaxed">{project.why}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.tech.map(t => (
            <span key={t} className="px-2 py-1 bg-warm/50 text-[10px] font-medium uppercase tracking-wide text-ink">
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
            <span className="text-sm font-semibold text-muted italic">Personal Achievement</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto bg-paper">
      <div className="flex items-baseline gap-4 mb-16 border-b border-warm pb-8">
        <span className="font-serif text-accent-dark italic text-lg">04</span>
        <h2 className="font-serif text-4xl md:text-5xl text-ink">Selected Work</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
