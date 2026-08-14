import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    category: 'Research',
    title: 'The interview question that breaks every persona',
    excerpt:
      'We stopped asking users what they want. Here\'s the single prompt that surfaced more product truth in six weeks than two years of surveys.',
    author: 'Mara Lindqvist',
    role: 'Head of Research',
    date: 'Feb 12, 2025',
    read: '9 min',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=900&fit=crop',
  },
  {
    id: 2,
    category: 'Craft',
    title: 'Density is a feature: designing for power users without apology',
    excerpt:
      'Whitespace became a religion and our dashboards got worse. A case for information-dense interfaces, with receipts from three enterprise redesigns.',
    author: 'Tomas Reuter',
    role: 'Design Director',
    date: 'Feb 4, 2025',
    read: '12 min',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop',
  },
  {
    id: 3,
    category: 'Process',
    title: 'We killed the design handoff. Nobody misses it.',
    excerpt:
      'How pairing designers with engineers from kickoff cut our shipping time by 40% — and what we lost in the trade.',
    author: 'Anaïs Dupont',
    role: 'Principal Designer',
    date: 'Jan 28, 2025',
    read: '7 min',
    img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=900&fit=crop',
  },
  {
    id: 4,
    category: 'Research',
    title: 'Usability testing with eleven users: when the rule of five fails',
    excerpt:
      'Nielsen\'s heuristic holds — until your product spans three regulated markets. Notes from testing a fintech onboarding flow in Berlin, Lagos, and São Paulo.',
    author: 'Mara Lindqvist',
    role: 'Head of Research',
    date: 'Jan 21, 2025',
    read: '11 min',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=900&fit=crop',
  },
  {
    id: 5,
    category: 'Opinion',
    title: 'Your design system is not the product',
    excerpt:
      'Component libraries are infrastructure, not strategy. A gentle intervention for teams that spend more time on tokens than on customers.',
    author: 'Tomas Reuter',
    role: 'Design Director',
    date: 'Jan 14, 2025',
    read: '6 min',
    img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=900&fit=crop',
  },
  {
    id: 6,
    category: 'Craft',
    title: 'Motion that earns its render budget',
    excerpt:
      'Every animation is a promise about causality. The framework we use to decide what moves, what doesn\'t, and what gets cut at 60fps.',
    author: 'Jun Park',
    role: 'Senior Product Designer',
    date: 'Jan 7, 2025',
    read: '8 min',
    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=900&fit=crop',
  },
  {
    id: 7,
    category: 'Process',
    title: 'The 90-minute critique format we\'ve run for four years',
    excerpt:
      'No vibes, no "I like it." A structured critique agenda that protects the work, the maker, and the meeting.',
    author: 'Anaïs Dupont',
    role: 'Principal Designer',
    date: 'Dec 17, 2024',
    read: '10 min',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=900&fit=crop',
  },
];

const FEATURED = {
  category: 'Field Notes',
  title: 'Nobody reads onboarding. Design for the second session instead.',
  excerpt:
    'After instrumenting 14 products across our client portfolio, one pattern kept repeating: activation doesn\'t happen during onboarding — it happens when users return. Here\'s how we restructured first-week experiences around the comeback, not the welcome.',
  author: 'Jun Park',
  role: 'Senior Product Designer',
  date: 'Feb 19, 2025',
  read: '14 min read',
  img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1600&h=1100&fit=crop',
};

const CATEGORIES = ['All', 'Research', 'Craft', 'Process', 'Opinion'];

export default function App() {
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState(null);

  const visible = filter === 'All' ? POSTS : POSTS.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#191714] antialiased">
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .font-serif-d { font-family: 'Fraunces', Georgia, serif; }
            .font-sans-d { font-family: 'Inter', -apple-system, sans-serif; }
            ::selection { background: #E8430A; color: #FAF7F2; }
            .post-row { border-bottom: 1px solid #E2DCD2; }
            .post-row:first-child { border-top: 1px solid #E2DCD2; }
            .img-clip { clip-path: inset(0 0 0 0); transition: clip-path .5s cubic-bezier(.16,1,.3,1); }
            .marquee { animation: marquee 28s linear infinite; }
            @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          `,
        }}
      />

      {/* ───────── Nav ───────── */}
      <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-sm border-b border-[#E2DCD2]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="#" className="font-serif-d text-[22px] font-semibold tracking-tight">
              Apertura<span className="text-[#E8430A]">*</span>
            </a>
            <nav className="hidden md:flex items-center gap-8 font-sans-d text-[13px] font-medium text-[#6B6357]">
              {['Work', 'Studio', 'Journal', 'Careers'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`transition-colors hover:text-[#191714] ${
                    item === 'Journal' ? 'text-[#191714]' : ''
                  }`}
                >
                  {item}
                  {item === 'Journal' && <span className="text-[#E8430A]"> ●</span>}
                </a>
              ))}
            </nav>
          </div>
          <a
            href="#"
            className="font-sans-d text-[13px] font-medium px-4 py-2 bg-[#191714] text-[#FAF7F2] rounded-full hover:bg-[#E8430A] transition-colors duration-300"
          >
            Start a project
          </a>
        </div>
      </header>

      <main className="max-w-[1320px] mx-auto px-6 lg:px-10">
        {/* ───────── Masthead ───────── */}
        <section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
          <p className="font-sans-d text-[12px] font-semibold tracking-[0.18em] uppercase text-[#E8430A] mb-5">
            The Apertura Journal
          </p>
          <h1 className="font-serif-d font-light text-[44px] leading-[1.04] sm:text-[64px] lg:text-[88px] tracking-[-0.02em] max-w-[1100px]">
            Notes on designing things people actually return&nbsp;to.
          </h1>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-3 font-sans-d text-[14px] text-[#6B6357]">
            <p className="max-w-md leading-relaxed">
              Essays, research dispatches, and process autopsies from a 19-person UX studio in Copenhagen &amp; New York.
            </p>
            <p className="text-[12px] tracking-wide">Published most Tuesdays · No paywall, ever</p>
          </div>
        </section>

        {/* ───────── Featured ───────── */}
        <section className="pb-20 lg:pb-28">
          <a href="#" className="group grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7 overflow-hidden rounded-[4px]">
              <motion.img
                src={FEATURED.img}
                alt=""
                className="w-full h-[320px] sm:h-[440px] lg:h-[540px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <div className="flex items-center gap-3 font-sans-d text-[12px] font-medium tracking-wide text-[#6B6357] mb-5">
                <span className="px-3 py-1 border border-[#191714] rounded-full text-[#191714]">
                  {FEATURED.category}
                </span>
                <span>{FEATURED.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#C9C0B2]" />
                <span>{FEATURED.read}</span>
              </div>
              <h2 className="font-serif-d font-medium text-[30px] sm:text-[38px] leading-[1.08] tracking-[-0.01em] mb-5 group-hover:text-[#E8430A] transition-colors duration-300">
                {FEATURED.title}
              </h2>
              <p className="font-sans-d text-[15px] leading-[1.7] text-[#56503F] mb-8 max-w-[480px]">
                {FEATURED.excerpt}
              </p>
              <div className="flex items-center justify-between max-w-[480px]">
                <div className="font-sans-d text-[13px]">
                  <p className="font-semibold">{FEATURED.author}</p>
                  <p className="text-[#6B6357]">{FEATURED.role}</p>
                </div>
                <span className="flex items-center gap-2 font-sans-d text-[13px] font-semibold">
                  Read essay
                  <span className="w-9 h-9 rounded-full bg-[#191714] text-[#FAF7F2] grid place-items-center group-hover:bg-[#E8430A] transition-colors duration-300">
                    <ArrowUpRight size={16} />
                  </span>
                </span>
              </div>
            </div>
          </a>
        </section>

        {/* ───────── Filter bar ───────── */}
        <section className="flex flex-wrap items-end justify-between gap-6 pb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`font-sans-d text-[13px] font-medium px-4 py-[7px] rounded-full transition-all duration-200 ${
                  filter === c
                    ? 'bg-[#191714] text-[#FAF7F2]'
                    : 'text-[#6B6357] hover:text-[#191714] border border-[#D9D2C5] hover:border-[#191714]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="font-sans-d text-[12px] tracking-wide text-[#6B6357]">
            {visible.length} {visible.length === 1 ? 'essay' : 'essays'}
          </p>
        </section>

        {/* ───────── Post index ───────── */}
        <section className="pb-24">
          <AnimatePresence mode="popLayout">
            {visible.map((post, i) => (
              <motion.a
                layout
                key={post.id}
                href="#"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                onMouseEnter={() => setHovered(post.id)}
                onMouseLeave={() => setHovered(null)}
                className="post-row group grid grid-cols-12 gap-x-4 lg:gap-x-8 items-center py-7 lg:py-9"
              >
                {/* index */}
                <div className="hidden lg:block col-span-1 font-serif-d text-[15px] text-[#A89F8E]">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* thumbnail */}
                <div className="col-span-3 lg:col-span-2 overflow-hidden rounded-[3px]">
                  <img
                    src={post.img}
                    alt=""
                    className={`w-full h-[72px] sm:h-[96px] object-cover transition-all duration-500 ${
                      hovered === post.id ? 'scale-105 grayscale-0' : 'grayscale-[35%]'
                    }`}
                  />
                </div>

                {/* title + excerpt */}
                <div className="col-span-9 lg:col-span-6 pl-1 lg:pl-2">
                  <div className="flex items-center gap-3 font-sans-d text-[11px] font-medium tracking-wide text-[#6B6357] mb-2">
                    <span className="text-[#E8430A] uppercase tracking-[0.12em]">{post.category}</span>
                    <span className="hidden sm:inline">{post.read}</span>
                  </div>
                  <h3
                    className={`font-serif-d font-medium text-[19px] sm:text-[24px] leading-[1.15] tracking-[-0.01em] transition-colors duration-300 ${
                      hovered === post.id ? 'text-[#E8430A]' : ''
                    }`}
                  >
                    {post.title}
                  </h3>
                  <p className="hidden sm:block font-sans-d text-[13.5px] leading-[1.6] text-[#6B6357] mt-2 max-w-[560px] line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* meta */}
                <div className="hidden lg:flex col-span-2 flex-col font-sans-d text-[13px]">
                  <span className="font-semibold">{post.author}</span>
                  <span className="text-[#6B6357]">{post.date}</span>
                </div>

                {/* arrow */}
                <div className="hidden lg:flex col-span-1 justify-end">
                  <span
                    className={`w-10 h-10 rounded-full grid place-items-center border transition-all duration-300 ${
                      hovered === post.id
                        ? 'bg-[#191714] border-[#191714] text-[#FAF7F2] -rotate-45'
                        : 'border-[#D9D2C5] text-[#191714]'
                    }`}
                  >
                    <ArrowRight size={16} />
                  </span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </section>
      </main>

      {/* ───────── Newsletter ───────── */}
      <section className="bg-[#191714] text-[#FAF7F2]">
        <div className="overflow-hidden py-5 border-b border-[#39342C]">
          <div className="marquee flex whitespace-nowrap font-serif-d text-[15px] tracking-wide text-[#A89F8E]">
            {[...Array(2)].map((_, k) => (
              <span key={k} className="flex">
                {['Research dispatches', 'Process autopsies', 'Craft essays', 'Honest opinions'].map((t) => (
                  <span key={t} className="mx-8 flex items-center gap-8">
                    {t} <span className="text-[#E8430A]">✺</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif-d font-light text-[38px] sm:text-[52px] leading-[1.05] tracking-[-0.015em]">
              One essay, every Tuesday. <span className="text-[#A89F8E]">Read by 22,400 designers.</span>
            </h2>
          </div>
          <div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center border-b border-[#56503F] focus-within:border-[#E8430A] transition-colors pb-3"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent font-sans-d text-[16px] placeholder:text-[#6B6357] outline-none"
              />
              <button className="font-sans-d text-[13px] font-semibold flex items-center gap-2 text-[#FAF7F2] hover:text-[#E8430A] transition-colors">
                Subscribe <ArrowRight size={15} />
              </button>
            </form>
            <p className="font-sans-d text-[12px] text-[#6B6357] mt-4">
              No product updates, no sponsor reads. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className="bg-[#191714] text-[#A89F8E] border-t border-[#39342C]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-sans-d text-[13px]">
          <span className="font-serif-d text-[18px] font-semibold text-[#FAF7F2]">
            Apertura<span className="text-[#E8430A]">*</span>
          </span>
          <div className="flex gap-7">
            {['Work', 'Studio', 'Journal', 'Contact', 'LinkedIn', 'Are.na'].map((l) => (
              <a key={l} href="#" className="hover:text-[#FAF7F2] transition-colors">
                {l}
              </a>
            ))}
          </div>
          <span className="text-[#56503F]">© 2025 Apertura Studio ApS</span>
        </div>
      </footer>
    </div>
  );
}