'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

const Announcement: React.FC = () => {
  const locale = useLocale();

  const announcements = {
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

  const currentAnnouncements = announcements[locale as keyof typeof announcements] || announcements.en;

  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-6 overflow-hidden shadow-lg mt-4">
      <div className="relative flex items-center justify-between px-4">
        {/* Scrolling Announcements */}
        <div className="flex-1 overflow-hidden">
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

        {/* Donate Button */}
        <motion.button
          onClick={() => window.open('https://us.mohid.co/ga/atlanta/muna/masjid/online/vfr/campaign/ramadan_fund_raising', '_blank')}
          className="ml-4 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors duration-300 flex-shrink-0 text-sm md:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {locale === 'ar' ? 'تبرع رمضان' : 'Ramadan Fundraising'}
        </motion.button>
      </div>
    </div>
  );
};

export default Announcement;
