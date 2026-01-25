import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'The Carpet - Masjid Salman al Farsi',
  description: 'Experience the exquisite carpet of Masjid Salman al Farsi',
};

export default function CarpetPage() {
  const t = useTranslations('Architecture');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2070')] bg-cover bg-center" />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              The Carpet
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              A foundation of beauty and comfort for worshipers
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Woven Artistry
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-6 leading-relaxed">
                The prayer carpet of Masjid Salman al Farsi is a masterpiece of Islamic textile art, 
                covering the entire prayer hall with intricate patterns that guide worshipers in their 
                spiritual journey. Every thread tells a story of devotion and craftsmanship.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Design Elements</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Traditional Islamic geometric patterns</li>
                    <li>• Prayer row alignment markers</li>
                    <li>• Calligraphic inscriptions</li>
                    <li>• Harmonious color palette</li>
                    <li>• Durable wool construction</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Spiritual Purpose</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Defines prayer spaces</li>
                    <li>• Creates unity among worshipers</li>
                    <li>• Provides comfort during prayer</li>
                    <li>• Enhances acoustic properties</li>
                    <li>• Symbolizes humility and devotion</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                This magnificent carpet was handcrafted by skilled artisans who spent months weaving 
                intricate patterns that not only beautify the space but also serve practical purposes. 
                The design incorporates elements that help worshipers align properly during prayer, 
                creating a sense of order and unity in the congregation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
