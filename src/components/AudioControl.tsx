import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AudioControlProps {
  soundEnabled: boolean;
  onToggle: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const AudioControl: React.FC<AudioControlProps> = ({
  soundEnabled,
  onToggle,
  volume,
  onVolumeChange,
}) => {
  const [showSlider, setShowSlider] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 md:top-6 md:bottom-auto z-50 flex items-center gap-3">
      {/* Volume Slider */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: showSlider && soundEnabled ? 1 : 0,
          x: showSlider && soundEnabled ? 0 : 20
        }}
        className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
      >
        <span className="text-xs text-white/60">0</span>
        <div className="relative w-20 h-1 bg-white/20 rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-200"
            style={{ width: `${volume * 100}%` }}
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <span className="text-xs text-white/60">100</span>
      </motion.div>

      {/* Audio Toggle Button */}
      <motion.button
        onClick={onToggle}
        onHoverStart={() => setShowSlider(true)}
        onHoverEnd={() => setShowSlider(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 bg-black/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-200 group"
      >
        <motion.div
          animate={{ 
            rotate: soundEnabled ? 0 : 180,
            scale: soundEnabled ? 1 : 0.9
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {soundEnabled ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
        </motion.div>
        
        {/* Pulse effect on click */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: soundEnabled ? [1, 1.5] : 1, opacity: soundEnabled ? [0.5, 0] : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </motion.button>
    </div>
  );
};