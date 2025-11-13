import React from 'react';
import { motion } from 'framer-motion';
import { useVideoPreloader } from '../hooks/useVideoPreloader';
import { useContent } from '../hooks/useContent';

interface InitialLoaderProps {
  onComplete: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const { progress, isComplete } = useVideoPreloader();
  const content = useContent();

  React.useEffect(() => {
    if (isComplete) {
      setTimeout(onComplete, 800);
    }
  }, [isComplete, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center px-4 py-8">
      <div className="text-center w-full max-w-sm sm:max-w-md mx-auto">
        {/* Apple-style loading animation */}
        <div className="mb-8">
          <div className="card">
            <div className="loader">
              <p>loading</p>
              <div className="words">
                {content.initialLoader.loadingWords.map((word, index) => (
                  <span key={index} className="word">{word}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-64 h-1 bg-neutral-800 rounded-full mb-6 mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Welcome text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-xl sm:text-2xl font-semibold text-white">
            {content.initialLoader.title}
          </h1>
        </motion.div>
      </div>

      <style jsx>{`
        .card {
          --bg-color: #000;
          background-color: var(--bg-color);
          padding: 1rem 2rem;
          border-radius: 1.25rem;
          border: 1px solid #333;
        }
        .loader {
          color: rgb(124, 124, 124);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 500;
          font-size: clamp(18px, 4vw, 25px);
          box-sizing: content-box;
          height: 40px;
          padding: 10px 10px;
          display: flex;
          border-radius: 8px;
        }
        .words {
          overflow: hidden;
          position: relative;
        }
        .words::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            var(--bg-color) 10%,
            transparent 30%,
            transparent 70%,
            var(--bg-color) 90%
          );
          z-index: 20;
        }
        .word {
          display: block;
          height: 100%;
          padding-left: 6px;
          color: #ffffff;
          animation: spin_4991 4s infinite;
        }
        @keyframes spin_4991 {
          10% { transform: translateY(-102%); }
          25% { transform: translateY(-100%); }
          35% { transform: translateY(-202%); }
          50% { transform: translateY(-200%); }
          60% { transform: translateY(-302%); }
          75% { transform: translateY(-300%); }
          85% { transform: translateY(-402%); }
          100% { transform: translateY(-400%); }
        }
      `}</style>
    </div>
  );
};