import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press Kit - Masjid Salman al Farsi',
  description: 'Official press kit for Masjid Salman al Farsi including media resources, press releases, and contact information',
};

export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            Press Kit
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Welcome to the official press kit for Masjid Salman al Farsi. Find all the resources you need for media coverage.
          </p>
        </div>

        {/* Quick Download */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Complete Press Kit Download</h2>
            <p className="mb-6">Get all media resources, press releases, and official information in one package</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                Download Full Press Kit (ZIP)
              </button>
              <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                Request Custom Package
              </button>
            </div>
          </div>
        </div>

        {/* About the Mosque */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">About Masjid Salman al Farsi</h2>
          <div className="prose max-w-none text-slate-600">
            <p className="text-lg mb-4">
              Masjid Salman al Farsi stands as a beacon of Islamic architecture and spiritual guidance in the heart of our community. 
              Established with a vision to serve both worshippers and visitors, our mosque represents the perfect blend of 
              traditional Islamic values and modern functionality.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Key Facts</h3>
                <ul className="space-y-2">
                  <li><strong>Established:</strong> 2010</li>
                  <li><strong>Capacity:</strong> 2,000 worshippers</li>
                  <li><strong>Area:</strong> 50,000 square feet</li>
                  <li><strong>Architecture:</strong> Modern Islamic with traditional elements</li>
                  <li><strong>Location:</strong> City Center, easily accessible</li>
                  <li><strong>Annual Visitors:</strong> 500,000+</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Mission & Vision</h3>
                <p className="mb-3">
                  <strong>Mission:</strong> To provide a spiritual home for Muslims and a bridge of understanding 
                  for all communities through education, worship, and community service.
                </p>
                <p>
                  <strong>Vision:</strong> To be a leading center of Islamic learning and interfaith dialogue, 
                  fostering unity and spiritual growth in our diverse society.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Media Resources */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Media Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">📸</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">High-Resolution Photos</h3>
              <p className="text-slate-600 text-sm mb-4">Professional photography of the mosque</p>
              <ul className="text-sm text-slate-500 text-left space-y-1">
                <li>• Exterior shots</li>
                <li>• Interior architecture</li>
                <li>• Prayer hall views</li>
                <li>• Special events</li>
              </ul>
              <button className="mt-4 text-blue-600 font-semibold hover:text-blue-700">
                Download Photos →
              </button>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">🎥</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Video Footage</h3>
              <p className="text-slate-600 text-sm mb-4">Professional video content for media use</p>
              <ul className="text-sm text-slate-500 text-left space-y-1">
                <li>• B-roll footage</li>
                <li>• Interview clips</li>
                <li>• Event coverage</li>
                <li>• Virtual tours</li>
              </ul>
              <button className="mt-4 text-green-600 font-semibold hover:text-green-700">
                Download Videos →
              </button>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Infographics</h3>
              <p className="text-slate-600 text-sm mb-4">Visual data and statistics</p>
              <ul className="text-sm text-slate-500 text-left space-y-1">
                <li>• Mosque statistics</li>
                <li>• Community impact</li>
                <li>• Program reach</li>
                <li>• Historical timeline</li>
              </ul>
              <button className="mt-4 text-purple-600 font-semibold hover:text-purple-700">
                Download Infographics →
              </button>
            </div>
          </div>
        </div>

        {/* Official Statements */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Official Statements & Press Releases</h2>
          <div className="space-y-4">
            {[
              {
                date: "December 15, 2024",
                title: "Ramadan 1446 / 2025 Programs Announced",
                excerpt: "Masjid Salman al Farsi announces comprehensive Ramadan programs including daily iftar, taraweeh prayers, and educational activities..."
              },
              {
                date: "November 28, 2024",
                title: "New Community Outreach Initiative Launched",
                excerpt: "The mosque launches a new initiative to strengthen community bonds through interfaith dialogue and social services..."
              },
              {
                date: "October 10, 2024",
                title: "Eid al-Adha Celebrations Draw Record Attendance",
                excerpt: "Over 10,000 worshippers and community members participated in Eid al-Adha prayers and celebrations at Masjid Salman al Farsi..."
              },
              {
                date: "September 5, 2024",
                title: "Islamic Education Center Expansion Completed",
                excerpt: "The mosque completes a major expansion of its educational facilities, doubling capacity for Islamic studies programs..."
              }
            ].map((release, index) => (
              <div key={index} className="border border-amber-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-slate-800">{release.title}</h3>
                  <span className="text-sm text-slate-500 whitespace-nowrap ml-4">{release.date}</span>
                </div>
                <p className="text-slate-600 mb-3">{release.excerpt}</p>
                <button className="text-amber-600 font-semibold hover:text-amber-700">
                  Read Full Statement →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Guidelines */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Brand Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Logo Usage</h3>
              <div className="bg-amber-50 p-4 rounded-lg mb-4">
                <div className="w-32 h-32 bg-amber-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">MSF</span>
                </div>
                <p className="text-sm text-slate-600 text-center">Official Mosque Logo</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Maintain clear space around logo</li>
                <li>• Use official colors only</li>
                <li>• Do not distort or modify logo</li>
                <li>• Obtain permission for commercial use</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Official Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-amber-500 rounded"></div>
                  <div>
                    <p className="font-semibold">Primary Amber</p>
                    <p className="text-sm text-slate-600">#F59E0B</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-slate-800 rounded"></div>
                  <div>
                    <p className="font-semibold">Secondary Slate</p>
                    <p className="text-sm text-slate-600">#1E293B</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-white border border-slate-300 rounded"></div>
                  <div>
                    <p className="font-semibold">Background White</p>
                    <p className="text-sm text-slate-600">#FFFFFF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Contact */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Media Contact</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Press Inquiries</h3>
              <div className="space-y-2 text-slate-600">
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>press@masjidsalman.org</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+123 456 7890 (Press Line)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📱</span>
                  <span>+123 456 7891 (Urgent Media)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Media Relations Team</h3>
              <div className="space-y-2 text-slate-600">
                <div>
                  <strong>Director of Communications:</strong>
                  <p>Ahmed Hassan</p>
                </div>
                <div>
                  <strong>Media Coordinator:</strong>
                  <p>Fatima Al-Rashid</p>
                </div>
                <div>
                  <strong>Social Media Manager:</strong>
                  <p>Omar Khalid</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg">
            <p className="text-center text-sm text-slate-600">
              <strong>Response Time:</strong> We aim to respond to media inquiries within 24 hours during business days.
              For urgent matters, please call our dedicated press line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
