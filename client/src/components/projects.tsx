import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, FileText, Mail, ChevronDown } from 'lucide-react';
import { useAnimationContext } from '@/context/animation-context';
import { mobileMotion } from '@/lib/motion';
import replitImg from '@assets/Replit.jpg';
import droneImg from '@assets/image_1773102218588.jpeg';
import wanderluxeImg from '@assets/wanderluxe-product-clean.jpeg';
import cpfDanceImg from '@assets/cpfdance-clean.jpeg';

type ProjectLink = {
  label: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

type Project = {
  title: string;
  role: string;
  type: string;
  description: string;
  problem?: string;
  why?: string;
  call?: string;
  change?: string;
  chips: string[];
  links: ProjectLink[];
  /** Shown in the footer when a project has no links. */
  footer?: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "Anvil",
    role: "Built Unasked",
    type: "Robot Fleet Ops",
    description: "Fleet lifecycle dashboard for an industrial robot maker. It follows each customer from pilot through payback to expansion.",
    problem: "A robot maker grows when installs turn into expansions. Anvil flags the three moments that decide it: a stalled install, a robot that has gone dark, and an account ready for more units.",
    why: "I wanted to work there, so I built a working demo before anyone asked.",
    call: "I built it against the company's published API with synthetic data. The demo never pretends to be live, and connecting real data is a data-layer swap.",
    chips: ["Pilot to Expansion", "Fleet Health", "Published API, Synthetic Data"],
    links: [
      { label: "Live demo on request", url: "mailto:klowe001@gmail.com", icon: Mail }
    ]
  },
  {
    title: "WanderLuxe",
    role: "Founder",
    type: "AI Travel Platform",
    description: "Group trip planner for the person who always ends up organizing. Every booking lands on one shared timeline, and the AI assistant turns a pasted confirmation into an itinerary item. Founded the LLC, filed the trademark, and wrote the product spec.",
    problem: "Travel planning is fragmented across spreadsheets, docs, and screenshots. Existing tools are either too simple or too complex for collaborative trip planning.",
    why: "I built this because I was planning a month-long honeymoon across multiple countries and needed a way to keep track of every hotel reservation, wine-tasting, and tea time that we had.",
    call: "Planning is free in full, including unlimited AI chat. The one paid feature is Print Studio, a keepsake edition of the trip, because metering the assistant would have taxed the behavior the product is built around. In Print Studio the model art-directs and the database supplies every fact, so a bad generation can hurt the styling but never the itinerary.",
    chips: ["Real-Time Collaboration", "AI Assistant", "Print Studio (Pro)", "MCP Server"],
    links: [
      { label: "Website", url: "https://wanderluxe.io", icon: Globe },
      { label: "Spec", url: "https://github.com/reminiscent-io/wanderluxe/blob/main-agent/PRODUCT.md", icon: FileText }
    ],
    image: wanderluxeImg
  },
  {
    title: "CPF Dance",
    role: "Co-Founder",
    type: "Private Coaching Platform",
    description: "Private, invite-only platform for one coach and her dancers. She leaves a note after each lesson, typed or by voice. Dancers read it on their phones, journal against it, and request lessons.",
    problem: "Professional dance instructors manage students via spreadsheets, text messages, and paper waivers. The operational infrastructure that exists for gyms and yoga studios doesn't exist for dance.",
    why: "My wife is a former Rockette. I saw the problem firsthand and built it for her and her dancers.",
    call: "Narrowed it from a multi-instructor platform to a private one for a single coach. No streaks or badges, since the dancers are already motivated. Success is dancers logging in between lessons because a new note is waiting.",
    chips: ["Invite-Only", "Lesson Notes", "Dancer Journal", "Digital Waivers"],
    links: [
      { label: "Website", url: "https://cpfdance.com", icon: Globe },
      { label: "Spec", url: "https://github.com/reminiscent-io/CPF-Dance/blob/main/PRODUCT.md", icon: FileText }
    ],
    image: cpfDanceImg
  },
  {
    title: "3D Printed Drone",
    role: "Creator",
    type: "Hardware / CAD",
    description: "Custom quadcopter built from 3D-printed parts, designed in SolidWorks. Features a DJI Naza flight controller, FatShark FPV system, and GPS module, all integrated into a self-designed frame.",
    why: "Started in college as a way to teach myself SolidWorks 3D CAD and explore the intersection of hardware design and hands-on fabrication. What began as a learning exercise turned into a decade-long project, with iterative redesigns of the frame, upgraded components, and lessons in aerodynamics, electronics integration, and rapid prototyping.",
    chips: ["SolidWorks", "3D Printing", "DJI Naza FC", "FatShark FPV", "GPS Navigation"],
    links: [],
    footer: "Hardware project",
    image: droneImg
  },
  {
    title: "Top 1% Replit Builder",
    role: "Achievement",
    type: "2025",
    description: "Achieved top 1% user status on Replit through intensive AI-assisted development. Mastered the workflow of translating product vision into shipped code using agentic AI tools.",
    why: "Proof that consultants can build. The gap between strategic thinking and technical execution can be bridged with the right tools and mindset.",
    chips: ["Replit Agent", "Claude Code", "Agentic Workflows"],
    links: [],
    footer: "Personal Achievement",
    image: replitImg
  }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { isMobile } = useAnimationContext();
  const m = mobileMotion(isMobile);

  const story = [
    { label: 'Problem', text: project.problem },
    { label: 'Why I Built This', text: project.why },
    { label: 'The Call I Made', text: project.call },
    { label: "What I'd Change", text: project.change },
  ].filter((field): field is { label: string; text: string } => Boolean(field.text));

  return (
    <motion.div
      {...m.fadeUp(index)}
      className="group bg-paper border border-warm overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-lg flex flex-col h-full"
    >
      {project.image && (
        <div
          className="h-48 relative overflow-hidden group-hover:opacity-90 transition-opacity"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/25 pointer-events-none" />
        </div>
      )}

      <div className="p-8 flex flex-col flex-grow">
        <div className="text-xs font-bold text-accent-dark tracking-widest uppercase mb-2">
          {project.role} <span className="text-warm">/</span> {project.type}
        </div>
        <h3 className="font-serif text-3xl mb-3 text-ink group-hover:text-accent-dark transition-colors">
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {story.length > 0 && (
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
                  {...m.expand}
                  transition={{ duration: isMobile ? 0.15 : 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-3 bg-warm/30 px-4 py-3 mt-3">
                    {story.map(field => (
                      <div key={field.label}>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-1">{field.label}</div>
                        <p className="text-xs text-muted leading-relaxed">{field.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.chips.map(chip => (
            <span key={chip} className="px-2 py-1 bg-warm/50 text-[10px] font-medium uppercase tracking-wide text-ink">
              {chip}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-4 border-t border-warm/50">
          {project.links.length > 0 ? (
            project.links.map(link => {
              const external = link.url.startsWith('http');
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              );
            })
          ) : (
            <span className="text-sm font-semibold text-muted italic">{project.footer}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { isMobile } = useAnimationContext();
  const m = mobileMotion(isMobile);

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto bg-paper">
      <div className="mb-16 border-b border-warm pb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-accent-dark italic text-lg">04</span>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">Selected Work</h2>
        </div>
        <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
          I write the spec and make the product calls. Claude Code, Cursor, and Replit write the code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      <motion.p
        {...m.fadeUp(projects.length)}
        className="mt-12 text-sm text-muted leading-relaxed"
      >
        Also built{' '}
        <a
          href="https://cardcaddie.golf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ink underline underline-offset-4 decoration-warm hover:decoration-accent transition-colors focus-visible:outline-none focus-visible:decoration-accent"
        >
          Card Caddie
        </a>
        , live scoring and leaderboards for golf trips.
      </motion.p>
    </section>
  );
}
