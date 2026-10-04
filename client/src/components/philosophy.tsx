import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Play, ChevronDown } from 'lucide-react';
import { useAnimationContext } from '@/context/animation-context';
import { mobileMotion } from '@/lib/motion';

interface Philosophy {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  /** Optional closing sentence rendered as a link, followed by a period. */
  link?: { text: string; url: string };
}

const philosophies: Philosophy[] = [
  {
    icon: Play,
    title: "Demo, Not Memo",
    description: "The most powerful way to align on an idea is to show it, not explain it. Too often teams burn cycles in PowerPoint purgatory: debating hypotheticals, wordsmithing requirements docs, and arguing over abstractions. It's slow, exhausting, and usually wrong anyway. When you can just build something (a prototype, a clickable mock, a working version) you skip the translation layer entirely. On one loyalty redesign we swapped a 50 to 70 page deck for a clickable version of the program, and the client shared it with his Chief Customer Officer in week 5 of 14. Every demo I build still starts from a one-page spec.",
    link: { text: "Here's the one for WanderLuxe", url: "https://github.com/reminiscent-io/wanderluxe/blob/main-agent/PRODUCT.md" }
  },
  {
    icon: TrendingUp,
    title: "Economics-First Mindset",
    description: "Every decision should connect to a measurable outcome. I model revenue lift, redemption liability, and unit economics before recommending action, backed by years of building complex Excel models, Tableau dashboards, and more recently, fully custom analytics tools."
  },
  {
    icon: Users,
    title: "Player-Coach Mentality",
    description: "My job is to enable teams to do their best work. Sometimes that means stepping back and letting people run independently, driving full ownership of their work. Sometimes it means jumping into the model alongside them to accelerate progress and bring the team along. And sometimes it means building the demo or prototype myself while the team focuses elsewhere. I find as much fulfillment in getting hands-on with the work as I do in the mentorship side of leadership."
  }
];

function Body({ item }: { item: Philosophy }) {
  return (
    <>
      {item.description}
      {item.link && (
        <>
          {' '}
          <a
            href={item.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 decoration-accent/50 hover:text-paper hover:decoration-paper transition-colors focus-visible:outline-none focus-visible:text-paper"
          >
            {item.link.text}
          </a>
          .
        </>
      )}
    </>
  );
}

function MobileCollapsibleCard({ item, index }: { item: Philosophy; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMobile } = useAnimationContext();
  const m = mobileMotion(isMobile);
  const Icon = item.icon;

  return (
    <motion.div
      key={item.title}
      {...m.fadeUp(index)}
      className="group border border-paper/10 hover:border-accent transition-all duration-300 md:hover:-translate-y-1 bg-paper/[0.04]"
    >
      {/* Mobile: Collapsible header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full flex items-center justify-between text-left p-4"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-accent stroke-[1.5]" />
          <h3 className="font-serif text-xl text-paper">
            {item.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-paper/60" />
        </motion.div>
      </button>

      {/* Mobile: Collapsible content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            {...m.expand}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 pb-4">
              <p className="text-paper/80 leading-relaxed text-sm">
                <Body item={item} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: Always visible */}
      <div className="hidden md:block p-8">
        <Icon className="w-8 h-8 text-accent mb-6 stroke-[1.5]" />
        <h3 className="font-serif text-2xl mb-4 text-paper group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <p className="text-paper/80 leading-relaxed">
          <Body item={item} />
        </p>
      </div>
    </motion.div>
  );
}

export function Philosophy() {
  return (
    <section id="philosophy" className="py-20 bg-ink text-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-baseline gap-4 mb-16 border-b border-paper/15 pb-8">
          <span className="font-serif text-accent italic text-lg">03</span>
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
