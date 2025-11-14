import { useState, useEffect } from 'react';
import { reelsVideos, memoryVideos } from '../data/videos';

export const useVideoPreloader = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalVideos] = useState(reelsVideos.length + memoryVideos.length);
  const [isComplete, setIsComplete] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const allVideos = [...reelsVideos, ...memoryVideos];
    let completed = 0;

    const preloadVideo = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        
        const onLoad = () => {
          completed++;
          setLoadedCount(completed);
          resolve();
        };

        video.addEventListener('loadedmetadata', onLoad);
        video.addEventListener('error', onLoad); // Continue even if video fails
        video.src = url;
      });
    };

    const preloadAll = async () => {
      await Promise.all(allVideos.map(video => preloadVideo(video.url)));
      setVideosLoaded(true);
    };

    // Minimum 3-second timer
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 3000);

    preloadAll();

    return () => clearTimeout(timer);
  }, [totalVideos]);

  // Complete only when both videos are loaded AND minimum time has elapsed
  useEffect(() => {
    if (videosLoaded && minTimeElapsed) {
      setIsComplete(true);
    }
  }, [videosLoaded, minTimeElapsed]);

  const progress = Math.round((loadedCount / totalVideos) * 100);

  return { progress, isComplete, loadedCount, totalVideos, videosLoaded, minTimeElapsed };
};