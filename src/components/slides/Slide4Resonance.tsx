import React, { useState, useEffect } from 'react';
import { Bot, User, Send } from 'lucide-react';
import { IMPRESSION_DATA, ChatMessage } from '../../data/impressionData';
import { audioSynth } from '../../utils/audioSynthesizer';
import TypewriterStream from '../TypewriterStream';

export default function Slide4Resonance() {
  const { dialogueHistory, chapters } = IMPRESSION_DATA;
  const slideData = chapters[3];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState<string>('');

  useEffect(() => {
    // Reset state on mount to prevent StrictMode duplicate accumulation
    setMessages([]);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < dialogueHistory.length) {
        const nextMsg = dialogueHistory[idx];
        if (nextMsg) {
          setMessages((prev) => [...prev, nextMsg]);
          audioSynth.playTone(600 + idx * 50, 'sine', 0.05, 0.03);
        }
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [dialogueHistory]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    audioSynth.playTone(800, 'sine', 0.08, 0.05);
    const userMsg: ChatMessage = { sender: 'user', name: 'VincentZyu', text: inputVal };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputVal;
    setInputVal('');

    setTimeout(() => {
      audioSynth.playTone(950, 'triangle', 0.1, 0.05);
      const agentMsg: ChatMessage = {
        sender: 'agent',
        name: 'Gemini 3.6 Flash',
        text: `完全收到！在 40805 端口上，霞鹜文楷与流式文本共振效率 100% ✨ ("${currentInput}")`
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 700);
  };

  return (
    <div style={{ width: '100%', maxWidth: '950px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.3rem' }}>
          第三章：<span className="gradient-text-pink">硅碳共鸣与即时对话</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Agent 视角下的协同回忆 // 包含实时流式 Agent 日志
        </p>
      </div>

      {/* Streaming Agent Memory Stream (Starts Collapsed) */}
      <TypewriterStream fullText={slideData.streamText} speed={15} />

      <div className="glass-panel dialogue-box" style={{ marginTop: '1rem', height: '36vh' }}>
        {messages.filter(Boolean).map((msg, index) => (
          <div key={index} className={`msg-row ${msg ? msg.sender : 'agent'}`}>
            <div className={`msg-avatar ${msg ? msg.sender : 'agent'}`}>
              {msg && msg.sender === 'agent' ? <Bot size={18} color="#fff" /> : <User size={18} color="#fff" />}
            </div>
            <div className="msg-bubble">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.2rem', fontFamily: 'var(--font-sans)' }}>
                {msg ? msg.name : 'System'}
              </div>
              <div>{msg ? msg.text : ''}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={{ width: '100%', maxWidth: '850px', marginTop: '0.8rem', display: 'flex', gap: '0.75rem' }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)}
          placeholder="向 Gemini 发送一段话，解锁即时共鸣..."
          style={{
            flex: 1,
            background: 'rgba(18, 24, 38, 0.8)',
            border: '1px solid var(--border-glass)',
            padding: '0.7rem 1.25rem',
            borderRadius: '9999px',
            color: '#fff',
            outline: 'none',
            fontSize: '0.95rem'
          }}
        />
        <button
          type="submit"
          className="nav-btn"
          style={{ padding: '0.7rem 1.4rem', background: 'var(--primary-pink)', color: '#fff', borderColor: 'var(--primary-pink)' }}
          onMouseEnter={() => audioSynth.playHoverPop()}
        >
          <Send size={15} /> 发送
        </button>
      </form>
    </div>
  );
}
