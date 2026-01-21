import { motion } from 'framer-motion';
import { Lightbulb, Terminal, TrendingUp, Users } from 'lucide-react';

const philosophies = [
  {
    icon: Terminal,
    title: "Strategy Through Execution",
    description: "I've spent years defining growth strategy for brands and companies with a lens toward implementation feasibility. Now I'm comfortable building fast, and early; iterating products on my own so I can truly understand the end-to-end journey from strategy to shipped product."
  },
  {
    icon: Lightbulb,
    title: "AI as Amplifier",
    description: "AI accelerates good judgment. I embed it in my everyday workflows to do in minutes what previously took hours. But, AI is not a silver bullet. My years of working 'the old fashioned way' allows me to leverage its full potential. The real value comes from a strong foundation in customer experience design, strategic rationale, and clarity on the problems worth solving."
  },
  {
    icon: TrendingUp,
    title: "Economics-First Mindset",
    description: "Every decision should connect to a measurable outcome. I model revenue lift, redemption liability, and unit economics before recommending action—backed by years of building complex Excel models, Tableau dashboards, and more recently, fully custom analytics tools."
  },
  {
    icon: Users,
    title: "Player-Coach Mentality",
    description: "I go hands-on where it reduces iteration cycles or unblocks others. Build the first version, document the pattern, then coach someone to own the next iteration. Success means the team can ship without me."
  }
];

export function Philosophy() {
  return (
    <section id="philosophy" className="py-20 bg-ink text-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-baseline gap-4 mb-16 border-b border-white/20 pb-8">
          <span className="font-serif text-accent italic text-lg">01</span>
          <h2 className="font-serif text-4xl md:text-5xl">How I Think</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {philosophies.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 border border-white/10 hover:border-accent transition-all duration-300 hover:-translate-y-1 bg-white/5 backdrop-blur-sm"
            >
              <item.icon className="w-8 h-8 text-accent mb-6 stroke-[1.5]" />
              <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
