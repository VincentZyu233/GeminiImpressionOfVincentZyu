import React from 'react';
import { Terminal, Heart, Compass } from 'lucide-react';
import { IMPRESSION_DATA } from '../../data/impressionData';
import TypewriterStream from '../TypewriterStream';

export default function Slide1Spark() {
  const { creator, chapters } = IMPRESSION_DATA;
  const slideData = chapters[0];

  return (
    <div className="spark-hero">
      <div className="avatar-halo">
        <img 
          src={creator.avatar} 
          alt={creator.name} 
          className="avatar-img"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = "https://github.com/VincentZyu233.png";
          }}
        />
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', background: 'rgba(255, 105, 180, 0.12)', padding: '0.35rem 0.9rem', borderRadius: '9999px', border: '1px solid rgba(255, 105, 180, 0.3)' }}>
        <Terminal size={15} color="#ff69b4" />
        <span style={{ fontSize: '0.8rem', color: '#ff69b4', fontFamily: 'var(--font-sans)' }}>
          AI Agent Stream Output // Gemini 3.6 Flash
        </span>
      </div>

      <h1 className="spark-title">
        星光、代码与<span className="gradient-text-pink">硅基共鸣</span>
      </h1>

      {/* Progressive LLM Token Typewriter Stream Container (>600 Chars) */}
      <TypewriterStream fullText={slideData.streamText} speed={15} />

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginTop: '1.2rem', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Heart size={18} color="#ff69b4" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>核心信仰</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{creator.motto}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Compass size={18} color="#64b5f6" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>专属生日节点</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Port :{creator.birthdayPort}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
