import { motion } from 'framer-motion';

interface SwingingLabubuProps {
  size?: number;
  swingAmount?: number;
  duration?: number;
  className?: string;
}

export const SwingingLabubu: React.FC<SwingingLabubuProps> = ({
  size = 250,
  swingAmount = 15,
  duration = 3,
  className = ""
}) => {
  return (
    <section className={`h-screen flex items-center justify-center snap-start relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" />

      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Left side - Message */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Keep Swinging Forward
          </h2>
          <div className="space-y-4 text-white/80 text-lg sm:text-xl leading-relaxed">
            <p>
              Life is like a pendulum, it swings back and forth, but it always finds its balance.
            </p>
            <p className="text-white/90 font-medium">
              Just like this little Labubu, keep moving forward with grace and joy.
            </p>
          </div>
        </motion.div>

        {/* Right side - Swinging Labubu */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 flex flex-col items-center"
        >
          {/* Swing Chain */}
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-20 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-lg" />
          </div>

          {/* Swinging Labubu */}
          <motion.div
            animate={{
              rotate: [-swingAmount, swingAmount, -swingAmount]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: [0.445, 0.05, 0.55, 0.95]
            }}
            style={{ transformOrigin: 'top center' }}
            className="inline-block"
          >
            <motion.img
              src="/Labubu-Doll.png"
              alt="Swinging Labubu Keychain"
              style={{ width: `min(${size}px, 60vw)`, height: `min(${size}px, 60vw)` }}
              className="object-contain drop-shadow-2xl"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};