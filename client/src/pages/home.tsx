import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Experience } from '@/components/experience';
import { Projects } from '@/components/projects';
import { HowHeWorks } from '@/components/how-he-works';
import { Education } from '@/components/education';
import { Life } from '@/components/life';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Experience />
        <Projects />
        <HowHeWorks />
        <Education />
        <Life />
      </main>
      <Footer />
    </div>
  );
}
