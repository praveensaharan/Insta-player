import { motion } from 'framer-motion';
import type { VolumePromptProps } from '../types';
import { ARIA_LABELS } from '../constants';

export const VolumePrompt: React.FC<VolumePromptProps> = ({ onConfirm }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="volume-prompt fixed inset-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            style={{ cursor: 'auto' }}
            role="dialog"
            aria-modal="true"
            aria-label={ARIA_LABELS.VOLUME_PROMPT}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                className="relative w-full max-w-md mx-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                <div className="relative p-8 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="opacity-90">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-semibold text-white mb-3 tracking-tight"
                    >
                        Audio Experience
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/70 text-sm leading-relaxed mb-8"
                    >
                        We have a few short audio clips, so please wear headphones or mute the audio as needed.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col gap-3"
                    >
                        <button
                            onClick={() => onConfirm(true)}
                            className="w-full py-4 bg-white text-black rounded-2xl font-medium text-sm hover:bg-white/90 active:bg-white/80 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                            style={{ cursor: 'pointer' }}
                        >
                            Enable Audio
                        </button>
                        <button
                            onClick={() => onConfirm(false)}
                            className="w-full py-4 bg-white/10 text-white/90 rounded-2xl font-medium text-sm hover:bg-white/20 active:bg-white/5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm border border-white/10"
                            style={{ cursor: 'pointer' }}
                        >
                            Continue Silently
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};
