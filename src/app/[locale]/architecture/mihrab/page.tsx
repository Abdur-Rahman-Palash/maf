import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Mihrab - Masjid Salman al Farsi',
  description: 'Discover the sacred Mihrab of Masjid Salman al Farsi',
};

export default function MihrabPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2070')] bg-cover bg-center" />

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              The Mihrab
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              The sacred niche indicating the direction of prayer
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Spiritual Focal Point
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-6 leading-relaxed">
                The Mihrab of Masjid Salman al Farsi is an architectural masterpiece that serves as
                the spiritual centerpiece of our mosque. This ornate niche not only indicates the
                Qibla direction but also represents the gateway to divine presence during prayer.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Architectural Features</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Intricate marble inlay work</li>
                    <li>• Calligraphic Quranic verses</li>
                    <li>• Geometric pattern designs</li>
                    <li>• Illuminated lighting effects</li>
                    <li>• Acoustic enhancement</li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Religious Significance</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Indicates Qibla direction</li>
                    <li>• Imam&apos;s prayer position</li>
                    <li>• Symbol of divine presence</li>
                    <li>• Focus for congregation</li>
                    <li>• Spiritual gateway</li>
                  </ul>
                </div>
              </div>

              <p className="text-slate-600 mb-6 leading-relaxed">
                Crafted from the finest materials with meticulous attention to detail, our Mihrab
                exemplifies the highest standards of Islamic artistic expression. The surrounding
                calligraphy and geometric patterns create a visual symphony that enhances the spiritual
                atmosphere of the prayer hall.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
