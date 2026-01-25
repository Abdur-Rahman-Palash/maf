'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const servicesData = [
  {
    id: 1,
    title: 'Multimedia E-Guide',
    description: 'El-Delleel multimedia guide provides an immersive journey through the mosque\'s rich history, architecture, and cultural significance. Interactive features enhance your visit with detailed information.',
    image: '/mosque-visitors-bg.svg'
  },
  {
    id: 2,
    title: 'Prayer Hall Access',
    description: 'Experience the serene atmosphere of our main prayer hall, accommodating thousands of worshippers with its stunning architecture and spiritual ambiance.',
    image: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Interactive Map',
    description: 'Navigate through the mosque complex with our interactive digital map, highlighting key areas, facilities, and points of interest for visitors.',
    image: 'https://images.unsplash.com/photo-1580820267682-426da823b514?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Cultural Souq',
    description: 'Explore our traditional marketplace offering authentic Islamic art, calligraphy, literature, and cultural artifacts from around the Muslim world.',
    image: '/mosque-worshippers-bg.svg'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 8,
    },
  },
};

function ServiceCard({ service, index }: { service: typeof servicesData[0]; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        scale: 1.05, 
        rotate: 1,
        boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)'
      }}
      className="h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-400"
      style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4 text-slate-800">
          {service.title}
        </h3>
        <p className="text-slate-600 line-clamp-3 mb-6">
          {service.description}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 border-2 border-gold text-gold rounded-full font-semibold hover:bg-gold hover:text-white transition-all duration-300"
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-white via-slate-50 to-white relative">
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMSAwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
            Our Services
          </h2>
          <div className="relative inline-block">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
