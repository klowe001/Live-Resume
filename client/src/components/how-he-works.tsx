import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';

const SPEC_URL = 'https://github.com/reminiscent-io/wanderluxe/blob/main-agent/PRODUCT.md';

const principles = [
  {
    title: 'Economics first',
    body: 'He models revenue lift, redemption liability, and unit economics before recommending action, using Excel models, Tableau dashboards and, more recently, analytics tools he builds himself.',
  },
  {
    title: 'Player-coach',
    body: 'He decides case by case whether to let the team run on its own, work in the model alongside them, or build the prototype himself while they focus elsewhere. He gets as much out of the hands-on work as out of mentoring.',
  },
];

export function HowHeWorks() {
  return (
    <section id="how-he-works" className="on-ink bg-ink py-20 text-paper md:py-28">
      <div className="page">
        <SectionHeading tone="ink">How he works</SectionHeading>

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h3 className="type-masthead text-[clamp(4rem,11vw,9.5rem)] text-accent-light">
              Demo,
              <br />
              not memo.
            </h3>
            <div className="mt-8 max-w-[60ch] space-y-4 text-lg leading-relaxed text-paper/85">
              <p>Kevin aligns a room by showing a working version instead of describing one.</p>
              <p>
                On one loyalty redesign, his team swapped a 50- to 70-page deck for a clickable version of the
                program. The client shared it with the company’s Chief Customer Officer in week 5 of 14.
              </p>
              <p>
                Every demo he builds starts from a one-page spec.{' '}
                <a
                  href={SPEC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-paper underline decoration-accent-light decoration-2 underline-offset-[5px] hover:text-accent-light"
                >
                  Here’s the one for WanderLuxe
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-10 lg:col-span-5 lg:pt-3">
            {principles.map((p) => (
              <div key={p.title} className="border-t border-paper/20 pt-5">
                <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-paper/85">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
