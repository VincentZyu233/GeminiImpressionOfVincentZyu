# GitHub Pages 自动部署工作流

> **[📖 简体中文](deploy.md)**

## 📋 概述

CI/CD 流水线由 **commit message 关键词** 驱动。向 `main` 分支推送包含正确关键词的 commit，GitHub Actions 就会自动构建并部署到 GitHub Pages。

## 🔑 关键词

| commit message 中的关键词 | 构建 (Vite) | GitHub Pages 部署 |
|---------------------------|:-----------:|:-----------------:|
| `build-page` | ✅ | ✅ |

> **注意：** 不包含 `build-page` 的普通 commit 不会触发构建和部署，适合日常开发提交。

## 🚀 使用示例

```bash
# 构建并部署到 GitHub Pages
git commit -m "feat: 添加新功能 build-page"

# 空 commit 触发部署（不修改代码，仅触发 CI）
git commit --allow-empty -m "ci: 重试 Pages 部署 build-page"

# 日常开发提交（不触发构建）
git commit -m "docs: 更新 README"
git commit -m "fix: 修复样式问题"
git commit -m "refactor: 重构组件"
```

## 🏗️ 构建流程

```
push to main (含 build-page)
       │
       ├── 条件判断：commit message 是否包含 "build-page"？
       │     ├── 否 → 跳过（不构建）
       │     └── 是 → 执行部署
       │
       └── 部署步骤：
             ├── Checkout 代码
             ├── 安装 Node.js 20 + npm 缓存
             ├── npm ci 安装依赖
             ├── npm run build 构建 (Vite)
             ├── 配置 GitHub Pages 环境
             ├── 上传构建产物 (dist/)
             └── 部署到 GitHub Pages
```

## ⚙️ 技术栈

| 组件 | 版本/工具 |
|------|-----------|
| 前端框架 | React 18 + TypeScript |
| 构建工具 | Vite 6 |
| 包管理器 | npm |
| Node.js | 20 |
| CI 平台 | GitHub Actions |
| 托管平台 | GitHub Pages |

## 🔗 相关链接

- 部署地址：https://vincentzyu233.github.io/GeminiImpressionOfVincentZyu/
- Actions 页面：https://github.com/VincentZyu233/GeminiImpressionOfVincentZyu/actions
- 仓库地址：https://github.com/VincentZyu233/GeminiImpressionOfVincentZyu
