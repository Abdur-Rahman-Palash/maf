// Real-time data synchronization between admin dashboard and main page
import { useState, useEffect } from 'react';

// Global state for real-time synchronization
interface GlobalState {
  services: any[];
  media: any[];
  events: any[];
  content: any[];
  quranAyahs: any[];
  lastUpdated: number;
}

class DataSyncManager {
  private static instance: DataSyncManager;
  private subscribers: Map<string, Set<(data: any) => void>> = new Map();
  private state: GlobalState = {
    services: [],
    media: [],
    events: [],
    content: [],
    quranAyahs: [],
    lastUpdated: Date.now()
  };

  static getInstance(): DataSyncManager {
    if (!DataSyncManager.instance) {
      DataSyncManager.instance = new DataSyncManager();
    }
    return DataSyncManager.instance;
  }

  // Subscribe to data changes
  subscribe(key: string, callback: (data: any) => void) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key)!.add(callback);
    
    // Return current data immediately
    return this.state[key as keyof GlobalState];
  }

  // Unsubscribe from data changes
  unsubscribe(key: string, callback: (data: any) => void) {
    const callbacks = this.subscribers.get(key);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  // Update data and notify subscribers
  updateData(key: keyof GlobalState, data: any) {
    this.state[key] = data;
    this.state.lastUpdated = Date.now();
    
    // Notify all subscribers
    const callbacks = this.subscribers.get(key);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  // Get current data
  getData(key: keyof GlobalState) {
    return this.state[key];
  }

  // Get full state
  getFullState() {
    return { ...this.state };
  }

  // Initialize data from localStorage
  initializeFromStorage() {
    try {
      const stored = localStorage.getItem('masjid_global_state');
      if (stored) {
        const parsedState = JSON.parse(stored);
        this.state = { ...this.state, ...parsedState };
      }
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
    }
  }

  // Save data to localStorage
  saveToStorage() {
    try {
      localStorage.setItem('masjid_global_state', JSON.stringify(this.state));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }
}

// Export singleton instance
export const dataSync = DataSyncManager.getInstance();

// Initialize from storage on load
if (typeof window !== 'undefined') {
  dataSync.initializeFromStorage();
}

// Custom hook for real-time data synchronization
export function useRealTimeData<T>(key: keyof GlobalState, initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData);

  useEffect(() => {
    // Subscribe to data changes
    const currentData = dataSync.subscribe(key, (newData: T[]) => {
      setData(newData);
    });

    // Save to localStorage when data changes
    dataSync.saveToStorage();

    return () => {
      dataSync.unsubscribe(key, setData);
    };
  }, [key]);

  // Update function for components
  const updateData = (newData: T[]) => {
    dataSync.updateData(key, newData);
  };

  return { data, updateData };
}

// Export functions for admin operations
export const adminDataOperations = {
  // Services
  addService: (service: any) => {
    console.log('DataSync: Adding service:', service);
    const currentServices = dataSync.getData('services') as any[];
    const updatedServices = [...currentServices, service];
    dataSync.updateData('services', updatedServices);
    console.log('DataSync: Services after add:', updatedServices);
  },
  
  updateService: (id: string, updatedService: any) => {
    console.log('DataSync: Updating service:', id, updatedService);
    const currentServices = dataSync.getData('services') as any[];
    const updatedServices = currentServices.map((service: any) => 
      service.id === id ? { ...service, ...updatedService } : service
    );
    dataSync.updateData('services', updatedServices);
    console.log('DataSync: Services after update:', updatedServices);
  },
  
  deleteService: (id: string) => {
    console.log('DataSync: Deleting service:', id);
    const currentServices = dataSync.getData('services') as any[];
    const updatedServices = currentServices.filter((service: any) => service.id !== id);
    dataSync.updateData('services', updatedServices);
    console.log('DataSync: Services after delete:', updatedServices);
  },

  // Media
  addMedia: (media: any) => {
    const currentMedia = dataSync.getData('media') as any[];
    const newMedia = [...currentMedia, media];
    dataSync.updateData('media', newMedia);
  },
  
  updateMedia: (id: string, updatedMediaItem: any) => {
    const currentMedia = dataSync.getData('media') as any[];
    const newMedia = currentMedia.map((media: any) => 
      media.id === id ? { ...media, ...updatedMediaItem } : media
    );
    dataSync.updateData('media', newMedia);
  },
  
  deleteMedia: (id: string) => {
    const currentMedia = dataSync.getData('media') as any[];
    const newMedia = currentMedia.filter((media: any) => media.id !== id);
    dataSync.updateData('media', newMedia);
  },

  // Events
  addEvent: (event: any) => {
    const currentEvents = dataSync.getData('events') as any[];
    const updatedEvents = [...currentEvents, event];
    dataSync.updateData('events', updatedEvents);
  },
  
  updateEvent: (id: string, updatedEvent: any) => {
    const currentEvents = dataSync.getData('events') as any[];
    const updatedEvents = currentEvents.map((event: any) => 
      event.id === id ? { ...event, ...updatedEvent } : event
    );
    dataSync.updateData('events', updatedEvents);
  },
  
  deleteEvent: (id: string) => {
    const currentEvents = dataSync.getData('events') as any[];
    const updatedEvents = currentEvents.filter((event: any) => event.id !== id);
    dataSync.updateData('events', updatedEvents);
  },

  // Quran Ayahs
  addQuranAyah: (ayah: any) => {
    const currentAyahs = dataSync.getData('quranAyahs') as any[];
    const updatedAyahs = [...currentAyahs, ayah];
    dataSync.updateData('quranAyahs', updatedAyahs);
  },
  
  updateQuranAyah: (id: string, updatedAyah: any) => {
    const currentAyahs = dataSync.getData('quranAyahs') as any[];
    const updatedAyahs = currentAyahs.map((ayah: any) => 
      ayah.id === id ? { ...ayah, ...updatedAyah } : ayah
    );
    dataSync.updateData('quranAyahs', updatedAyahs);
  },
  
  deleteQuranAyah: (id: string) => {
    const currentAyahs = dataSync.getData('quranAyahs') as any[];
    const updatedAyahs = currentAyahs.filter((ayah: any) => ayah.id !== id);
    dataSync.updateData('quranAyahs', updatedAyahs);
  },

  // Content
  addContent: (content: any) => {
    const currentContent = dataSync.getData('content') as any[];
    const newContent = [...currentContent, content];
    dataSync.updateData('content', newContent);
  },
  
  updateContent: (id: string, updatedContentItem: any) => {
    const currentContent = dataSync.getData('content') as any[];
    const newContent = currentContent.map((content: any) => 
      content.id === id ? { ...content, ...updatedContentItem } : content
    );
    dataSync.updateData('content', newContent);
  },
  
  deleteContent: (id: string) => {
    const currentContent = dataSync.getData('content') as any[];
    const newContent = currentContent.filter((content: any) => content.id !== id);
    dataSync.updateData('content', newContent);
  }
};
