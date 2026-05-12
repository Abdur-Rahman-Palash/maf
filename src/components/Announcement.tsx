'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import AnnouncementStorage from '@/lib/announcementStorage';

const defaultAnnouncements = {
  en: [
    "📢 Jumu'ah Prayer: Every Friday at 1:30 PM - Please arrive early",
    "🕌 Ramadan Mubarak! Join us for daily Iftar and Taraweeh prayers",
    "📚 Weekend Islamic School: Saturdays & Sundays 10 AM - 2 PM",
    "🤝 New Members Welcome! Join our community programs and activities",
    "📖 Daily Quran Classes: Monday - Thursday 6 PM - 8 PM"
  ],
  ar: [
    "📢 صلاة الجمعة: كل يوم جمعة الساعة 1:30 مساءً - يرجى الحضور مبكراً",
    "🕌 رمضان كريم! انضموا لإفطار وصلاة التراويح يومياً",
    "📚 مدرسة weekend الإسلامية: السبت والأحد 10 صباحاً - 2 مساءً",
    "🤝 الأعضاء الجدد مرحب بهم! انضموا إلى برامج وأنشطة مجتمعنا",
    "📖 دروس القرآن اليومية: الاثنين - الخميس 6 مساءً - 8 مساءً"
  ]
};

const Announcement: React.FC = () => {
  const locale = useLocale();
  const [currentAnnouncements, setCurrentAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    const storedAnnouncements = AnnouncementStorage.getAnnouncements().filter((item) => item.status === 'active');
    if (storedAnnouncements.length > 0) {
      setCurrentAnnouncements(storedAnnouncements.map((item) => item.content));
      return;
    }

    setCurrentAnnouncements(defaultAnnouncements[locale as keyof typeof defaultAnnouncements] || defaultAnnouncements.en);
  }, [locale]);

  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-6 overflow-hidden shadow-lg mt-4">
      <div className="relative px-4">
        {/* Scrolling Announcements */}
        <div className="overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: [0, -50],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate announcements for seamless loop */}
            {[...currentAnnouncements, ...currentAnnouncements].map((announcement, index) => (
              <span
                key={index}
                className="inline-block px-8 text-lg md:text-xl font-medium"
                style={{ fontFamily: locale === 'ar' ? 'Amiri Quran, Traditional Arabic, serif' : 'Inter, sans-serif' }}
              >
                {announcement}
                <span className="mx-4 text-yellow-300">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
