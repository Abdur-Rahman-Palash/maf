'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMoon, FaHands, FaHeart, FaClock, FaMapMarkerAlt, FaUsers, FaPlay, FaUser, FaArrowRight, FaChevronLeft, FaChevronRight, FaBook, FaHandsHelping } from 'react-icons/fa';
import { Link } from '@/i18n/routing';
import EventStorage from '@/lib/eventStorage';

const ProgramsSection = () => {
  const [events, setEvents] = useState(EventStorage.getEvents());
  const [currentEventPage, setCurrentEventPage] = useState(0);
  const [currentProgramPage, setCurrentProgramPage] = useState(0);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const eventsPerPage = 3;
  const programsPerPage = 4;

  // Load events from storage on mount and set up interval for updates
  useEffect(() => {
    const loadEvents = () => {
      const storedEvents = EventStorage.getEvents();
      setEvents(storedEvents);
    };

    // Initial load
    loadEvents();

    // Set up interval to check for new events every 2 seconds
    const interval = setInterval(loadEvents, 2000);

    return () => clearInterval(interval);
  }, []);

  const programs = [
    {
      title: 'General Events',
      icon: FaCalendarAlt,
      description: 'Community events and gatherings',
      href: '/services/general-events',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Madrasa Classes',
      icon: FaBook,
      description: 'Islamic education for children and adults',
      href: '/services/madrasa',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Meet with Imam',
      icon: FaUser,
      description: 'Schedule appointments with the Imam',
      href: '/services/meet-imam',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Nikah Services',
      icon: FaHeart,
      description: 'Islamic marriage ceremonies and counseling',
      href: '/services/nikahs',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Shahada Services',
      icon: FaHands,
      description: 'Support for new Muslims and shahada ceremonies',
      href: '/services/shahadas',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Family Counseling',
      icon: FaHeart,
      description: 'Family and marriage counseling services',
      href: '/services/meet-imam',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Youth Programs',
      icon: FaUser,
      description: 'Special programs for youth and young adults',
      href: '/services/madrasa',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Community Services',
      icon: FaHandsHelping,
      description: 'Volunteer and community service opportunities',
      href: '/services/general-events',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  // Pagination for events
  const totalEventPages = Math.ceil(events.length / eventsPerPage);
  const currentEvents = events.slice(
    currentEventPage * eventsPerPage,
    (currentEventPage + 1) * eventsPerPage
  );

  // Pagination for programs
  const totalProgramPages = Math.ceil(programs.length / programsPerPage);
  const currentPrograms = programs.slice(
    currentProgramPage * programsPerPage,
    (currentProgramPage + 1) * programsPerPage
  );

  const handleEventPageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentEventPage > 0) {
      setCurrentEventPage(currentEventPage - 1);
    } else if (direction === 'next' && currentEventPage < totalEventPages - 1) {
      setCurrentEventPage(currentEventPage + 1);
    }
  };

  const handleProgramPageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentProgramPage > 0) {
      setCurrentProgramPage(currentProgramPage - 1);
    } else if (direction === 'next' && currentProgramPage < totalProgramPages - 1) {
      setCurrentProgramPage(currentProgramPage + 1);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(25)].map((_, i) => {
            const seed = i * 137.5;
            const left = (seed * 9.7) % 100;
            const top = (seed * 13.3) % 100;
            const duration = 9 + ((seed * 7.1) % 18);
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/25 to-indigo-400/30 rounded-full"
                animate={{
                  x: [0, 100, 50, 0],
                  y: [0, 30, 70, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
              />
            );
          })}
        </div>
        
        {/* Gradient Wave Animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-transparent via-blue-200/20 to-transparent"
          animate={{
            x: ["-100%", "0%", "100%"],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulsing Circles */}
        <div className="absolute top-1/4 left-1/4 w-44 h-44">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-blue-500/15 to-indigo-500/15"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="absolute top-1/3 right-1/4 w-36 h-36">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500/15 to-purple-500/15"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.25, 0.1, 0.25],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Additional Floating Elements */}
        <div className="absolute top-2/3 left-1/6 w-28 h-28">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.08, 0.2],
            }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="absolute bottom-1/4 right-1/6 w-24 h-24">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-indigo-400/12 to-purple-400/12"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.15, 0.06, 0.15],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-philosopher), sans-serif' }}>
            Programs & Events
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Explore our Islamic programs and upcoming events
          </p>
          
          {/* Registration Success Message */}
          {registrationMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-block bg-green-100 text-green-700 px-6 py-3 rounded-lg font-medium"
            >
              {registrationMessage}
            </motion.div>
          )}
        </motion.div>

        {/* Events Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Upcoming Events</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Page {currentEventPage + 1} of {totalEventPages}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEventPageChange('prev')}
                  disabled={currentEventPage === 0}
                  className="p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEventPageChange('next')}
                  disabled={currentEventPage === totalEventPages - 1}
                  className="p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -5,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer border border-gray-100"
              >
                {/* Event Image */}
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-blue-500 relative">
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <FaCalendarAlt className="text-emerald-600 text-xl" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'Completed' ? 'bg-green-100 text-green-600' :
                      event.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
                    {event.time}
                  </div>
                </div>
                
                {/* Event Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.category === 'Prayer' ? 'bg-emerald-100 text-emerald-600' :
                      event.category === 'Education' ? 'bg-blue-100 text-blue-600' :
                      event.category === 'Community' ? 'bg-purple-100 text-purple-600' :
                      event.category === 'Celebration' ? 'bg-pink-100 text-pink-600' :
                      event.category === 'Charity' ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {event.category}
                    </span>
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-500">
                        <FaUsers className="text-gray-400 mr-1" />
                        {event.currentAttendees}/{event.maxAttendees}
                      </span>
                      <span className="text-xs text-gray-500">
                        <FaClock className="text-gray-400 mr-1" />
                        {event.time}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">{event.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-400" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        {event.organizer}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaPlay className="text-gray-400" />
                        <Link 
                          href={`/events/${event.id}`}
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {event.maxAttendees - event.currentAttendees} spots left
                      </span>
                      <button 
                        onClick={() => {
                          EventStorage.incrementAttendees(event.id);
                          // Update local state to reflect the change
                          setEvents(EventStorage.getEvents());
                          // Show success message
                          setRegistrationMessage(`Successfully registered for ${event.title}!`);
                          // Clear message after 3 seconds
                          setTimeout(() => setRegistrationMessage(''), 3000);
                        }}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          event.currentAttendees >= event.maxAttendees 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-emerald-500 text-white hover:bg-emerald-600'
                        }`}
                        disabled={event.currentAttendees >= event.maxAttendees}
                      >
                        {event.currentAttendees >= event.maxAttendees ? 'Full' : 'Register'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Event Pagination */}
          {totalEventPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalEventPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentEventPage(i)}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${
                    currentEventPage === i
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Programs Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Our Programs</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Page {currentProgramPage + 1} of {totalProgramPages}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleProgramPageChange('prev')}
                  disabled={currentProgramPage === 0}
                  className="p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleProgramPageChange('next')}
                  disabled={currentProgramPage === totalProgramPages - 1}
                  className="p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer border border-gray-100"
              >
                {/* Program Icon */}
                <div className={`h-32 ${program.color} relative`}>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <program.icon className="text-white text-2xl" />
                    </div>
                  </div>
                </div>
                
                {/* Program Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{program.title}</h3>
                  <p className="text-gray-600 text-sm">{program.description}</p>
                  <div className="mt-4">
                    <Link 
                      href={program.href}
                      className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Learn More
                      <FaArrowRight className="text-sm" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Program Pagination */}
          {totalProgramPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalProgramPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentProgramPage(i)}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${
                    currentProgramPage === i
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View All Links */}
        <div className="flex justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              View All Programs
              <FaArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/events"
              className="inline-flex items-center bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-300"
            >
              View All Events
              <FaArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
