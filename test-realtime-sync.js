// Simple test to verify real-time sync functionality
// Run this in browser console to test

// Test 1: Check if QuranStorage is working
console.log('=== Testing QuranStorage ===');
const QuranStorage = require('./src/lib/quranStorage.ts');

// Get initial recitations
const recitations = QuranStorage.getRecitations();
console.log('Initial recitations:', recitations.length);

// Add a new recitation
const newRecitation = {
  title: 'Test Recitation',
  description: 'Test description',
  reciter: 'Test Reciter',
  surah: 1,
  ayah: 1,
  surahName: 'Al-Fatiha',
  audioUrl: 'https://test.com/audio.mp3',
  duration: '2:00',
  fileSize: '1.0 MB',
  thumbnail: '/test.jpg',
  category: 'Test',
  status: 'Published',
  views: 0,
  downloads: 0,
  language: 'Arabic',
  uploadDate: new Date().toISOString().split('T')[0],
  type: 'audio'
};

const added = QuranStorage.addRecitation(newRecitation);
console.log('Added recitation:', added);

// Check if it was added
const updatedRecitations = QuranStorage.getRecitations();
console.log('Updated recitations count:', updatedRecitations.length);

// Test 2: Check if eventSync is working
console.log('\n=== Testing EventSync ===');
const { eventSync, EVENT_TYPES } = require('./src/lib/eventSync.ts');

// Subscribe to Quran recitations updates
let updateCount = 0;
const unsubscribe = eventSync.subscribe(EVENT_TYPES.QURAN_RECITATIONS_UPDATED, () => {
  updateCount++;
  console.log(`Event received! Update count: ${updateCount}`);
});

// Emit an event
eventSync.emit(EVENT_TYPES.QURAN_RECITATIONS_UPDATED);
console.log('Event emitted');

// Clean up
unsubscribe();
console.log('Unsubscribed from events');

console.log('\n=== Test Complete ===');
