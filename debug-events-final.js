// Debug events synchronization issue
console.log('=== EVENTS SYNCHRONIZATION DEBUG ===');

// Check what's in localStorage
try {
  const storedEvents = localStorage.getItem('mosque_events');
  if (storedEvents) {
    const events = JSON.parse(storedEvents);
    console.log('Events in localStorage:', events.length);
    console.log('Stored events:', events.map(e => ({
      id: e.id,
      title: e.title,
      date: e.date,
      status: e.status
    })));
  } else {
    console.log('No events in localStorage');
  }
} catch (error) {
  console.error('Error reading localStorage:', error);
}

// Check what EventStorage returns
try {
  const EventStorage = require('./src/lib/eventStorage.ts').default;
  const storageEvents = EventStorage.getEvents();
  console.log('Events from EventStorage:', storageEvents.length);
  console.log('Storage events:', storageEvents.map(e => ({
    id: e.id,
    title: e.title,
    date: e.date,
    status: e.status
  })));
  
  // Check default events
  const defaultEvents = EventStorage.getDefaultEvents();
  console.log('Default events:', defaultEvents.length);
  console.log('Default events:', defaultEvents.map(e => ({
    id: e.id,
    title: e.title,
    date: e.date,
    status: e.status
  })));
} catch (error) {
  console.error('Error with EventStorage:', error);
}

console.log('=== END DEBUG ===');
