export const APP_CONFIG = {
  INTERSECTION_THRESHOLD: 0.6,
  SCROLL_BEHAVIOR: 'smooth' as const,
  ANIMATION_DURATION: 0.45,
  VIDEO_PRELOAD: 'metadata' as const,
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export const ARIA_LABELS = {
  VIDEO_SECTION: (index: number) => `Video section ${index + 1}`,
  VOLUME_PROMPT: 'Audio settings dialog',
  INTRO_SECTION: 'Introduction section',
  OUTRO_SECTION: 'Conclusion section',
} as const;