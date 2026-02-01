import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Masjid Salman al Farsi',
  description: 'Terms of use for Masjid Salman al Farsi website',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Terms of Use
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using the Masjid Salman al Farsi website, you accept and agree
                to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use License</h2>
              <p className="text-gray-600 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials on Masjid
                Salman al Farsi&apos;s website for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed">
                The materials on Masjid Salman al Farsi&apos;s website are provided on an &apos;as is&apos; basis.
                Masjid Salman al Farsi makes no warranties, expressed or implied, and hereby
                disclaims and negates all other warranties including without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose,
                or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitations</h2>
              <p className="text-gray-600 leading-relaxed">
                In no event shall Masjid Salman al Farsi or its suppliers be liable for any damages
                (including, without limitation, damages for loss of data or profit, or due to
                business interruption) arising out of the use or inability to use the materials
                on Masjid Salman al Farsi&apos;s website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                Your Privacy Policy is also applicable to your use of this Website and by
                using this Website, you agree to be bound by the terms of our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Revisions and Errata</h2>
              <p className="text-gray-600 leading-relaxed">
                The materials appearing on Masjid Salman al Farsi&apos;s website could include
                technical, typographical, or photographic errors. We do not warrant that
                any of the materials on its website are accurate, complete, or current.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with
                the laws of the United States and you irrevocably submit to the exclusive
                jurisdiction of the courts in that State or location.
              </p>
            </section>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 text-center">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
