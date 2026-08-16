import React from 'react';
import { BookOpen, Quote } from 'lucide-react';
import { impressionData } from '../../data/impressionData';
import { TypewriterStream } from '../TypewriterStream';

export const HumanitySection: React.FC = () => {
  const data = impressionData.slide2;

  return (
    <section id="humanity" className="section-container humanity-section">
      <div className="section-badge">
        <BookOpen size={14} />
        <span>{data.chapter} · {data.subtitle}</span>
      </div>

      <h2 className="section-heading">
        代码背后的 <span className="gradient-text">精神图腾</span>
      </h2>

      <p className="section-subtitle">
        在纯粹的二进制与算法底层，跳动着对人性的关怀与改变世界的热望。
      </p>

      {/* Quotes Cards Grid */}
      <div className="quotes-grid">
        {data.quoteCards.map((card, idx) => (
          <div key={idx} className="quote-card">
            <Quote size={20} className="quote-icon" />
            <blockquote className="quote-text">“{card.quote}”</blockquote>
            <div className="quote-author-row">
              <span className="quote-author">—— {card.author}</span>
              <span className="quote-source">{card.source}</span>
            </div>
            <div className="quote-resonance-box">
              <strong>💡 Gemini 洞察：</strong>
              <span>{card.resonance}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Deep Narrative Stream */}
      <TypewriterStream
        text={data.deepNarrative}
        charDelay={12}
        step={3}
        title="✨ 开启 Gemini 人文哲学解析 (700+ 字)"
      />
    </section>
  );
};
