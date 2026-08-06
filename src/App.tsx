import React, { useState, useEffect, useRef } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navigation from './components/Navigation';
import Slide1Spark from './components/slides/Slide1Spark';
import Slide2Humanity from './components/slides/Slide2Humanity';
import Slide3Garden from './components/slides/Slide3Garden';
import Slide4Resonance from './components/slides/Slide4Resonance';
import Slide5Teleport from './components/slides/Slide5Teleport';
import { audioSynth } from './utils/audioSynthesizer';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isTeleporting, setIsTeleporting] = useState<boolean>(false);
  const totalSlides = 5;
  const isScrollingRef = useRef<boolean>(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && ['input', 'textarea'].includes(activeEl.tagName.toLowerCase())) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        if (currentSlide < totalSlides) {
          audioSynth.playSlideChime();
          setCurrentSlide((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentSlide > 1) {
          audioSynth.playSlideChime();
          setCurrentSlide((prev) => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Wheel scroll throttling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) return;
      const target = e.target as HTMLElement | null;
      if (target && ['input', 'textarea', '.dialogue-box'].some(sel => target.closest(sel))) return;

      if (Math.abs(e.deltaY) > 35) {
        isScrollingRef.current = true;
        if (e.deltaY > 0 && currentSlide < totalSlides) {
          audioSynth.playSlideChime();
          setCurrentSlide((prev) => prev + 1);
        } else if (e.deltaY < 0 && currentSlide > 1) {
          audioSynth.playSlideChime();
          setCurrentSlide((prev) => prev - 1);
        }
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 700);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSlide]);

  const handleTriggerTeleport = () => {
    setIsTeleporting(true);
    setTimeout(() => {
      setIsTeleporting(false);
      setCurrentSlide(1);
    }, 1200);
  };

  return (
    <div className="app-container">
      {/* Background Particle & Starfield Canvas */}
      <BackgroundCanvas currentSlide={currentSlide} isTeleporting={isTeleporting} />

      {/* Global Navigation Controls */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSlideChange={(slideIndex: number) => setCurrentSlide(slideIndex)}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
      />

      {/* Slide Viewport */}
      <main className="slides-viewport">
        <div className={`slide-wrapper ${currentSlide === 1 ? 'active' : currentSlide > 1 ? 'prev' : ''}`}>
          <Slide1Spark />
        </div>

        <div className={`slide-wrapper ${currentSlide === 2 ? 'active' : currentSlide > 2 ? 'prev' : ''}`}>
          <Slide2Humanity />
        </div>

        <div className={`slide-wrapper ${currentSlide === 3 ? 'active' : currentSlide > 3 ? 'prev' : ''}`}>
          <Slide3Garden />
        </div>

        <div className={`slide-wrapper ${currentSlide === 4 ? 'active' : currentSlide > 4 ? 'prev' : ''}`}>
          <Slide4Resonance />
        </div>

        <div className={`slide-wrapper ${currentSlide === 5 ? 'active' : ''}`}>
          <Slide5Teleport onTriggerTeleport={handleTriggerTeleport} isTeleporting={isTeleporting} />
        </div>
      </main>
    </div>
  );
}
