'use client';
import { FaBriefcase, FaUsers, FaGraduationCap, FaHeart } from 'react-icons/fa';

    { locale: 'ar' }

export default function Careers() {
  const currentOpenings = [
    {
      title: 'Administrative Assistant',
      department: 'Administration',
      type: 'Full-time',
      description: 'Support daily operations and administrative tasks'
    },
    {
      title: 'Islamic Education Teacher',
      department: 'Education',
      type: 'Part-time',
      description: 'Teach Islamic studies to children and adults'
    },
    {
      title: 'Facility Manager',
      department: 'Operations',
      type: 'Full-time',
      description: 'Manage mosque facilities and maintenance'
    },
    {
      title: 'Community Outreach Coordinator',
      department: 'Community',
      type: 'Full-time',
      description: 'Organize community events and programs'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CAREERS
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our team and explore career opportunities at the mosque
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {currentOpenings.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <FaBriefcase className="text-2xl text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaUsers className="mr-2 text-purple-600" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaHeart className="mr-2 text-red-600" />
                  <span>{job.type}</span>
                </div>
                <p className="text-gray-600 pt-2 border-t">
                  {job.description}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300">
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Work With Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Benefits</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Competitive salary packages</li>
                <li>• Health insurance coverage</li>
                <li>• Professional development opportunities</li>
                <li>• Work-life balance</li>
                <li>• Spiritual work environment</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Culture</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Supportive team environment</li>
                <li>• Community-focused mission</li>
                <li>• Growth opportunities</li>
                <li>• Diversity and inclusion</li>
                <li>• Islamic values integration</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Process</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4 mb-3">
                <FaGraduationCap className="text-3xl text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Submit Application</h3>
              <p className="text-sm text-gray-600">Send resume and cover letter</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-4 mb-3">
                <FaUsers className="text-3xl text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Interview Process</h3>
              <p className="text-sm text-gray-600">Multiple rounds with team members</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-4 mb-3">
                <FaHeart className="text-3xl text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Join Our Team</h3>
              <p className="text-sm text-gray-600">Receive offer and onboard</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
