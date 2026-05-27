---
title: "定制你的站点与关于页"
date: "2026-05-25"
description: "所有要修改的内容都集中在 src/config/site.ts 一个文件里，改一次全站生效。"
tags: ["教程", "配置"]
---

整套博客只有**两类配置**：

- `src/config/site.ts` — 所有要展示给读者看的「内容」（标题、简介、头像、社交链接、Steam ID...）
- `.env.local` — 不能进 git 的「凭证」（API Key、SMTP 密码...）

记住这两个文件的位置，剩下的都是查表。

## 一、`src/config/site.ts` 字段表

| 字段 | 用在哪里 | 示例 |
|---|---|---|
| `SITE_TITLE` | 浏览器标签 / 页脚 / 友链 self 卡片 | `"ETO Blog"` |
| `SITE_DESCRIPTION` | `<meta>` / 友链 self 卡片 | `"克制、冷峻、留白的个人博客"` |
| `SITE_URL` | 友链 self 卡片 / 邮件中的链接 | `"https://blog.example.com"` |
| `SITE_START` | 页脚「已运行 N 天」从这天开始算 | `"2025-05-27"` |
| `NAV_BRAND` | 导航栏 logo 旁的文字 | `"ETO"` |
| `OWNER_NAME` | About 页姓名 | `"你的名字"` |
| `OWNER_BIO` | About 页简介（`\n` 渲染为换行）| 多行字符串 |
| `OWNER_AVATAR` | About 页 + 友链 self 卡片头像路径 | `"/avatar.svg"` |
| `GITHUB_USERNAME` | About 页 GitHub 动态 + 平台链接 | `"yourusername"` |
| `OWNER_TWITTER` | About 页平台链接 | `"https://twitter.com/..."` |
| `OWNER_EMAIL` | About 页平台链接 | `"mailto:..."` |
| `STEAM_INPUT` | Steam 区块（留空 = 不显示）| 见下方 |
| `TECH_STACK` | About 页底部技术栈列表 | 字符串数组 |

## 二、头像

替换 `public/avatar.svg`，或修改 `OWNER_AVATAR` 指向其它文件。建议 1:1 方形，深色或透明背景，SVG / PNG / JPG / WebP 都可以。

## 三、GitHub 动态（最近 6 个仓库 + 年贡献数）

只填 `GITHUB_USERNAME` 即可显示**仓库列表**（公开 API，60 次/小时）。

要看到**年贡献数**，需要 GitHub GraphQL Token：

1. <https://github.com/settings/tokens?type=beta> 创建 Fine-grained token
2. 权限只需 `public_repo` 读权限
3. `.env.local` 加 `GITHUB_TOKEN=github_pat_xxx`

部署到 Vercel 时同样的变量名加到 Project Settings → Environment Variables。

## 四、Steam 展示（可选，默认隐藏）

`STEAM_INPUT` 留空时整个区块不显示。要启用：

**第一步**：申请 API Key — <https://steamcommunity.com/dev/apikey>，填到 `.env.local`：

```bash
STEAM_API_KEY=你的Key
```

**第二步**：在 `site.ts` 设置 `STEAM_INPUT`，四种格式都支持：

```typescript
export const STEAM_INPUT = "76561198000000000";                       // 17 位 SteamID64
export const STEAM_INPUT = "myusername";                               // 自定义 vanity 名
export const STEAM_INPUT = "https://steamcommunity.com/id/myusername"; // 完整主页 URL
export const STEAM_INPUT = "https://steamcommunity.com/profiles/7656119...";
```

显示的内容：头像 / 在线状态 / 当前游戏 / 游戏库数量 / 国家代码。区块默认收起，点 `STEAM ▾` 展开。

## 五、技术栈列表

`site.ts` 末尾的 `TECH_STACK` 数组，按顺序加项即可：

```typescript
export const TECH_STACK = [
  "Next.js 16 (App Router)",
  "TypeScript",
  // 加你自己用到的
];
```

## 六、友链 self 卡片

友链页顶部「自己的卡片」会**自动**从 `SITE_TITLE` / `SITE_DESCRIPTION` / `SITE_URL` / `OWNER_AVATAR` 取数据，不需要在 `friends.ts` 里再重复填一遍。

要添加他人的友链，在 `src/config/friends.ts` 的 `friendLinks` 数组里加：

```typescript
{
  title: "对方站名",
  imgurl: "https://...",
  desc: "一句话简介",
  siteurl: "https://...",
  rssurl: "https://.../rss.xml",   // 可选，填了进入「友圈动态」
}
```
