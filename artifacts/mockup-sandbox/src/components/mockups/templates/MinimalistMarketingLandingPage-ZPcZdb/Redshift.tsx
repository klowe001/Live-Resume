import './fonts.css';
import React from 'react';

export default function Redshift() {
  return (
    <div className="w-full h-full bg-[#EAE8E3] relative overflow-hidden flex flex-col justify-between p-10 font-['Inter']">
      {/* Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay z-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Top Nav */}
      <nav className="relative z-20 flex justify-between items-start text-xs font-semibold uppercase tracking-[0.15em] text-black/80">
        <div className="text-xl tracking-tighter normal-case font-black text-black">Redshift</div>
        <div className="flex gap-16">
          <a href="#" className="hover:text-black/40 transition-colors">Work</a>
          <a href="#" className="hover:text-black/40 transition-colors">Expertise</a>
          <a href="#" className="hover:text-black/40 transition-colors">Culture</a>
          <a href="#" className="hover:text-black/40 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Massive Display Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Background Red Word */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[#FF2B1A] font-['Archivo'] font-black text-[320px] leading-none tracking-[-0.04em] whitespace-nowrap mix-blend-multiply"
          >
            GROWTH
          </div>
          
          {/* Foreground Black Words */}
          <div className="relative z-20 flex flex-col items-center justify-center translate-y-[20%] w-full">
            <div className="font-['Archivo'] font-black text-[180px] leading-[0.82] tracking-[-0.05em] text-[#111] uppercase mr-[15%]">
              MARKETING
            </div>
            <div className="font-['Archivo'] font-black text-[180px] leading-[0.82] tracking-[-0.05em] text-[#111] uppercase ml-[15%]">
              STUDIO
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Labels & CTA */}
      <div className="relative z-20 flex justify-between items-end text-[10px] font-medium uppercase tracking-[0.2em] text-black/60 pb-2">
        <div className="leading-[2]">
          <span className="text-black/40 block mb-1">EST. 2019</span>
          LOS ANGELES, CA<br/>
          DATA-DRIVEN
        </div>
        
        <div className="pb-4">
          <button className="h-14 px-10 rounded-full border-[1.5px] border-black/80 text-black hover:bg-black hover:text-white transition-all flex items-center justify-center text-xs tracking-[0.2em] font-bold pointer-events-auto cursor-pointer">
            SEE OUR WORK
          </button>
        </div>

        <div className="text-right leading-[2]">
          <span className="text-black/40 block mb-1">SERVICES</span>
          STRATEGY / CREATIVE<br/>
          PERFORMANCE
        </div>
      </div>
    </div>
  );
}
