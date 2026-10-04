import {
  TIMELINE_START,
  TIMELINE_END,
  workSpans,
  schoolSpans,
  leaveSpan,
  type Span,
} from '@/lib/career';

const total = TIMELINE_END - TIMELINE_START;
const pct = (year: number) => ((year - TIMELINE_START) / total) * 100;

const years: number[] = [];
for (let y = TIMELINE_START; y <= Math.floor(TIMELINE_END); y++) years.push(y);

function Band({ span, tone }: { span: Span; tone: 'work' | 'school' }) {
  const end = span.end ?? TIMELINE_END;
  const left = pct(span.start);
  const width = pct(end) - left;
  const narrow = width < 7;
  const colors =
    tone === 'work'
      ? 'bg-ink text-paper hover:bg-accent'
      : 'bg-paper-deep text-ink ring-1 ring-inset ring-line hover:bg-accent hover:text-paper hover:ring-accent';

  return (
    <a
      href={span.href}
      aria-label={`${span.label}, ${span.years}`}
      className={`group absolute inset-y-0 flex items-center transition-colors duration-200 ${colors}`}
      style={{ left: `${left}%`, width: `${width}%` }}
    >
      {narrow ? (
        <span className="absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-ink">
          {span.short ?? span.label}
        </span>
      ) : (
        <span className="truncate px-3 text-sm font-semibold">
          <span className="hidden xl:inline">{span.label}</span>
          <span className="xl:hidden">{span.short ?? span.label}</span>
        </span>
      )}
    </a>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] items-center gap-4">
      <div className="text-sm font-semibold text-ink-soft">{label}</div>
      <div className="relative h-11">{children}</div>
    </div>
  );
}

const listItems = [...workSpans.map((s) => ({ ...s, tone: 'work' as const })), ...schoolSpans.map((s) => ({ ...s, tone: 'school' as const }))].sort(
  (a, b) => b.start - a.start,
);

export function CareerTimeline() {
  return (
    <figure className="mt-12 md:mt-16">
      <figcaption className="mb-6 text-lg font-bold">Career at a glance</figcaption>

      {/* Ruler, tablet and up */}
      <div className="hidden space-y-3 md:block">
        <Row label="Work">
          {workSpans.map((span) => (
            <Band key={span.label} span={span} tone="work" />
          ))}
          <div
            className="pointer-events-none absolute inset-y-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,oklch(0.97_0.007_80/0.9)_0_2px,transparent_2px_7px)] text-xs font-bold text-ink"
            style={{ left: `${pct(leaveSpan.start)}%`, width: `${pct(leaveSpan.end) - pct(leaveSpan.start)}%` }}
          >
            <span className="bg-paper px-1.5 py-0.5">{leaveSpan.label}</span>
          </div>
        </Row>
        <Row label="Education">
          {schoolSpans.map((span) => (
            <Band key={span.label} span={span} tone="school" />
          ))}
        </Row>
        <div className="grid grid-cols-[6.5rem_1fr] gap-4">
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
            <a href={item.href} className="flex items-baseline gap-4 py-3">
              <span className="tabular w-28 shrink-0 text-[0.9375rem] text-ink-soft">{item.years}</span>
              <span className="font-semibold">
                <span
                  aria-hidden="true"
                  className={`mr-2 inline-block h-2.5 w-2.5 ${item.tone === 'work' ? 'bg-ink' : 'bg-paper-deep ring-1 ring-line'}`}
                />
                {item.label}
                {item.label === 'Boston Consulting Group' && (
                  <span className="block pl-[1.125rem] text-[0.9375rem] font-normal text-ink-soft">
                    MBA leave 2020 – 2022
                  </span>
                )}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </figure>
  );
}
