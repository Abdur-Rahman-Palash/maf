'use client';

import { useState, useEffect } from 'react';
import { FaClock, FaSave, FaEdit, FaTimes, FaCheck, FaMosque, FaTrash, FaPlus } from 'react-icons/fa';
import { PrayerTimesStorage, PrayerTime } from '@/lib/prayerTimesStorage';
import { eventSync, EVENT_TYPES } from '@/lib/eventSync';

interface PrayerTimesManagerProps {
  onDataUpdate?: () => void;
}

const PrayerTimesManager: React.FC<PrayerTimesManagerProps> = ({ onDataUpdate }) => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [activePrayerTime, setActivePrayerTime] = useState<PrayerTime | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentPrayerTime, setCurrentPrayerTime] = useState<PrayerTime>({
    id: 0,
    fajr_begins: '05:45',
    fajr_jamaat: '06:00',
    dhuhr_begins: '13:30',
    dhuhr_jamaat: '13:45',
    asr_begins: '17:00',
    asr_jamaat: '17:15',
    maghrib_begins: '20:15',
    maghrib_jamaat: '20:30',
    isha_begins: '21:30',
    isha_jamaat: '21:45',
    date: new Date().toISOString().split('T')[0],
    is_active: false,
    created_at: '',
    updated_at: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      const prayerTimesData = PrayerTimesStorage.getPrayerTimes();
      setPrayerTimes(prayerTimesData);
      
      // Get active prayer time
      const activePrayerTimeData = PrayerTimesStorage.getActivePrayerTimes();
      setActivePrayerTime(activePrayerTimeData);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    }
  };

  const handleEdit = (prayerTime: PrayerTime) => {
    setCurrentPrayerTime(prayerTime);
    setIsEditing(true);
    setIsCreating(false);
    setMessage('');
  };

  const handleCreate = () => {
    setCurrentPrayerTime({
      id: 0,
      fajr_begins: '05:45',
      fajr_jamaat: '06:00',
      dhuhr_begins: '13:30',
      dhuhr_jamaat: '13:45',
      asr_begins: '17:00',
      asr_jamaat: '17:15',
      maghrib_begins: '18:00',
      maghrib_jamaat: '18:15',
      isha_begins: '19:30',
      isha_jamaat: '20:00',
      date: new Date().toISOString().split('T')[0],
      is_active: false,
      created_at: '',
      updated_at: ''
    });
    setIsEditing(true);
    setIsCreating(true);
    setMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    setMessage('');
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      if (isCreating) {
        // Create new prayer time
        PrayerTimesStorage.addPrayerTime(currentPrayerTime);
        setMessage('Prayer times created successfully!');
      } else {
        // Update existing prayer time
        PrayerTimesStorage.updatePrayerTime(currentPrayerTime.id, currentPrayerTime);
        setMessage('Prayer times updated successfully!');
      }
      
      setIsEditing(false);
      setIsCreating(false);
      fetchPrayerTimes();
      
      // Emit real-time sync event (temporarily disabled)
      // eventSync.emit(EVENT_TYPES.PRAYER_TIMES_UPDATED);
      
      if (onDataUpdate) onDataUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving prayer times. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this prayer time schedule?')) {
      return;
    }
    
    try {
      PrayerTimesStorage.deletePrayerTime(id);
      setMessage('Prayer times deleted successfully!');
      fetchPrayerTimes();
      
      // Emit real-time sync event (temporarily disabled)
      // eventSync.emit(EVENT_TYPES.PRAYER_TIMES_UPDATED);
      
      if (onDataUpdate) onDataUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error deleting prayer times. Please try again.');
    }
  };

  const handleActivate = async (id: number) => {
    try {
      PrayerTimesStorage.activatePrayerTime(id);
      setMessage('Prayer times activated successfully!');
      fetchPrayerTimes();
      
      // Emit real-time sync event (temporarily disabled)
      // eventSync.emit(EVENT_TYPES.PRAYER_TIMES_UPDATED);
      
      if (onDataUpdate) onDataUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error activating prayer times. Please try again.');
    }
  };

  const handlePrayerTimeChange = (field: keyof PrayerTime, value: string) => {
    setCurrentPrayerTime(prev => ({ ...prev, [field]: value }));
  };

  const prayerNames = {
    fajr_begins: 'Fajr Begins',
    fajr_jamaat: 'Fajr Jamaat',
    dhuhr_begins: 'Dhuhr Begins',
    dhuhr_jamaat: 'Dhuhr Jamaat',
    asr_begins: 'Asr Begins',
    asr_jamaat: 'Asr Jamaat',
    maghrib_begins: 'Maghrib Begins',
    maghrib_jamaat: 'Maghrib Jamaat',
    isha_begins: 'Isha Begins',
    isha_jamaat: 'Isha Jamaat'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaMosque className="text-2xl text-emerald-600" />
          <h2 className="text-xl font-semibold text-gray-900">Prayer Times Management</h2>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                <FaCheck />
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaTimes />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus />
              New Schedule
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {isEditing ? (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isCreating ? 'Create New Prayer Schedule' : 'Edit Prayer Schedule'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.keys(prayerNames) as Array<keyof typeof prayerNames>).map((field) => (
                <div key={field} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {prayerNames[field]}
                  </label>
                  <input
                    type="time"
                    value={currentPrayerTime[field]}
                    onChange={(e) => handlePrayerTimeChange(field, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Prayer Times */}
          {activePrayerTime && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-emerald-900">Currently Active Schedule</h3>
                <span className="px-2 py-1 bg-emerald-600 text-white text-xs rounded-full">ACTIVE</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div>
                  <span className="font-medium text-emerald-700">Fajr:</span>
                  <div>{activePrayerTime.fajr_begins} / {activePrayerTime.fajr_jamaat}</div>
                </div>
                <div>
                  <span className="font-medium text-emerald-700">Dhuhr:</span>
                  <div>{activePrayerTime.dhuhr_begins} / {activePrayerTime.dhuhr_jamaat}</div>
                </div>
                <div>
                  <span className="font-medium text-emerald-700">Asr:</span>
                  <div>{activePrayerTime.asr_begins} / {activePrayerTime.asr_jamaat}</div>
                </div>
                <div>
                  <span className="font-medium text-emerald-700">Maghrib:</span>
                  <div>{activePrayerTime.maghrib_begins} / {activePrayerTime.maghrib_jamaat}</div>
                </div>
                <div>
                  <span className="font-medium text-emerald-700">Isha:</span>
                  <div>{activePrayerTime.isha_begins} / {activePrayerTime.isha_jamaat}</div>
                </div>
              </div>
            </div>
          )}

          {/* All Prayer Times */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">All Prayer Schedules</h3>
            {prayerTimes && prayerTimes.length > 0 ? (
              <div className="space-y-3">
                {prayerTimes.map((prayerTime: PrayerTime) => (
                  <div key={prayerTime.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">
                            Schedule #{prayerTime.id}
                          </span>
                          {prayerTime.is_active && (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">ACTIVE</span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm text-gray-600">
                          <div>Fajr: {prayerTime.fajr_begins} / {prayerTime.fajr_jamaat}</div>
                          <div>Dhuhr: {prayerTime.dhuhr_begins} / {prayerTime.dhuhr_jamaat}</div>
                          <div>Asr: {prayerTime.asr_begins} / {prayerTime.asr_jamaat}</div>
                          <div>Maghrib: {prayerTime.maghrib_begins} / {prayerTime.maghrib_jamaat}</div>
                          <div>Isha: {prayerTime.isha_begins} / {prayerTime.isha_jamaat}</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Created: {new Date(prayerTime.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!prayerTime.is_active && (
                          <button
                            onClick={() => handleActivate(prayerTime.id)}
                            className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors"
                          >
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(prayerTime)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(prayerTime.id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No prayer schedules found. Create your first schedule above.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h3 className="font-semibold text-blue-900 mb-2">Instructions</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click "New Schedule" to create a new prayer time schedule</li>
          <li>• Set both "Begins" (Adhan) and "Jamaat" (Iqamah) times for each prayer</li>
          <li>• Click "Activate" to make a schedule active on the website</li>
          <li>• Only one schedule can be active at a time</li>
          <li>• Changes are reflected immediately on the website header</li>
        </ul>
      </div>
    </div>
  );
};

export default PrayerTimesManager;
