export interface Video {
  id: string;
  name: string;
  url: string;
  duration?: number;
  thumbnail?: string;
}

export interface VideoSectionProps {
  src: string;
  index: number;
  onEnded?: (index: number) => void;
  soundEnabled: boolean | null;
}

export interface VolumePromptProps {
  onConfirm: (soundEnabled: boolean) => void;
}

export interface OutroSectionProps {
  id?: string;
}

export interface InitialLoaderProps {
  onComplete: () => void;
}

export interface AppState {
  soundEnabled: boolean | null;
  currentVideoIndex: number;
  isLoading: boolean;
  error: string | null;
}

export type VideoLoadState = 'idle' | 'loading' | 'loaded' | 'error';