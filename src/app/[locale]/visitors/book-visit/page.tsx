import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Visit - Masjid Salman al Farsi',
  description: 'Reserve your visit to Masjid Salman al Farsi with our easy online booking system for tours and special experiences',
};

export default function BookVisitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            Book Your Visit
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Reserve your spot for an unforgettable experience at Masjid Salman al Farsi. Choose from our variety of tours and programs.
          </p>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Visit Reservation Form</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="+123 456 7890"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Country of Origin</label>
                <select className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  <option>Select your country</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>UAE</option>
                  <option>Saudi Arabia</option>
                  <option>Malaysia</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Visit Type *</label>
                <select className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" required>
                  <option>Select visit type</option>
                  <option>General Guided Tour</option>
                  <option>Architecture Tour</option>
                  <option>Cultural Experience Tour</option>
                  <option>Private VIP Tour</option>
                  <option>School Group Visit</option>
                  <option>Photography Tour</option>
                  <option>Spiritual Retreat Visit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Number of Visitors *</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="1-50 visitors"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date *</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Time *</label>
                <select className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" required>
                  <option>Select time slot</option>
                  <option>9:00 AM - Morning Tour</option>
                  <option>11:00 AM - Late Morning Tour</option>
                  <option>2:00 PM - Afternoon Tour</option>
                  <option>4:00 PM - Late Afternoon Tour</option>
                  <option>6:00 PM - Evening Tour</option>
                  <option>8:00 PM - Night Tour</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Special Requirements</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Any special needs, accessibility requirements, or questions..."
              />
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">
                <strong>Important:</strong> Bookings must be made at least 48 hours in advance. 
                Group visits (10+ people) require 1 week notice. Photography permits require separate approval.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
              >
                Submit Booking Request
              </button>
            </div>
          </form>
        </div>

        {/* Tour Packages */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Available Tour Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-amber-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-amber-600">🕌</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800">General Tour</h3>
                <p className="text-2xl font-bold text-amber-600 my-2">Free</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  90-minute guided tour
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Main prayer hall visit
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Cultural overview
                </li>
              </ul>
            </div>

            <div className="border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">🏛️</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Architecture Tour</h3>
                <p className="text-2xl font-bold text-blue-600 my-2">$15/person</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  2-hour in-depth tour
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Architecture details
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Access to special areas
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Expert guide
                </li>
              </ul>
            </div>

            <div className="border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-purple-600">⭐</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800">VIP Experience</h3>
                <p className="text-2xl font-bold text-purple-600 my-2">$50/person</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  3-hour exclusive tour
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Private guide
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Refreshments included
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Gift package
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Group Bookings */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Group Bookings</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">School Groups</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">🎓</span>
                  <div>
                    <strong>Educational Programs:</strong> Age-appropriate Islamic education
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">📚</span>
                  <div>
                    <strong>Study Materials:</strong> Educational worksheets provided
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">🍎</span>
                  <div>
                    <strong>Special Rates:</strong> Free for educational institutions
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">👥</span>
                  <div>
                    <strong>Group Size:</strong> Up to 50 students per visit
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Corporate Groups</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">💼</span>
                  <div>
                    <strong>Team Building:</strong> Cultural understanding programs
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🤝</span>
                  <div>
                    <strong>Networking:</strong> Community engagement opportunities
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🍽️</span>
                  <div>
                    <strong>Catering:</strong> Halal refreshments available
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📊</span>
                  <div>
                    <strong>Custom Programs:</strong> Tailored to company needs
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Need Help?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-amber-600">📞</span>
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Call Us</h3>
              <p className="text-slate-600">+123 456 7890</p>
              <p className="text-sm text-slate-500">Mon-Fri, 9AM-6PM</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-amber-600">📧</span>
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Email Us</h3>
              <p className="text-slate-600">tours@masjidsalman.org</p>
              <p className="text-sm text-slate-500">24/7 response</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-amber-600">💬</span>
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Live Chat</h3>
              <p className="text-slate-600">Available on website</p>
              <p className="text-sm text-slate-500">Instant support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
