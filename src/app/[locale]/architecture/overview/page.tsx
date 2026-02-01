'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMosque, FaEye, FaRulerCombined, FaPaintBrush } from 'react-icons/fa';

// Note: In Next.js App Router, metadata export doesn't work with 'use client'
// We'll use document title instead
export default function ArchitectureOverview() {
  // Set document title
  useEffect(() => {
    document.title = 'Architecture Overview | Masjid Salman al Farsi';
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-teal-900 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Architecture Overview
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Discover the breathtaking Islamic architecture and design elements that make Masjid Salman al Farsi a masterpiece
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            A Testament to Islamic Artistry
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
            Masjid Salman al Farsi stands as a magnificent example of contemporary Islamic architecture,
            blending traditional design elements with modern construction techniques. Every aspect of the mosque
            has been carefully crafted to create a space of spiritual reflection and community gathering.
          </p>
        </motion.div>

        {/* Architecture Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: <FaMosque className="text-3xl" />,
              title: "Grand Domes",
              description: "Majestic domes adorned with intricate Islamic geometric patterns",
              link: "/architecture/domes"
            },
            {
              icon: <FaEye className="text-3xl" />,
              title: "Prayer Hall",
              description: "Spacious main prayer hall with beautiful mihrab and qibla wall",
              link: "/architecture/main-prayer-hall"
            },
            {
              icon: <FaRulerCombined className="text-3xl" />,
              title: "Courtyard",
              description: "Serene courtyard featuring reflective pools and fountains",
              link: "/architecture/courtyard"
            },
            {
              icon: <FaPaintBrush className="text-3xl" />,
              title: "Interior Design",
              description: "Exquisite interior details including carpets and chandeliers",
              link: "/architecture/interior-walls"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-teal-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Link
                href={feature.link}
                className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
              >
                Explore →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Key Architectural Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Key Architectural Elements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Domes and Minarets",
              "Mihrab and Qibla Wall",
              "Islamic Geometric Patterns",
              "Calligraphy and Art",
              "Light and Space Design",
              "Traditional Materials"
            ].map((element, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-600 rounded-full" />
                <span className="text-gray-700">{element}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Experience the Beauty
          </h2>
          <p className="text-gray-600 mb-8">
            Visit us to witness the architectural splendor firsthand
          </p>
          <Link
            href="/visitors/book-visit"
            className="inline-block bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors"
          >
            Schedule a Visit
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
