'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaEye, FaEyeSlash, FaShieldAlt, FaKey, FaMosque } from 'react-icons/fa';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: Date;
  permissions: string[];
}

const AdminAuth: React.FC<{ onAuthSuccess: (user: AdminUser) => void }> = ({ onAuthSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeLeft, setLockTimeLeft] = useState(0);

  // Strong admin password (in production, this should be in environment variables)
  const ADMIN_PASSWORD = 'Masjid@2024!SecureAdmin#123';
  const MAX_ATTEMPTS = 3;
  const LOCK_TIME = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    if (isLocked && lockTimeLeft > 0) {
      const timer = setTimeout(() => {
        setLockTimeLeft(lockTimeLeft - 1000);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockTimeLeft <= 0) {
      setIsLocked(false);
      setAttempts(0);
    }
  }, [isLocked, lockTimeLeft]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Account temporarily locked. Please try again later.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate verification delay for security
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === ADMIN_PASSWORD) {
      // Successful login
      const adminUser: AdminUser = {
        id: 'admin-001',
        name: 'Mosque Administrator',
        email: 'admin@masjid-salman.com',
        role: 'Super Admin',
        lastLogin: new Date(),
        permissions: [
          'overview.read',
          'content.manage',
          'members.manage',
          'donations.manage',
          'events.manage',
          'community.manage',
          'volunteers.manage',
          'settings.manage'
        ]
      };

      // Store session (in production, use secure HTTP-only cookies)
      sessionStorage.setItem('adminSession', JSON.stringify({
        user: adminUser,
        loginTime: new Date().toISOString(),
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // 2 hours
      }));

      onAuthSuccess(adminUser);
    } else {
      // Failed login
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setLockTimeLeft(LOCK_TIME);
        setError('Too many failed attempts. Account locked for 5 minutes.');
      } else {
        setError(`Invalid password. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
      }
      
      setPassword('');
    }

    setIsLoading(false);
  };

  const formatLockTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiNGRkZGRkYiLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSI1MCIgcj0iMSIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSIjRkZGRkZGIi8+CjwvZGlnPgo=')] bg-repeat" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <FaMosque className="text-white text-3xl" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-emerald-100 text-sm">Masjid Salman al Farsi Management</p>
          </div>

          {/* Security Badge */}
          <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-3 mb-6">
            <div className="flex items-center gap-2 text-emerald-100 text-sm">
              <FaShieldAlt className="text-emerald-400" />
              <span>Secure Authentication Portal</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-emerald-100 text-sm font-medium mb-2">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaKey className="text-emerald-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-emerald-200 focus:outline-none focus:border-emerald-400 focus:bg-white/20 transition-all"
                  disabled={isLocked || isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLocked || isLoading}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-emerald-400 hover:text-emerald-300" />
                  ) : (
                    <FaEye className="text-emerald-400 hover:text-emerald-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/20 border border-red-400/30 rounded-lg p-3"
              >
                <p className="text-red-200 text-sm flex items-center gap-2">
                  <FaLock className="text-red-400" />
                  {error}
                </p>
              </motion.div>
            )}

            {/* Lock Warning */}
            {isLocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-amber-500/20 border border-amber-400/30 rounded-lg p-4 text-center"
              >
                <FaLock className="text-amber-400 text-2xl mx-auto mb-2" />
                <p className="text-amber-200 text-sm font-medium">Account Locked</p>
                <p className="text-amber-300 text-xs mt-1">
                  Try again in {formatLockTime(lockTimeLeft)}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLocked || isLoading}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : isLocked ? (
                <div className="flex items-center justify-center gap-2">
                  <FaLock />
                  <span>Account Locked</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <FaShieldAlt />
                  <span>Secure Login</span>
                </div>
              )}
            </motion.button>
          </form>

          {/* Security Info */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-center space-y-2">
              <p className="text-emerald-200 text-xs">
                🔒 This portal is protected by advanced security measures
              </p>
              <p className="text-emerald-300 text-xs">
                Unauthorized access attempts are logged and monitored
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-emerald-200 text-sm">
            © 2024 Masjid Salman al Farsi - Secure Admin Portal
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;
