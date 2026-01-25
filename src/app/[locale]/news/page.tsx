import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News - Masjid Salman al Farsi',
  description: 'Latest news and updates from Masjid Salman al Farsi',
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2070')] bg-cover bg-center" />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              News & Updates
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              Stay informed about our community activities
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Ramadan Schedule 2026',
                date: 'March 15, 2026',
                excerpt: 'Join us for blessed Ramadan with daily Iftar, Taraweeh prayers, and special programs.',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400'
              },
              {
                title: 'Community Iftar Celebration',
                date: 'March 20, 2026',
                excerpt: 'Experience the joy of breaking fast together with our diverse community.',
                image: 'https://images.unsplash.com/photo-1542042958-3d5f9919c013?q=80&w=400'
              },
              {
                title: 'Eid al-Fitr Prayers',
                date: 'April 14, 2026',
                excerpt: 'Celebrate Eid with special prayers, family activities, and community feast.',
                image: 'https://images.unsplash.com/photo-1596706059274-123403d1591d?q=80&w=400'
              },
              {
                title: 'Islamic Education Classes',
                date: 'March 10, 2026',
                excerpt: 'New semester begins for Quran, Arabic, and Islamic studies for all ages.',
                image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400'
              },
              {
                title: 'Youth Summer Camp',
                date: 'June 1, 2026',
                excerpt: 'Register your children for our enriching summer camp with Islamic activities.',
                image: 'https://images.unsplash.com/photo-1586962434213-cee7e4fe3b56?q=80&w=400'
              },
              {
                title: 'Charity Food Drive',
                date: 'March 25, 2026',
                excerpt: 'Help us support local families through our monthly food distribution program.',
                image: 'https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?q=80&w=400'
              }
            ].map((article, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }} />
                <div className="p-6">
                  <p className="text-sm text-amber-600 font-semibold mb-2">{article.date}</p>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{article.title}</h3>
                  <p className="text-slate-600 mb-4">{article.excerpt}</p>
                  <button className="text-amber-600 font-semibold hover:text-amber-700 transition-colors">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
