import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Terminal, TrendingUp, Users, Play, ChevronDown, Layers } from 'lucide-react';

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
    description: "My job is to enable teams to do their best work. Sometimes that means stepping back and letting people run independently, driving full ownership of their work. Sometimes it means jumping into the model alongside them to accelerate progress and bring the team along. And sometimes it means building the demo or prototype myself while the team focuses elsewhere. I find as much fulfillment in getting hands-on with the work as I do in the mentorship side of leadership."
  },
  {
    icon: Play,
    title: "Demo, Not Memo",
    description: "The most powerful way to align on an idea is to show it, not explain it. Too often teams burn cycles in PowerPoint purgatory - debating hypotheticals, wordsmithing requirements docs, and arguing over abstractions. It's slow, exhausting, and usually wrong anyway. When you can just build something - a prototype, a clickable mock, a working version - you skip the translation layer entirely. People react to what they experience, not what they imagine. In a world where building is faster than ever, the memo is the bottleneck."
  },
  {
    icon: Layers,
    title: "A Jack of All Trades",
    description: "\"A jack of all trades is a master of none, but oftentimes better than a master of one.\" People tend to leave off that last part, but I think it's the most important. I've found immense value in cultivating a wide breadth of skills and interests—from strategy to design to code to data. It's not about being the best at any one thing; it's about connecting dots others can't see. And frankly, I find it far more enjoyable to understand a little about a lot than to go deep on just one domain."
  }
];

function MobileCollapsibleCard({ item, index }: { item: typeof philosophies[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group border border-white/10 hover:border-accent transition-all duration-300 md:hover:-translate-y-1 bg-white/5 backdrop-blur-sm"
    >
      {/* Mobile: Collapsible header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full flex items-center justify-between text-left p-4"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-accent stroke-[1.5]" />
          <h3 className="font-serif text-xl text-white">
            {item.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/60" />
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
            <div className="px-4 pb-4">
              <p className="text-white/80 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: Always visible */}
      <div className="hidden md:block p-8">
        <Icon className="w-8 h-8 text-accent mb-6 stroke-[1.5]" />
        <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <p className="text-white/80 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Philosophy() {
  return (
    <section id="philosophy" className="py-20 bg-ink text-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-baseline gap-4 mb-16 border-b border-white/20 pb-8">
          <span className="font-serif text-accent italic text-lg">01</span>
          <h2 className="font-serif text-4xl md:text-5xl">How I Think</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
          {philosophies.map((item, index) => (
            <MobileCollapsibleCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
