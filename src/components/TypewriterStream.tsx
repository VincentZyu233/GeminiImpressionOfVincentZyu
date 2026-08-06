import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, FastForward, CheckCircle2, ChevronUp } from 'lucide-react';
import { audioSynth } from '../utils/audioSynthesizer';

interface TypewriterStreamProps {
  fullText: string;
  speed?: number;
  triggerLabel?: string;
  onComplete?: () => void;
  className?: string;
}

export default function TypewriterStream({
  fullText,
  speed = 15,
  triggerLabel = "✨ 开启 Agent 深度流式解析 (点击展开 600+ 字)",
  onComplete,
  className = ''
}: TypewriterStreamProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const indexRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsExpanded(false);
    setDisplayedText('');
    setIsCompleted(false);
    indexRef.current = 0;
    if (timerRef.current) clearInterval(timerRef.current);
  }, [fullText]);

  const startStreaming = () => {
    setIsExpanded(true);
    setDisplayedText('');
    setIsCompleted(false);
    indexRef.current = 0;
    audioSynth.playTone(850, 'triangle', 0.1, 0.05);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (indexRef.current < fullText.length) {
        const char = fullText.charAt(indexRef.current);
        setDisplayedText((prev) => prev + char);
        
        if (indexRef.current % 4 === 0) {
          audioSynth.playTone(750 + (indexRef.current % 30) * 10, 'sine', 0.03, 0.02);
        }
        
        indexRef.current++;
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsCompleted(true);
        if (onComplete) onComplete();
      }
    }, speed);
  };

  const handleSkip = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayedText(fullText);
    setIsCompleted(true);
    audioSynth.playTone(950, 'sine', 0.08, 0.05);
    if (onComplete) onComplete();
  };

  const handleCollapse = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsExpanded(false);
    setDisplayedText('');
    setIsCompleted(false);
    audioSynth.playTone(600, 'sine', 0.05, 0.03);
  };

  if (!isExpanded) {
    return (
      <div className={`stream-trigger-wrapper ${className}`} style={{ margin: '0.8rem 0' }}>
        <button
          className="stream-start-btn"
          onClick={startStreaming}
          onMouseEnter={() => audioSynth.playHoverPop()}
        >
          <Sparkles size={16} color="#ff69b4" />
          <span>{triggerLabel}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`typewriter-stream-container expanded ${className}`}>
      <div className="stream-header-bar">
        <div className="stream-status">
          <span className={`status-dot ${isCompleted ? 'done' : 'streaming'}`} />
          <span className="status-label">
            {isCompleted ? 'STREAM COMPLETE' : 'GENERATING RESPONSE STREAM...'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {!isCompleted && (
            <button className="skip-stream-btn wide-skip-btn" onClick={handleSkip} title="点击直接显示全文">
              <FastForward size={14} /> ⚡ 瞬间全显
            </button>
          )}

          {isCompleted && (
            <span className="complete-tag">
              <CheckCircle2 size={14} color="#64b5f6" /> 沉浸完毕
            </span>
          )}

          <button className="skip-stream-btn narrow-collapse-btn" onClick={handleCollapse} title="收起面板">
            <ChevronUp size={13} /> 收起
          </button>
        </div>
      </div>

      <div className="stream-text-content">
        {displayedText}
        {!isCompleted && <span className="streaming-cursor">▋</span>}
      </div>
    </div>
  );
}
