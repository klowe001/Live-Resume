import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import savarinImg from '@assets/Savarin.JPG';
import tarteCitronImg from '@assets/Tarte Citron.JPG';

interface NestedExperience {
  name: string;
  credential: string;
  period: string;
  location: string;
  note: string;
}

interface EducationEntry {
  school: string;
  university: string | null;
  degree: string;
  period: string;
  location: string;
  focus: string;
  highlights: string[];
  description?: string;
  expandedDetails?: string[];
  nested?: NestedExperience;
}

const education: EducationEntry[] = [
  {
    school: "The Wharton School",
    university: "University of Pennsylvania",
    degree: "Master of Business Administration",
    period: "2020 – 2022",
    location: "Philadelphia, PA",
    focus: "Strategic Management & Entrepreneurship",
    highlights: ["Director's List (top 10%)", "First-Year Honors (top 20%)", "GMAT: 740"],
    description: "Strategic Management & Entrepreneurship. Built a network spanning finance, tech, consulting, and entrepreneurship.",
    expandedDetails: [
      "A transformative window into ~1,000 classmates' industries, beliefs, and worldviews",
      "Exposure to classmates from private equity, tech startups, nonprofits, government, and family businesses",
      "Built a more complete mental model of how value is created and captured across contexts"
    ],
    nested: {
      name: "Le Cordon Bleu",
      credential: "Pastry Certificate",
      period: "Summer 2021",
      location: "Paris",
      note: "Intensive patisserie program during MBA summer break"
    }
  },
  {
    school: "Southern Methodist University",
    university: null,
    degree: "Bachelor of Science, Mechanical Engineering",
    period: "2011 – 2015",
    location: "Dallas, TX",
    focus: "Minor: Business",
    highlights: ["Magna Cum Laude", "Tau Beta Pi Engineering Honor Society", "GPA: 3.86"]
  }
];

function ExpandableDetails({ details }: { details: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!details || details.length === 0) return null;

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex items-center gap-1.5 text-xs text-muted hover:text-accent-dark transition-colors"
      >
        <span className="font-medium">{isExpanded ? 'Show less' : 'Read more'}</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px]"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2 pl-4 border-l border-warm/40">
              {details.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
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

function LeCordonBleuCard({ nested }: { nested: NestedExperience }) {
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

      {/* Hover images - appears below and pushes content down */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 flex gap-3">
              <div className="relative flex-1 border border-warm overflow-hidden">
                <img
                  src={savarinImg}
                  alt="Savarin"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-amber-900/20 pointer-events-none" />
              </div>
              <div className="relative flex-1 border border-warm overflow-hidden">
                <img
                  src={tarteCitronImg}
                  alt="Tarte Citron"
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

export function Education() {
  return (
    <section id="education" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-baseline gap-4 mb-20 border-b border-warm pb-8">
        <span className="font-serif text-accent-dark italic text-lg">03</span>
        <h2 className="font-serif text-4xl md:text-5xl text-ink">Education</h2>
      </div>

      <div className="space-y-12">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative p-8 border border-warm bg-paper hover:border-accent transition-all duration-300"
          >
            <GraduationCap className="w-8 h-8 text-accent mb-6 stroke-[1.5]" />

            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
              <h3 className="font-serif text-2xl text-ink">{edu.school}</h3>
              <span className="text-sm font-medium text-accent-dark tracking-wider uppercase">{edu.period}</span>
            </div>

            {edu.university && (
              <div className="text-muted text-sm mb-2">{edu.university}</div>
            )}

            <div className="text-lg font-medium text-ink mb-2">
              {edu.degree}
            </div>

            <div className="text-muted text-sm mb-4">
              {edu.focus} <span className="text-muted">• {edu.location}</span>
            </div>

            {edu.description && (
              <p className="text-muted leading-relaxed mb-4 text-sm">
                {edu.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-6">
              {edu.highlights.map(highlight => (
                <span key={highlight} className="px-3 py-1 bg-warm/50 text-xs font-medium uppercase tracking-wide text-ink">
                  {highlight}
                </span>
              ))}
            </div>

            {edu.expandedDetails && (
              <ExpandableDetails details={edu.expandedDetails} />
            )}

            {edu.nested && (
              <LeCordonBleuCard nested={edu.nested} />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
