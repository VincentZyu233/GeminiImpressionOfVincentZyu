import React from 'react';
import { Star, GitFork, AlertCircle, ExternalLink, Sparkles } from 'lucide-react';
import { type RepoItem } from '../data/reposData';
import { audioSynthesizer } from '../utils/audioSynthesizer';

interface RepoCardProps {
  repo: RepoItem;
  onOpenDetail: (repo: RepoItem) => void;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo, onOpenDetail }) => {
  return (
    <div className="repo-card">
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
            <ExternalLink size={13} className="repo-ext-icon" />
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
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
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

      {/* Action to open floating window */}
      <div className="repo-action-row">
        <button
          className="repo-expand-btn"
          onClick={() => {
            audioSynthesizer.playHover();
            onOpenDetail(repo);
          }}
          onMouseEnter={() => audioSynthesizer.playHover()}
        >
          <Sparkles size={14} className="btn-sparkle-icon" />
          <span>查看 Gemini 深度解构 (500+ 字) ➔</span>
        </button>
      </div>
    </div>
  );
};
