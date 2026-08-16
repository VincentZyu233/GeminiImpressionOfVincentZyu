import React from 'react';
import { Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';
import { audioSynthesizer } from '../utils/audioSynthesizer';

export interface SectionDef {
  id: string;
  label: string;
}

interface FloatingNavProps {
  sections: SectionDef[];
  activeId: string;
  onJump: (id: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  sections,
  activeId,
  onJump,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="floating-navbar">
      <div className="navbar-container">
        {/* Brand Left */}
        <div className="navbar-brand" onClick={() => onJump('hero')}>
          <Sparkles size={16} className="text-pink-400 animate-pulse" />
          <span className="brand-text">Gemini · 印象长卷</span>
          <span className="brand-port-badge" title="Vincent 生日专属节点">
            :40805
          </span>
        </div>

        {/* Section Links */}
        <nav className="navbar-links">
          {sections.map((sec) => (
            <button
              key={sec.id}
              className={`nav-tab-btn ${activeId === sec.id ? 'active' : ''}`}
              onClick={() => {
                onJump(sec.id);
                audioSynthesizer.playHover();
              }}
            >
              {sec.label}
            </button>
          ))}
        </nav>

        {/* Action Controls Right */}
        <div className="navbar-actions">
          <button
            className="mute-toggle-btn"
            onClick={onToggleMute}
            title={isMuted ? '开启音效' : '静音'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-pink-400" />}
            <span className="mute-text">{isMuted ? '静音' : '音效'}</span>
          </button>

          <button
            className="nav-tp-quick-btn"
            onClick={() => {
              onJump('teleport');
              audioSynthesizer.playWarp();
            }}
            title="一键跃迁至终章"
          >
            <Compass size={14} />
            <span>原地 TP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
