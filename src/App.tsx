import { useState, useCallback } from 'react';
import { IntroSection } from './components/IntroSection';

import { VolumePrompt } from './components/VolumePrompt';
import { OutroSection } from './components/OutroSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { InitialLoader } from './components/InitialLoader';
import { StarfieldBackground } from './components/StarfieldBackground';
import { AudioControl } from './components/AudioControl';
import { AnimatedGallery } from './components/AnimatedGallery';
import { ReelsCarousel } from './components/ReelsCarousel';
import { MessageSection } from './components/MessageSection';
import { SmiskiGif } from './components/SmiskiGif';
import { SwingingLabubu } from './components/SwingingLabubu';
import { Footer } from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { useVideoManager } from './hooks/useVideoManager';

import type { AppState } from './types';

const App: React.FC = () => {
  const { playVideo, registerVideo, unregisterVideo } = useVideoManager();
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const [appState, setAppState] = useState<AppState>({
    soundEnabled: null,
    currentVideoIndex: 0,
    isLoading: false,
    error: null,
  });
  const [volume, setVolume] = useState(0.7);

  const handleInitialLoaderComplete = useCallback(() => {
    setShowInitialLoader(false);
  }, []);

  const handleVolumeConfirm = useCallback((soundEnabled: boolean) => {
    setAppState(prev => ({ ...prev, soundEnabled }));
  }, []);

  const toggleSound = useCallback(() => {
    setAppState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (newVolume === 0) {
      setAppState(prev => ({ ...prev, soundEnabled: false }));
    } else if (!appState.soundEnabled) {
      setAppState(prev => ({ ...prev, soundEnabled: true }));
    }
  }, [appState.soundEnabled]);



  if (showInitialLoader) {
    return <InitialLoader onComplete={handleInitialLoaderComplete} />;
  }

  if (appState.soundEnabled === null) {
    return <VolumePrompt onConfirm={handleVolumeConfirm} />;
  }

  if (appState.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <CustomCursor />
      <StarfieldBackground />
      <main
        className="snap-y snap-mandatory overflow-y-scroll h-screen w-full relative z-10 touch-pan-y overscroll-y-contain"
        role="main"
        aria-label="Video showcase application"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Professional Audio Control */}
        <AudioControl
          soundEnabled={!!appState.soundEnabled}
          onToggle={toggleSound}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
        <IntroSection />
        {/* {videoSections} */}
        <ReelsCarousel soundEnabled={!!appState.soundEnabled} playVideo={playVideo} registerVideo={registerVideo} unregisterVideo={unregisterVideo} />

        <MessageSection soundEnabled={!!appState.soundEnabled} playVideo={playVideo} registerVideo={registerVideo} unregisterVideo={unregisterVideo} />

        <SwingingLabubu />
        <SmiskiGif />
        <AnimatedGallery />
        <OutroSection id="outro" />
        <Footer />
      </main>
    </ErrorBoundary>
  );
};

export default App;
