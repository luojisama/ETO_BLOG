/**
 * ── 站点配置（唯一入口）───────────────────────────────────────────────────────
 *
 * 全站所有需要修改的「内容」都在这一个文件里。
 * 部署相关的「凭证」（API Key、SMTP 密码等）放在 `.env.local`。
 *
 * 修改本文件后保存即生效（dev 模式热更新；生产环境需重新构建）。
 */

// ── 站点基本信息 ──────────────────────────────────────────────────────────────

/** 站点标题 — 浏览器标签页 / Footer / 友链页 self 卡片 */
export const SITE_TITLE = "ETO Blog";

/** 站点描述 — <meta description> / 友链页 self 卡片 */
export const SITE_DESCRIPTION = "克制、冷峻、留白的个人博客";

/** 完整域名（含协议，结尾不带 /） — 友链页 self 卡片 / 邮件中的链接 */
export const SITE_URL = "https://example.com";

/** 建站日期（YYYY-MM-DD）— Footer 运行时间从这里开始计时 */
export const SITE_START = "2025-05-27";

/** 导航栏左上角 logo 文字 */
export const NAV_BRAND = "ETO";

// ── 博主信息 ──────────────────────────────────────────────────────────────────

/** About 页显示的姓名 */
export const OWNER_NAME = "你的名字";

/** About 页简介（`\n` 渲染为换行） */
export const OWNER_BIO = `这是一个使用 ETO 视觉风格构建的个人博客。克制、冷峻、留白。
记录思考，分享技术与生活的交叉点。`;

/** 头像路径（相对 public/ 或完整 URL） */
export const OWNER_AVATAR = "/avatar.svg";

// ── 平台链接（About 页 + 友链页） ──────────────────────────────────────────────

/** GitHub 用户名（同时用于 About 页 GitHub 动态拉取） */
export const GITHUB_USERNAME = "yourusername";

export const OWNER_GITHUB = `https://github.com/${GITHUB_USERNAME}`;
export const OWNER_TWITTER = "https://twitter.com/";
export const OWNER_EMAIL = "mailto:your@email.com";

// ── GitHub 动态（About 页）────────────────────────────────────────────────────
// 只填上面 GITHUB_USERNAME 即可显示最近 6 个仓库。
// 要看到「年贡献数」需在 .env.local 里设置 GITHUB_TOKEN。

// ── Steam 展示（About 页，默认隐藏） ──────────────────────────────────────────
/**
 * Steam 标识符 — 留空则不显示 Steam 区块。四种格式都支持：
 *   · 17 位 SteamID64：              `76561198000000000`
 *   · 自定义 vanity URL 名：          `myusername`
 *   · 完整主页链接 (id)：             `https://steamcommunity.com/id/myusername`
 *   · 完整主页链接 (profiles)：       `https://steamcommunity.com/profiles/7656119...`
 * 同时需在 .env.local 设置 STEAM_API_KEY（https://steamcommunity.com/dev/apikey）。
 */
export const STEAM_INPUT = "";

// ── 技术栈列表（About 页底部） ────────────────────────────────────────────────

export const TECH_STACK = [
  "Next.js 16 (App Router)",
  "TypeScript",
  "Tailwind CSS v4",
  "Markdown / gray-matter",
  "Vercel KV / Redis",
];
