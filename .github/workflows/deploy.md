# 🚀 GitHub Pages 部署流程说明 (Deploy Workflow)

本项目使用 **GitHub Actions** 自动构建并部署至 GitHub Pages 站点。

> **注意**：该工作流默认只在该仓库的 `main` 分支上触发。

---

## 📋 触发机制 (Trigger)

为了节省构建资源，自动化部署不仅需要推送到 `main` 分支，还需要在 **Commit Message（提交信息）** 中包含特定关键词。

| 关键词 | 说明 | 触发动作 |
| :--- | :--- | :--- |
| `build page` | 构建页面 | ✅ 触发 GitHub Pages 自动构建与部署 |

**示例 Commit 语法：**
```bash
git commit -m "feat: update slide animations (build page)"
```

如果提交信息中**不包含** `build page`，GitHub Action 将自动跳过耗时的构建步骤。

---

## ⚙️ 部署逻辑与路径映射

- **部署平台**：GitHub Pages
- **部署地址**：`https://VincentZyu233.github.io/GeminiImpressionOfVincentZyu/`
- **构建输出目录**：`dist/`
- **Base 路径处理**：在 `vite.config.js` 中动态通过 `GITHUB_PAGES=true` 环境变量设置为 `/GeminiImpressionOfVincentZyu/`。

---

## 🔐 仓库 Settings 设置 (只需一次)

确保在 GitHub 仓库 **Settings -> Pages -> Build and deployment**:
- **Source** 选择 `GitHub Actions` 模式。
