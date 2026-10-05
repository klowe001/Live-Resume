import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import wanderluxeImg from '@assets/web/wanderluxe.webp';
import cpfDanceImg from '@assets/web/cpfdance.webp';
import cardCaddieImg from '@assets/web/cardcaddie.webp';
import droneImg from '@assets/web/drone.webp';

interface Feature {
  name: string;
  kicker: string;
  description: string;
  why: string;
  call: string;
  /** Heading over call. */
  callLabel: string;
  features: string[];
  links: { label: string; url: string }[];
  image: { src: string; width: number; height: number; alt: string };
}

const featured: Feature[] = [
  {
    name: 'WanderLuxe',
    kicker: 'Founder · Group trip planner',
    description:
      'A group trip planner for the person who always ends up organizing. Every booking lands on one shared timeline, and the AI assistant turns a pasted confirmation into an itinerary item. Kevin founded the LLC, filed the trademark, and wrote the product spec.',
    why: 'He was planning a month-long honeymoon across multiple countries and needed one place to track every hotel reservation, wine tasting, and dinner.',
    callLabel: 'Key monetization decision',
    call: 'Planning is free in full, including unlimited AI chat. The one paid feature is Print Studio, a keepsake edition of the trip, because metering the assistant would have taxed the behavior the product is built around. In Print Studio the model art-directs and the database supplies every fact, so a bad generation can hurt the styling but never the itinerary.',
    features: ['Real-time collaboration', 'AI assistant', 'Print Studio (Pro)', 'MCP server'],
    links: [
      { label: 'wanderluxe.io', url: 'https://wanderluxe.io' },
      { label: 'Product spec', url: 'https://github.com/reminiscent-io/wanderluxe/blob/main-agent/PRODUCT.md' },
    ],
    image: { src: wanderluxeImg, width: 1024, height: 630, alt: 'WanderLuxe on two phones: a Paris trip cover and its day-by-day timeline' },
  },
  {
    name: 'CPF Dance',
    // confirm: "Co-founder" vs "Technical co-founder".
    kicker: 'Co-founder · Private coaching platform',
    description:
      'An invite-only app for one coach and her dancers. She leaves a note after each lesson, typed or by voice. Dancers read it on their phones, journal against it, and request lessons.',
    why: 'His wife is a former Rockette. He saw the problem firsthand and built it for her and her dancers.',
    callLabel: 'Key design choice',
    call: 'Narrowed it from a multi-instructor platform to a private one for a single coach. No streaks or badges, since the dancers are already motivated. Success is dancers logging in between lessons because a new note is waiting.',
    features: ['Invite-only', 'Lesson notes', 'Dancer journal', 'Payments portal'],
    links: [
      { label: 'cpfdance.com', url: 'https://cpfdance.com' },
      { label: 'Product spec', url: 'https://github.com/reminiscent-io/CPF-Dance/blob/main/PRODUCT.md' },
    ],
    image: { src: cpfDanceImg, width: 1440, height: 773, alt: 'CPF Dance home page with photos of a dancer' },
  },
];

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-semibold text-ink underline decoration-line decoration-2 underline-offset-[5px] transition-colors hover:decoration-accent"
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

function FeaturedProject({ project, flip }: { project: Feature; flip: boolean }) {
  return (
    <article className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <img
          src={project.image.src}
          width={project.image.width}
          height={project.image.height}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full bg-paper-deep ring-1 ring-line"
        />
      </div>

      <div className="lg:col-span-5">
        <p className="font-semibold text-accent">{project.kicker}</p>
        <h3 className="mt-1 text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">{project.name}</h3>
        <p className="mt-4">{project.description}</p>

        <dl className="mt-6 space-y-4 border-t border-line pt-5">
          <div>
            <dt className="font-bold">Why he built it</dt>
            <dd className="mt-1 text-ink-soft">{project.why}</dd>
          </div>
          <div>
            <dt className="font-bold">{project.callLabel}</dt>
            <dd className="mt-1 text-ink-soft">{project.call}</dd>
          </div>
        </dl>

        <p className="mt-5 text-[0.9375rem] text-ink-soft">{project.features.join(' · ')}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {project.links.map((link) => (
            <ExternalLink key={link.url} href={link.url}>
              {link.label}
            </ExternalLink>
          ))}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="page py-20 md:py-28">
      <SectionHeading intro="Kevin writes the spec and makes the product calls. Claude Code, Cursor, and Replit write the code.">
        Projects
      </SectionHeading>

      <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
        {featured.map((project, i) => (
          <FeaturedProject key={project.name} project={project} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="mt-20 grid gap-10 border-t border-line pt-10 md:mt-28 md:grid-cols-2 md:gap-12">
        <article className="grid grid-cols-[7.5rem_1fr] gap-5 sm:grid-cols-[10rem_1fr]">
          <img
            src={cardCaddieImg}
            width={900}
            height={760}
            alt="Card Caddie home page with a live golf scorecard"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full bg-paper-deep object-cover object-bottom ring-1 ring-line"
          />
          <div>
            <h3 className="text-2xl font-extrabold tracking-[-0.02em]">Card Caddie</h3>
            <p className="mt-1 text-ink-soft">
              Live scoring and leaderboards for golf trips, built for how collaborative golf already is. It takes the
              hassle out of tracking side games and handicap calculations.
            </p>
            <p className="mt-3">
              <ExternalLink href="https://cardcaddie.golf">cardcaddie.golf</ExternalLink>
            </p>
          </div>
        </article>

        <article className="grid grid-cols-[7.5rem_1fr] gap-5 sm:grid-cols-[10rem_1fr]">
          <img
            src={droneImg}
            width={1200}
            height={857}
            alt="Quadcopter on a 3D-printed frame"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full bg-paper-deep object-cover ring-1 ring-line"
          />
          <div>
            <h3 className="text-2xl font-extrabold tracking-[-0.02em]">3D-printed drone</h3>
            <p className="mt-1 text-ink-soft">
              A quadcopter on a frame he designed in SolidWorks and 3D printed, with a DJI Naza flight controller,
              FatShark FPV, and GPS. It started in college as a way to learn CAD and turned into a decade of frame
              redesigns and component upgrades.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
