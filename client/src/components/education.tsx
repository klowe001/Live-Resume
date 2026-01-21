import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const education = [
  {
    school: "The Wharton School",
    university: "University of Pennsylvania",
    degree: "Master of Business Administration",
    period: "2020 – 2022",
    location: "Philadelphia, PA",
    focus: "Strategic Management & Entrepreneurship",
    highlights: ["Director's List (top 10%)", "First-Year Honors (top 20%)", "GMAT: 740"]
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

export function Education() {
  return (
    <section id="education" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-baseline gap-4 mb-20 border-b border-warm pb-8">
        <span className="font-serif text-accent-dark italic text-lg">03</span>
        <h2 className="font-serif text-4xl md:text-5xl text-ink">Education</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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

            <div className="flex flex-wrap gap-2 mt-6">
              {edu.highlights.map(highlight => (
                <span key={highlight} className="px-3 py-1 bg-warm/50 text-xs font-medium uppercase tracking-wide text-ink">
                  {highlight}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
