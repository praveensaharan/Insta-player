import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoIntersection } from '../hooks/useVideoIntersection';
import { ARIA_LABELS, APP_CONFIG } from '../constants';
import type { VideoSectionProps, VideoLoadState } from '../types';

export const VideoSection: React.FC<VideoSectionProps> = ({
    src,
    index,
    onEnded,
    soundEnabled,
}) => {
    const [loadState, setLoadState] = useState<VideoLoadState>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleIntersection = useCallback((isIntersecting: boolean) => {
        const video = videoRef.current;
        if (!video) return;

        if (isIntersecting) {
            setLoadState('loading');
            video.play()
                .then(() => setLoadState('loaded'))
                .catch((err) => {
                    console.warn('Video autoplay failed:', err);
                    setLoadState('error');
                    setError('Autoplay failed');
                });
        } else {
            video.pause();
        }
    }, []);

    const videoRef = useVideoIntersection(handleIntersection);

    const handleVideoError = useCallback(() => {
        setLoadState('error');
        setError('Failed to load video');
    }, []);

    const handleVideoLoad = useCallback(() => {
        setLoadState('loaded');
        setError(null);
    }, []);

    const handleVideoEnded = useCallback(() => {
        onEnded?.(index);
    }, [onEnded, index]);

    return (
        <section
            id={`video-${index}`}
            className="h-screen flex items-center justify-center snap-start px-6"
            aria-label={ARIA_LABELS.VIDEO_SECTION(index)}
        >
            {/* Background vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(600px 300px at 50% 40%, rgba(255,255,255,0.02), transparent 10%), linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.6))",
                    mixBlendMode: "overlay",
                }}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: APP_CONFIG.ANIMATION_DURATION, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <div className="relative flex items-center justify-center">
                        {/* Device glow */}
                        <div
                            aria-hidden="true"
                            className="absolute -inset-6 rounded-3xl blur-3xl opacity-30"
                            style={{
                                background: "radial-gradient(closest-side, rgba(66,153,225,0.12), transparent 40%)",
                            }}
                        />

                        {/* Device frame */}
                        <div
                            className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10 flex items-center justify-center backdrop-blur-xl"
                            style={{
                                width: "min(70vh * 9 / 16, 920px)",
                                aspectRatio: "9 / 16",
                                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                            }}
                        >
                            {/* Scene indicator */}
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-sm text-white font-medium"
                            >
                                Scene {index + 1}
                            </motion.div>

                            {error ? (
                                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                                    <div className="text-red-400 mb-2">⚠️</div>
                                    <p className="text-neutral-300 text-sm">{error}</p>
                                </div>
                            ) : (
                                <video
                                    ref={videoRef}
                                    src={src}
                                    controls={false}
                                    muted={!soundEnabled}
                                    playsInline
                                    preload={APP_CONFIG.VIDEO_PRELOAD}
                                    className="w-full h-full object-cover"
                                    onEnded={handleVideoEnded}
                                    onError={handleVideoError}
                                    onLoadedData={handleVideoLoad}
                                    aria-label={`Video ${index + 1}`}
                                />
                            )}

                            {/* Status indicator */}
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute bottom-6 left-6 z-30 pointer-events-none"
                            >
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm text-white font-medium">
                                    {loadState === 'loading' ? 'Loading...' : soundEnabled ? '🔊 Audio' : '🔇 Muted'}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
};
