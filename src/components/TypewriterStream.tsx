import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, ChevronUp } from 'lucide-react';
import { audioSynthesizer } from '../utils/audioSynthesizer';

export interface TypewriterStreamProps {
  text?: string;
  fullText?: string;
  charDelay?: number;
  speed?: number;
  step?: number;
  title?: string;
  triggerLabel?: string;
  onComplete?: () => void;
  className?: string;
}

export const TypewriterStream: React.FC<TypewriterStreamProps> = ({
  text,
  fullText: fullTextProp,
  charDelay,
  speed,
  step = 3,
  title,
  triggerLabel,
  onComplete,
  className = '',
}) => {
  const content = text || fullTextProp || '';
  const btnLabel = title || triggerLabel || '✨ 开启 Gemini 深度解析 (点击流式展开)';
  const intervalTime = charDelay || speed || 15;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const indexRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIsExpanded(false);
    setDisplayedText('');
    setIsCompleted(false);
    indexRef.current = 0;
    if (timerRef.current) clearInterval(timerRef.current);
  }, [content]);

  const startStreaming = () => {
    setIsExpanded(true);
    setDisplayedText('');
    setIsCompleted(false);
    indexRef.current = 0;
    audioSynthesizer.playOpen();

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      indexRef.current += step;
      if (indexRef.current >= content.length) {
        setDisplayedText(content);
        setIsCompleted(true);
        if (timerRef.current) clearInterval(timerRef.current);
        audioSynthesizer.playSuccess();
        if (onComplete) onComplete();
      } else {
        setDisplayedText(content.slice(0, indexRef.current));
        if (indexRef.current % 9 === 0) {
          audioSynthesizer.playTypeTick();
        }
      }
    }, intervalTime);
  };

  const instantComplete = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayedText(content);
    setIsCompleted(true);
    audioSynthesizer.playSuccess();
    if (onComplete) onComplete();
  };

  const collapse = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsExpanded(false);
    setIsCompleted(false);
    audioSynthesizer.playHover();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className={`typewriter-stream-container ${className}`}>
      {!isExpanded ? (
        <div className="stream-collapsed-trigger">
          <button
            className="stream-start-btn"
            onClick={startStreaming}
            onMouseEnter={() => audioSynthesizer.playHover()}
          >
            <Sparkles size={16} className="btn-icon-flex" />
            <span className="btn-text-flex">{btnLabel}</span>
          </button>
        </div>
      ) : (
        <div className="stream-expanded-box">
          <div className="stream-header-actions">
            <span className="stream-title-text">
              ✨ Gemini 深度思维流
            </span>

            <div className="stream-actions-group">
              {!isCompleted ? (
                <button
                  className="stream-ctrl-btn wide-skip-btn"
                  onClick={instantComplete}
                  title="瞬间全显全部文案"
                >
                  <Zap size={14} className="btn-icon-flex" />
                  <span className="btn-text-flex">瞬间全显</span>
                </button>
              ) : (
                <span className="stream-badge-done">
                  ✨ 流式输出完毕
                </span>
              )}

              <button
                className="stream-ctrl-btn narrow-collapse-btn"
                onClick={collapse}
                title="收起文案"
              >
                <ChevronUp size={15} className="btn-icon-flex" />
                <span className="btn-text-flex">收起</span>
              </button>
            </div>
          </div>

          <div className="stream-text-content">
            {displayedText}
            {!isCompleted && <span className="stream-cursor-pulse">▋</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypewriterStream;
