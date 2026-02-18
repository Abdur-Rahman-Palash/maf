import { useState, useEffect, useCallback } from 'react';
import { eventsApi, membersApi, donationsApi, contentApi } from '@/lib/apiService';

// Generic hook for API data
export const useApiData = <T>(
  fetchFunction: () => Promise<any>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFunction();
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

// Specific hooks for each data type
export const useEvents = () => {
  return useApiData(eventsApi.getAll, []);
};

export const useMembers = () => {
  return useApiData(membersApi.getAll, []);
};

export const useDonations = () => {
  return useApiData(donationsApi.getAll, []);
};

export const useContent = () => {
  return useApiData(contentApi.getAll, []);
};

// Hook for real-time updates
export const useRealTimeData = () => {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  
  const triggerUpdate = useCallback(() => {
    setLastUpdate(Date.now());
  }, []);

  return { lastUpdate, triggerUpdate };
};
