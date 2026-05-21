import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const socialLinkClass = "p-4 border border-paper/20 hover:bg-accent hover:border-accent hover:text-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

  return (
    <footer id="contact" className="bg-ink text-paper py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-none">
              Let's Build <br />
              <span className="text-accent italic">Something Real</span>
            </h2>
            <p className="text-paper/75 max-w-md text-lg leading-relaxed mb-12">
              Expanding my skill set, exploring new technologies, and building on the side, all while serving clients at BCG and driving projects forward as a team leader.
            </p>

            <div className="flex flex-col gap-4 text-paper/80">
              <div className="flex items-baseline gap-4">
                <span className="w-20 shrink-0 text-xs uppercase tracking-widest text-accent">Location</span>
                <span>New York City</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="w-20 shrink-0 text-xs uppercase tracking-widest text-accent">Email</span>
                <a href="mailto:klowe001@gmail.com" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:text-accent focus-visible:underline">klowe001@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end h-full">
             <div className="flex gap-4 mb-12">
                <a
                  href="https://www.linkedin.com/in/kevin-andrew-lowe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className={socialLinkClass}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/reminiscent-io"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className={socialLinkClass}
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="mailto:klowe001@gmail.com"
                  aria-label="Send an email"
                  className={socialLinkClass}
                >
                  <Mail className="w-6 h-6" />
                </a>
             </div>

             <div className="pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-4 text-paper/40 text-xs uppercase tracking-widest">
               <span>© {new Date().getFullYear()} Kevin Lowe</span>
               <span>Built by hand with React, Tailwind, and Claude Code</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
