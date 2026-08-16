import React, { useState } from 'react';
import { Compass, ExternalLink, Zap, Github, Heart } from 'lucide-react';
import { impressionData } from '../../data/impressionData';
import { TypewriterStream } from '../TypewriterStream';
import { audioSynthesizer } from '../../utils/audioSynthesizer';

export const TeleportSection: React.FC = () => {
  const data = impressionData.slide5;
  const [tpCount, setTpCount] = useState(0);
  const [isWarping, setIsWarping] = useState(false);

  const handleTeleport = () => {
    setIsWarping(true);
    setTpCount((c) => c + 1);
    audioSynthesizer.playWarp();

    // Trigger pulse ripple effect
    setTimeout(() => {
      setIsWarping(false);
      audioSynthesizer.playSuccess();
    }, 600);
  };

  return (
    <section id="teleport" className="section-container teleport-section">
      <div className="section-badge">
        <Compass size={14} />
        <span>{data.chapter} · {data.subtitle}</span>
      </div>

      <h2 className="section-heading">
        通向未来的 <span className="gradient-text">原地 TP 终章</span>
      </h2>

      <p className="section-subtitle">
        在每一个坐标上扎根探索，又随时准备跃迁至未知的可能性。
      </p>

      {/* Big Interactive TP Warp Button */}
      <div className="tp-central-box">
        <button
          className={`big-teleport-btn ${isWarping ? 'warping-pulse' : ''}`}
          onClick={handleTeleport}
        >
          <Zap size={28} className={isWarping ? 'animate-spin' : ''} />
          <span>{isWarping ? '曲速跃迁中...' : '原地 TP (点击跃迁)'}</span>
        </button>

        <p className="tp-count-text">
          已在数字宇宙中原地跃迁 <strong>{tpCount}</strong> 次
        </p>
      </div>

      {/* Outbound Portals Grid */}
      <div className="portals-grid">
        {data.links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="portal-card-link"
            onClick={() => audioSynthesizer.playHover()}
          >
            <div className="portal-card-info">
              <span className="portal-card-name">{link.name}</span>
              <span className="portal-card-desc">{link.desc}</span>
            </div>
            <ExternalLink size={16} className="portal-card-arrow" />
          </a>
        ))}
      </div>

      {/* Deep Narrative Stream */}
      <TypewriterStream
        text={data.deepNarrative}
        charDelay={12}
        step={3}
        title="✨ 开启 Gemini 终章结语流式解析 (700+ 字)"
      />

      {/* Colophon & Footer */}
      <footer className="page-footer">
        <div className="footer-credits">
          <p>
            Designed & Synthesized with <Heart size={14} className="text-red-400 inline mx-1" /> by{' '}
            <strong>Google DeepMind Antigravity (Gemini 3.7)</strong> for <strong>VincentZyu</strong>.
          </p>
          <p className="footer-subtext">
            全站使用 <strong>霞鹜文楷 (LXGW WenKai)</strong> · 端口节点 <strong>40805</strong> · 保持纯粹，保持乐趣。
          </p>
        </div>
        <div className="footer-repo-link">
          <a
            href="https://github.com/VincentZyu233/GeminiImpressionOfVincentZyu"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-github-btn"
          >
            <Github size={15} />
            <span>GitHub Repository</span>
          </a>
        </div>
      </footer>
    </section>
  );
};
