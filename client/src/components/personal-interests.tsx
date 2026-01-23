import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChefHat, Mountain, MapPin, ChevronDown, Flag, Plane } from 'lucide-react';
import { useAnimationContext } from '@/context/animation-context';

import leCordonBleuImg from '@assets/Le Cordon Bleu.JPG';
import tarteCitronImg from '@assets/Tarte Citron.JPG';
import savarinImg from '@assets/Savarin.JPG';
import hazelnutCakeImg from '@assets/Hazelnut Cake.JPG';
import croissantsImg from '@assets/Croissants.JPG';
import chocolateCakeImg from '@assets/Chocolate Cake.JPG';
import skiingImg from '@assets/Skiing.jpg';
import golfVideo from '@assets/Golf.mov';
import travelAdvisorImg from '@assets/Travel Advisor.jpg';

const bakingPhotos = [
  { src: leCordonBleuImg, alt: 'Le Cordon Bleu Paris' },
  { src: tarteCitronImg, alt: 'Tarte Citron' },
  { src: savarinImg, alt: 'Savarin' },
  { src: hazelnutCakeImg, alt: 'Hazelnut Cake' },
  { src: croissantsImg, alt: 'Croissants' },
  { src: chocolateCakeImg, alt: 'Chocolate Cake' },
];

const skiingPhotos = [
  { src: skiingImg, alt: 'On the slopes' },
];

const travelAdvisorPhotos = [
  { src: travelAdvisorImg, alt: 'Travel Advisor' },
];

interface Interest {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  photos: { src: string; alt: string }[] | null;
  video?: { src: string; alt: string };
}

const interests: Interest[] = [
  {
    icon: ChefHat,
    title: 'Baking & Pastry',
    description: 'Achieved level one patisserie certificate from Le Cordon Bleu in Paris over an 8-week course in 2021. I\'ve baked everything from macarons to a wedding cake. I find baking is my way to explore creativity while bringing in the precision that I learned in engineering.',
    photos: bakingPhotos,
  },
  {
    icon: Mountain,
    title: 'Skiing',
    description: 'While living in New York makes skiing a little more difficult, I love to get out to Colorado or the French Alps as much as I possibly can. I started as a snowboarder and switched to skiing a few years back. I\'ve been heli-skiing in Jackson Hole and fell in love with the immensity of the mountain ranges.',
    photos: skiingPhotos,
  },
  {
    icon: Flag,
    title: 'Golf',
    description: 'A game of patience and precision. The mental challenge keeps me coming back.',
    photos: null,
    video: { src: golfVideo, alt: 'On the course' },
  },
  {
    icon: Plane,
    title: 'Travel Advisor',
    description: 'I\'m a certified travel advisor with Fora Travel, a modern tech-forward travel advisory startup. I wanted to learn more about the travel industry, and I plan so many trips for myself and friends and family that it made sense to go official. It\'s fascinating what you can learn when you\'re on the inside.',
    photos: travelAdvisorPhotos,
  },
  {
    icon: MapPin,
    title: 'New York City',
    description: 'Home base. The energy here matches how I like to work—fast, varied, always something new.',
    photos: null,
  },
];

function ParallaxImage({ photo, isVisible }: { photo: { src: string; alt: string }; isVisible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceAnimations } = useAnimationContext();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect: image moves slower than scroll (only used on desktop)
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-warm/10"
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceAnimations ? 0.3 : 0.4 }}
            className="absolute inset-0"
          >
            {shouldReduceAnimations ? (
              // Mobile/reduced-motion: simple fade with static image
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              // Desktop: parallax effect with GPU acceleration
              <motion.img
                src={photo.src}
                alt={photo.alt}
                style={{ y, willChange: 'transform' }}
                className="w-full h-[130%] object-cover absolute -top-[15%]"
              />
            )}
            {/* Warm overlay for elegance */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-amber-900/20 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Caption */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceAnimations ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: shouldReduceAnimations ? 0.2 : 0.3 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <p className="text-sm text-white/90 font-medium drop-shadow-lg">
            {photo.alt}
          </p>
        </motion.div>
      )}
    </div>
  );
}

function AccordionItem({
  interest,
  isOpen,
  onToggle
}: {
  interest: Interest;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = interest.icon;
  const hasMedia = (interest.photos && interest.photos.length > 0) || interest.video;

  return (
    <div className="border-b border-warm last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <Icon className="w-6 h-6 text-accent stroke-[1.5] group-hover:text-accent-dark transition-colors" />
          <h3 className="font-serif text-xl md:text-2xl text-ink group-hover:text-accent-dark transition-colors">
            {interest.title}
          </h3>
        </div>
        {hasMedia && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-muted leading-relaxed pb-6 pl-10">
              {interest.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PersonalInterests() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Get the first photo or video from the selected interest
  const selectedInterest = openIndex !== null ? interests[openIndex] : null;
  const selectedPhoto = selectedInterest?.photos?.[0] ?? null;
  const selectedVideo = selectedInterest?.video ?? null;

  const handleToggle = (index: number) => {
    // Only allow toggle for items with media (photos or video)
    if (interests[index].photos || interests[index].video) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  return (
    <section id="personal" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-baseline gap-4 mb-16 border-b border-warm pb-8">
        <span className="font-serif text-accent-dark italic text-lg">05</span>
        <h2 className="font-serif text-4xl md:text-5xl text-ink">Beyond Work</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left side - Accordion list */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 md:p-8"
        >
          {interests.map((interest, index) => (
            <AccordionItem
              key={interest.title}
              interest={interest}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>

        {/* Right side - Parallax image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="aspect-[4/3] lg:aspect-auto lg:min-h-[500px] border border-warm bg-warm/5 overflow-hidden"
        >
          {selectedVideo ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full aspect-square overflow-hidden"
            >
              <video
                src={selectedVideo.src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-amber-900/20 pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 left-4 right-4"
              >
                <p className="text-sm text-white/90 font-medium drop-shadow-lg">
                  {selectedVideo.alt}
                </p>
              </motion.div>
            </motion.div>
          ) : selectedPhoto ? (
            <ParallaxImage photo={selectedPhoto} isVisible={true} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted">
              <p className="text-center italic">
                Click on an interest to see more
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
