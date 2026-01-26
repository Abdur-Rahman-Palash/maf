import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility | Masjid Salman al Farsi',
  description: 'Accessibility statement for Masjid Salman al Farsi website',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Accessibility Statement
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h2>
              <p className="text-gray-600 leading-relaxed">
                Masjid Salman al Farsi is committed to ensuring digital accessibility for people 
                with disabilities. We are continually improving the user experience for everyone, 
                and applying the relevant accessibility standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Measures to Support Accessibility</h2>
              <p className="text-gray-600 leading-relaxed">
                Masjid Salman al Farsi takes the following measures to ensure accessibility of 
                our website:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Include accessibility throughout our internal policies</li>
                <li>Provide continual accessibility training for our staff</li>
                <li>Assign clear accessibility targets and responsibilities</li>
                <li>Employ formal accessibility quality assurance methods</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conformance Status</h2>
              <p className="text-gray-600 leading-relaxed">
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers 
                and developers to improve accessibility for people with disabilities. It defines 
                three levels of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Masjid Salman al Farsi website is <strong>partially conformant</strong> with WCAG 2.1 level AA. 
                Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accessibility Features</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Keyboard navigation support</li>
                <li>Screen reader compatibility</li>
                <li>High contrast color schemes</li>
                <li>Resizable text without loss of functionality</li>
                <li>Alternative text for images</li>
                <li>Clear and consistent navigation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback</h2>
              <p className="text-gray-600 leading-relaxed">
                We welcome your feedback on the accessibility of Masjid Salman al Farsi website. 
                Please let us know if you encounter accessibility barriers:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  <strong>Email:</strong> info@masjidsalmanlfarsi.org<br />
                  <strong>Phone:</strong> +1 (503) 437-2165<br />
                  <strong>Address:</strong> 2187 Fellowship Rd, Tucker, GA 30084
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technical Specifications</h2>
              <p className="text-gray-600 leading-relaxed">
                Accessibility of Masjid Salman al Farsi website relies on the following technologies 
                to work with the particular combination of web browser and any assistive technologies 
                or plugins installed on your computer:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>HTML</li>
                <li>WAI-ARIA</li>
                <li>CSS</li>
                <li>JavaScript</li>
              </ul>
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
