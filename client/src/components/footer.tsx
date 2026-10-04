import { ArrowUpRight } from 'lucide-react';
import { useConsent } from '@/context/consent-context';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, OPEN_TO } from '@/lib/contact';

export function Footer() {
  const { openSettings } = useConsent();

  return (
    <footer id="contact" className="on-ink bg-ink py-20 text-paper md:py-28">
      <div className="page">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="type-masthead text-[clamp(4rem,11vw,9.5rem)]">Get in touch</h2>
            <p className="mt-8 max-w-[34rem] text-xl leading-relaxed text-paper/85">
              Kevin is open to {OPEN_TO}.
            </p>
          </div>

          <div className="lg:col-span-5">
            <a
              href={`mailto:${EMAIL}`}
              className="block border border-paper bg-paper px-6 py-5 text-center text-lg font-bold text-ink transition-colors hover:bg-transparent hover:text-paper"
            >
              {EMAIL}
            </a>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 border border-paper/40 px-4 py-4 font-semibold transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 border border-paper/40 px-4 py-4 font-semibold transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                GitHub
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-6 text-paper/75">Based in New York City</p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-paper/20 pt-6 text-[0.9375rem] text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Kevin Lowe</span>
          <button type="button" onClick={openSettings} className="self-start underline underline-offset-4 hover:text-paper sm:self-auto">
            Cookie settings
          </button>
        </div>
      </div>
    </footer>
  );
}
