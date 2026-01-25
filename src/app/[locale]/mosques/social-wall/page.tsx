import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Social Wall - Masjid Salman al Farsi',
  description: 'Connect with our community through social media',
};

export default function SocialWallPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070')] bg-cover bg-center" />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Our Social Wall
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              Connect with our community and stay updated
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Stay Connected
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-8 leading-relaxed">
                Join our vibrant online community and stay connected with Masjid Salman al Farsi. 
                Follow us on social media for daily inspiration, event updates, and community news.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">📷</div>
                  <h3 className="text-xl font-semibold text-pink-800 mb-2">Instagram</h3>
                  <p className="text-slate-700 mb-4">Daily inspiration and mosque beauty</p>
                  <a 
                    href="https://instagram.com/spacesoflight" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
                  >
                    Follow Us
                  </a>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">🐦</div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Twitter</h3>
                  <p className="text-slate-700 mb-4">Quick updates and community news</p>
                  <a 
                    href="https://twitter.com/spacesoflight" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Follow Us
                  </a>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">📘</div>
                  <h3 className="text-xl font-semibold text-indigo-800 mb-2">Facebook</h3>
                  <p className="text-slate-700 mb-4">Community events and discussions</p>
                  <a 
                    href="https://facebook.com/spacesoflight" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition-colors"
                  >
                    Like Our Page
                  </a>
                </div>
                
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">📺</div>
                  <h3 className="text-xl font-semibold text-red-800 mb-2">YouTube</h3>
                  <p className="text-slate-700 mb-4">Sermons and educational content</p>
                  <a 
                    href="https://youtube.com/spacesoflight" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    Subscribe
                  </a>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-amber-800 mb-4">Community Hashtag</h3>
                <p className="text-lg text-slate-700 mb-4">Share your experiences with</p>
                <div className="bg-white rounded-lg px-6 py-3 inline-block">
                  <span className="text-2xl font-bold text-amber-600">#MasjidSalmanAlFarsi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
