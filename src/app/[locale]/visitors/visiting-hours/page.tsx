import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visiting Hours - Masjid Salman al Farsi',
  description: 'Plan your visit to Masjid Salman al Farsi with our comprehensive visiting hours and schedule information',
};

export default function VisitingHoursPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            Visiting Hours
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Plan your visit to Masjid Salman al Farsi with our comprehensive schedule and visiting information.
          </p>
        </div>

        {/* General Visiting Hours */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">General Visiting Hours</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Daily Visiting Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium text-slate-700">Saturday - Thursday</span>
                  <span className="font-bold text-blue-600">9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium text-slate-700">Friday</span>
                  <span className="font-bold text-blue-600">2:00 PM - 10:00 PM</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>Note:</strong> Friday morning restricted for Jumuah prayer preparation
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Prayer Times Access</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-slate-700 mb-2">The mosque is open 24/7 for prayers</p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li>• Fajr: 5:00 AM - 6:30 AM</li>
                    <li>• Dhuhr: 12:00 PM - 2:00 PM</li>
                    <li>• Asr: 3:30 PM - 5:30 PM</li>
                    <li>• Maghrib: 6:00 PM - 7:30 PM</li>
                    <li>• Isha: 8:00 PM - 10:00 PM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tour Schedule */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Guided Tour Schedule</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-purple-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">🌅</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Morning Tours</h3>
              <div className="space-y-2 text-center">
                <p className="text-slate-600 text-sm">Daily except Friday</p>
                <p className="font-bold text-purple-600">9:00 AM & 11:00 AM</p>
                <p className="text-xs text-slate-500">Duration: 90 minutes</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">☀️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Afternoon Tours</h3>
              <div className="space-y-2 text-center">
                <p className="text-slate-600 text-sm">Saturday - Thursday</p>
                <p className="font-bold text-blue-600">2:00 PM & 4:00 PM</p>
                <p className="text-xs text-slate-500">Duration: 90 minutes</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-amber-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">🌙</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Evening Tours</h3>
              <div className="space-y-2 text-center">
                <p className="text-slate-600 text-sm">Weekends only</p>
                <p className="font-bold text-amber-600">6:00 PM & 8:00 PM</p>
                <p className="text-xs text-slate-500">Duration: 75 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Access Times */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Special Access Times</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Photography & Media</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Best Times:</span>
                  <span className="font-bold text-red-600">6:00 AM - 8:00 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Golden Hour:</span>
                  <span className="font-bold text-red-600">5:00 PM - 7:00 PM</span>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>Permit Required:</strong> Professional photography needs prior approval
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Quiet Visiting</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Recommended:</span>
                  <span className="font-bold text-green-600">10:00 AM - 12:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Also Available:</span>
                  <span className="font-bold text-green-600">3:00 PM - 5:00 PM</span>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>Ideal for:</strong> Meditation, reflection, and peaceful visits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Schedule */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Special Monthly Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-amber-200">
                  <th className="text-left p-3 text-slate-700">Event</th>
                  <th className="text-left p-3 text-slate-700">Date</th>
                  <th className="text-left p-3 text-slate-700">Special Hours</th>
                  <th className="text-left p-3 text-slate-700">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-amber-100 hover:bg-amber-50">
                  <td className="p-3 font-medium">Ramadan</td>
                  <td className="p-3">Islamic Month 9</td>
                  <td className="p-3">24/7 Access</td>
                  <td className="p-3 text-sm">Extended hours for Iftar & Taraweeh</td>
                </tr>
                <tr className="border-b border-amber-100 hover:bg-amber-50">
                  <td className="p-3 font-medium">Eid al-Fitr</td>
                  <td className="p-3">Shawwal 1</td>
                  <td className="p-3">5:00 AM - 2:00 PM</td>
                  <td className="p-3 text-sm">Eid prayers and celebrations</td>
                </tr>
                <tr className="border-b border-amber-100 hover:bg-amber-50">
                  <td className="p-3 font-medium">Eid al-Adha</td>
                  <td className="p-3">Dhul Hijjah 10</td>
                  <td className="p-3">5:00 AM - 2:00 PM</td>
                  <td className="p-3 text-sm">Eid prayers and Qurbani</td>
                </tr>
                <tr className="border-b border-amber-100 hover:bg-amber-50">
                  <td className="p-3 font-medium">Lailatul Qadr</td>
                  <td className="p-3">Ramadan 27</td>
                  <td className="p-3">All Night</td>
                  <td className="p-3 text-sm">Special night prayers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Visitor Guidelines */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Visitor Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Best Times to Visit</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">✓</span>
                  Weekday mornings (9 AM - 12 PM) for quiet visits
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">✓</span>
                  Early morning for photography
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">✓</span>
                  Late afternoon for golden hour lighting
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">✓</span>
                  Weekend evenings for guided tours
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Avoid These Times</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Friday mornings (Jumuah preparation)
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Prayer times (unless for worship)
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Ramadan iftar times (very crowded)
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Special event days without booking
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Book Your Visit</h2>
          <div className="text-center">
            <p className="text-slate-600 mb-6">Reserve your spot for guided tours and special experiences</p>
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <button className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
                Book Tour Online
              </button>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Group Bookings
              </button>
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                School Visits
              </button>
            </div>
            <div className="mt-6 text-sm text-slate-600">
              <p>📞 Tour Booking: +123 456 7890 | 📧 Email: tours@masjidsalman.org</p>
              <p>📍 Meeting Point: Main Entrance | ⏰ Arrive 15 minutes early</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
