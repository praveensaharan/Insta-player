import { motion } from 'framer-motion';
import type { OutroSectionProps } from '../types';
import { ARIA_LABELS } from '../constants';

export const OutroSection: React.FC<OutroSectionProps> = ({ id }) => {
    return (
        <section
            id={id}
            className="min-h-screen flex items-center justify-center snap-start relative overflow-hidden"
            aria-label={ARIA_LABELS.OUTRO_SECTION}
        >
            {/* Modern gradient background */}
            <div className="absolute inset-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />

            <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
                            >
                                <span className="text-white/70 text-sm font-medium tracking-wide">FINAL THOUGHTS</span>
                            </motion.div>

                            <h2 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 leading-tight">
                                Thank You
                            </h2>
                        </div>

                        <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                            <p>
                                Sometimes it's not where you work, it's who you work with that makes a job worth going to everyday.
                            </p>

                            <p className="text-purple-300 font-medium">
                                When you pull up at work on Monday 8th and remember your work bestie isn’t here anymore.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                            {/* Animated circles */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-white/10 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-8 border border-purple-400/20 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-16 border border-cyan-400/20 rounded-full"
                            />

                            {/* Center content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ y: [-10, 10, -10] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-center space-y-4"
                                >
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">✨</span>
                                    </div>
                                    <p className="text-white/60 text-sm font-medium">Keep Shining</p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
            </div>
        </section>
    );
};