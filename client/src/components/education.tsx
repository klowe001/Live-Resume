import { schools, logoHeight } from '@/lib/career';
import { SectionHeading } from '@/components/section-heading';

export function Education() {
  return (
    <section id="education" className="page pt-20 md:pt-28">
      <SectionHeading>Education</SectionHeading>

      {/* Side by side from md up. Each school spans the same eight subgrid rows
          (logo, school, university, period, degree, focus, note, honors), so
          matching lines sit level across the two columns. */}
      <div className="mt-12 divide-y divide-line border-t border-line md:mt-16 md:grid md:grid-cols-2 md:gap-x-12 md:divide-y-0 lg:gap-x-16">
        {schools.map((s) => (
          <article
            key={s.id}
            id={s.id}
            className="flex scroll-mt-24 flex-col py-10 last:pb-0 md:row-span-8 md:grid md:grid-rows-subgrid md:py-12 md:last:pb-0"
          >
            <div className="flex items-end">
              <img
                src={s.logo.src}
                width={s.logo.width}
                height={s.logo.height}
                alt=""
                loading="lazy"
                className="w-auto"
                style={{ height: logoHeight(s.logo, 2.75) }}
              />
            </div>

            <h3 className="mt-6 text-2xl font-bold leading-tight tracking-[-0.015em]">{s.school}</h3>
            <p className="text-lg font-medium text-ink-soft">{s.university}</p>
            <p className="tabular mt-1 font-medium">
              {s.period} <span className="font-normal text-ink-soft">· {s.location}</span>
            </p>

            <p className="mt-4 text-xl font-semibold leading-snug">{s.degree}</p>
            <p className="text-ink-soft">{s.focus}</p>
            <p className="mt-3 max-w-[60ch]">{s.note}</p>
            <p className="mt-4">{s.honors.join(' · ')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
