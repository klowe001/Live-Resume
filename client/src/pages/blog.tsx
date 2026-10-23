import { Link, useLocation, useSearch } from 'wouter';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { formatDate, posts, topicKey, topics } from '@/lib/posts';
import { usePageMeta } from '@/lib/page-meta';

const DESCRIPTION =
  'Kevin Lowe writes about AI and the data that makes it useful, plus Hard Tech Weekly every Monday on robotics, drones, space, energy, and the rules and deals that move them.';

export default function Blog() {
  usePageMeta({ title: 'Writing', description: DESCRIPTION, path: '/blog' });
  const [, navigate] = useLocation();
  const key = new URLSearchParams(useSearch()).get('topic');
  const active = topics.find((t) => topicKey(t) === key) ?? null;
  const shown = active ? posts.filter((p) => p.topic === active) : posts;
  const choose = (topic: string | null) =>
    navigate(topic ? `/blog?topic=${topicKey(topic)}` : '/blog', { replace: true });

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="page pb-20 pt-28 md:pb-28 md:pt-36">
          <div className="grid items-end gap-5 md:grid-cols-12 md:gap-8">
            <h1 className="type-masthead text-[clamp(4.5rem,13vw,10rem)] md:col-span-7">Writing</h1>
            <p className="max-w-[34rem] text-lg leading-relaxed text-ink-soft md:col-span-5 md:pb-2">
              AI and the data that makes it useful, from years of loyalty work and the assistants Kevin builds at
              home. Hard Tech Weekly runs every Monday and covers robotics, drones, space, energy, and the
              regulation and money that move them.
            </p>
          </div>

          {topics.length > 1 && (
            <div role="group" aria-label="Filter by topic" className="mt-12 flex flex-wrap gap-2 md:mt-16">
              {[null, ...topics].map((topic) => (
                <button
                  key={topic ?? 'all'}
                  type="button"
                  aria-pressed={topic === active}
                  onClick={() => choose(topic)}
                  className={`rounded-full border px-4 py-1.5 text-[0.9375rem] font-semibold transition-colors ${
                    topic === active
                      ? 'border-ink bg-ink text-paper'
                      : 'border-line text-ink-soft hover:border-ink hover:text-ink'
                  }`}
                >
                  {topic ?? 'All'}
                </button>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <p className="mt-16 border-t border-line pt-8 text-ink-soft">The first post goes up soon.</p>
          ) : (
            <ol className={`border-t border-line ${topics.length > 1 ? 'mt-6' : 'mt-14 md:mt-20'}`}>
              {shown.map((post) => (
                <li key={post.slug} className="border-b border-line">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-2 py-7 md:grid-cols-12 md:gap-8 md:py-9"
                  >
                    <span className="pt-1 md:col-span-3">
                      <time dateTime={post.date} className="tabular block font-medium text-ink-soft">
                        {formatDate(post.date)}
                      </time>
                      {post.topic && (
                        <span className="mt-0.5 block text-[0.9375rem] font-semibold text-accent">{post.topic}</span>
                      )}
                    </span>
                    <span className="md:col-span-9">
                      <span className="block text-2xl font-bold tracking-tight underline-offset-4 group-hover:underline md:text-[1.75rem]">
                        {post.title}
                      </span>
                      {post.summary && (
                        <span className="mt-2 block max-w-[68ch] leading-relaxed text-ink-soft">{post.summary}</span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
