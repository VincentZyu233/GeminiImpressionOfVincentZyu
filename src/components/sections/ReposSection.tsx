import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, ArrowUpDown, Layers, Star, GitFork, BookOpen } from 'lucide-react';
import { REPO_GROUPS, TOTAL_REPOS_COUNT, TOTAL_STARS_COUNT, TOTAL_FORKS_COUNT, type RepoItem } from '../../data/reposData';
import { RepoCard } from '../RepoCard';
import { RepoDetailModal } from '../RepoDetailModal';
import { audioSynthesizer } from '../../utils/audioSynthesizer';

type SortOption = 'stars-desc' | 'forks-desc' | 'name-asc';

export const ReposSection: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('stars-desc');
  const [activeDetailRepo, setActiveDetailRepo] = useState<RepoItem | null>(null);

  // Filter and sort repositories
  const filteredGroups = useMemo(() => {
    return REPO_GROUPS.map((group) => {
      // Check group match
      if (selectedGroupId !== 'all' && group.id !== selectedGroupId) {
        return null;
      }

      // Filter repos inside this group by search query
      const matchingRepos = group.repos.filter((repo) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
          repo.name.toLowerCase().includes(q) ||
          repo.short.toLowerCase().includes(q) ||
          repo.lang.toLowerCase().includes(q) ||
          repo.long.toLowerCase().includes(q)
        );
      });

      // Sort matching repos
      const sortedRepos = [...matchingRepos].sort((a, b) => {
        if (sortBy === 'stars-desc') return b.stars - a.stars;
        if (sortBy === 'forks-desc') return b.forks - a.forks;
        return a.name.localeCompare(b.name);
      });

      return {
        ...group,
        repos: sortedRepos,
      };
    }).filter(Boolean) as typeof REPO_GROUPS;
  }, [selectedGroupId, searchQuery, sortBy]);

  const totalVisibleRepos = useMemo(() => {
    return filteredGroups.reduce((acc, g) => acc + g.repos.length, 0);
  }, [filteredGroups]);

  return (
    <section id="repos" className="section-container repos-main-section">
      {/* Section Header */}
      <div className="section-badge">
        <Layers size={14} />
        <span>第三章 · 遍览藏库</span>
      </div>

      <h2 className="section-heading">
        VincentZyuApps <span className="gradient-text">75 星宿矩阵</span>
      </h2>

      <p className="section-subtitle">
        跨越 18 门语言、6 大领域集群。点击任意仓库即可开启专属的 Gemini 悬浮深度解构视窗。
      </p>

      {/* Stats Counter Banner */}
      <div className="repos-stats-banner">
        <div className="stat-stat-item">
          <BookOpen className="text-pink-400" size={20} />
          <div className="stat-stat-info">
            <span className="stat-number">{TOTAL_REPOS_COUNT}</span>
            <span className="stat-label">开源项目</span>
          </div>
        </div>

        <div className="stat-stat-item">
          <Star className="text-yellow-400 fill-yellow-400" size={20} />
          <div className="stat-stat-info">
            <span className="stat-number">{TOTAL_STARS_COUNT}</span>
            <span className="stat-label">累计 Star</span>
          </div>
        </div>

        <div className="stat-stat-item">
          <GitFork className="text-blue-400" size={20} />
          <div className="stat-stat-info">
            <span className="stat-number">{TOTAL_FORKS_COUNT}</span>
            <span className="stat-label">社区 Fork</span>
          </div>
        </div>

        <div className="stat-stat-item">
          <Sparkles className="text-purple-400" size={20} />
          <div className="stat-stat-info">
            <span className="stat-number">6 大</span>
            <span className="stat-label">星系集群</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="repos-controls-bar">
        {/* Search Input */}
        <div className="search-input-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="搜索仓库名、语言（Rust/TS/C++）或功能关键词..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="repos-search-input"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="清空搜索"
            >
              ×
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="sort-selector-box">
          <ArrowUpDown size={14} className="sort-icon" />
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as SortOption);
              audioSynthesizer.playHover();
            }}
            className="sort-dropdown"
          >
            <option value="stars-desc">按 Star 数量降序</option>
            <option value="forks-desc">按 Fork 数量降序</option>
            <option value="name-asc">按仓库名称排序</option>
          </select>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="category-filter-tabs">
        <button
          className={`cat-tab-btn ${selectedGroupId === 'all' ? 'active' : ''}`}
          onClick={() => {
            setSelectedGroupId('all');
            audioSynthesizer.playHover();
          }}
        >
          全部星系 ({TOTAL_REPOS_COUNT})
        </button>
        {REPO_GROUPS.map((group) => (
          <button
            key={group.id}
            className={`cat-tab-btn ${selectedGroupId === group.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedGroupId(group.id);
              audioSynthesizer.playHover();
            }}
          >
            {group.title.split(' · ')[0]} ({group.repos.length})
          </button>
        ))}
      </div>

      {/* Result Indicator */}
      <div className="results-count-tip">
        共匹配到 <strong>{totalVisibleRepos}</strong> 个仓库
      </div>

      {/* Repositories Group List */}
      <div className="groups-container">
        {filteredGroups.length === 0 ? (
          <div className="empty-search-state">
            <Filter size={32} className="empty-icon" />
            <p>未找到与 “{searchQuery}” 匹配的仓库，尝试换个关键词吧～</p>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.id} className="repo-group-block">
              {/* Group Title Header */}
              <div className="group-header">
                <div className="group-title-row">
                  <h3 className="group-title">{group.title}</h3>
                  <span className="group-tagline">{group.tagline}</span>
                </div>
                <p className="group-note">{group.note}</p>
              </div>

              {/* Repos Grid */}
              <div className="repo-grid">
                {group.repos.map((repo) => (
                  <RepoCard
                    key={repo.name}
                    repo={repo}
                    onOpenDetail={setActiveDetailRepo}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Detail Modal Window */}
      <RepoDetailModal
        repo={activeDetailRepo}
        onClose={() => setActiveDetailRepo(null)}
      />
    </section>
  );
};
