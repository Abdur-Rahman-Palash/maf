'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-black/90 text-white py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Column 1: Logo + Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gold mb-4">
                  Masjid Salman al Farsi
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Promoting tolerance, cultural understanding, and spiritual growth through our community programs and educational initiatives.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">MSF</span>
                </div>
                <span className="text-slate-400 text-sm">Since 2026</span>
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-gold font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Services', href: '#services' },
                  { name: 'News & Media', href: '#news' },
                  { name: 'Architecture', href: '/en/general-architecture' },
                  { name: 'Visit Us', href: '#visit' },
                  { name: 'Contact', href: '#contact' },
                  { name: 'Prayer Times', href: '#prayer' }
                ].map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="text-slate-300 hover:text-gold transition-colors duration-300 flex items-center gap-2 text-sm"
                    >
                      <span className="text-gold/50">›</span>
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-gold font-bold text-lg mb-6 uppercase tracking-wider">Contact</h4>
              <div className="space-y-4 text-slate-300 text-sm">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>2187 Fellowship Rd, Tucker, GA 30084</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+1 (503) 437-2165</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>info@masjidsalmanlfarsi.org</span>
                </div>
              </div>
            </motion.div>

            {/* Column 4: Social + Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-gold font-bold text-lg mb-6 uppercase tracking-wider">Stay Connected</h4>
              
              {/* Social Icons */}
              <div className="flex gap-3 mb-6">
                <motion.a
                  href="https://instagram.com/spacesoflight"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
                >
                  <FaInstagram className="text-lg" />
                </motion.a>
                <motion.a
                  href="https://twitter.com/spacesoflight"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
                >
                  <FaTwitter className="text-lg" />
                </motion.a>
                <motion.a
                  href="https://facebook.com/spacesoflight"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
                >
                  <FaFacebook className="text-lg" />
                </motion.a>
                <motion.a
                  href="https://youtube.com/spacesoflight"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
                >
                  <FaYoutube className="text-lg" />
                </motion.a>
              </div>

              {/* Newsletter */}
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <p className="text-slate-300 text-sm mb-3">Subscribe to our newsletter for updates</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 bg-white/10 border border-gold/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-colors"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="my-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent w-24 mx-auto"></div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-slate-400 space-y-2"
          >
            <p>© Masjid Salman al Farsi 2026. All rights reserved.</p>
            <p className="text-xs">Best viewed in modern browsers (Chrome, Firefox, Safari, Edge)</p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <span className="text-gold/30">•</span>
              <a href="#" className="hover:text-gold transition-colors">Terms of Use</a>
              <span className="text-gold/30">•</span>
              <a href="#" className="hover:text-gold transition-colors">Accessibility</a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed right-6 bottom-6 w-12 h-12 bg-gold text-black rounded-full flex items-center justify-center shadow-lg z-50"
          style={{ 
            boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)',
            animation: 'float 3s ease-in-out infinite'
          }}
        >
          <FaArrowUp className="text-lg" />
        </motion.button>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}
