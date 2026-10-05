import { useState } from 'react';
import { TIMELINE_START, TIMELINE_END, stops, milestones, logoHeight, type Stop } from '@/lib/career';

/*
 * Career journey: years run along the bottom, experience climbs the unlabeled
 * y-axis. The line is decorative (a gentle rise with a light wobble), so only
 * the x positions carry meaning. Each stretch is drawn in that brand's color.
 */

const span = TIMELINE_END - TIMELINE_START;
const tOf = (year: number) => (year - TIMELINE_START) / span;

// Height of the line, 0 at the start and 1 today. Both wobbles are zero at the ends.
const rise = (t: number) =>
  0.55 * t + 0.45 * t ** 1.6 + 0.024 * Math.sin(2 * Math.PI * 3 * t) + 0.007 * Math.sin(2 * Math.PI * 7 * t);

// Where the line sits inside the plot, as fractions from the top.
const TOP = 0.05;
const BOTTOM = 0.8;
const yOf = (t: number) => BOTTOM - rise(t) * (BOTTOM - TOP);

/** A point on the line, in percent of the plot box. */
const at = (year: number) => {
  const t = tOf(year);
  return { x: t * 100, y: yOf(t) * 100 };
};

/** SVG path along the line between two years, in a 1000×1000 box. */
function trace(from: number, to: number) {
  const a = tOf(from);
  const b = tOf(to);
  const steps = Math.max(2, Math.ceil((b - a) * 240));
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = a + ((b - a) * i) / steps;
    d += `${i ? 'L' : 'M'}${(t * 1000).toFixed(1)},${(yOf(t) * 1000).toFixed(1)}`;
  }
  return d;
}

const endOf = (stop: Stop) => stop.end ?? TIMELINE_END;

// Longest stretches first, so Wharton draws over BCG and Silicon Labs over SMU.
const segments = [...stops].sort((a, b) => endOf(b) - b.start - (endOf(a) - a.start));

/** Where each label hangs off its dot. reach is the stem length in rem. */
const placement: Record<string, { side: 'above' | 'below'; align: 'start' | 'end'; reach: number }> = {
  'edu-smu': { side: 'above', align: 'start', reach: 9.5 },
  'exp-silicon-labs': { side: 'below', align: 'start', reach: 1.5 },
  'exp-pizza-hut': { side: 'above', align: 'start', reach: 4.5 },
  'exp-bcg': { side: 'below', align: 'start', reach: 1.5 },
  'edu-wharton': { side: 'above', align: 'end', reach: 3 },
};

// Year marks on the axis: every start and end, labeled once per year.
const ticks: { year: number; label: string }[] = [];
for (const year of stops.flatMap((s) => (s.end ? [s.start, s.end] : [s.start])).sort((a, b) => a - b)) {
  const label = String(Math.floor(year));
  if (!ticks.some((tick) => tick.label === label)) ticks.push({ year, label });
}

// Current role first, then newest start first.
const listItems = [...stops].sort((a, b) => Number(a.end !== null) - Number(b.end !== null) || b.start - a.start);

function Label({ stop, active, onActive }: { stop: Stop; active: string | null; onActive: (id: string | null) => void }) {
  const { side, align, reach } = placement[stop.id];
  const point = at(stop.start);
  const above = side === 'above';
  const end = align === 'end';

  return (
    <li
      className={`absolute transition-opacity duration-200 ${active && active !== stop.id ? 'opacity-45' : ''}`}
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
    >
      {/* Stem from the dot to the label, continuing as the label's rule. */}
      <span
        aria-hidden="true"
        className="absolute -left-px w-0.5"
        style={{ backgroundColor: stop.color, height: `${reach}rem`, [above ? 'bottom' : 'top']: 0 }}
      />
      <a
        href={`#${stop.id}`}
        aria-label={`${stop.name}, ${stop.role}, ${stop.years}`}
        onMouseEnter={() => onActive(stop.id)}
        onMouseLeave={() => onActive(null)}
        onFocus={() => onActive(stop.id)}
        onBlur={() => onActive(null)}
        className={`group absolute block whitespace-nowrap py-0.5 ${end ? '-right-px border-r-2 pr-3 text-right' : '-left-px border-l-2 pl-3'}`}
        style={{ borderColor: stop.color, [above ? 'bottom' : 'top']: `${reach}rem` }}
      >
        <img
          src={stop.logo.src}
          width={stop.logo.width}
          height={stop.logo.height}
          alt=""
          loading="lazy"
          className={`w-auto ${end ? 'ml-auto' : ''}`}
          style={{ height: logoHeight(stop.logo, 1.75) }}
        />
        <span className="mt-2 block text-[0.9375rem] font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">
          {stop.role}
        </span>
        <span className="tabular block text-[0.9375rem] leading-snug text-ink-soft">{stop.years}</span>
      </a>
      <span
        aria-hidden="true"
        className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-paper"
        style={{ borderColor: stop.color }}
      />
    </li>
  );
}

export function CareerTimeline() {
  const [active, setActive] = useState<string | null>(null);
  const today = at(TIMELINE_END);
  const current = stops.find((s) => s.end === null);

  return (
    <figure className="mt-12 md:mt-16">
      <figcaption className="mb-6 text-lg font-bold">Career at a glance</figcaption>

      {/* Journey, laptop and up */}
      <div className="hidden lg:block">
        <div className="relative h-[27rem] border-b border-l border-line xl:h-[29rem]">
          {/* Drop lines from the axis to the line at each start and end. */}
          {ticks.map((tick) => {
            const p = at(tick.year);
            return (
              <span
                key={tick.label}
                aria-hidden="true"
                className="absolute bottom-0 border-l border-dashed border-line"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              />
            );
          })}

          <svg
            aria-hidden="true"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible"
          >
            {segments.map((stop) => (
              <path
                key={stop.id}
                d={trace(stop.start, endOf(stop))}
                fill="none"
                stroke={stop.color}
                strokeWidth={active === stop.id ? 6 : 4}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="transition-[opacity,stroke-width] duration-200"
                opacity={active && active !== stop.id ? 0.25 : 1}
              />
            ))}
          </svg>

          {/* Promotions along the BCG stretch. */}
          {milestones.map((m) => {
            const p = at(m.year);
            return (
              <div
                key={m.label}
                className={`absolute transition-opacity duration-200 ${active && active !== current?.id ? 'opacity-45' : ''}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                {/* A short stem down to a ruled label, so Consultant reads apart from the Wharton dot beside it. */}
                <p
                  className="absolute -left-px top-0 whitespace-nowrap border-l pl-2 pt-5 text-[0.9375rem] leading-snug"
                  style={{ borderColor: current?.color }}
                >
                  <span className="block font-semibold">{m.label}</span>
                  <span className="tabular block text-ink-soft">{m.display}</span>
                </p>
                <span
                  aria-hidden="true"
                  className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ backgroundColor: current?.color }}
                />
              </div>
            );
          })}

          <span
            aria-hidden="true"
            className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${today.x}%`, top: `${today.y}%`, backgroundColor: current?.color }}
          />

          <ol>
            {stops.map((stop) => (
              <Label key={stop.id} stop={stop} active={active} onActive={setActive} />
            ))}
          </ol>
        </div>

        <div aria-hidden="true" className="relative h-7">
          {ticks.map((tick, i) => (
            <span
              key={tick.label}
              className={`tabular absolute top-2 text-xs text-ink-soft ${i === 0 ? '' : '-translate-x-1/2'}`}
              style={{ left: `${at(tick.year).x}%` }}
            >
              {tick.label}
            </span>
          ))}
          <span className="absolute right-0 top-2 text-xs text-ink-soft">Today</span>
        </div>
      </div>

      {/* List, phones and tablets */}
      <ol className="divide-y divide-line border-y border-line lg:hidden">
        {listItems.map((stop) => (
          <li key={stop.id}>
            <a href={`#${stop.id}`} className="flex items-baseline gap-4 py-3">
              <span className="tabular w-28 shrink-0 text-[0.9375rem] text-ink-soft">{stop.years}</span>
              <span className="font-semibold">
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block size-2.5 rounded-full"
                  style={{ backgroundColor: stop.color }}
                />
                {stop.name}
                <span className="block pl-[1.125rem] text-[0.9375rem] font-normal text-ink-soft">{stop.role}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </figure>
  );
}
