import { Link } from 'wouter';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { formatDate, posts } from '@/lib/posts';
import { usePageMeta } from '@/lib/page-meta';

const DESCRIPTION =
  'Hard Tech Weekly runs every Monday. Kevin Lowe covers robotics, drones, space, energy, and the rules and deals that move them.';

export default function Blog() {
  usePageMeta({ title: 'Writing', description: DESCRIPTION, path: '/blog' });

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="page pb-20 pt-28 md:pb-28 md:pt-36">
          <div className="grid items-end gap-5 md:grid-cols-12 md:gap-8">
            <h1 className="type-masthead text-[clamp(4.5rem,13vw,10rem)] md:col-span-7">Writing</h1>
            <p className="max-w-[34rem] text-lg leading-relaxed text-ink-soft md:col-span-5 md:pb-2">
              Hard Tech Weekly runs every Monday. Robotics, drones, space, energy, and the regulation and money
              that move them, with a source behind every claim.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="mt-16 border-t border-line pt-8 text-ink-soft">The first post goes up soon.</p>
          ) : (
            <ol className="mt-14 border-t border-line md:mt-20">
              {posts.map((post) => (
                <li key={post.slug} className="border-b border-line">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-2 py-7 md:grid-cols-12 md:gap-8 md:py-9"
                  >
                    <time dateTime={post.date} className="tabular pt-1 font-medium text-ink-soft md:col-span-3">
                      {formatDate(post.date)}
                    </time>
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
