import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { memoryVideos } from '../data/videos';

interface MessageSectionProps {
  soundEnabled: boolean;
  playVideo: (video: HTMLVideoElement) => Promise<void>;
  registerVideo: (video: HTMLVideoElement) => void;
  unregisterVideo: (video: HTMLVideoElement) => void;
}

export const MessageSection: React.FC<MessageSectionProps> = ({ soundEnabled, playVideo, registerVideo, unregisterVideo }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) registerVideo(video);
    });

    return () => {
      videoRefs.current.forEach(video => {
        if (video) unregisterVideo(video);
      });
    };
  }, [registerVideo, unregisterVideo]);
  return (
    <section className="min-h-screen snap-start">
      <div className="flex flex-col lg:flex-row">
        {/* Left sticky content */}
        <div className="lg:w-1/2 lg:sticky lg:top-24 lg:h-screen flex items-center p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Work Bestie Memories
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p className="text-white/90 font-medium">
                Sometimes we forget to thank the people who make our life better just by being in it, so thank you for being you. 💫
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right scrollable content */}
        <div className="lg:w-1/2 space-y-8 p-8">
          {memoryVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="min-h-[80vh] flex items-center justify-center"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl max-w-sm">
                <div className="w-full h-80 mb-6">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video.url}
                    className="w-full h-full object-cover rounded-2xl hover-glow"
                    muted={!soundEnabled}
                    loop
                    playsInline
                    onClick={(e) => playVideo(e.currentTarget)}
                    style={{ aspectRatio: '9/16' }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {video.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    No text in mind, so just used: ‘Hope is good thing —maybe the best of all
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};