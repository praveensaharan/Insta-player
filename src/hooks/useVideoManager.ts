import { useRef, useCallback, useEffect } from 'react';

export const useVideoManager = () => {
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const videoElementsRef = useRef<Set<HTMLVideoElement>>(new Set());

  const playVideo = useCallback((videoElement: HTMLVideoElement) => {
    // Pause currently active video
    if (activeVideoRef.current && activeVideoRef.current !== videoElement) {
      activeVideoRef.current.pause();
    }
    
    // Set new active video and play
    activeVideoRef.current = videoElement;
    return videoElement.play().catch(() => {});
  }, []);

  const pauseActiveVideo = useCallback(() => {
    if (activeVideoRef.current) {
      activeVideoRef.current.pause();
      activeVideoRef.current = null;
    }
  }, []);

  const registerVideo = useCallback((videoElement: HTMLVideoElement) => {
    videoElementsRef.current.add(videoElement);
    
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              playVideo(video);
            } else if (video === activeVideoRef.current) {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );
    }
    
    observerRef.current.observe(videoElement);
  }, [playVideo]);

  const unregisterVideo = useCallback((videoElement: HTMLVideoElement) => {
    videoElementsRef.current.delete(videoElement);
    if (observerRef.current) {
      observerRef.current.unobserve(videoElement);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { playVideo, pauseActiveVideo, registerVideo, unregisterVideo };
};