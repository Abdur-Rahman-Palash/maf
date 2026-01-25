'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useRef } from 'react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';

const newsItems = [
  {
    id: 1,
    title: 'Dhay Winners Announced',
    excerpt: 'The annual Dhay Quran competition winners have been announced, celebrating excellence in Quranic memorization and recitation.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800',
    type: 'News',
    date: 'Jan 2026'
  },
  {
    id: 2,
    title: 'Presidential Visit Highlights',
    excerpt: 'His Excellency visited Masjid Salman al Farsi to review the ongoing expansion projects and community initiatives.',
    image: 'https://images.unsplash.com/photo-1555431189-066c1926639c?auto=format&fit=crop&q=80&w=800',
    type: 'Event',
    date: 'Dec 2025'
  },
  {
    id: 3,
    title: 'Ramadan Programs 2026',
    excerpt: 'Join us for special Ramadan prayers, iftar gatherings, and spiritual programs throughout the holy month.',
    image: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&q=80&w=800',
    type: 'News',
    date: 'Feb 2026'
  },
  {
    id: 4,
    title: 'Community Iftar Celebration',
    excerpt: 'Over 500 community members gathered for the grand iftar celebration, fostering unity and spiritual connection.',
    image: 'https://images.unsplash.com/photo-1580820267682-426da823b514?auto=format&fit=crop&q=80&w=800',
    type: 'Event',
    date: 'Mar 2026'
  }
];

function NewsCard({ item }: { item: typeof newsItems[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: '0 25px 50px rgba(212, 175, 55, 0.2)' }}
      className="w-96 h-80 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {item.type}
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-slate-800 mb-2 hover:text-gold transition-colors">
          {item.title}
        </h4>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {item.excerpt}
        </p>
        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-gold font-semibold hover:text-gold/80 transition-colors"
        >
          Read More →
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function NewsSection() {
  const swiperRef = useRef<any>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-800 mb-4">News & Media</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </motion.div>

        {/* News Carousel */}
        <div className="mb-16">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView="auto"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            grabCursor={true}
            className="!px-4"
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {newsItems.map((item) => (
              <SwiperSlide key={item.id} className="!w-auto">
                <NewsCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
