'use client';

import { useEffect, useState } from 'react';
import { eventsApi, membersApi, donationsApi, contentApi } from '@/lib/apiService';

interface RealTimeSyncProps {
  onDataUpdate?: () => void;
}

const RealTimeSync: React.FC<RealTimeSyncProps> = ({ onDataUpdate }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    // Initial sync
    syncData();
    
    // Set up periodic sync every 30 seconds
    const interval = setInterval(syncData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const syncData = async () => {
    try {
      // Test connection by fetching data
      await Promise.all([
        eventsApi.getAll(),
        membersApi.getAll(),
        donationsApi.getAll(),
        contentApi.getAll()
      ]);
      
      setIsConnected(true);
      setLastSync(new Date());
      
      if (onDataUpdate) {
        onDataUpdate();
      }
    } catch (error) {
      console.error('Sync failed:', error);
      setIsConnected(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
        isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        } ${isConnected ? 'animate-pulse' : ''}`}></div>
        <span>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
        {lastSync && (
          <span className="text-xs opacity-75">
            {lastSync.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default RealTimeSync;
