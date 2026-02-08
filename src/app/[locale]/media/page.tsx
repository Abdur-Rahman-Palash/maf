'use client';
import { FaImages, FaVideo, FaNewspaper, FaMicrophone } from 'react-icons/fa';

    { locale: 'ar' }

export default function MediaPage() {
  const mediaCategories = [
    {
      icon: FaImages,
      title: "Photo Gallery",
      description: "View images from our events, prayers, and community activities",
      color: "emerald",
      items: ["Ramadan 2024", "Eid Celebration", "Weekend School", "Community Iftar"]
    },
    {
      icon: FaVideo,
      title: "Video Library",
      description: "Watch recorded lectures, prayers, and special events",
      color: "blue",
      items: ["Friday Khutbah", "Islamic Lectures", "Quran Recitation", "Event Highlights"]
    },
    {
      icon: FaNewspaper,
      title: "News & Updates",
      description: "Stay updated with our latest announcements and community news",
      color: "amber",
      items: ["Recent News", "Press Releases", "Community Updates", "Announcements"]
    },
    {
      icon: FaMicrophone,
      title: "Audio Resources",
      description: "Listen to Quran recitations, lectures, and nasheeds",
      color: "purple",
      items: ["Quran Audio", "Lectures", "Nasheeds", "Podcasts"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Media Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of photos, videos, and audio resources from our community events and activities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {mediaCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className={`bg-${category.color}-100 rounded-lg p-3 mr-4`}>
                    <Icon className={`text-2xl text-${category.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <span className="text-sm text-gray-700">{item}</span>
                      <span className="text-xs text-gray-500">View →</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Recent Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Eid al-Fitr 2024",
                type: "Photo Gallery",
                date: "April 2024",
                description: "Celebration highlights from our Eid prayer and community gathering"
              },
              {
                title: "Ramadan Lecture Series",
                type: "Video",
                date: "March 2024",
                description: "Special lectures delivered during the holy month of Ramadan"
              },
              {
                title: "Community Iftar",
                type: "News",
                date: "March 2024",
                description: "Report on our community iftar programs and activities"

            ].map((highlight, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-2">{highlight.date}</div>
                <h3 className="font-bold text-gray-900 mb-2">{highlight.title}</h3>
                <div className="text-xs text-emerald-600 font-medium mb-2">{highlight.type}</div>
                <p className="text-sm text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Media Permissions</h2>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-gray-600 mb-4">
              All media content on this website is for personal viewing and educational purposes only.
              Commercial use or redistribution without explicit permission is prohibited.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Request Permission
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Media Guidelines
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
