import React from 'react';
import { ExternalLink } from 'lucide-react';
import { IMPRESSION_DATA } from '../../data/impressionData';
import { audioSynth } from '../../utils/audioSynthesizer';
import TypewriterStream from '../TypewriterStream';

export default function Slide3Garden() {
  const { projects, chapters } = IMPRESSION_DATA;
  const slideData = chapters[2];

  return (
    <div style={{ width: '100%', maxWidth: '1000px', textAlign: 'center' }}>
      <div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.3rem' }}>
          第二章：<span className="gradient-text-gold">数字花园与灵感矩阵</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          从 VincentZyuApps 模块化隔离，到为 AI 定制的 AGENTS.md 规范
        </p>
      </div>

      {/* Streaming Long-form Architecture Prose */}
      <TypewriterStream fullText={slideData.streamText} speed={15} />

      <div className="apps-grid">
        {projects.map((p, idx) => (
          <a
            key={idx}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel app-card"
            onMouseEnter={() => audioSynth.playHoverPop()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span className="app-badge" style={{ borderColor: p.color, color: p.color }}>
                {p.badge}
              </span>
              <ExternalLink size={14} color="var(--text-muted)" />
            </div>

            <div className="app-title" style={{ color: p.color, fontSize: '1.05rem' }}>
              {p.title}
            </div>

            <p className="app-desc" style={{ fontSize: '0.85rem' }}>{p.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
