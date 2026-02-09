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
        // Check cache first
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
      fajr: 'FAJR<br/>الفجر',
      zuhr: 'DHUHR<br/>الظهر', 
      asr: 'ASR<br/>العصر',
      maghrib: 'MAGHRIB<br/>المغرب',
      isha: 'ISHA<br/>العشاء',
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
      {/* Islamic Greeting */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-white/90 backdrop-blur-md px-8 py-1 rounded-2xl shadow-2xl border border-purple-400">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4 lg:py-6">
          {/* Left Column - Date and Jum'a Info */}
          <motion.div 
            className="flex flex-col justify-center space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="hidden lg:block text-gray-900 font-bold text-lg lg:text-xl bg-white/80 backdrop-blur-md px-6 py-3 rounded-xl shadow-2xl border border-blue-200" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              {currentDate.english} · {currentDate.hijri}
            </div>
            <div className="text-gray-900 text-base lg:text-lg bg-gradient-to-r from-blue-100 to-green-100 px-6 py-4 rounded-xl border-2 border-blue-300 shadow-lg" style={{ textTransform: locale === 'ar' ? 'none' : 'uppercase', fontWeight: 700 }}>
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
              <span className="text-gray-600 mx-3 text-lg">·</span>
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
                  <span className="ml-3 text-gray-600">Loading prayer times...</span>
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
                      <div className="flex items-center space-x-3">
                        <motion.span 
                          className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-md"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          dangerouslySetInnerHTML={{ __html: names.begins }}
                        ></motion.span>
                        <motion.span 
                          className="text-sm font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          dangerouslySetInnerHTML={{ 
                            __html: getPrayerName(prayer)
                          }}
                        ></motion.span>
                      </div>
                      <motion.span 
                        className="text-base font-bold text-gray-900 hover:text-amber-600 transition-all duration-300 cursor-pointer"
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
                  <span className="ml-3 text-gray-600">Loading prayer times...</span>
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-4">
                  {(['fajr', 'Dhuhr', 'asr', 'maghrib', 'isha'] as const).map((prayer, index) => (
                    <div key={prayer} className="bg-white rounded-xl shadow-lg border border-blue-200 p-4 hover:shadow-xl transition-all duration-300">
                      {/* Prayer Name */}
                      <div className="text-center mb-4">
                        <motion.span 
                          className="text-sm font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent px-3 py-2 rounded-lg shadow-md"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          dangerouslySetInnerHTML={{ 
                            __html: getPrayerName(prayer)
                          }}
                        ></motion.span>
                      </div>
                      
                      {/* Adhan Time Only */}
                      <div className="text-center">
                        <motion.span 
                          className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-md"
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
                            className="text-2xl font-bold text-gray-900 hover:text-amber-600 transition-all duration-300 cursor-pointer"
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
