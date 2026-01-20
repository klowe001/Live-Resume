import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Philosophy } from '@/components/philosophy';
import { Experience } from '@/components/experience';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent selection:text-paper">
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
