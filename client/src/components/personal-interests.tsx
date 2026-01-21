import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Mountain, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

import leCordonBleuImg from '@assets/Le Cordon Bleu.JPG';
import tarteCitronImg from '@assets/Tarte Citron.JPG';
import savarinImg from '@assets/Savarin.JPG';
import hazelnutCakeImg from '@assets/Hazelnut Cake.JPG';
import croissantsImg from '@assets/Croissants.JPG';
import chocolateCakeImg from '@assets/Chocolate Cake.JPG';
import skiingImg from '@assets/Skiing.jpg';

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

function ImageCarousel({ photos }: { photos: { src: string; alt: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = photos.length > 1;

  const next = () => setCurrentIndex((i) => (i + 1) % photos.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-warm/10">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={photos[currentIndex].src}
            alt={photos[currentIndex].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Warm overlay for elegance */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-amber-900/20 pointer-events-none" />

        {/* Navigation arrows - only show if multiple photos */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-paper/90 hover:bg-paper border border-warm/50 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-ink" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-paper/90 hover:bg-paper border border-warm/50 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-3.5 h-3.5 text-ink" />
            </button>
          </>
        )}
      </div>

      {/* Caption and dots in a row */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-muted italic">
          {photos[currentIndex].alt}
        </p>

        {/* Dots indicator - only show if multiple photos */}
        {hasMultiple && (
          <div className="flex gap-1.5">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-accent' : 'bg-warm'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const interests = [
  {
    icon: ChefHat,
    title: 'Baking & Pastry',
    description: 'Le Cordon Bleu trained. I bring the same precision from engineering and strategy to French pastry.',
    photos: bakingPhotos,
  },
  {
    icon: Mountain,
    title: 'Skiing',
    description: 'Weekends on the mountain when possible. There\'s something clarifying about speed and focus.',
    photos: skiingPhotos,
  },
  {
    icon: MapPin,
    title: 'New York City',
    description: 'Home base. The energy here matches how I like to work—fast, varied, always something new.',
    photos: null,
  },
];

export function PersonalInterests() {
  return (
    <section id="personal" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-baseline gap-4 mb-16 border-b border-warm pb-8">
        <span className="font-serif text-accent-dark italic text-lg">05</span>
        <h2 className="font-serif text-4xl md:text-5xl text-ink">Beyond Work</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {interests.map((interest, index) => (
          <motion.div
            key={interest.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group p-8 border border-warm bg-paper hover:border-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <interest.icon className="w-6 h-6 text-accent stroke-[1.5]" />
              <h3 className="font-serif text-2xl text-ink group-hover:text-accent-dark transition-colors">{interest.title}</h3>
            </div>

            <p className="text-muted leading-relaxed mb-6">
              {interest.description}
            </p>

            {interest.photos ? (
              <div className="mt-auto">
                <ImageCarousel photos={interest.photos} />
              </div>
            ) : (
              <div className="mt-auto pt-4 border-t border-warm/50">
                <p className="text-xs text-accent-dark font-medium uppercase tracking-wide">
                  Current Location
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
