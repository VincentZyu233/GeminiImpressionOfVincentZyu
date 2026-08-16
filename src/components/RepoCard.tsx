import React, { useState, useEffect, useRef } from 'react';
import { Star, GitFork, AlertCircle, ExternalLink, Sparkles, Zap, ChevronUp } from 'lucide-react';
import { type RepoItem } from '../data/reposData';
import { audioSynthesizer } from '../utils/audioSynthesizer';

interface RepoCardProps {
  repo: RepoItem;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Trigger streaming typewriter when expanded
  const handleToggleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setDisplayedText('');
      setIsStreaming(true);
      audioSynthesizer.playOpen();

      let charIndex = 0;
      const fullText = repo.long;
      const step = 4; // smooth token step
      const intervalMs = 20;

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        charIndex += step;
        if (charIndex >= fullText.length) {
          setDisplayedText(fullText);
          setIsStreaming(false);
          if (timerRef.current) clearInterval(timerRef.current);
          audioSynthesizer.playSuccess();
        } else {
          setDisplayedText(fullText.slice(0, charIndex));
          if (charIndex % 12 === 0) {
            audioSynthesizer.playTypeTick();
          }
        }
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsExpanded(false);
      setIsStreaming(false);
      audioSynthesizer.playHover();
    }
  };

  const handleInstantComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayedText(repo.long);
    setIsStreaming(false);
    audioSynthesizer.playSuccess();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className={`repo-card ${isExpanded ? 'expanded' : ''}`}>
      {/* Card Header */}
      <div className="repo-header">
        <div className="repo-title-row">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-name"
            onClick={() => audioSynthesizer.playHover()}
          >
            {repo.name}
            <ExternalLink size={14} className="repo-ext-icon" />
          </a>
          {repo.fork && <span className="fork-badge">FORK</span>}
        </div>

        {/* Stats badges */}
        <div className="repo-badges">
          <span className="lang-pill">
            <span className="lang-dot" style={{ backgroundColor: repo.langColor }} />
            {repo.lang}
          </span>
          <span className="stat-pill">
            <Star size={12} className="text-yellow-400" />
            {repo.stars}
          </span>
          <span className="stat-pill">
            <GitFork size={12} />
            {repo.forks}
          </span>
          {repo.issues > 0 && (
            <span className="stat-pill stat-issue">
              <AlertCircle size={12} />
              {repo.issues}
            </span>
          )}
        </div>
      </div>

      {/* Short Impression Summary */}
      <p className="repo-short-desc">{repo.short}</p>

      {/* Expand / Stream Trigger Button */}
      <div className="repo-action-row">
        {!isExpanded ? (
          <button
            className="repo-expand-btn"
            onClick={handleToggleExpand}
            onMouseEnter={() => audioSynthesizer.playHover()}
          >
            <Sparkles size={14} className="btn-sparkle-icon" />
            <span>开启 Gemini 深度解构 (500+ 字)</span>
          </button>
        ) : (
          <div className="repo-stream-controls">
            {isStreaming ? (
              <button
                className="stream-ctrl-btn wide-skip-btn"
                onClick={handleInstantComplete}
                title="立即显示全部解构文案"
              >
                <Zap size={13} />
                <span>瞬间全显</span>
              </button>
            ) : (
              <span className="stream-badge-done">✨ Gemini 深度解析已就绪</span>
            )}
            <button
              className="stream-ctrl-btn narrow-collapse-btn"
              onClick={handleToggleExpand}
              title="收起详细长文"
            >
              <ChevronUp size={14} />
              <span>收起</span>
            </button>
          </div>
        )}
      </div>

      {/* Expanded Deep Impression Content */}
      {isExpanded && (
        <div className="repo-long-stream-box">
          <div className="stream-text-content">
            {displayedText}
            {isStreaming && <span className="stream-cursor-pulse">▋</span>}
          </div>
        </div>
      )}
    </div>
  );
};
