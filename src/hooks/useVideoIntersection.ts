import { useEffect, useRef } from 'react';
import { APP_CONFIG } from '../constants';

export const useVideoIntersection = (onIntersect: (isIntersecting: boolean) => void) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isIntersecting = entry.isIntersecting && entry.intersectionRatio >= APP_CONFIG.INTERSECTION_THRESHOLD;
        onIntersect(isIntersecting);
      },
      { threshold: [APP_CONFIG.INTERSECTION_THRESHOLD] }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [onIntersect]);

  return videoRef;
};