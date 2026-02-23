// Test script to verify data synchronization between admin dashboard and homepage
// Run this in browser console to test

console.log('🧪 Testing Data Synchronization');

// Test 1: Check if EventSync system is working
if (typeof window !== 'undefined') {
  // Load the event sync system
  import('./src/lib/eventSync.js').then(module => {
    const { eventSync, EVENT_TYPES } = module;
    
    console.log('✅ EventSync system loaded');
    
    // Test sermon updates
    let sermonUpdateCount = 0;
    const unsubscribeSermons = eventSync.subscribe(EVENT_TYPES.SERMONS_UPDATED, () => {
      sermonUpdateCount++;
      console.log(`📢 Sermon update #${sermonUpdateCount} received`);
    });
    
    // Test event updates  
    let eventUpdateCount = 0;
    const unsubscribeEvents = eventSync.subscribe(EVENT_TYPES.EVENTS_UPDATED, () => {
      eventUpdateCount++;
      console.log(`📅 Event update #${eventUpdateCount} received`);
    });
    
    // Simulate admin operations
    console.log('🔧 Simulating admin operations...');
    
    setTimeout(() => {
      console.log('📤 Emitting SERMONS_UPDATED event');
      eventSync.emit(EVENT_TYPES.SERMONS_UPDATED);
    }, 1000);
    
    setTimeout(() => {
      console.log('📤 Emitting EVENTS_UPDATED event');
      eventSync.emit(EVENT_TYPES.EVENTS_UPDATED);
    }, 2000);
    
    setTimeout(() => {
      console.log('🧹 Cleaning up test subscriptions');
      unsubscribeSermons();
      unsubscribeEvents();
      
      console.log(`✅ Test complete! Received ${sermonUpdateCount} sermon updates and ${eventUpdateCount} event updates`);
    }, 3000);
  }).catch(err => {
    console.error('❌ Failed to load EventSync:', err);
  });
}
