'use client';

// Global Event System for Real-time Data Synchronization
class EventSync {
  private static instance: EventSync;
  private listeners: Map<string, Set<() => void>> = new Map();

  private constructor() {}

  static getInstance(): EventSync {
    if (!EventSync.instance) {
      EventSync.instance = new EventSync();
    }
    return EventSync.instance;
  }

  // Subscribe to data changes for a specific data type
  subscribe(eventType: string, callback: () => void): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    
    this.listeners.get(eventType)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(eventType);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.listeners.delete(eventType);
        }
      }
    };
  }

  // Trigger data change event
  emit(eventType: string): void {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback();
        } catch (error) {
          console.error(`Error in event sync callback for ${eventType}:`, error);
        }
      });
    }
  }

  // Clear all listeners (useful for testing)
  clear(): void {
    this.listeners.clear();
  }
}

// Export singleton instance
export const eventSync = EventSync.getInstance();

// Event types
export const EVENT_TYPES = {
  SERMONS_UPDATED: 'sermons-updated',
  EVENTS_UPDATED: 'events-updated',
  MEMBERS_UPDATED: 'members-updated',
  DONATIONS_UPDATED: 'donations-updated',
  CONTENT_UPDATED: 'content-updated'
} as const;
