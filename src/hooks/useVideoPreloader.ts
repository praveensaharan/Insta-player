import { useState, useEffect } from 'react';
import { reelsVideos, memoryVideos } from '../data/videos';

export const useVideoPreloader = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalVideos] = useState(reelsVideos.length + memoryVideos.length);
  const [isComplete, setIsComplete] = useState(false);

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
      setIsComplete(true);
    };

    preloadAll();
  }, [totalVideos]);

  const progress = Math.round((loadedCount / totalVideos) * 100);

  return { progress, isComplete, loadedCount, totalVideos };
};