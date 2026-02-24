'use client'

import { motion } from 'framer-motion'

export default function PrayerSection({ locale = 'en' }) {
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
        <div>Tuesday, February 24, 2026 · 6 Ramaḍān 1447</div>
        <div className="text-right">
          <div className="text-2xl lg:text-4xl font-extrabold">Assalamu Alaikum wa Rahmatullah</div>
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
                {[
                  { name: 'Fajr', time: '6:05 AM' },
                  { name: 'Dhuhr', time: '1:35 PM' },
                  { name: 'Asr', time: '4:45 PM' },
                  { name: 'Maghrib', time: '6:25 PM' },
                  { name: 'Isha', time: '8:00 PM' },
                ].map((prayer, index) => (
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