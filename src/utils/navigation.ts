import { APP_CONFIG } from '../constants';

export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: APP_CONFIG.SCROLL_BEHAVIOR });
  }
};

export const getNextVideoId = (currentIndex: number, totalVideos: number): string => {
  return currentIndex + 1 < totalVideos ? `video-${currentIndex + 1}` : 'outro';
};