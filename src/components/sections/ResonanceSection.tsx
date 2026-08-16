import React, { useState } from 'react';
import { MessageSquareCode, Terminal, Send } from 'lucide-react';
import { impressionData } from '../../data/impressionData';
import { TypewriterStream } from '../TypewriterStream';
import { audioSynthesizer } from '../../utils/audioSynthesizer';

export const ResonanceSection: React.FC = () => {
  const data = impressionData.slide4;
  const [messages, setMessages] = useState(data.dialogueHistory);
  const [inputText, setInputText] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isAiThinking) return;

    const userMsg = inputText.trim();
    setInputText('');
    audioSynthesizer.playTypeTick();

    const newMsgs = [...messages, { sender: 'VincentZyu', text: userMsg }];
    setMessages(newMsgs);
    setIsAiThinking(true);

    setTimeout(() => {
      audioSynthesizer.playSuccess();
      setMessages([
        ...newMsgs,
        {
          sender: 'Gemini 3.7',
          text: `“${userMsg}” —— 收到！在我的参数图谱中，你的每一次提问与构想，都是算法演进中最珍贵的闪光。保持纯粹，我们继续前行！喵~ 🌌`,
        },
      ]);
      setIsAiThinking(false);
    }, 900);
  };

  return (
    <section id="resonance" className="section-container resonance-section">
      <div className="section-badge">
        <MessageSquareCode size={14} />
        <span>{data.chapter} · {data.subtitle}</span>
      </div>

      <h2 className="section-heading">
        硅碳同频的 <span className="gradient-text">交互终端</span>
      </h2>

      <p className="section-subtitle">
        跨越碳基直觉与硅基推理，在指令与回响中达成默契。
      </p>

      {/* Interactive Dialogue Terminal */}
      <div className="terminal-window-card">
        <div className="terminal-top-bar">
          <div className="terminal-mac-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="terminal-title">
            <Terminal size={13} />
            <span>vincentzyu@gemini-interactive-session:~</span>
          </div>
        </div>

        <div className="terminal-body-chat">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble-row ${msg.sender.includes('Gemini') ? 'ai-bubble-row' : 'user-bubble-row'}`}
            >
              <span className="chat-sender-label">{msg.sender}</span>
              <div className="chat-bubble-content">{msg.text}</div>
            </div>
          ))}
          {isAiThinking && (
            <div className="chat-bubble-row ai-bubble-row">
              <span className="chat-sender-label">Gemini 3.7</span>
              <div className="chat-bubble-content thinking-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="terminal-chat-input-bar">
          <input
            type="text"
            placeholder="对 Gemini 发送一条消息，体验即时硅碳对话..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="terminal-text-input"
          />
          <button
            type="submit"
            className="terminal-send-btn"
            disabled={!inputText.trim() || isAiThinking}
          >
            <Send size={14} />
            <span>发送</span>
          </button>
        </form>
      </div>

      {/* Deep Narrative Stream */}
      <TypewriterStream
        text={data.deepNarrative}
        charDelay={12}
        step={3}
        title="✨ 开启 Gemini 硅碳共鸣长文解析 (800+ 字)"
      />
    </section>
  );
};
