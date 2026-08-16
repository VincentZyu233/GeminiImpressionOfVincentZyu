import React, { useState, useEffect } from 'react';
import { Github, Star } from 'lucide-react';
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

      {/* Corner Floating GitHub Widget (Bottom-Right) */}
      <aside className="corner-github-widget">
        <a
          href="https://github.com/VincentZyu233/GeminiImpressionOfVincentZyu"
          target="_blank"
          rel="noopener noreferrer"
          className="corner-github-pill"
          title="前往 GitHub 查看项目源码与点 Star"
          onClick={() => audioSynthesizer.playHover()}
        >
          <Github size={16} className="corner-github-icon" />
          <span className="corner-github-label">GitHub</span>
          <span className="corner-github-star">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span>Star</span>
          </span>
        </a>
      </aside>
    </div>
  );
};

export default App;
