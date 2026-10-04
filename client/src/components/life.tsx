import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { useAnimationContext } from '@/context/animation-context';
import leCordonBleu from '@assets/web/baking-le-cordon-bleu.webp';
import tarteCitron from '@assets/web/baking-tarte-citron.webp';
import savarin from '@assets/web/baking-savarin.webp';
import hazelnutCake from '@assets/web/baking-hazelnut-cake.webp';
import croissants from '@assets/web/baking-croissants.webp';
import chocolateCake from '@assets/web/baking-chocolate-cake.webp';
import skiing from '@assets/web/skiing.webp';
import travelAdvisor from '@assets/web/travel-advisor.webp';
import golfVideo from '@assets/web/golf.mp4';
import golfPoster from '@assets/web/golf-poster.webp';

const bakes = [
  { src: leCordonBleu, caption: 'Le Cordon Bleu, Paris', alt: 'Kevin in chef whites at Le Cordon Bleu, Paris' },
  { src: tarteCitron, caption: 'Tarte citron', alt: 'Tarte citron with torched meringue and raspberries' },
  { src: savarin, caption: 'Savarin', alt: 'Savarin topped with berries' },
  { src: hazelnutCake, caption: 'Hazelnut cake', alt: 'Hazelnut cake' },
  { src: croissants, caption: 'Croissants', alt: 'A tray of croissants' },
  { src: chocolateCake, caption: 'Chocolate cake', alt: 'Chocolate cake with piped decoration' },
];

/** Muted loop that plays only while on screen, with a visible pause control. */
function GolfClip() {
  const { prefersReducedMotion } = useAnimationContext();
  const ref = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(prefersReducedMotion);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [userPaused]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      void video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  return (
    <div className="relative">
      <video
        ref={ref}
        src={golfVideo}
        poster={golfPoster}
        muted
        loop
        playsInline
        preload="none"
        aria-label="Kevin on a golf green by the sea"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="aspect-[4/5] w-full bg-paper-deep object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause golf video' : 'Play golf video'}
        className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center bg-paper text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        {playing ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
      </button>
    </div>
  );
}

const others = [
  {
    title: 'Skiing',
    body: 'Gets out to Colorado or the French Alps whenever he can. He started on a snowboard, switched to skis a few years back, and has been heli-skiing in Jackson Hole.',
    media: (
      <img
        src={skiing}
        width={788}
        height={1400}
        alt="Two skiers in fresh snow, Kevin in the blue jacket"
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full bg-paper-deep object-cover object-[center_65%]"
      />
    ),
  },
  {
    title: 'Golf',
    body: 'He keeps coming back to golf for the mental challenge, and built Card Caddie to score golf trips.',
    media: <GolfClip />,
  },
  {
    title: 'Travel advisor',
    body: 'A certified travel advisor with Fora. He plans so many trips for himself, friends, and family that it made sense to go official.',
    media: (
      <img
        src={travelAdvisor}
        width={1050}
        height={1400}
        alt="Kevin on a terrace above a hillside town, with mountains behind"
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full bg-paper-deep object-cover"
      />
    ),
  },
];

export function Life() {
  return (
    <section id="life" className="page py-20 md:py-28">
      <SectionHeading intro="Pastry school in Paris, skiing, golf, and planning trips for other people.">Life</SectionHeading>

      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h3 className="text-2xl font-extrabold tracking-[-0.02em]">Baking</h3>
          {/* confirm: certificate name ("Basic Pâtisserie") and course length. */}
          <p className="mt-2 text-lg leading-relaxed text-ink-soft">
            Kevin earned a level-one pâtisserie certificate at Le Cordon Bleu Paris in 2021, over an 8-week course. He
            has baked everything from macarons to a wedding cake.
          </p>
        </div>

        <div
          role="region"
          aria-label="Baking photos"
          tabIndex={0}
          className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:col-span-8"
        >
          {bakes.map((bake) => (
            <figure key={bake.caption} className="w-[68%] shrink-0 snap-start sm:w-auto">
              <img
                src={bake.src}
                width={900}
                height={900}
                alt={bake.alt}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full bg-paper-deep object-cover"
              />
              <figcaption className="mt-2 text-[0.9375rem] text-ink-soft">{bake.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
        {others.map((item) => (
          <article key={item.title}>
            {item.media}
            <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.02em]">{item.title}</h3>
            <p className="mt-2 text-lg leading-relaxed text-ink-soft">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
