'use client';

// Event Storage System
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  organizer: string;
  maxAttendees: number;
  currentAttendees: number;
  image: string;
}

class EventStorage {
  private static readonly STORAGE_KEY = 'mosque_events';

  // Get all events from localStorage
  static getEvents(): Event[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading events from storage:', error);
    }
    
    // Return default events if no stored data
    return this.getDefaultEvents();
  }

  // Save events to localStorage
  static saveEvents(events: Event[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to storage:', error);
    }
  }

  // Add a new event
  static addEvent(event: Omit<Event, 'id'>): Event {
    const events = this.getEvents();
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      currentAttendees: 0
    };
    
    events.push(newEvent);
    this.saveEvents(events);
    return newEvent;
  }

  // Update an event
  static updateEvent(id: string, updates: Partial<Event>): Event | null {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === id);
    
    if (index !== -1) {
      events[index] = { ...events[index], ...updates };
      this.saveEvents(events);
      return events[index];
    }
    
    return null;
  }

  // Delete an event
  static deleteEvent(id: string): boolean {
    const events = this.getEvents();
    const filteredEvents = events.filter(e => e.id !== id);
    
    if (filteredEvents.length < events.length) {
      this.saveEvents(filteredEvents);
      return true;
    }
    
    return false;
  }

  // Get default events
  static getDefaultEvents(): Event[] {
    return [
      {
        id: '1',
        title: 'Friday Jumu\'ah Prayer',
        description: 'Weekly congregational prayer with sermon',
        date: '2024-02-09',
        time: '1:00 PM',
        location: 'Main Prayer Hall',
        category: 'Prayer',
        status: 'Upcoming',
        organizer: 'Imam Abdullah',
        maxAttendees: 500,
        currentAttendees: 0,
        image: '/events/friday-prayer.jpg'
      },
      {
        id: '2',
        title: 'Islamic Lecture Series',
        description: 'Weekly educational lecture on Islamic topics',
        date: '2024-02-10',
        time: '7:00 PM',
        location: 'Community Hall',
        category: 'Education',
        status: 'Upcoming',
        organizer: 'Sheikh Khalid',
        maxAttendees: 200,
        currentAttendees: 0,
        image: '/events/lecture-series.jpg'
      },
      {
        id: '3',
        title: 'Ramadan Iftar Dinner',
        description: 'Community iftar dinner during Ramadan',
        date: '2024-03-15',
        time: '6:30 PM',
        location: 'Community Center',
        category: 'Community',
        status: 'Upcoming',
        organizer: 'Community Committee',
        maxAttendees: 300,
        currentAttendees: 0,
        image: '/events/iftar-dinner.jpg'
      },
      {
        id: '4',
        title: 'Eid Celebration',
        description: 'Eid al-Fitr celebration with prayers and festivities',
        date: '2024-04-10',
        time: '10:00 AM',
        location: 'Main Prayer Hall',
        category: 'Celebration',
        status: 'Upcoming',
        organizer: 'Imam Abdullah',
        maxAttendees: 1000,
        currentAttendees: 0,
        image: '/events/eid-celebration.jpg'
      },
      {
        id: '5',
        title: 'Youth Islamic Study Circle',
        description: 'Weekly study circle for young Muslims',
        date: '2024-02-14',
        time: '6:00 PM',
        location: 'Library Room',
        category: 'Education',
        status: 'Upcoming',
        organizer: 'Youth Coordinator',
        maxAttendees: 50,
        currentAttendees: 0,
        image: '/events/youth-study.jpg'
      },
      {
        id: '6',
        title: 'Charity Fundraiser',
        description: 'Monthly charity fundraiser for community projects',
        date: '2024-02-20',
        time: '2:00 PM',
        location: 'Community Center',
        category: 'Charity',
        status: 'Upcoming',
        organizer: 'Charity Committee',
        maxAttendees: 150,
        currentAttendees: 0,
        image: '/events/charity-fundraiser.jpg'
      }
    ];
  }

  // Increment attendees
  static incrementAttendees(id: string): void {
    const event = this.getEvents().find(e => e.id === id);
    if (event && event.currentAttendees < event.maxAttendees) {
      this.updateEvent(id, { currentAttendees: event.currentAttendees + 1 });
    }
  }

  // Update event status
  static updateEventStatus(id: string, status: Event['status']): void {
    this.updateEvent(id, { status });
  }
}

export default EventStorage;
