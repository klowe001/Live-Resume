import { employers, logoHeight, type Role } from '@/lib/career';
import { SectionHeading } from '@/components/section-heading';
import { CareerTimeline } from '@/components/career-timeline';
import { Disclosure } from '@/components/disclosure';

function RoleEntry({ role }: { role: Role }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h4 className="text-xl font-bold leading-snug tracking-[-0.01em]">{role.title}</h4>
        <p className="tabular font-medium">{role.period}</p>
      </div>
      {role.note && <p className="mt-1 text-[0.9375rem] text-ink-soft">{role.note}</p>}

      <div className="mt-3 max-w-[68ch]">
        <p>{role.summary}</p>

        {role.highlights.length > 0 && (
          <ul className="mt-4 space-y-2.5">
            {role.highlights.map((item) => (
              <li key={item} className="grid grid-cols-[1rem_1fr]">
                <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {role.more && role.more.length > 0 && (
          <div className="mt-3">
            <Disclosure label={`${role.more.length} more`}>
              <ul className="space-y-2.5 pt-2">
                {role.more.map((item) => (
                  <li key={item} className="grid grid-cols-[1rem_1fr]">
                    <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Disclosure>
          </div>
        )}

        <p className="mt-4 text-[0.9375rem] text-ink-soft">{role.focus.join(' · ')}</p>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="page py-20 md:py-28">
      <SectionHeading intro="At BCG since 2017, now a Principal. Before that, finance at Pizza Hut and an engineering internship at Silicon Labs.">
        Experience
      </SectionHeading>

      <CareerTimeline />

      <div className="mt-16 divide-y divide-line border-t border-line md:mt-20">
        {employers.map((employer) => (
          <article
            key={employer.id}
            id={employer.id}
            className="grid scroll-mt-24 gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-14"
          >
            <header className="md:col-span-4 lg:col-span-3">
              {employer.logo && (
                <img
                  src={employer.logo.src}
                  width={employer.logo.width}
                  height={employer.logo.height}
                  alt=""
                  loading="lazy"
                  className="mb-4 w-auto"
                  style={{ height: logoHeight(employer.logo, 2) }}
                />
              )}
              <h3 className="text-2xl font-bold leading-tight tracking-[-0.015em]">{employer.company}</h3>
              <p className="tabular mt-1 text-ink-soft">
                {employer.tenure} · {employer.location}
              </p>
            </header>

            <div className="space-y-10 md:col-span-8 lg:col-span-9">
              {employer.summary && (
                <p className="max-w-[60ch] text-xl font-medium leading-snug">{employer.summary}</p>
              )}
              {employer.roles.map((role) => (
                <RoleEntry key={role.title} role={role} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
