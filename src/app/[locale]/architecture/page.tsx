'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArchitecturePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const sections = sectionsRef.current;
    
    // Clear previous triggers to avoid duplication on re-renders
    ScrollTrigger.getAll().forEach(t => t.kill());

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        // snap: 1 / (sections.length - 1),
      });
      
      // Parallax text
      gsap.fromTo(section.querySelector('.content'), 
        { y: 100, opacity: 0 },
        {
          y: -50, 
          opacity: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 1
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const architectureSections = [
    { id: 'mihrab', title: 'The Mihrab', image: 'https://images.unsplash.com/photo-1542042958-3d5f9919c013?auto=format&fit=crop&q=80&w=2070', desc: 'A masterpiece of golden mosaic situated in the Qibla wall.' },
    { id: 'domes', title: 'The Domes', image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=2070', desc: 'The mosque features 82 domes of varying sizes, the largest located in the main prayer hall.' },
    { id: 'columns', title: 'The Columns', image: 'https://images.unsplash.com/photo-1596706059274-123403d1591d?auto=format&fit=crop&q=80&w=2070', desc: 'The mosque has 1,096 columns in the exterior area, embedded with precious stones.' },
    { id: 'carpet', title: 'The Carpet', image: 'https://images.unsplash.com/photo-1580820267682-426da823b514?auto=format&fit=crop&q=80&w=2070', desc: 'The world\'s largest hand-knotted carpet, crafted by 1,200 artisans.' },
  ];

  return (
    <>
      <Navbar />
      <div ref={containerRef} className="bg-slate-900">
        {architectureSections.map((section, index) => (
          <section 
            key={section.id}
            ref={el => { if (el) sectionsRef.current[index] = el; }}
            className="h-screen w-full relative flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
               <Image 
                 src={section.image} 
                 alt={section.title} 
                 fill 
                 className="object-cover opacity-60"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            </div>
            
            <div className="content relative z-10 text-center text-white max-w-4xl px-4">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gold drop-shadow-lg font-serif">{section.title}</h2>
              <p className="text-xl md:text-3xl font-light leading-relaxed drop-shadow-md">{section.desc}</p>
            </div>
          </section>
        ))}
        
        {/* Footer spacer */}
        <section className="h-screen bg-slate-900 flex items-center justify-center text-white">
            <h2 className="text-4xl text-gold">End of Architecture Tour</h2>
        </section>
      </div>
    </>
  );
}
