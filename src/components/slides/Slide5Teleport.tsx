import React, { useState } from 'react';
import { Rocket, Sparkles, ExternalLink } from 'lucide-react';
import { IMPRESSION_DATA } from '../../data/impressionData';
import { audioSynth } from '../../utils/audioSynthesizer';
import TypewriterStream from '../TypewriterStream';

interface Slide5TeleportProps {
  onTriggerTeleport: () => void;
  isTeleporting: boolean;
}

export default function Slide5Teleport({ onTriggerTeleport, isTeleporting }: Slide5TeleportProps) {
  const { creator, chapters } = IMPRESSION_DATA;
  const slideData = chapters[4];
  const [teleportCount, setTeleportCount] = useState<number>(0);

  const handleTeleportClick = () => {
    audioSynth.playWarpSound();
    setTeleportCount((prev) => prev + 1);
    onTriggerTeleport();
  };

  return (
    <div className="tp-container" style={{ maxWidth: '950px' }}>
      <div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.3rem' }}>
          终章：<span className="gradient-text-pink">通往未来的 TP 传送门</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          致敬 VincentZyu 的招牌名言 “原地 tp” 🌀 点击传送按钮解锁曲速跃迁！
        </p>
      </div>

      {/* Closing Manifesto Typewriter Stream */}
      <TypewriterStream fullText={slideData.streamText} speed={15} />

      <button
        className={`tp-portal-btn ${isTeleporting ? 'teleporting' : ''}`}
        onClick={handleTeleportClick}
        onMouseEnter={() => audioSynth.playHoverPop()}
        style={{ marginTop: '0.8rem' }}
      >
        <Rocket className="tp-icon" />
        <span className="tp-text">原地 TP !</span>
        {teleportCount > 0 && (
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.2rem' }}>
            已跃迁 {teleportCount} 次
          </span>
        )}
      </button>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
        <a
          href={creator.blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn"
          style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
          onMouseEnter={() => audioSynth.playHoverPop()}
        >
          <ExternalLink size={16} /> 访问 VincentZyu VitePress 博客
        </a>

        <a
          href={creator.orgUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn"
          style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem', borderColor: 'var(--primary-pink)' }}
          onMouseEnter={() => audioSynth.playHoverPop()}
        >
          <Sparkles size={16} color="#ff69b4" /> 浏览 VincentZyuApps 仓库
        </a>
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.4rem', fontFamily: 'var(--font-sans)' }}>
        LXGW WenKai Font & Stream Animation | Gemini 3.6 Flash | Port 40805
      </div>
    </div>
  );
}
