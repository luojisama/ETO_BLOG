---
title: "富媒体嵌入与站点功能总览"
date: "2026-05-27"
description: "GitHub 卡片 / 视频 / LaTeX 公式 / 图片注释，以及搜索、点赞、留言、友圈的使用说明。"
tags: ["教程", "功能"]
---

文章支持四种富媒体嵌入，全部使用标准 Markdown 代码块语法，把语言名换成对应类型即可。

## 一、GitHub 仓库卡片

语言写 `github`，内容填 `用户名/仓库名`：

```github
vercel/next.js
```

```github
anthropics/anthropic-sdk-python
```

数据在构建时从 GitHub API 拉取。失败时会自动降级为简化卡片（仅头像 + 仓库名），不会破坏排版。
设置 `GITHUB_TOKEN` 可将请求上限从 60/小时提升到 5000/小时。

## 二、YouTube 视频

```youtube
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

完整链接、`youtu.be` 短链、`shorts/` 链接、纯视频 ID（11 字符）都能识别。

## 三、Bilibili 视频

```bilibili
BV1GJ411x7h7
```

填 BV 号或完整链接均可。

## 四、LaTeX 数学公式

行内：薛定谔方程 $i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi$

独立展示：

$$
\int_{-\infty}^{+\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

由 KaTeX 服务端渲染，无 JS 运行时开销。

## 五、图片注释

普通 Markdown 图片语法，`alt` 文字会自动渲染为 `<figcaption>`：

![ETO 风格的几何符号](/avatar.svg)

不需要 `alt` 时写空字符串 `![](url)`，就不会生成 caption。

## 六、代码块复制

所有 `<pre>` 代码块鼠标悬停时右上角会出现复制按钮：

```typescript
function fibonacci(n: number): number {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

点击复制全部内容，1.6 秒后图标恢复。

## 七、其他站点功能

**搜索**：导航栏 `⌘K` 或点击放大镜，全文检索文章。

**点赞**：文章末尾的爱心，按 slug 计数，localStorage 防重复。

**留言**：文章下方留言板支持嵌套回复、楼层号、邮件通知（需配置 SMTP）。`/messages` 页是站点级留言板。

**友链 / 友圈**：`/friends` 页展示友情链接，右侧聚合所有友链的 RSS 形成动态时间线。在 `src/config/friends.ts` 维护友链列表，填了 `rssurl` 字段就会进入友圈。

**归档**：`/archive` 按年自动分组。

**小事**：`/thoughts` 是短碎片时间线，详见上一篇教程。

## 八、存储后端

留言、点赞数据有三种存储方式，按优先级自动选择：

1. **Vercel KV** — 设置 `KV_REST_API_URL` + `KV_REST_API_TOKEN`
2. **标准 Redis** — 设置 `REDIS_URL`
3. **本地 JSON** — 上面两个都没设置时，写到 `data/` 目录（仅适合本地开发）

## 九、留言板邮件通知

留言板支持两种邮件场景：

- **新顶层评论** → 通知博主邮箱
- **有人回复你** → 通知被回复者（如果留言时填了邮箱）

不配置任何 SMTP 变量时邮件功能自动关闭，留言板仍可正常使用。

### QQ 邮箱（最简单）

1. 登录 QQ 邮箱网页版 → 设置 → 账户 → 开启「IMAP/SMTP 服务」
2. 按提示发短信验证，拿到一串 16 位**授权码**（不是 QQ 密码）
3. `.env.local` 加：

```bash
SMTP_HOST=smtp.qq.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=你的QQ号@qq.com
SMTP_PASS=刚才那串16位授权码
MAIL_FROM="ETO Blog <你的QQ号@qq.com>"

# 收件人：博主自己的邮箱
MAIL_NOTIFY_TO=你的邮箱@example.com
BLOG_OWNER_EMAIL=你的邮箱@example.com
```

### Gmail

需要先在 Google 账户开启两步验证，然后创建**应用专用密码**（<https://myaccount.google.com/apppasswords>）：

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=你的Gmail@gmail.com
SMTP_PASS=16位应用专用密码
MAIL_FROM="ETO Blog <你的Gmail@gmail.com>"
```

### 163 邮箱

设置 → POP3/SMTP/IMAP → 开启 SMTP → 拿授权码：

```bash
SMTP_HOST=smtp.163.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=你的邮箱@163.com
SMTP_PASS=授权码
MAIL_FROM="ETO Blog <你的邮箱@163.com>"
```

### 排错

- 收不到信先看部署日志的 `[mail]` 前缀错误
- 端口 465 用 SSL（`SMTP_SECURE=true`），端口 587 用 STARTTLS（`SMTP_SECURE=false`）
- Vercel 部署后**必须在 Project Settings → Environment Variables 重新加一遍**，`.env.local` 不会上传

## 十、部署到 Vercel

整套博客就是为 Vercel 优化的，零额外配置。

### 一键步骤

1. 把代码推到 GitHub（公开或私有都行）
2. <https://vercel.com/new> → Import 你的仓库 → Framework 自动识别为 Next.js → Deploy
3. 等待 ~1 分钟，拿到 `xxx.vercel.app` 子域名

### 环境变量

在 Project Settings → Environment Variables 里逐个填，**不要**上传 `.env.local`。按需添加：

| 变量 | 作用 |
|---|---|
| `GITHUB_TOKEN` | About 页年贡献数 + 文章 GitHub 卡片高速率 |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | 留言点赞用 Vercel KV |
| `REDIS_URL` | 留言点赞用外部 Redis（KV 没配时备选） |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` / `MAIL_FROM` | 留言邮件通知 |
| `MAIL_NOTIFY_TO` / `BLOG_OWNER_EMAIL` | 博主收件邮箱 |
| `STEAM_API_KEY` | About 页 Steam 展示 |
| `NEXT_PUBLIC_SITE_URL` | 站点完整域名（友链卡片需要） |

加完变量后在 Deployments 页面点 **Redeploy** 让它生效。

### 启用 Vercel KV

Project → Storage → Create Database → KV → 选区域（亚洲选 `sin1` / `hnd1`） → Connect to project。
连接后 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN` 会自动注入，本地开发把这两个值复制到 `.env.local` 即可。

### 自定义域名

Project Settings → Domains → 输入你的域名 → 按提示给域名加 CNAME 或 A 记录。
SSL 证书 Vercel 自动签发，几分钟生效。

### 关于 Markdown 文件

`next.config.ts` 已经声明了 `outputFileTracingIncludes`，构建时会把 `content/` 目录打包进 serverless function，部署后照样能读到文章和小事，无需额外配置。
