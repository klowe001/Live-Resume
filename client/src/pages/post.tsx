import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Markdown } from '@/lib/markdown';
import { formatDate, getPost, posts } from '@/lib/posts';
import { usePageMeta } from '@/lib/page-meta';
import NotFound from '@/pages/not-found';

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return <NotFound />;
  return <Article key={post.slug} slug={post.slug} />;
}

function Article({ slug }: { slug: string }) {
  const index = posts.findIndex((p) => p.slug === slug);
  const post = posts[index];
  // posts is newest first, so the next index is the older post.
  const older = posts[index + 1];
  const newer = posts[index - 1];

  usePageMeta({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    type: 'article',
    published: post.date,
  });

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <article className="page pb-20 pt-28 md:pb-28 md:pt-36">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-semibold text-ink-soft hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All posts
          </Link>

          <header className="mt-8 max-w-[68ch] border-t border-line pt-6 md:pt-8">
            <time dateTime={post.date} className="tabular font-semibold text-accent">
              {formatDate(post.date)}
            </time>
            <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              {post.title}
            </h1>
            {post.summary && <p className="mt-5 text-xl leading-relaxed text-ink-soft">{post.summary}</p>}
          </header>

          <div className="post-body mt-10 max-w-[68ch]">
            <Markdown source={post.body} />
          </div>

          {(older || newer) && (
            <nav aria-label="More posts" className="mt-16 grid max-w-[68ch] gap-6 border-t border-line pt-8 sm:grid-cols-2">
              {older ? (
                <Link href={`/blog/${older.slug}`} className="group block">
                  <span className="block text-[0.9375rem] text-ink-soft">Previous</span>
                  <span className="mt-1 block font-bold underline-offset-4 group-hover:underline">{older.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {newer && (
                <Link href={`/blog/${newer.slug}`} className="group block sm:text-right">
                  <span className="block text-[0.9375rem] text-ink-soft">Next</span>
                  <span className="mt-1 block font-bold underline-offset-4 group-hover:underline">{newer.title}</span>
                </Link>
              )}
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
