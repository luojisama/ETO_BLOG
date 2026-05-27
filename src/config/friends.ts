import type { FriendLink } from "@/types/friend";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, OWNER_AVATAR } from "./site";

/** 自己的卡片 — 字段从 site.ts 自动取，无需重复填写 */
export const myFriendLink: FriendLink = {
  title: SITE_TITLE,
  imgurl: OWNER_AVATAR,
  desc: SITE_DESCRIPTION,
  siteurl: SITE_URL,
  isSelf: true,
};

/**
 * 友链列表。
 * 每项必填：title / imgurl / desc / siteurl
 * rssurl 填写后会自动拉取友圈动态
 */
export const friendLinks: FriendLink[] = [
  // {
  //   title: "时歌的博客",
  //   imgurl: "https://www.lapis.cafe/avatar.webp",
  //   desc: "理解以真实为本，但真实本身并不会自动呈现",
  //   siteurl: "https://www.lapis.cafe",
  //   rssurl: "https://www.lapis.cafe/rss.xml",
  // },
];

export const allFriendLinks: FriendLink[] = [myFriendLink, ...friendLinks];
export const SELF_SITE_URL = SITE_URL;
