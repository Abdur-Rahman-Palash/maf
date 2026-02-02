'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import WaveAnimation from '@/components/WaveAnimation';

const servicesData = [
  { 
    id: 2, 
    title: 'Shahadas', 
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800',
    description: 'Whether you are just interested in Islam, have some questions or are ready to convert, we are happy to speak to you and guide you through the Shahada. Learn more and book here.',
    icon: '🤝',
    href: '/services/shahadas'
  },
  { 
    id: 3, 
    title: 'Nikahs', 
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    description: 'Offering a unique & stunning yet economical & eco-friendly venue, getting married at Cambridge Central Mosque is the experience of a lifetime. Find out more here.',
    icon: '💒',
    href: '/services/nikahs'
  },
  { 
    id: 5, 
    title: 'General Events', 
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800',
    description: 'To book rooms for other events or Islamic celebrations, from \'aqiqas and private gatherings to conferences, we offer rooms at reasonable rates of hire. Book here.',
    icon: '🎉',
    href: '/services/general-events'
  },
  { 
    id: 6, 
    title: 'Meet our Imam', 
    image: '',
    description: 'Book a meeting up to two weeks in advance with one of our Imams to discuss one of a range of topics. Learn more here.',
    icon: '👳‍♂️',
    href: '/services/meet-imam'
  }
];

interface Service {
  id: number;
  title: string;
  image: string;
  description: string;
  icon: string;
  href: string;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link href={service.href} className="block">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          y: -10,
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-white rounded-2xl overflow-hidden shadow-xl group cursor-pointer relative"
      >
      {/* Background Image */}
      <div className="relative h-64 sm:h-72 lg:h-80">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
        {/* Icon */}
        <div className="flex justify-between items-start">
          <motion.div
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl"
            animate={{
              rotate: isHovered ? [0, 10, -10, 0] : 0,
              scale: isHovered ? [1, 1.1, 1] : 1
            }}
            transition={{ duration: 0.5 }}
          >
            {service.icon}
          </motion.div>
        </div>

        {/* Title and Description */}
        <div className="mt-auto">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Hover Button */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <button className="w-full bg-amber-500 text-white py-2 sm:py-2.5 lg:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
            <span>Learn More</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </motion.div>
    </Link>
  );
}

export default function Services() {
  const t = useTranslations('Services');

  return (
    <motion.section 
      className="py-16 sm:py-20 lg:py-24 px-4 container mx-auto relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Section Header */}
      <motion.div 
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6"
          style={{ fontFamily: 'var(--font-amiri)' }}
        >
          {t('title')}
          <motion.span
            className="inline-block ml-3 text-amber-500"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: 2 
            }}
          >
            📖
          </motion.span>
        </motion.h2>
        
        <motion.div 
          className="w-24 sm:w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 100, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            whileHover={{ 
              y: -15,
              scale: 1.05,
              rotateZ: index % 2 === 0 ? 2 : -2,
              transition: { duration: 0.4, type: "spring" }
            }}
            className="group"
          >
            <ServiceCard service={service} index={index} />
          </motion.div>
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(8)].map((_, i) => {
          const seed = i * 47.3; // Deterministic seed based on index
          const left = ((seed * 7.1) % 100);
          const top = ((seed * 11.7) % 100);
          const xMove = ((seed * 19) % 200) - 100;
          const yMove = -(((seed * 13) % 300) + 100);
          const scale = 0.5 + ((seed * 5) % 15) / 10;
          const duration = 10 + ((seed * 9) % 15);
          const delay = ((seed * 3) % 5);
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-20"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                x: [0, xMove, 0],
                y: [0, yMove, 0],
                scale: [1, scale, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration,
                repeat: 2,
                delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
      
      {/* Wave Animation */}
      <WaveAnimation 
        color="#3b82f6" 
        opacity={0.06} 
        speed={0.025} 
        height={70}
      />
    </motion.section>
  );
}
