import { motion, useScroll, useTransform } from 'framer-motion';
import { useContent } from '../hooks/useContent';

export const IntroSection = () => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const y = useTransform(scrollY, [0, 300], [0, -100]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
    const content = useContent();

    return (
        <motion.section
            style={{ opacity, y, scale }}
            className="h-screen flex items-center justify-center snap-start relative overflow-hidden"
            aria-label="Introduction section"
        >
            {/* Animated background elements */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    background: [
                        'radial-gradient(600px 600px at 20% 30%, #0ea5e9, transparent)',
                        'radial-gradient(600px 600px at 80% 70%, #8b5cf6, transparent)',
                        'radial-gradient(600px 600px at 40% 90%, #10b981, transparent)'
                    ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            <div className="text-center max-w-4xl px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <motion.h1
                        className="text-6xl md:text-8xl font-black tracking-tight mb-8"
                        style={{
                            background: 'linear-gradient(135deg, #ffffff 0%, #0ea5e9 50%, #8b5cf6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    >
                        {content.introSection.title}
                    </motion.h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-12"
                >
                    {content.introSection.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                    className="flex items-center justify-center gap-4"
                >
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <span className="text-white/60 text-sm font-medium tracking-widest uppercase">{content.introSection.bottomText}</span>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </motion.div>
            </div>
        </motion.section>
    );
};
