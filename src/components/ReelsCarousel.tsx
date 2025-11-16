import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { reelsVideos } from '../data/videos';

interface ReelsCarouselProps {
  soundEnabled: boolean;
  playVideo: (video: HTMLVideoElement) => Promise<void>;
  registerVideo: (video: HTMLVideoElement) => void;
  unregisterVideo: (video: HTMLVideoElement) => void;
}

export const ReelsCarousel: React.FC<ReelsCarouselProps> = ({ soundEnabled, playVideo, registerVideo, unregisterVideo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const lastInteraction = useRef(0);
  const scrollTimeout = useRef<number | null>(null);

  const nextReel = useCallback(() => {
    const nextIndex = (currentIndex + 1) % reelsVideos.length;
    setCurrentIndex(nextIndex);
    
    // Play the next video after state update
    setTimeout(() => {
      const nextVideo = videoRefs.current[nextIndex];
      if (nextVideo) {
        playVideo(nextVideo);
      }
    }, 100);
  }, [currentIndex, playVideo]);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    const now = Date.now();
    if (now - lastInteraction.current < 300) return;
    lastInteraction.current = now;
    
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (direction === 'next' && currentIndex < reelsVideos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex]);

  const handleDragStart = () => setIsDragging(true);
  
  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 80;
    const velocity = Math.abs(info.velocity.x);
    
    if (velocity > 500 || Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        navigate('prev');
      } else {
        navigate('next');
      }
    }
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          registerVideo(video);
        } else {
          unregisterVideo(video);
        }
      }
    });
  }, [currentIndex, registerVideo, unregisterVideo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        
        scrollTimeout.current = setTimeout(() => {
          if (e.deltaX > 0) {
            navigate('next');
          } else {
            navigate('prev');
          }
        }, 150);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      videoRefs.current.forEach(video => {
        if (video) unregisterVideo(video);
      });
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [currentIndex, unregisterVideo, navigate]);

  return (
    <section className="h-screen flex flex-col items-center justify-center snap-start px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(800px 800px at 30% 20%, #0ea5e9, transparent)',
            'radial-gradient(800px 800px at 70% 80%, #8b5cf6, transparent)',
            'radial-gradient(800px 800px at 50% 50%, #10b981, transparent)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
          Just some cringey reels
        </h2>
        <p className="text-white/70 text-lg">Moments that define our coworker </p>
      </motion.div>

      <div className="relative w-80 h-[500px] mx-auto z-10">
        <motion.div
          className={`flex select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          animate={{ x: -currentIndex * 320 }}
          drag="x"
          dragConstraints={{ left: -120, right: 120 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            mass: 0.8
          }}
        >
          {reelsVideos.map((reel, index) => (
            <motion.div
              key={reel.id}
              className="flex-shrink-0 w-80 px-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl">
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={reel.url}
                  className="w-full h-[500px] object-cover"
                  muted={!soundEnabled}
                  playsInline
                  onEnded={nextReel}
                  onLoadedData={() => {
                    if (index === currentIndex) {
                      const video = videoRefs.current[index];
                      if (video) playVideo(video);
                    }
                  }}
                  loop={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
      >
        {reelsVideos.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>
    </section>
  );
};