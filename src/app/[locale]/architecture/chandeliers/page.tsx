import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'The Chandeliers - Masjid Salman al Farsi',
  description: 'Discover the magnificent chandeliers of Masjid Salman al Farsi',
};

export default function ChandeliersPage() {
  const t = useTranslations('Architecture');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070')] bg-cover bg-center" />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              The Chandeliers
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              Illuminating our sacred space with divine light
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Luminous Masterpieces
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-6 leading-relaxed">
                The magnificent chandeliers of Masjid Salman al Farsi are more than mere light fixtures; 
                they are works of art that symbolize divine illumination and spiritual enlightenment. 
                Each chandelier is carefully crafted to create an atmosphere of reverence and awe.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Craftsmanship</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Handcrafted crystal elements</li>
                    <li>• Traditional Islamic patterns</li>
                    <li>• Gold-plated fixtures</li>
                    <li>• Intricate geometric designs</li>
                    <li>• Custom LED integration</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Symbolism</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Divine light representation</li>
                    <li>• Spiritual enlightenment</li>
                    <li>• Unity in diversity</li>
                    <li>• Heavenly inspiration</li>
                    <li>• Community gathering point</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                These stunning chandeliers serve as focal points within the prayer hall, drawing eyes upward 
                and inspiring contemplation of the divine. Their warm, golden light creates an intimate atmosphere 
                conducive to prayer and reflection, while their impressive scale speaks to the grandeur of Islamic 
                architectural tradition.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
