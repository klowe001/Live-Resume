import { motion } from 'framer-motion';
import { Lightbulb, Terminal, TrendingUp, Users } from 'lucide-react';

const philosophies = [
  {
    icon: Terminal,
    title: "Strategy Through Execution",
    description: "The most elegant strategy is worthless without the ability to ship. I've spent years translating business intent into engineering specs. Now I build products myself to close the loop entirely."
  },
  {
    icon: Lightbulb,
    title: "AI as Amplifier",
    description: "AI accelerates judgment. I use agentic workflows to prototype in hours what once took weeks, but the value still comes from knowing which problems to solve and how to shape solutions."
  },
  {
    icon: TrendingUp,
    title: "Economics-First GTM",
    description: "Every product decision should connect to a measurable outcome. I model revenue lift, redemption liability, and unit economics before recommending action."
  },
  {
    icon: Users,
    title: "Player-Coach Mentality",
    description: "I go hands-on where it reduces iteration cycles or unblocks others. Build the first version, document the pattern, then coach someone to own v2. Success means the team can ship without me."
  }
];

export function Philosophy() {
  return (
    <section id="philosophy" className="py-32 bg-ink text-paper relative overflow-hidden">
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
              <p className="text-white/70 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
