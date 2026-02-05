'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress, FaDownload, FaShare, FaHeart, FaClock, FaCalendar, FaUser, FaMicrophone, FaVideo, FaFileAudio } from 'react-icons/fa';
import SermonStorage from '@/lib/sermonStorage';

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description: string;
  type: 'video' | 'audio';
  url: string;
  thumbnail?: string;
  views: number;
  likes: number;
  category: 'friday-khutbah' | 'lecture' | 'quran-recitation' | 'educational';
}

const SermonStreaming: React.FC = () => {
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load sermons from storage on mount and set up interval for updates
  useEffect(() => {
    const loadSermons = () => {
      const storedSermons = SermonStorage.getSermons();
      console.log('Loading sermons from storage:', storedSermons);
      const formattedSermons = storedSermons.map(sermon => {
        // Check if the video URL is a blob URL that might be invalid
        let videoUrl = sermon.videoUrl;
        if (sermon.videoUrl && sermon.videoUrl.startsWith('blob:')) {
          console.log('Detected blob URL, checking validity:', sermon.videoUrl);
          // For blob URLs, we'll use a fallback approach
          videoUrl = sermon.videoUrl; // Keep the blob URL, but add error handling
        }
        
        const formatted = {
          ...sermon,
          url: videoUrl,
          type: sermon.type || 'video',
          thumbnail: sermon.thumbnail,
          likes: Math.floor(sermon.views * 0.07), // Estimate likes from views
          category: (sermon.category || 'lecture').toLowerCase().replace(' ', '-') as any
        };
        console.log('Formatted sermon:', formatted);
        console.log('Video URL type:', typeof formatted.url, 'URL:', formatted.url);
        return formatted;
      });
      setSermons(formattedSermons);
    };

    // Initial load
    loadSermons();

    // Set up interval to check for new sermons every 2 seconds
    const interval = setInterval(loadSermons, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectSermon = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    SermonStorage.incrementViews(sermon.id);
    // Update the sermon in local state to reflect the new view count
    setSermons(prev => prev.map(s => 
      s.id === sermon.id ? { ...s, views: s.views + 1 } : s
    ));
    
    // Reset player state
    setIsPlaying(false);
    setCurrentTime(0);
    
    // Load the video/audio element with a longer delay
    setTimeout(() => {
      if (sermon.type === 'video' && videoRef.current) {
        const video = videoRef.current;
        video.load();
        
        // Try to autoplay after loading
        video.addEventListener('loadeddata', () => {
          // Don't autoplay, let user click play
          console.log('Video loaded, ready for user to play');
        });
        
        video.addEventListener('canplay', () => {
          console.log('Video can play');
        });
        
      } else if (sermon.type === 'audio' && audioRef.current) {
        const audio = audioRef.current;
        audio.load();
        
        audio.addEventListener('loadeddata', () => {
          console.log('Audio loaded, ready for user to play');
        });
      }
    }, 300);
  };

  const categoryColors = {
    'friday-khutbah': 'bg-emerald-500',
    'lecture': 'bg-blue-500',
    'quran-recitation': 'bg-purple-500',
    'educational': 'bg-amber-500'
  };

  const handlePlayPause = () => {
    // This function is disabled since we're using native controls
    // Users should use the native video controls instead
    console.log('Custom play/pause disabled - use native controls');
    
    // If you want to enable custom controls, uncomment below:
    /*
    if (selectedSermon?.type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => {
          console.log('Autoplay prevented:', e);
        });
      }
    } else if (selectedSermon?.type === 'audio' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.log('Autoplay prevented:', e);
        });
      }
    }
    setIsPlaying(!isPlaying);
    */
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
    if (audioRef.current) audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    if (videoRef.current) videoRef.current.currentTime = time;
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const MediaPlayer = () => {
    if (!selectedSermon) return null;

    return (
      <div className="bg-black rounded-lg overflow-hidden">
        {selectedSermon.type === 'video' ? (
          <video
            ref={videoRef}
            className="w-full aspect-video"
            src={selectedSermon.url}
            controls
            preload="metadata"
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onEnded={() => setIsPlaying(false)}
            onPlay={(e) => {
              console.log('Video play event triggered');
              setIsPlaying(true);
            }}
            onPause={(e) => {
              console.log('Video pause event triggered');
              setIsPlaying(false);
            }}
            onWaiting={(e) => {
              console.log('Video waiting/buffering');
            }}
            onCanPlay={(e) => {
              console.log('Video can play');
            }}
            onError={(e) => {
              console.error('Video loading error:', e);
              console.log('Failed URL:', selectedSermon.url);
              
              // If it's a blob URL, try to use a fallback
              if (selectedSermon.url && selectedSermon.url.startsWith('blob:')) {
                console.log('Blob URL failed, trying fallback...');
                // Try to use a working sample video as fallback
                const fallbackUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
                if (videoRef.current) {
                  videoRef.current.src = fallbackUrl;
                  videoRef.current.load();
                }
              } else {
                // For non-blob URLs, just try to reload
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }
            }}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="bg-gradient-to-br from-emerald-900 to-blue-900 aspect-video flex items-center justify-center">
            <div className="text-center text-white">
              <FaFileAudio className="text-6xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">{selectedSermon.title}</h3>
              <p className="text-lg opacity-80">Audio Sermon</p>
              <audio
                ref={audioRef}
                controls
                preload="metadata"
                src={selectedSermon.url}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onEnded={() => setIsPlaying(false)}
                onPlay={(e) => {
                  console.log('Audio play event triggered');
                  setIsPlaying(true);
                }}
                onPause={(e) => {
                  console.log('Audio pause event triggered');
                  setIsPlaying(false);
                }}
                onWaiting={(e) => {
                  console.log('Audio waiting/buffering');
                }}
                onCanPlay={(e) => {
                  console.log('Audio can play');
                }}
                onError={(e) => {
                  console.error('Audio loading error:', e);
                  // Try to reload the audio
                  if (audioRef.current) {
                    audioRef.current.load();
                  }
                }}
              >
                Your browser does not support the audio tag.
              </audio>
            </div>
          </div>
        )}

        {/* Video Controls - Using Native Controls Only */}
        <div className="bg-gray-900 p-4">
          <div className="text-center text-gray-400 text-sm">
            <p>📹 Use the native video controls above to play, pause, and control playback</p>
            <p className="text-xs mt-1">💡 Browser requires user interaction to start playback</p>
          </div>
        </div>
      </div>
    );
  };

  const SermonCard = ({ sermon }: { sermon: Sermon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={() => handleSelectSermon(sermon)}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer border border-gray-100"
    >
      <div className="relative">
        <div className={`h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center`}>
          {sermon.type === 'video' ? (
            <FaVideo className="text-4xl text-white/50" />
          ) : (
            <FaFileAudio className="text-4xl text-white/50" />
          )}
        </div>
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-white ${categoryColors[sermon.category]}`}>
          {sermon.category.replace('-', ' ')}
        </div>
        <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-white text-xs">
          {sermon.duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{sermon.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{sermon.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            <FaUser className="text-emerald-500" />
            <span>{sermon.speaker}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendar className="text-blue-500" />
            <span>{new Date(sermon.date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{sermon.views} views</span>
            <span className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              {sermon.likes}
            </span>
          </div>
          <button className="text-emerald-500 hover:text-emerald-600 font-medium text-sm">
            Play →
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Sermon Library</h2>
          <p className="text-xl text-gray-600 mb-8">Watch and listen to inspiring Islamic content</p>
        </motion.div>

        {/* Main Player */}
        <AnimatePresence>
          {selectedSermon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <MediaPlayer />
              
              {/* Sermon Info */}
              <div className="bg-white rounded-lg p-6 mt-4 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedSermon.title}</h3>
                <p className="text-gray-600 mb-4">{selectedSermon.description}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <FaUser className="text-emerald-500" />
                    {selectedSermon.speaker}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCalendar className="text-blue-500" />
                    {new Date(selectedSermon.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaClock className="text-purple-500" />
                    {selectedSermon.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sermons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {Object.keys(categoryColors).map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 capitalize"
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SermonStreaming;
