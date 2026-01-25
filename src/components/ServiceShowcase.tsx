'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

const serviceCategories = [
  {
    id: 1,
    title: 'Worshippers',
    backgroundImage: 'https://images.unsplash.com/photo-1564399580075-519fe569a365?q=80&w=2070&auto=format&fit=crop',
    services: [
      {
        title: 'Prayer Timings',
        icon: '🕌',
        href: '/worshippers/prayer-timings'
      },
      {
        title: 'Friday Sermon & "Minbar Al Jami"',
        icon: '📢',
        href: '/worshippers/friday-sermon'
      },
      {
        title: 'Mosque Manners',
        icon: '🤲',
        href: '/worshippers/mosque-manners'
      },
      {
        title: 'Religious Programs',
        icon: '📖',
        href: '/worshippers/religious-programs'
      },
      {
        title: 'Services and facilities',
        icon: '🏛️',
        href: '/worshippers/services-facilities'
      },
      {
        title: 'Getting To The Mosque',
        icon: '📍',
        href: '/worshippers/getting-to-mosque'
      },
      {
        title: 'E-Visitor Guide',
        icon: '📱',
        href: '/worshippers/e-visitor-guide'
      },
      {
        title: 'Souq Al Jami',
        icon: '🛍️',
        href: '/worshippers/souq-al-jami'
      },
      {
        title: 'The Mosque\'s Jogging Track',
        icon: '🏃',
        href: '/worshippers/jogging-track'
      },
      {
        title: 'Ramadan 1446 / 2025',
        icon: '🌙',
        href: '/worshippers/ramadan'
      }
    ],
    discoverLink: '/visiting-the-mosque/worshippers'
  },
  {
    id: 2,
    title: 'Visitors',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop',
    services: [
      {
        title: 'Mosque Manners',
        icon: '🤲',
        href: '/visitors/mosque-manners'
      },
      {
        title: 'Visiting Hours',
        icon: '🕐',
        href: '/visitors/visiting-hours'
      },
      {
        title: 'Book Your Visit',
        icon: '📅',
        href: '/visitors/book-visit'
      },
      {
        title: 'Public Cultural Tours',
        icon: '👥',
        href: '/visitors/public-cultural-tours'
      },
      {
        title: 'Private Cultural Tours',
        icon: '🎯',
        href: '/visitors/private-cultural-tours'
      },
      {
        title: 'Multimedia E-Guide',
        icon: '📱',
        href: '/visitors/multimedia-guide'
      },
      {
        title: 'Sura Tour',
        icon: '📿',
        href: '/visitors/sura-tour'
      },
      {
        title: 'Light & Peace Museum',
        icon: '💡',
        href: '/visitors/light-peace-museum'
      },
      {
        title: 'The 360-degree "Diya" Experience',
        icon: '🌟',
        href: '/visitors/diya-experience'
      },
      {
        title: 'The Mosque\'s Jogging Track',
        icon: '🏃',
        href: '/visitors/jogging-track'
      },
      {
        title: 'Souq Al Jami',
        icon: '🛍️',
        href: '/visitors/souq-al-jami'
      },
      {
        title: 'Getting to The Mosque',
        icon: '📍',
        href: '/visitors/getting-to-mosque'
      },
      {
        title: 'E-Visitor Guide',
        icon: '📱',
        href: '/visitors/e-visitor-guide'
      },
      {
        title: 'Visitor\'s Journey',
        icon: '🗺️',
        href: '/visitors/visitor-journey'
      },
      {
        title: 'Services & Facilities',
        icon: '🏛️',
        href: '/visitors/services-facilities'
      },
      {
        title: 'Transportation',
        icon: '🚌',
        href: '/visitors/transportation'
      },
      {
        title: 'FAQs',
        icon: '❓',
        href: '/visitors/faqs'
      }
    ],
    discoverLink: '/visiting-the-mosque/visitors'
  }
];

function ServiceCard({ category }: { category: typeof serviceCategories[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="research-list"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="research-list-img h-96 relative overflow-hidden"
        style={{
          backgroundImage: `url(${category.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="research-list-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="research-list-overlay-title">
            <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
              {category.title}
            </h3>
          </div>

          <div className="slct_option">
            <motion.div 
              className="banner-hover-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-64 overflow-y-auto p-4">
                {category.services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="banner-box"
                  >
                    <a
                      href={service.href}
                      className="block bg-white/90 backdrop-blur-sm rounded-lg p-4 hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-3xl mb-2 text-center">{service.icon}</div>
                      <h4 className="text-sm font-semibold text-slate-800 text-center leading-tight">
                        {service.title}
                      </h4>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="discover-link">
            <motion.a
              href={category.discoverLink}
              className="flex items-center gap-2 text-gold font-semibold text-lg hover:text-yellow-300 transition-colors"
              whileHover={{ x: 10 }}
            >
              DISCOVER MORE <FiArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceShowcase() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
            Our Services
          </h2>
          <div className="w-32 h-1 bg-gold mx-auto rounded-full"></div>
        </motion.div>

        <div className="research-inner-2">
          <div className="research-list space-y-8">
            {serviceCategories.map((category) => (
              <ServiceCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .research-list {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .research-list-img {
          position: relative;
          overflow: hidden;
        }

        .research-list-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .research-list-overlay-title h3 {
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .slct_option {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .banner-hover-list {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }

        .research-list:hover .banner-hover-list {
          opacity: 1;
          transform: translateY(0);
        }

        .banner-box {
          transform: translateY(10px);
          opacity: 0;
          animation: fadeInUp 0.5s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .discover-link {
          margin-top: 1.5rem;
        }

        .discover-link a {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .discover-link a:hover {
          transform: translateX(10px);
        }

        /* Custom scrollbar */
        .banner-hover-list::-webkit-scrollbar {
          width: 6px;
        }

        .banner-hover-list::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .banner-hover-list::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.5);
          border-radius: 3px;
        }

        .banner-hover-list::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.8);
        }
      `}</style>
    </section>
  );
}
