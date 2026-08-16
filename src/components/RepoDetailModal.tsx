import React, { useState, useEffect, useRef } from 'react';
import { X, Star, GitFork, AlertCircle, ExternalLink, Zap, Sparkles } from 'lucide-react';
import { type RepoItem } from '../data/reposData';
import { audioSynthesizer } from '../utils/audioSynthesizer';

interface RepoDetailModalProps {
  repo: RepoItem | null;
  onClose: () => void;
}

export const RepoDetailModal: React.FC<RepoDetailModalProps> = ({ repo, onClose }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!repo) {
      setDisplayedText('');
      setIsStreaming(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    // Start streaming when modal opens
    setDisplayedText('');
    setIsStreaming(true);
    audioSynthesizer.playOpen();

    let charIndex = 0;
    const fullText = repo.long;
    const step = 4;
    const intervalMs = 18;

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

    // ESC key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [repo]);

  if (!repo) return null;

  const handleInstantComplete = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayedText(repo.long);
    setIsStreaming(false);
    audioSynthesizer.playSuccess();
  };

  const handleClose = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    audioSynthesizer.playHover();
    onClose();
  };

  return (
    <div className="modal-backdrop-overlay" onClick={handleClose}>
      <div
        className="modal-floating-window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-title-row">
              <Sparkles size={18} className="text-pink-400" />
              <h3 className="modal-repo-name">{repo.name}</h3>
              {repo.fork && <span className="fork-badge">FORK</span>}
            </div>

            {/* Badges */}
            <div className="modal-badges-row">
              <span className="lang-pill">
                <span className="lang-dot" style={{ backgroundColor: repo.langColor }} />
                {repo.lang}
              </span>
              <span className="stat-pill">
                <Star size={12} className="text-yellow-400" />
                {repo.stars} Stars
              </span>
              <span className="stat-pill">
                <GitFork size={12} />
                {repo.forks} Forks
              </span>
              {repo.issues > 0 && (
                <span className="stat-pill stat-issue">
                  <AlertCircle size={12} />
                  {repo.issues} Issues
                </span>
              )}
            </div>
          </div>

          {/* Close button in top-right corner */}
          <div className="modal-header-actions">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-github-btn"
              title="在 GitHub 中打开"
              onClick={() => audioSynthesizer.playHover()}
            >
              <ExternalLink size={14} />
              <span>仓库</span>
            </a>
            <button
              className="modal-close-x-btn"
              onClick={handleClose}
              title="关闭详细印象 (ESC)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Short Summary Bar */}
        <div className="modal-short-summary-box">
          <p className="modal-short-desc">💡 {repo.short}</p>
          {isStreaming ? (
            <button
              className="stream-ctrl-btn wide-skip-btn"
              onClick={handleInstantComplete}
              title="瞬间全显全部文案"
            >
              <Zap size={13} />
              <span>⚡ 瞬间全显</span>
            </button>
          ) : (
            <span className="stream-badge-done">✨ Gemini 深度解析完毕</span>
          )}
        </div>

        {/* Modal Stream Body */}
        <div className="modal-stream-body">
          <div className="modal-stream-text">
            {displayedText}
            {isStreaming && <span className="stream-cursor-pulse">▋</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
