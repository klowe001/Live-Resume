import {
  TIMELINE_START,
  TIMELINE_END,
  workSpans,
  schoolSpans,
  leaveSpan,
  tenure,
  logoHeight,
  type Span,
} from '@/lib/career';

const total = TIMELINE_END - TIMELINE_START;
const pct = (year: number) => ((year - TIMELINE_START) / total) * 100;

const years: number[] = [];
for (let y = TIMELINE_START; y <= Math.floor(TIMELINE_END); y++) years.push(y);

const newestFirst = (a: Span, b: Span) => b.start - a.start;
const work = [...workSpans].sort(newestFirst);
const school = [...schoolSpans].sort(newestFirst);

function Logo({ span, base }: { span: Span; base: number }) {
  return (
    <img
      src={span.logo.src}
      alt={span.label}
      width={span.logo.width}
      height={span.logo.height}
      className="w-auto max-w-full object-contain object-left"
      style={{ height: logoHeight(span.logo, base) }}
    />
  );
}

/** One place per lane, so back-to-back jobs never merge into one bar. */
function Lane({ span }: { span: Span }) {
  const left = pct(span.start);
  const right = pct(span.end ?? TIMELINE_END);
  // A bar that runs to today holds its tenure inside; the rest put it just past the end.
  const inside = right > 88;

  return (
    <a
      href={span.href}
      aria-label={`${span.label}, ${span.years}, ${tenure(span)}`}
      className="group grid grid-cols-[9.5rem_1fr] items-center gap-4 py-1"
    >
      <span className="flex items-center">
        <Logo span={span} base={2} />
      </span>
      <span className="relative block h-7">
        <span
          className="absolute inset-y-0 min-w-1.5 transition-opacity duration-200 group-hover:opacity-85"
          style={{ left: `${left}%`, width: `${right - left}%`, backgroundColor: span.color }}
        />
        {span.href === '#exp-bcg' && (
          <span
            className="absolute inset-y-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,oklch(0.97_0.007_80/0.85)_0_2px,transparent_2px_7px)]"
            style={{ left: `${pct(leaveSpan.start)}%`, width: `${pct(leaveSpan.end) - pct(leaveSpan.start)}%` }}
          >
            <span className="hidden whitespace-nowrap bg-paper px-1.5 py-0.5 text-xs font-bold text-ink lg:inline">
              {leaveSpan.label}
            </span>
          </span>
        )}
        <span
          className={`tabular absolute inset-y-0 flex items-center whitespace-nowrap text-sm font-bold ${
            inside ? 'pr-3 text-paper' : 'pl-2.5 text-ink'
          }`}
          style={inside ? { right: `${100 - right}%` } : { left: `${right}%` }}
        >
          {tenure(span)}
        </span>
      </span>
    </a>
  );
}

const listItems = [...work, ...school].sort(newestFirst);

export function CareerTimeline() {
  return (
    <figure className="mt-12 md:mt-16">
      <figcaption className="mb-6 text-lg font-bold">Career at a glance</figcaption>

      {/* Lanes, tablet and up */}
      <div className="hidden md:block">
        {work.map((span) => (
          <Lane key={span.label} span={span} />
        ))}
        <div className="my-2 ml-[10.5rem] border-t border-line" />
        {school.map((span) => (
          <Lane key={span.label} span={span} />
        ))}
        <div className="mt-2 grid grid-cols-[9.5rem_1fr] gap-4">
          <div />
          <div className="relative h-6 border-t border-line">
            {years.map((y) => (
              <span
                key={y}
                className={`tabular absolute top-1.5 -translate-x-1/2 text-xs text-ink-soft ${y % 2 === 0 ? 'lg:block' : 'hidden lg:block'}`}
                style={{ left: `${pct(y)}%` }}
              >
                {y}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* List, phones */}
      <ol className="divide-y divide-line border-y border-line md:hidden">
        {listItems.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="flex items-center gap-4 py-3">
              <span className="tabular w-28 shrink-0 text-[0.9375rem] text-ink-soft">{item.years}</span>
              <span className="min-w-0 flex-1">
                <Logo span={item} base={1.75} />
                {item.href === '#exp-bcg' && (
                  <span className="mt-1 block text-[0.9375rem] text-ink-soft">MBA leave 2020 – 2022</span>
                )}
              </span>
              <span className="tabular shrink-0 text-[0.9375rem] font-bold" style={{ color: item.color }}>
                {tenure(item)}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </figure>
  );
}
