import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import { Philosophy } from '@/components/philosophy';
import { Education } from '@/components/education';
import { PersonalInterests } from '@/components/personal-interests';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Philosophy />
        <Education />
        <PersonalInterests />
      </main>
      <Footer />
    </div>
  );
}
