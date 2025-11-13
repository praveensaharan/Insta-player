import { motion } from 'framer-motion';
import { useState } from 'react';

export const AnimatedGallery: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    { src: '/shakashaka.jpg', title: 'Shakashaka' },
    {
      src: '/shanshan.jpg', title: 'Shanshan'
    },
    { src: '/rarara.jpg', title: 'Rarara' },
    { src: '/pororon.jpg', title: 'Pororon' }
  ];

  return (
    <section className="h-screen flex flex-col items-center justify-center snap-start px-4 sm:px-6 relative overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0" />

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16 relative z-10">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 100,
              rotate: [15, -20, 12, -15][index],
              scale: 0.8
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            whileHover={{
              rotate: 0,
              y: -80,
              scale: hoveredIndex === index ? 1.4 : 1.1,
              zIndex: 50,
              filter: 'brightness(1.1) saturate(1.2)'
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: index * 0.1
            }}
            className="relative w-28 h-40 sm:w-32 sm:h-48 md:w-36 md:h-52 lg:w-44 lg:h-64 cursor-pointer group"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"
              animate={{
                opacity: hoveredIndex === index ? 0.8 : 0,
                scale: hoveredIndex === index ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />

            <img
              src={image.src}
              className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10 transform origin-bottom"
              alt={image.title}
            />

            {/* Overlay with title */}
            <motion.div
              className="absolute inset-0 bg-black/40 rounded-2xl flex items-end p-4"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg tracking-wide">
                {image.title}
              </span>
            </motion.div>

            {/* Floating particles */}
            {hoveredIndex === index && (
              <motion.div
                className="absolute -top-4 -right-4 w-2 h-2 bg-white rounded-full"
                animate={{
                  y: [-10, -30, -10],
                  x: [0, 10, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center relative z-10 space-y-6"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 mb-4">
          What's Meant For You
        </h1>

      </motion.div>

    </section>
  );
};