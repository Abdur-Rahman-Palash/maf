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
  const [loading, setLoading] = useState(false);

  // Islamic prayer times from API with caching
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

  // Cache prayer times in localStorage to avoid repeated API calls
  const getCachedPrayerTimes = () => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('prayerTimes');
        const cachedTime = localStorage.getItem('prayerTimesTime');
        const now = new Date().getTime();
        
        // Use cache if less than 2 hours old
        if (cached && cachedTime && (now - parseInt(cachedTime)) < 2 * 60 * 60 * 1000) {
          return JSON.parse(cached);
        }
      } catch (error) {
        console.error('Error reading cache:', error);
        localStorage.removeItem('prayerTimes');
        localStorage.removeItem('prayerTimesTime');
      }
    }
    return null;
  };

  const cachePrayerTimes = (times: any) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('prayerTimes', JSON.stringify(times));
        localStorage.setItem('prayerTimesTime', new Date().getTime().toString());
      } catch (error) {
        console.error('Error writing cache:', error);
      }
    }
  };

  // Fetch prayer times from IslamicFinder API with caching
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // First check for manually set prayer times from admin dashboard
        const manualPrayerTimes = localStorage.getItem('prayerTimes');
        const manualJamaatTimes = localStorage.getItem('jamaatTimes');
        
        if (manualPrayerTimes && manualJamaatTimes) {
          const prayerTimesData = JSON.parse(manualPrayerTimes);
          const jamaatTimesData = JSON.parse(manualJamaatTimes);
          
          setPrayerTimes({
            jamaat: jamaatTimesData,
            begins: prayerTimesData
          });
          setLoading(false);
          return;
        }

        // Check cache second
        const cachedTimes = getCachedPrayerTimes();
        if (cachedTimes) {
          setPrayerTimes(cachedTimes);
          setLoading(false);
          return;
        }

        setLoading(true);
        // Add timeout to prevent long loading
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('https://www.islamicfinder.us/index.php/api/prayer_times?country=US&zipcode=30084&format=json', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Debug: Log API response
        console.log('API Response:', data);
        
        // Handle different possible response formats
        if (data && (data.prayer_times || data.data || data.results)) {
          const times = data.prayer_times || data.data || data.results;
          
          // Debug: Log available time fields
          console.log('Available fields:', Object.keys(times));
          console.log('Namaz begin fields:', {
            fajr_begin: times.fajr_begin,
            dhuhr_begin: times.dhuhr_begin,
            asr_begin: times.asr_begin,
            maghrib_begin: times.maghrib_begin,
            isha_begin: times.isha_begin,
            fajr_start: times.fajr_start,
            dhuhr_start: times.dhuhr_start,
            asr_start: times.asr_start,
            maghrib_start: times.maghrib_start,
            isha_start: times.isha_start
          });
          
          const newPrayerTimes = {
            jamaat: {
              fajr: times.fajr || times.Fajr || times.fajr_jamaat || times.Fajr_jamaat || times.jamaat_fajr || '06:00',
              Dhuhr: times.dhuhr || times.Dhuhr || times.dhuhr_jamaat || times.Dhuhr_jamaat || times.jamaat_dhuhr || times.Zuhr || '13:30',
              asr: times.asr || times.Asr || times.asr_jamaat || times.Asr_jamaat || times.jamaat_asr || '16:00',
              maghrib: times.maghrib || times.Maghrib || times.maghrib_jamaat || times.Maghrib_jamaat || times.jamaat_maghrib || '18:15',
              isha: times.isha || times.Isha || times.isha_jamaat || times.Isha_jamaat || times.jamaat_isha || '20:00'
            },
            begins: {
              // Fetch actual Namaz begin times from API
              fajr: times.fajr_begin || times.fajr_start || times.Fajr || times.fajr || '05:45',
              Dhuhr: times.dhuhr_begin || times.dhuhr_start || times.Dhuhr || times.dhuhr || times.Zuhr || '13:00',
              asr: times.asr_begin || times.asr_start || times.Asr || times.asr || '15:30',
              maghrib: times.maghrib_begin || times.maghrib_start || times.Maghrib || times.maghrib || '18:15',
              isha: times.isha_begin || times.isha_start || times.Isha || times.isha || '19:30'
            }
          };
          
          // Debug: Log final prayer times
          console.log('Final prayer times:', newPrayerTimes);
          
          setPrayerTimes(newPrayerTimes);
          cachePrayerTimes(newPrayerTimes);
        } else {
          console.warn('Unexpected API response format:', data);
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('Request timed out, using fallback');
        } else {
          console.error('Error fetching prayer times:', error);
        }
        // Keep default values if API fails
      } finally {
        setLoading(false);
      }
    };

    const updateDates = () => {
      fetchPrayerTimes();
      
      // Update dates regardless of API success
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleDateString('en-US', { month: 'long' });
      const year = now.getFullYear();
      
      // Simple Hijri date calculation (approximate)
      const hijriYear = Math.floor((year - 622) + (year - 622) / 32);
      const hijriMonths = ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaʿbān', 'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah'];
      const hijriMonth = hijriMonths[new Date().getMonth()] || 'Shaʿbān';
      const hijriDay = day;
      
      const getOrdinalSuffix = (day: number) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = day % 100;
        return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
      };
      
      setCurrentDate({
        english: `${day}${getOrdinalSuffix(day)} ${month} ${year}`,
        hijri: `${hijriDay} ${hijriMonth} ${hijriYear}`
      });
    };

    // Initial load
    updateDates();
    
    // Refresh every 2 hours (less frequent to reduce API calls)
    const interval = setInterval(updateDates, 2 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Prayer names in different languages
  const prayerNames = {
    en: {
      fajr: '<div class="text-base font-extrabold leading-tight">FAJR</div><div class="text-xs font-medium text-gray-600 leading-tight mt-1">الفجر</div>',
      zuhr: '<div class="text-base font-extrabold leading-tight">DHUHR</div><div class="text-xs font-medium text-gray-600 leading-tight mt-1">الظهر</div>', 
      asr: '<div class="text-base font-extrabold leading-tight">ASR</div><div class="text-xs font-medium text-gray-600 leading-tight mt-1">العصر</div>',
      maghrib: '<div class="text-sm font-extrabold leading-tight">MAGHRIB</div><div class="text-xs font-medium text-gray-600 leading-tight mt-1">المغرب</div>',
      isha: '<div class="text-base font-extrabold leading-tight">ISHA</div><div class="text-xs font-medium text-gray-600 leading-tight mt-1">العشاء</div>',
      jamaat: "JAMA'AT",
      begins: 'BEGINS',
      juma: "JUMU'AH",
      prayerTimes: 'PRAYER TIMES'
    },
    ar: {
      fajr: '<div class="text-base font-extrabold leading-tight">الفجر</div>',
      zuhr: '<div class="text-base font-extrabold leading-tight">الظهر</div>',
      asr: '<div class="text-base font-extrabold leading-tight">العصر</div>', 
      maghrib: '<div class="text-sm font-extrabold leading-tight">المغرب</div>',
      isha: '<div class="text-base font-extrabold leading-tight">العشاء</div>',
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

  // Helper function to get prayer name with proper mapping
  const getPrayerName = (prayer: string) => {
    switch (prayer.toLowerCase()) {
      case 'dhuhr': return names.zuhr;
      case 'fajr': return names.fajr;
      case 'asr': return names.asr;
      case 'maghrib': return names.maghrib;
      case 'isha': return names.isha;
      default: return prayer.toUpperCase();
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 border-b border-purple-300 shadow-2xl">
      {/* Date - Left Top */}
      <div className="absolute top-4 left-4 z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-black font-bold text-lg lg:text-xl bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-blue-200"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          {currentDate.english} · {currentDate.hijri}
        </motion.div>
      </div>

      {/* Islamic Greeting - Right Side Small */}
      <div className="absolute top-4 right-4 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-right"
        >
          <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-xl shadow-lg border border-purple-400">
            {/* English Greeting - Small */}
            <motion.p 
              className="text-sm lg:text-base font-bold text-black mb-1"
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
            
            {/* Arabic Greeting - Small */}
            <motion.p 
              className="text-sm lg:text-base font-bold text-black"
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
          {[...Array(25)].map((_, i) => {
            // Use deterministic values based on index to avoid hydration mismatch
            const seed = i * 137.5; // Prime number for better distribution
            const left = ((seed * 9.7) % 100);
            const top = ((seed * 13.3) % 100);
            const duration = 8 + ((seed * 7.1) % 15);
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full"
                animate={{
                  x: [0, 100, 50, 0],
                  y: [0, 30, 70, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
              />
            );
          })}
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

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 mt-20">
        {/* Jumu'ah and Prayer Times - Between Date and Greeting */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-black text-base lg:text-lg bg-gradient-to-r from-blue-100 to-green-100 px-6 py-3 rounded-xl border-2 border-blue-300 shadow-lg" style={{ textTransform: locale === 'ar' ? 'none' : 'uppercase', fontWeight: 700 }}>
            <motion.a 
              href="/worshippers/prayer-timings" 
              className="hover:text-blue-700 transition-all duration-300 mr-3 inline-block group"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="group-hover:text-blue-700 group-hover:drop-shadow-2xl transition-all duration-300 text-lg lg:text-xl font-bold">
                {locale === 'ar' ? 'الجمعة ١٣:٣٠' : 'JUMU\'AH  - 13:30'}
              </span>
            </motion.a>
            <span className="text-black mx-3 text-lg">·</span>
            <motion.div whileHover={{ y: -3, scale: 1.08 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                href="/worshippers/prayer-timings" 
                className="hover:text-blue-700 transition-all duration-300 ml-3 inline-block group"
              >
                <span className="group-hover:text-blue-700 group-hover:drop-shadow-2xl transition-all duration-300 text-lg lg:text-xl font-bold" dangerouslySetInnerHTML={{ __html: names.prayerTimes }}></span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4 lg:py-6 max-w-7xl mx-auto">
          {/* Left Column - Masjid Information */}
          <motion.div 
            className="flex flex-col justify-center items-center lg:items-start space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Masjid Name - Big Font */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-black text-center lg:text-left"
            >
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                Masjid Salman Al-Farsi
              </h1>
            </motion.div>

            {/* Organization Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-white/80 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-blue-200 w-full"
            >
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                <span className="font-semibold">The DBA of MUNA Center of Georgia Inc. is Masjid Salman Al-Farsi.</span>
                <br className="hidden lg:block" />
                MUNA Center of Georgia Inc. has 501(c)3 status and is a non-profit.
                <br className="hidden lg:block" />
                This organization's goal is to serve the neighborhood's religious, educational, charitable, and social needs.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Prayer Times Table */}
          <motion.div 
            className="bg-gradient-to-br from-blue-50 via-green-50/60 to-amber-50/60 border border-blue-300 lg:border-l lg:border-r lg:pl-6 lg:pr-6 rounded-xl lg:rounded-l-none lg:rounded-r-none shadow-2xl backdrop-blur-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Mobile Prayer Times - Adhan Only */}
            <div className="lg:hidden">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-black">Loading prayer times...</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {(['fajr', 'Dhuhr', 'asr', 'maghrib', 'isha'] as const).map((prayer, index) => (
                    <motion.div 
                      key={prayer} 
                      className="flex justify-between items-center bg-white rounded-lg shadow-md border border-blue-200 p-3 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3 min-h-[60px]">
                        <motion.span 
                          className="text-sm font-semibold text-black bg-amber-100 px-3 py-2 rounded-lg shadow-md flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          dangerouslySetInnerHTML={{ __html: names.begins }}
                        ></motion.span>
                        <motion.div 
                          className={`${prayer === 'maghrib' ? 'text-sm' : 'text-base'} font-extrabold text-black bg-gradient-to-r from-blue-50 to-green-50 px-4 py-2 rounded-lg border border-blue-200 shadow-md flex-1`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.2 }}
                          dangerouslySetInnerHTML={{ 
                            __html: getPrayerName(prayer)
                          }}
                        ></motion.div>
                      </div>
                      <motion.span 
                        className="text-lg font-bold text-black hover:text-amber-600 transition-all duration-300 cursor-pointer"
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {locale === 'ar' ? convertToArabicTime(prayerTimes.begins[prayer]) : convertTo12Hour(prayerTimes.begins[prayer])}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Prayer Times - Individual Boxes */}
            <div className="hidden lg:block">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-black">Loading prayer times...</span>
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-3">
                  {(['fajr', 'Dhuhr', 'asr', 'maghrib', 'isha'] as const).map((prayer, index) => (
                    <div key={prayer} className="bg-white rounded-xl shadow-lg border border-blue-200 p-3 hover:shadow-xl transition-all duration-300">
                      {/* Prayer Name */}
                      <div className="text-center mb-4 min-h-[100px] flex items-center justify-center">
                        <motion.div 
                          className="text-base font-extrabold text-black px-3 py-2 rounded-xl shadow-lg bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 w-full"
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.2 }}
                          dangerouslySetInnerHTML={{ 
                            __html: getPrayerName(prayer)
                          }}
                        ></motion.div>
                      </div>
                      
                      {/* Adhan Time Only */}
                      <div className="text-center">
                        <motion.span 
                          className="text-sm font-semibold text-black bg-amber-100 px-2 py-1 rounded-md"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          dangerouslySetInnerHTML={{ __html: names.begins }}
                        ></motion.span>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="mt-2"
                        >
                          <motion.span 
                            className="text-3xl font-bold text-black hover:text-amber-600 transition-all duration-300 cursor-pointer"
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {locale === 'ar' ? convertToArabicTime(prayerTimes.begins[prayer]) : convertTo12Hour(prayerTimes.begins[prayer])}
                          </motion.span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrayerTimes;
