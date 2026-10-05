import { schools, logoHeight } from '@/lib/career';
import { SectionHeading } from '@/components/section-heading';

export function Education() {
  return (
    <section id="education" className="page py-20 md:py-28">
      <SectionHeading>Education</SectionHeading>

      <div className="mt-12 divide-y divide-line border-t border-line md:mt-16">
        {schools.map((s) => (
          <article key={s.id} id={s.id} className="grid scroll-mt-24 gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-12">
            <div className="md:col-span-4 lg:col-span-3">
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

            <div className="md:col-span-8 lg:col-span-9">
              <h3 className="text-2xl font-bold leading-tight tracking-[-0.015em]">
                {s.school}
                {s.university && <span className="block text-lg font-medium text-ink-soft">{s.university}</span>}
              </h3>
              <p className="tabular mt-1 font-medium">
                {s.period} <span className="font-normal text-ink-soft">· {s.location}</span>
              </p>

              <p className="mt-4 text-xl font-semibold leading-snug">{s.degree}</p>
              <p className="text-ink-soft">{s.focus}</p>
              {s.note && <p className="mt-3 max-w-[60ch]">{s.note}</p>}
              <p className="mt-4">{s.honors.join(' · ')}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
