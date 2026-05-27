---
title: "撰写文章与小事"
date: "2026-05-26"
description: "新建一篇文章或一条小事的完整流程：文件位置、frontmatter 字段、Markdown 写法。"
tags: ["教程", "写作"]
---

文章和小事都是 Markdown 文件，放在 `content/` 目录下。无需重启开发服务器，保存即热更新。

## 一、新建文章

文件位置：`content/posts/`，文件名即 URL slug。

```
content/posts/my-first-article.md   →   /posts/my-first-article
```

文件开头是 YAML frontmatter，正文用标准 Markdown：

```markdown
---
title: "文章标题"
date: "2026-05-27"
description: "出现在列表页和 SEO 描述里的一句话。"
tags: ["标签1", "标签2"]
---

正文从这里开始。

## 二级标题

普通段落、**加粗**、*斜体*、`行内代码`、[链接](https://example.com)。

- 列表项
- 列表项

> 引用块

最后一段。
```

字段说明：

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | 是 | 文章标题 |
| `date` | 是 | `YYYY-MM-DD` 格式，用于排序和归档 |
| `description` | 否 | 列表卡片摘要，留空则不显示 |
| `tags` | 否 | 字符串数组，会在文章页和标签云显示 |

文章字数会自动估算阅读时间（350 字/分钟），无需手动填写。

## 二、新建小事

小事是只有日期的短碎片，按时间倒序排列在 `/thoughts` 页。

文件位置：`content/thoughts/`，文件名建议用日期：

```
content/thoughts/2026-05-27.md     →     当天的一条
content/thoughts/2026-05-27-2.md   →     当天的第二条
```

frontmatter 更简单，**没有 title**：

```markdown
---
date: "2026-05-27"
tags: ["随想"]
---

今天的一句话或一段话。

可以多段，可以带 [链接](https://example.com) 或 `代码`。
```

排版做了优化：段落更紧凑、行高更舒展，适合短文本。

## 三、归档与标签

- `/archive` 页按年自动分组所有文章，无需手动整理
- 文章中的 `tags` 会自动汇总到 `/posts` 页右侧的标签云
- 搜索框（⌘K 或导航栏图标）会全文检索 title + description + 正文

## 四、草稿

目前没有专门的 draft 字段。**不想发布的文章**可以临时把文件改名（比如加 `_` 前缀），或者把日期设为未来日期再加判断逻辑——但默认实现是有 .md 就发布。
