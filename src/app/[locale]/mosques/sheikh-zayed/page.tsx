import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masjid Salman al Farsi - Our Grand Mosques',
  description: 'Learn about Masjid Salman al Farsi, one of the most magnificent Islamic architectural landmarks in the region',
};

export default function MasjidSalmanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            Masjid Salman al Farsi
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the story, architecture, and spiritual significance of this magnificent house of Allah.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                <span className="text-8xl text-amber-600">🕌</span>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800">A Beacon of Faith</h2>
              <p className="text-slate-600">
                Masjid Salman al Farsi stands as a testament to Islamic architectural excellence and spiritual devotion. 
                Named after the Persian companion of Prophet Muhammad (PBUH), our mosque serves as a spiritual home 
                for thousands of worshippers and a bridge of understanding for all communities.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-700 mb-2">Quick Facts</h3>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Established: 2010</li>
                  <li>• Location: City Center</li>
                  <li>• Capacity: 2,000 worshippers</li>
                  <li>• Area: 50,000 square feet</li>
                  <li>• Annual Visitors: 500,000+</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Our History</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">The Vision</h3>
                <p className="text-slate-600 mb-3">
                  Founded in 2010 through the collective vision of community leaders and philanthropists, 
                  Masjid Salman al Farsi was established to serve the growing Muslim population and promote 
                  interfaith understanding.
                </p>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><strong>2008:</strong> Land acquisition and planning begins</p>
                  <p><strong>2009:</strong> Construction starts with community support</p>
                  <p><strong>2010:</strong> Grand opening and first prayers</p>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">Growth & Development</h3>
                <p className="text-slate-600 mb-3">
                  From humble beginnings to becoming a landmark institution, the mosque has continuously 
                  expanded its services and facilities to meet community needs.
                </p>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><strong>2012:</strong> Islamic school established</p>
                  <p><strong>2015:</strong> Community center expansion</p>
                  <p><strong>2018:</strong> Library and resource center opened</p>
                  <p><strong>2020:</strong> Digital services launched</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Architectural Excellence</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-amber-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">🏛️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Modern Islamic Design</h3>
              <p className="text-slate-600 text-sm">
                Blending traditional Islamic architecture with contemporary engineering
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">🌟</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Golden Dome</h3>
              <p className="text-slate-600 text-sm">
                Iconic 45-meter dome visible from miles around, symbolizing divine presence
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Islamic Art</h3>
              <p className="text-slate-600 text-sm">
                Intricate calligraphy and geometric patterns throughout the mosque
              </p>
            </div>
          </div>
        </div>

        {/* Community Impact */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Community Impact</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">Services & Programs</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-amber-500">🕌</span>
                  <div>
                    <strong>Daily Prayers:</strong>
                    <p className="text-sm text-slate-600">Five daily prayers with congregation</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-500">📚</span>
                  <div>
                    <strong>Education:</strong>
                    <p className="text-sm text-slate-600">Quranic studies and Islamic classes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">🤝</span>
                  <div>
                    <strong>Community Support:</strong>
                    <p className="text-sm text-slate-600">Social services and counseling</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-500">🌍</span>
                  <div>
                    <strong>Interfaith:</strong>
                    <p className="text-sm text-slate-600">Dialogue and cultural exchange</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">2,000+</div>
                  <div className="text-sm text-slate-600">Daily Worshippers</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-slate-600">Students</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-slate-600">Weekly Programs</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">100+</div>
                  <div className="text-sm text-slate-600">Volunteers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-amber-50 to-white rounded-lg">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">IM</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">Imam Muhammad Hassan</h3>
              <p className="text-slate-600 text-sm mb-2">Lead Imam & Khateeb</p>
              <p className="text-slate-500 text-xs">20+ years of Islamic scholarship and community service</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-lg">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">AD</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">Dr. Ahmed Dawood</h3>
              <p className="text-slate-600 text-sm mb-2">Executive Director</p>
              <p className="text-slate-500 text-xs">PhD in Islamic Studies, expert in community development</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">FK</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">Fatima Khalid</h3>
              <p className="text-slate-600 text-sm mb-2">Community Outreach Director</p>
              <p className="text-slate-500 text-xs">Specialist in interfaith dialogue and social services</p>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Awards & Recognition</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Architectural Excellence</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="text-yellow-500">🏆</span>
                  <span>Best Islamic Architecture Award 2011</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-yellow-500">🏆</span>
                  <span>Cultural Heritage Preservation Award 2015</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-yellow-500">🏆</span>
                  <span>Excellence in Community Design 2018</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Community Service</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">🏆</span>
                  <span>Outstanding Community Service 2016</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">🏆</span>
                  <span>Interfaith Harmony Award 2019</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">🏆</span>
                  <span>Education Excellence Award 2020</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Visit Information */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Visit Masjid Salman al Farsi</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Visiting Hours</h3>
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Saturday - Thursday:</span>
                  <span className="font-semibold">9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday:</span>
                  <span className="font-semibold">2:00 PM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Prayer Times:</span>
                  <span className="font-semibold">24/7 Access</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Contact Information</h3>
              <div className="space-y-2 text-slate-600">
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>123 Mosque Street, City Center</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+123 456 7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>info@masjidsalman.org</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🌐</span>
                  <span>www.masjidsalman.org</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
              Schedule a Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
