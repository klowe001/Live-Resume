import { Github, Linkedin, Mail, FileText } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-ink text-paper py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-none">
              Let's Build <br />
              <span className="text-accent italic">Something Real</span>
            </h2>
            <p className="text-white/60 max-w-md text-lg leading-relaxed mb-12">
              I'm exploring roles where strategy and building converge. 
              Whether it's AI Product Leadership, Growth at high-velocity companies, or founding something new.
            </p>
            
            <div className="flex flex-col gap-4 text-white/80">
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs uppercase tracking-widest text-accent">Loc</span>
                New York City
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs uppercase tracking-widest text-accent">Email</span>
                <a href="mailto:kevin@wanderluxe.io" className="hover:text-accent transition-colors">kevin@wanderluxe.io</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end h-full">
             <div className="flex gap-6 mb-12">
                <a 
                  href="https://www.linkedin.com/in/kevin-andrew-lowe/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 border border-white/20 rounded-full hover:bg-accent hover:border-accent hover:text-ink transition-all duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://github.com/reminiscent-io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 border border-white/20 rounded-full hover:bg-accent hover:border-accent hover:text-ink transition-all duration-300"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="mailto:kevin@wanderluxe.io"
                  className="p-4 border border-white/20 rounded-full hover:bg-accent hover:border-accent hover:text-ink transition-all duration-300"
                >
                  <Mail className="w-6 h-6" />
                </a>
             </div>
             
             <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs uppercase tracking-widest">
               <span>© {new Date().getFullYear()} Kevin Lowe</span>
               <span>Built with React 19 + Tailwind</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
