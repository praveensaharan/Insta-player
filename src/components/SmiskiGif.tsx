import { motion } from 'framer-motion';

export const SmiskiGif: React.FC = () => {
  return (
    <section className="h-screen flex items-center justify-center snap-start relative overflow-hidden">
      <div className="absolute inset-0" />

      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-radial-gradient opacity-20" style={{
        background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.1) 0%, transparent 70%)'
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6"
      >
        {/* Main image container */}
        <motion.div
          className="relative mb-12"
          whileHover={{ y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-green-400/20 blur-3xl rounded-full scale-110" />

          <motion.img
            src="/smiski_glows.gif"
            alt="Glowing Smiski"
            className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-contain mx-auto rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl"
            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
            transition={{ duration: 0.4 }}
          />

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400/60 rounded-full"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 12}%`
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-200 to-green-400 mb-6">
            Trust & Hope
          </h2>
          
          <p className="text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light px-4">
            We don't build trust by offering help, we build trust by asking for it
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-8"
          >
            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <span className="text-white/60 text-sm font-medium tracking-wide">FRIENDSHIP MATTERS</span>
            </div>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};