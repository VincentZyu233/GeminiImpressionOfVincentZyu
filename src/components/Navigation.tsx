import React from 'react';
import { Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { IMPRESSION_DATA } from '../data/impressionData';
import { audioSynth } from '../utils/audioSynthesizer';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (slideIndex: number) => void;
  soundOn: boolean;
  setSoundOn: (soundState: boolean) => void;
}

export default function Navigation({
  currentSlide,
  totalSlides,
  onSlideChange,
  soundOn,
  setSoundOn
}: NavigationProps) {
  const handleSoundToggle = () => {
    const newState = audioSynth.toggleSound();
    setSoundOn(newState);
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      audioSynth.playSlideChime();
      onSlideChange(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      audioSynth.playSlideChime();
      onSlideChange(currentSlide - 1);
    }
  };

  return (
    <>
      {/* Top Header */}
      <nav className="top-nav">
        <div className="brand-badge">
          <Sparkles size={20} className="gradient-text-pink" />
          <span className="gradient-text-pink">Gemini's Impression</span>
          <span className="port-tag">PORT :{IMPRESSION_DATA.creator.birthdayPort}</span>
        </div>

        <div className="nav-actions">
          <button 
            className="nav-btn" 
            onClick={prevSlide}
            disabled={currentSlide === 1}
            style={{ opacity: currentSlide === 1 ? 0.3 : 1 }}
            onMouseEnter={() => audioSynth.playHoverPop()}
          >
            <ChevronLeft size={16} /> 上一页
          </button>
          
          <button 
            className="nav-btn" 
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            style={{ opacity: currentSlide === totalSlides ? 0.3 : 1 }}
            onMouseEnter={() => audioSynth.playHoverPop()}
          >
            下一页 <ChevronRight size={16} />
          </button>

          <button 
            className="nav-btn" 
            onClick={handleSoundToggle}
            title="音效开关"
            onMouseEnter={() => audioSynth.playHoverPop()}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{soundOn ? "音效开启" : "静音"}</span>
          </button>
        </div>
      </nav>

      {/* Bottom Controls */}
      <div className="bottom-controls">
        <div className="slide-dots">
          {IMPRESSION_DATA.chapters.map((ch) => (
            <div
              key={ch.id}
              className={`dot ${currentSlide === ch.id ? 'active' : ''}`}
              onClick={() => {
                audioSynth.playSlideChime();
                onSlideChange(ch.id);
              }}
              onMouseEnter={() => audioSynth.playHoverPop()}
              title={`${ch.title} (${ch.subtitle})`}
            />
          ))}
        </div>

        <div className="keyboard-hint">
          <span className="key-cap">← / →</span> 或 <span className="key-cap">Space</span> 切换章节 | 端口: <span className="key-cap">40805</span>
        </div>
      </div>
    </>
  );
}
