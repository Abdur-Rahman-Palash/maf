'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { PrayerTimesStorage, PrayerTime } from '@/lib/prayerTimesStorage'
import { eventSync, EVENT_TYPES } from '@/lib/eventSync'

export default function PrayerSection({ locale = 'en' }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [activePrayerTime, setActivePrayerTime] = useState<PrayerTime | null>(null)
  const [updateKey, setUpdateKey] = useState(Date.now())

  useEffect(() => {
    const fetchData = async () => {
      // Update current time
      setCurrentDateTime(new Date())
      setUpdateKey(Date.now())
      
      // Load prayer times from shared storage
      try {
        const activePrayerTime = PrayerTimesStorage.getActivePrayerTimes()
        setActivePrayerTime(activePrayerTime)
        
        // Sync with API if needed
        await PrayerTimesStorage.syncWithAPI()
      } catch (error) {
        console.error('Error loading prayer times:', error)
      }
    }

    // Load initial data
    fetchData()
    
    // Set up real-time sync for prayer times updates (temporarily disabled to stop infinite loops)
    // const unsubscribe = eventSync.subscribe(EVENT_TYPES.PRAYER_TIMES_UPDATED, () => {
    //   const activePrayerTime = PrayerTimesStorage.getActivePrayerTimes()
    //   setActivePrayerTime(activePrayerTime)
    //   setUpdateKey(Date.now())
    // })

    // Update time every 30 seconds
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
      setUpdateKey(Date.now())
    }, 30000)

    return () => {
      clearInterval(timer)
      // unsubscribe() // Temporarily disabled
    }
  }, [])

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/New_York' // Atlanta timezone (Eastern Time)
    }
    
    const gregorianDate = date.toLocaleDateString('en-US', options)
    
    // Use Islamic Finder API for accurate Hijri date for Atlanta, USA (BUJTE PARCEN)
    const hijriDate = getHijriDate(date)
    
    return `${gregorianDate} · ${hijriDate}`
  }

  const getHijriDateFromAPI = async (date: Date): Promise<string> => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/gToH?date=${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}&latitude=33.7490&longitude=-84.3880`)
      const data = await response.json()
      
      if (data.data && data.data.hijri) {
        const hijriMonths = ['Muḥarram', 'Ṣafar', 'Rabīʿ al-Awwal', 'Rabīʿ al-Thānī', 'Jumādā al-Awwal', 'Jumādā al-Thānī', 'Rajab', 'Shaʿbān', 'Ramaḍān', 'Shawwāl', 'Dhū al-Qaʿdah', 'Dhū al-Ḥijjah']
        const hijriDay = data.data.hijri.day
        const hijriMonth = hijriMonths[data.data.hijri.month.number - 1]
        const hijriYear = data.data.hijri.year
        
        return `${hijriDay} ${hijriMonth} ${hijriYear}`
      }
      
      // Fallback to local calculation if API response doesn't contain expected data
      return calculateHijriDate(date)
    } catch (error) {
      console.error('Error fetching Hijri date from API:', error)
      // Fallback to local calculation
      return calculateHijriDate(date)
    }
  }

  const calculateHijriDate = (date: Date) => {
    const hijriMonths = ['Muḥarram', 'Ṣafar', 'Rabīʿ al-Awwal', 'Rabīʿ al-Thānī', 'Jumādā al-Awwal', 'Jumādā al-Thānī', 'Rajab', 'Shaʿbān', 'Ramaḍān', 'Shawwāl', 'Dhū al-Qaʿdah', 'Dhū al-Ḥijjah']
    
    // Accurate Hijri date calculation
    const gregorianDate = new Date(date)
    const day = gregorianDate.getDate()
    const month = gregorianDate.getMonth() + 1 // JavaScript months are 0-based
    const year = gregorianDate.getFullYear()
    
    // Hijri calculation algorithm
    let jd, l, j, n, jh
    
    if ((year > 1582) || ((year == 1582) && (month > 10)) || ((year == 1582) && (month == 10) && (day > 14))) {
      jd = Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) + Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12) - Math.floor((3 * (Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100))) / 4) + day - 32075
    } else {
      jd = 367 * year - Math.floor((7 * (year + 5001 + Math.floor((month - 9) / 7))) / 4) + Math.floor((275 * month) / 9) + day + 1729777
    }
    
    j = jd - 1948440 + 10632
    n = Math.floor((j - 1) / 10631)
    j = j - 10631 * n + 354
    
    l = Math.floor((10985 - j) / 5316) * Math.floor((50 * j) / 17719) + Math.floor(j / 5670) * Math.floor((43 * j) / 15238)
    j = j - Math.floor((30 - l) / 15) * Math.floor((17719 * l) / 50) - Math.floor(l / 16) * Math.floor((15238 * l) / 43) + 29
    
    const hijriMonth = Math.floor((24 * j) / 709)
    let hijriDay = j - Math.floor((709 * hijriMonth) / 24)
    const hijriYear = 30 * n + l - 30
    
    // Apply correction for Atlanta, USA (BUJTE PARCEN) - adjust by -2 days
    hijriDay = hijriDay - 2
    
    return `${hijriDay} ${hijriMonths[hijriMonth - 1]} ${hijriYear}`
  }

  // Synchronous wrapper for immediate rendering
  const getHijriDate = (date: Date): string => {
    // Use local calculation for immediate rendering
    // TODO: Implement proper caching or pre-fetching for API data
    return calculateHijriDate(date)
  }

    const names = {
    prayerTimes: locale === 'ar' ? 'مواقيت الصلاة' : 'Prayer Times',
  }

  return (
    <section className="relative w-full py-6 overflow-hidden bg-slate-900 text-white">
      
      {/* Gradient Waves Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 opacity-25"
          animate={{ x: ['0%', '-50%', '0%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-12 left-0 w-[150%] h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 opacity-15"
          animate={{ x: ['0%', '-40%', '0%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* TOP ROW */}
      <div className="relative flex justify-between items-start max-w-7xl mx-auto px-4 mb-4 z-10 text-sm lg:text-base">
        <div key={updateKey}>{formatDateTime(currentDateTime)}</div>
        <div className="text-right">
         
          <div className="mt-0.5 text-xl lg:text-2xl font-semibold">السلام عليكم ورحمة الله وبركاته</div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto px-4 z-10">

        {/* LEFT SIDE */}
        <motion.div
          className="flex flex-col justify-center items-start space-y-2 m-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl lg:text-5xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
            Masjid Salman Al-Farsi
          </h1>

          <p className="text-gray-300 text-base lg:text-lg leading-snug max-w-lg">
            The DBA of MUNA Center of Georgia Inc. is Masjid Salman Al-Farsi.
            MUNA Center of Georgia Inc. has 501(c)(3) status and is a non-profit.
            This organization’s goal is to serve the neighborhood’s religious,
            educational, charitable, and social needs.
          </p>
        </motion.div>

        {/* RIGHT SIDE — Gradient Wave Card */}
        <motion.div
          className="relative m-2 p-6 rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Gradient Wave Overlay */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
            <motion.div
              className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30"
              animate={{ x: ['0%', '-50%', '0%'] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* TITLE */}
          <div className="w-full text-right mb-4">
            <div className="inline-block px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg text-lg lg:text-xl">
              <span className="font-extrabold tracking-wide text-white">JUMU'AH - 12:30</span>
              <span className="mx-2 text-gray-200">·</span>
              <span className="font-extrabold tracking-wide text-white">{names.prayerTimes}</span>
            </div>
          </div>

          {/* TABLE */}
          <div className="w-full">
            <table className="w-full text-right border-collapse text-white/90 text-base lg:text-lg font-semibold">
              <tbody>
                {(activePrayerTime ? [
                  { name: 'Fajr', time: activePrayerTime.fajr_jamaat },
                  { name: 'Dhuhr', time: activePrayerTime.dhuhr_jamaat },
                  { name: 'Asr', time: activePrayerTime.asr_jamaat },
                  { name: 'Maghrib', time: activePrayerTime.maghrib_jamaat },
                  { name: 'Isha', time: activePrayerTime.isha_jamaat },
                ] : [
                  { name: 'Fajr', time: '6:05 AM' },
                  { name: 'Dhuhr', time: '1:35 PM' },
                  { name: 'Asr', time: '4:45 PM' },
                  { name: 'Maghrib', time: '6:25 PM' },
                  { name: 'Isha', time: '8:00 PM' },
                ]).map((prayer, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/10 last:border-none hover:bg-white/5 transition duration-300"
                  >
                    <td className="py-2">{prayer.name}</td>
                    <td className="py-2">{prayer.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
