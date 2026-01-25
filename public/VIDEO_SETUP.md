# Islamic Video Setup Guide

## How to Add Islamic Video Animations

### Step 1: Prepare Your Videos
1. **Worshippers Section Video**: Create or obtain an Islamic video showing:
   - Mosque architecture
   - Prayer scenes
   - Islamic calligraphy
   - Quran recitation visuals
   - Community worship

2. **Visitors Section Video**: Create or obtain an Islamic video showing:
   - Mosque tours
   - Cultural activities
   - Visitor experiences
   - Islamic art and architecture
   - Community events

### Step 2: Video Specifications
- **Format**: MP4 (H.264) or WebM
- **Resolution**: 1920x1080 (Full HD) or higher
- **Duration**: 10-30 seconds (looped)
- **Frame Rate**: 30fps
- **Bitrate**: 5-10 Mbps
- **Audio**: No audio needed (will be muted)

### Step 3: Add Videos to Your Project
1. Place your video files in the `/public/` folder:
   ```
   /public/
   ├── islamic-worshippers-video.mp4
   ├── islamic-worshippers-video.webm (optional)
   ├── islamic-visitors-video.mp4
   └── islamic-visitors-video.webm (optional)
   ```

### Step 4: Update the Code
In `/src/components/BannerSection.tsx`, uncomment the video source lines:

**For Worshippers Section:**
```tsx
<source src="/islamic-worshippers-video.mp4" type="video/mp4" />
<source src="/islamic-worshippers-video.webm" type="video/webm" />
```

**For Visitors Section:**
```tsx
<source src="/islamic-visitors-video.mp4" type="video/mp4" />
<source src="/islamic-visitors-video.webm" type="video/webm" />
```

### Step 5: Video Sources
You can obtain Islamic videos from:
- Stock video websites (Shutterstock, Adobe Stock)
- Islamic video production companies
- Your own mosque recordings
- Free Islamic video resources

### Step 6: Optimization Tips
1. **Compress videos** to reduce file size
2. **Use WebM format** for better compression
3. **Test on different devices** for performance
4. **Ensure smooth looping** at the end
5. **Add subtle animations** that don't distract from content

### Current Setup
- ✅ Video elements are ready
- ✅ Fallback gradients are in place
- ✅ Error handling implemented
- ✅ Responsive design maintained
- 📹 **Waiting for your video files**

### Notes
- Videos will autoplay muted (required by browsers)
- If videos fail to load, beautiful gradient backgrounds will show
- The component is fully responsive and will work on all devices
- Performance optimized with proper video settings
