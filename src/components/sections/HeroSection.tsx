import React from 'react';
import { Sparkles, Terminal, Heart, Compass, Cpu } from 'lucide-react';
import { impressionData } from '../../data/impressionData';
import { TypewriterStream } from '../TypewriterStream';
import { audioSynthesizer } from '../../utils/audioSynthesizer';

export const HeroSection: React.FC = () => {
  const data = impressionData.slide1;

  const handleScrollToRepos = () => {
    document.getElementById('repos')?.scrollIntoView({ behavior: 'smooth' });
    audioSynthesizer.playWarp();
  };

  return (
    <section id="hero" className="section-container hero-section">
      {/* Badge */}
      <div className="section-badge animate-float">
        <Sparkles size={14} className="text-pink-400" />
        <span>{data.chapter} · {data.subtitle}</span>
      </div>

      {/* Main Title */}
      <h1 className="hero-main-title">
        Gemini's Impression of <span className="gradient-text">VincentZyu</span>
      </h1>

      <p className="hero-motto">
        “{impressionData.user.motto}”
      </p>

      {/* Quick stats pills */}
      <div className="hero-pill-cluster">
        <div className="hero-pill">
          <Terminal size={14} className="text-pink-400" />
          <span>端口节点: <strong>40805</strong> (4月8日)</span>
        </div>
        <div className="hero-pill">
          <Cpu size={14} className="text-cyan-400" />
          <span>AI 协作者: <strong>Gemini 3.7</strong></span>
        </div>
        <div className="hero-pill">
          <Heart size={14} className="text-yellow-400" />
          <span>内核: <strong>极客浪漫主义</strong></span>
        </div>
      </div>

      {/* Spark Logs Grid */}
      <div className="hero-grid-cards">
        {data.identityBadges.map((badge, idx) => (
          <div key={idx} className="hero-feature-card">
            <span className="badge-tag">{badge.tag}</span>
            <h3 className="badge-title">{badge.title}</h3>
            <p className="badge-desc">{badge.desc}</p>
          </div>
        ))}
      </div>

      {/* Deep Narrative Stream */}
      <TypewriterStream
        text={data.deepNarrative}
        charDelay={12}
        step={3}
        title="✨ 开启 Gemini 序章宏观解析 (600+ 字)"
      />

      {/* Jump to 75 repos CTA */}
      <div className="hero-cta-box">
        <button
          className="hero-primary-cta"
          onClick={handleScrollToRepos}
          onMouseEnter={() => audioSynthesizer.playHover()}
        >
          <Compass size={18} />
          <span>漫游 VincentZyuApps 75 仓库星宿 ➔</span>
        </button>
      </div>
    </section>
  );
};
