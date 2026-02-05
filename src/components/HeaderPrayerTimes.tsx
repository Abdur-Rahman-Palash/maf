'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

interface PrayerTimes {
  jamaat: {
    fajr: string;
    zuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  begins: {
    fajr: string;
    zuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}

const HeaderPrayerTimes: React.FC = () => {
  const locale = useLocale();
  const [currentDate, setCurrentDate] = useState({
    english: '',
    hijri: ''
  });

  const [nextPrayer, setNextPrayer] = useState({ name: 'DHUHR', time: '12:30 PM' });

  // Real Islamic prayer times for Georgia (Atlanta)
  const [prayerTimes, setPrayerTimes] = useState({
    jamaat: {
      fajr: '06:00',
      Dhuhr: '13:30',
      asr: '16:00',
      maghrib: '18:15',
      isha: '20:00'
    },
    begins: {
      fajr: '05:45',
      Dhuhr: '13:00',
      asr: '15:30',
      maghrib: '18:15',
      isha: '19:30'
    }
  });

  // Prayer names in different languages
  const prayerNames = {
    en: {
      fajr: 'FAJR',
      zuhr: 'DHUHR', 
      asr: 'ASR',
      maghrib: 'MAGHRIB',
      isha: 'ISHA',
      jamaat: "JAMA'AT",
      begins: 'BEGINS',
      juma: "JUMU'AH",
      prayerTimes: 'PRAYER TIMES'
    },
    ar: {
      fajr: 'الفجر',
      zuhr: 'الظهر',
      asr: 'العصر', 
      maghrib: 'المغرب',
      isha: 'العشاء',
      jamaat: 'الجماعة',
      begins: 'البداية',
      juma: 'الجمعة',
      prayerTimes: 'مواقيت الصلاة'
    }
  };

  // Convert 24-hour time to 12-hour format with AM/PM
  const convertTo12Hour = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Convert 24-hour time to Arabic format
  const convertToArabicTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    
    // Arabic numerals
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const toArabicNumeral = (num: number) => {
      return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)] || digit).join('');
    };
    
    return `${toArabicNumeral(hour)}:${toArabicNumeral(parseInt(minutes))}`;
  };

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // Using local API route for prayer times
        const response = await fetch('/api/prayer-times');
        const data = await response.json();
        
        if (data.code === 200 && data.data) {
          const timings = data.data.timings;
          const hijriDate = data.data.date.hijri;
          
          setPrayerTimes({
            jamaat: {
              fajr: timings.Fajr,
              Dhuhr: timings.Dhuhr,
              asr: timings.Asr,
              maghrib: timings.Maghrib,
              isha: timings.Isha
            },
            begins: {
              fajr: timings.Fajr,
              Dhuhr: timings.Dhuhr,
              asr: timings.Asr,
              maghrib: timings.Maghrib,
              isha: timings.Isha
            }
          });

          // Update Hijri date
          setCurrentDate({
            english: new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            hijri: `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year}`
          });
        }
      } catch (error) {
        console.log('Using fallback prayer times');
        // Keep using fallback times if API fails
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleDateString('en-US', { month: 'long' });
        const year = now.getFullYear();
        
        // Add ordinal suffix to day
        const getOrdinalSuffix = (day: number) => {
          const suffixes = ['th', 'st', 'nd', 'rd'];
          const v = day % 100;
          return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
        };
        
        setCurrentDate({
          english: `${day}${getOrdinalSuffix(day)} ${month} ${year}`,
          hijri: '9 Shabaan 1447' // This would normally be calculated
        });
      }
    };

    fetchPrayerTimes();
    
    // Update every hour
    const interval = setInterval(fetchPrayerTimes, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const names = prayerNames[locale as keyof typeof prayerNames] || prayerNames.en;

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 border-b border-purple-300 shadow-2xl">
      {/* Islamic Greeting */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl border border-purple-400">
            {/* English Greeting */}
            <motion.p 
              className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Assalamu Alaikum wa Rahmatullahi wa Barakatuh
            </motion.p>
            
            {/* Arabic Greeting */}
            <motion.p 
              className="text-2xl lg:text-3xl font-bold text-purple-800"
              style={{ fontFamily: 'Amiri Quran, Traditional Arabic, serif', direction: 'rtl' }}
              animate={{
                opacity: [0, 1, 1],
                scale: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              السلام عليكم ورحمة الله وبركاته
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full"
              animate={{
                x: [0, 100, 50, 0],
                y: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
              }}
              transition={{
                duration: 8 + Math.random() * 15,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        {/* Gradient Wave Animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-transparent via-purple-200/20 to-transparent"
          animate={{
            x: ["-100%", "0%", "100%"],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulsing Circles */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.15, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="absolute top-1/3 right-1/4 w-32 h-32">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.12, 0.3],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Additional Floating Orbs */}
        <div className="absolute top-2/3 left-1/6 w-20 h-20">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.08, 0.2],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="absolute bottom-1/4 right-1/6 w-16 h-16">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-pink-400/15 to-indigo-400/15"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.25, 0.1, 0.25],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4 lg:py-6">
          {/* Left Column - Date and Jum'a Info */}
          <motion.div 
            className="flex flex-col justify-center space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="hidden lg:block text-gray-900 font-bold text-lg lg:text-xl bg-white/80 backdrop-blur-md px-6 py-3 rounded-xl shadow-2xl border border-purple-200" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              {currentDate.english} · {currentDate.hijri}
            </div>
            <div className="text-gray-900 text-base lg:text-lg bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-4 rounded-xl border-2 border-purple-300 shadow-lg" style={{ textTransform: locale === 'ar' ? 'none' : 'uppercase', fontWeight: 700 }}>
              <motion.a 
                href="/worshippers/prayer-timings" 
                className="hover:text-purple-700 transition-all duration-300 mr-3 inline-block group"
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="group-hover:text-purple-700 group-hover:drop-shadow-2xl transition-all duration-300 text-lg lg:text-xl font-bold">
                  {locale === 'ar' ? 'الجمعة ١٢:٣٠ & ١٣:١٥' : `${names.juma} 12:30 & 13:15`}
                </span>
              </motion.a>
              <span className="text-gray-600 mx-3 text-lg">·</span>
              <motion.div whileHover={{ y: -3, scale: 1.08 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link
                  href="/worshippers/prayer-timings" 
                  className="hover:text-purple-700 transition-all duration-300 ml-3 inline-block group"
                >
                  <span className="group-hover:text-purple-700 group-hover:drop-shadow-2xl transition-all duration-300 text-lg lg:text-xl font-bold">
                    {names.prayerTimes}
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Prayer Times Table */}
          <motion.div 
            className="bg-gradient-to-br from-white via-purple-50/60 to-pink-50/60 lg:border-l border-l lg:border-purple-300 lg:pl-6 rounded-xl lg:rounded-l-none shadow-2xl backdrop-blur-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Prayer Names Header */}
            <div className="grid grid-cols-6 gap-1 mb-4 lg:mb-6" style={{ lineHeight: '24px', margin: '10px 0 8px 0' }}>
              <div className="col-span-1"></div>
              {(['fajr', 'zuhr', 'asr', 'maghrib', 'isha'] as const).map((prayer) => (
                <div key={prayer} className="col-span-1 text-center">
                  <motion.span 
                    className="text-sm lg:text-base font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent px-3 py-2 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                  >
                    {names[prayer]}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Jama'at Times */}
            <div className="grid grid-cols-6 gap-1 mb-3 lg:mb-4" style={{ lineHeight: '24px' }}>
              <div className="col-span-1">
                <motion.span 
                  className="text-sm lg:text-base font-bold text-purple-700 bg-purple-100 px-3 py-2 rounded-lg border-2 border-purple-400 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {names.jamaat}
                </motion.span>
              </div>
              {Object.entries(prayerTimes.jamaat).map(([prayer, time], index) => (
                <motion.div 
                  key={prayer}
                  className="col-span-1 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.span 
                    className="text-sm lg:text-base font-semibold text-gray-900 hover:text-purple-600 transition-all duration-300 cursor-pointer bg-white/80 hover:bg-purple-100 px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {locale === 'ar' ? convertToArabicTime(time) : convertTo12Hour(time)}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* Begin Times */}
            <div className="grid grid-cols-6 gap-1" style={{ margin: '6px 0 4px', paddingBottom: 0, lineHeight: '24px' }}>
              <div className="col-span-1">
                <motion.span 
                  className="text-sm lg:text-base font-bold text-pink-700 bg-pink-100 px-3 py-2 rounded-lg border-2 border-pink-400 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {names.begins}
                </motion.span>
              </div>
              {Object.entries(prayerTimes.begins).map(([prayer, time], index) => (
                <motion.div 
                  key={prayer}
                  className="col-span-1 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <motion.span 
                    className="text-sm lg:text-base font-medium text-gray-900 hover:text-pink-600 transition-all duration-300 cursor-pointer bg-white/80 hover:bg-pink-100 px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-pink-300 shadow-lg hover:shadow-xl"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {locale === 'ar' ? convertToArabicTime(time) : convertTo12Hour(time)}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrayerTimes;
