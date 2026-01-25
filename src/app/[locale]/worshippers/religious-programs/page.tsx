import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Religious Programs - Masjid Salman al Farsi',
  description: 'Explore our comprehensive religious programs including Quran classes, Islamic studies, and spiritual development activities',
};

export default function ReligiousProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            Religious Programs
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our comprehensive Islamic education and spiritual development programs for all ages.
          </p>
        </div>

        {/* Quran Programs */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Quran Programs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-green-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">📖</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Quran Memorization</h3>
              <p className="text-slate-600 text-sm text-center mb-4">Comprehensive Hifz program with qualified teachers</p>
              <ul className="space-y-1 text-slate-600 text-xs">
                <li>• Age: 6-18 years</li>
                <li>• Daily classes</li>
                <li>• Progress tracking</li>
                <li>• Certified completion</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">🎵</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Tajweed Classes</h3>
              <p className="text-slate-600 text-sm text-center mb-4">Perfect your Quran recitation with proper pronunciation</p>
              <ul className="space-y-1 text-slate-600 text-xs">
                <li>• All age groups</li>
                <li>• Weekend classes</li>
                <li>• Individual attention</li>
                <li>• Certification available</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-b from-purple-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Quran Translation</h3>
              <p className="text-slate-600 text-sm text-center mb-4">Understand the meaning and wisdom of the Holy Quran</p>
              <ul className="space-y-1 text-slate-600 text-xs">
                <li>• Adults & youth</li>
                <li>• Evening classes</li>
                <li>• Interactive discussions</li>
                <li>• Multiple languages</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Islamic Studies */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Islamic Studies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Weekend Islamic School</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Schedule:</span>
                  <span className="font-bold text-amber-600">Saturday & Sunday</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Timing:</span>
                  <span className="font-bold text-amber-600">9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Age Groups:</span>
                  <span className="font-bold text-amber-600">5-16 years</span>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>Subjects:</strong> Aqeedah, Fiqh, Seerah, Islamic History, Arabic Language
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Adult Education</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Schedule:</span>
                  <span className="font-bold text-blue-600">Tuesday & Thursday</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Timing:</span>
                  <span className="font-bold text-blue-600">7:00 PM - 9:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Format:</span>
                  <span className="font-bold text-blue-600">Lectures & Workshops</span>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>Topics:</strong> Contemporary issues, Family life, Financial planning, Parenting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spiritual Development */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Spiritual Development</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-b from-green-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-green-600">🤲</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Dhikr Sessions</h4>
              <p className="text-xs text-slate-600 mt-1">Daily after Maghrib</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-blue-600">🕌</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Qiyam-ul-Lail</h4>
              <p className="text-xs text-slate-600 mt-1">Every Friday 3:00 AM</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-purple-600">📿</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Spiritual Retreats</h4>
              <p className="text-xs text-slate-600 mt-1">Monthly programs</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-b from-amber-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-amber-600">💝</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Charity Work</h4>
              <p className="text-xs text-slate-600 mt-1">Community service</p>
            </div>
          </div>
        </div>

        {/* Special Programs */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Special Programs</h2>
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Ramadan Programs</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-slate-600 mb-2">Daily Iftar</h4>
                  <p className="text-sm text-slate-600">Community iftar for 200+ people daily</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-600 mb-2">Taraweeh Prayers</h4>
                  <p className="text-sm text-slate-600">Complete Quran recitation in Ramadan</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-600 mb-2">Lailatul Qadr</h4>
                  <p className="text-sm text-slate-600">Special night prayers and lectures</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Eid Celebrations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-slate-600 mb-2">Eid Prayers</h4>
                  <p className="text-sm text-slate-600">Two congregational prayers with special khutbah</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-600 mb-2">Community Festival</h4>
                  <p className="text-sm text-slate-600">Family-friendly activities and food festival</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Program Registration</h2>
          <div className="text-center">
            <p className="text-slate-600 mb-6">Join our religious programs and strengthen your connection with Allah</p>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
                Register Online
              </button>
              <button className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold border-2 border-amber-500 hover:bg-amber-50 transition-colors">
                Visit Mosque Office
              </button>
            </div>
            <div className="mt-6 text-sm text-slate-600">
              <p>📞 Contact: +123 456 7890 | 📧 Email: programs@masjidsalman.org</p>
              <p>📍 Office Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
