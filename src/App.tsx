import React, { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { FloatingNav, type SectionDef } from './components/FloatingNav';
import { HeroSection } from './components/sections/HeroSection';
import { HumanitySection } from './components/sections/HumanitySection';
import { ReposSection } from './components/sections/ReposSection';
import { ResonanceSection } from './components/sections/ResonanceSection';
import { TeleportSection } from './components/sections/TeleportSection';
import { audioSynthesizer } from './utils/audioSynthesizer';

const SECTIONS: SectionDef[] = [
  { id: 'hero', label: '卷首 · 星火' },
  { id: 'humanity', label: '观人 · 人文' },
  { id: 'repos', label: '藏库 · 75星宿' },
  { id: 'resonance', label: '共鸣 · 对话' },
  { id: 'teleport', label: '终章 · 原地TP' },
];

export const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState('hero');
  const [isMuted, setIsMuted] = useState(false);

  const handleJump = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioSynthesizer.setMuted(nextMuted);
    if (!nextMuted) {
      audioSynthesizer.playSuccess();
    }
  };

  // Observe active section when scrolling
  useEffect(() => {
    const observers = SECTIONS.map((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSectionId(sec.id);
            }
          });
        },
        { rootMargin: '-25% 0px -40% 0px', threshold: 0.1 }
      );

      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  return (
    <div className="app-vertical-layout">
      {/* Background Star Canvas */}
      <BackgroundCanvas />

      {/* Floating Navbar */}
      <FloatingNav
        sections={SECTIONS}
        activeId={activeSectionId}
        onJump={handleJump}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Continuous Long Scroll Content */}
      <main className="main-scroll-content">
        <HeroSection />
        <HumanitySection />
        <ReposSection />
        <ResonanceSection />
        <TeleportSection />
      </main>
    </div>
  );
};

export default App;
