// Debug script to check media synchronization
console.log('=== MEDIA SYNCHRONIZATION DEBUG ===');

// Check localStorage
if (typeof window !== 'undefined') {
  console.log('Window detected, checking localStorage...');
  
  // Check mosque_media key
  const mosqueMedia = localStorage.getItem('mosque_media');
  console.log('mosque_media exists:', !!mosqueMedia);
  
  if (mosqueMedia) {
    try {
      const parsed = JSON.parse(mosqueMedia);
      console.log('Media items in localStorage:', parsed.length);
      console.log('Media items:', parsed.map(m => ({
        id: m.id,
        title: m.title,
        type: m.type,
        category: m.category
      })));
      
      // Count by type
      const audioCount = parsed.filter(m => m.type === 'audio').length;
      const videoCount = parsed.filter(m => m.type === 'video').length;
      const imageCount = parsed.filter(m => m.type === 'image').length;
      
      console.log('Audio count:', audioCount);
      console.log('Video count:', videoCount);
      console.log('Image count:', imageCount);
      
    } catch (error) {
      console.error('Error parsing mosque_media:', error);
    }
  } else {
    console.log('No mosque_media in localStorage');
  }
  
  // Check other keys
  const keys = Object.keys(localStorage);
  console.log('All localStorage keys:', keys);
  
} else {
  console.log('Window not detected, this is server-side');
}

console.log('=== END DEBUG ===');
