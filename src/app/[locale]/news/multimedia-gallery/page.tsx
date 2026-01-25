import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multimedia Gallery - Masjid Salman al Farsi',
  description: 'Explore our comprehensive multimedia gallery featuring photos, videos, and virtual tours of Masjid Salman al Farsi',
};

export default function MultimediaGalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            Multimedia Gallery
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Immerse yourself in the beauty and spirituality of Masjid Salman al Farsi through our extensive multimedia collection.
          </p>
        </div>

        {/* Gallery Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="px-6 py-2 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition-colors">
            All Media
          </button>
          <button className="px-6 py-2 bg-white text-amber-600 border-2 border-amber-500 rounded-full font-semibold hover:bg-amber-50 transition-colors">
            Photos
          </button>
          <button className="px-6 py-2 bg-white text-amber-600 border-2 border-amber-500 rounded-full font-semibold hover:bg-amber-50 transition-colors">
            Videos
          </button>
          <button className="px-6 py-2 bg-white text-amber-600 border-2 border-amber-500 rounded-full font-semibold hover:bg-amber-50 transition-colors">
            Virtual Tours
          </button>
          <button className="px-6 py-2 bg-white text-amber-600 border-2 border-amber-500 rounded-full font-semibold hover:bg-amber-50 transition-colors">
            Events
          </button>
        </div>

        {/* Featured Media */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Featured Content</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured Video */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="relative rounded-lg overflow-hidden bg-slate-200 aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-amber-600 transition-colors">
                      <span className="text-white text-3xl">▶</span>
                    </div>
                    <p className="text-slate-700 font-semibold">Virtual Tour of Masjid Salman al Farsi</p>
                    <p className="text-slate-500 text-sm">Experience the mosque in stunning 4K</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured Photos */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-slate-200 aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl">🕌</span>
                    <p className="text-slate-700 font-semibold mt-2">Main Prayer Hall</p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden bg-slate-200 aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl">🌙</span>
                    <p className="text-slate-700 font-semibold mt-2">Night View</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="relative group cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl text-amber-600">📸</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Image
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Collection */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Video Collection</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Ramadan Night Prayers", duration: "15:30", views: "12.5K" },
              { title: "Eid Celebrations 2024", duration: "8:45", views: "8.2K" },
              { title: "Architecture Documentary", duration: "22:15", views: "15.7K" },
              { title: "Friday Sermon Highlights", duration: "12:00", views: "6.3K" },
              { title: "Community Iftar", duration: "10:30", views: "9.1K" },
              { title: "Islamic Art Tour", duration: "18:45", views: "11.2K" }
            ].map((video, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video bg-slate-200 rounded-lg mb-3 flex items-center justify-center">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white">▶</span>
                  </div>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{video.title}</h3>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>{video.duration}</span>
                  <span>{video.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Virtual Tours */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">360° Virtual Tours</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">🏛️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Complete Mosque Tour</h3>
              <p className="text-slate-600 text-sm text-center mb-4">
                Explore every corner of the mosque in stunning 360° detail
              </p>
              <div className="text-center">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Start Tour
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">🕌</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Prayer Hall Experience</h3>
              <p className="text-slate-600 text-sm text-center mb-4">
                Immerse yourself in the spiritual atmosphere of the main prayer hall
              </p>
              <div className="text-center">
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  Enter Hall
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Streaming */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Live Streaming</h2>
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-600 font-semibold">LIVE NOW</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Friday Prayer & Khutbah</h3>
            <p className="text-slate-600 mb-6">Join us live for Jumuah prayers and sermon</p>
            <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl">▶</span>
                </div>
                <p className="text-white">Click to watch live stream</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Next Live:</strong>
                <p>Friday, 1:15 PM</p>
              </div>
              <div>
                <strong>Viewers:</strong>
                <p>2,847 watching</p>
              </div>
              <div>
                <strong>Quality:</strong>
                <p>HD 1080p</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Center */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Download Center</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-amber-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Mobile App</h3>
              <p className="text-slate-600 text-sm mb-4">Access all content on your mobile device</p>
              <div className="space-y-2">
                <button className="w-full bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                  Download for iOS
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                  Download for Android
                </button>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">🖼️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Wallpapers</h3>
              <p className="text-slate-600 text-sm mb-4">High-quality mosque wallpapers</p>
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                Download Collection
              </button>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Media Kit</h3>
              <p className="text-slate-600 text-sm mb-4">Official media resources for press</p>
              <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
                Download Media Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
