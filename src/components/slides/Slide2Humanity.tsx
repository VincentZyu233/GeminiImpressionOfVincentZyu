import React from 'react';
import { Feather } from 'lucide-react';
import { IMPRESSION_DATA } from '../../data/impressionData';
import { audioSynth } from '../../utils/audioSynthesizer';
import TypewriterStream from '../TypewriterStream';

export default function Slide2Humanity() {
  const { quotes, chapters } = IMPRESSION_DATA;
  const slideData = chapters[1];

  return (
    <div style={{ width: '100%', maxWidth: '1000px', textAlign: 'center' }}>
      <div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.3rem' }}>
          第一章：<span className="gradient-text-blue">代码背后的温度</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          “More than machinery, we need humanity.” —— 那些被你刻进博客精神内核的名言
        </p>
      </div>

      {/* Streaming LLM Long-form Analysis */}
      <TypewriterStream fullText={slideData.streamText} speed={15} />

      <div className="quotes-grid">
        {quotes.map((q, idx) => (
          <div 
            key={idx} 
            className="glass-panel quote-card"
            onMouseEnter={() => audioSynth.playHoverPop()}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{q.icon}</span>
                <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'rgba(100, 181, 246, 0.15)', color: 'var(--primary-cyan)', border: '1px solid rgba(100, 181, 246, 0.3)' }}>
                  {q.tag}
                </span>
              </div>
              <p className="quote-content">“{q.quote}”</p>
            </div>

            <div>
              <div className="quote-author" style={{ fontSize: '0.85rem' }}>
                <Feather size={14} /> {q.author}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
