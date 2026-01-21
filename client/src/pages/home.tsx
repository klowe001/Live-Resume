import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Philosophy } from '@/components/philosophy';
import { Experience } from '@/components/experience';
import { Education } from '@/components/education';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { PersonalInterests } from '@/components/personal-interests';
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
        <Education />
        <Projects />
        <PersonalInterests />
      </main>
      <Footer />
    </div>
  );
}
