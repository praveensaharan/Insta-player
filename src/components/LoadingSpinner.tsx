import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050407] via-[#07060a] to-[#050407]">
      <div className="text-center">
        <motion.div
          className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-neutral-300 text-lg">Loading experience...</p>
      </div>
    </div>
  );
};