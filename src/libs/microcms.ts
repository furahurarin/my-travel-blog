// src/libs/microcms.ts

import { createClient, MicroCMSQueries, MicroCMSImage, MicroCMSDate } from "microcms-js-sdk";

// クライアント初期化
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ▼ 繰り返しフィールド（body）の各ブロックの型
// ※ここはカスタムフィールドIDと一致させる必要があります
export type BodyBlock =
  | {
      fieldId: "richText";
      richText: string;
    }
  | {
      fieldId: "html";
      html: string;
    }
  | {
      fieldId: "linkButton";
      url: string;
      label: string;
      color: string[];
    }
  | {
      fieldId: "pointBox";
      content: string;
      type: string[];
    };

// ▼ カテゴリ型
export type Category = {
  id: string;
  name: string;
} & MicroCMSDate;

// ▼ ブログ記事の型
export type Blog = {
  id: string;
  title: string;
  eyecatch?: MicroCMSImage;
  
  // ★重要: MicroCMSのスキーマ設定が「category」なのでここは単数形
  category?: Category;

  // 本文（新・旧）
  body?: BodyBlock[];
  content: string;

  // SEO
  description?: string;

  // 関連記事・フラグ
  related_posts?: Blog[];
  is_recommended?: boolean;

  // 広告制御
  show_ads?: boolean;

} & MicroCMSDate;

// ▼ レスポンス型（必要に応じて使用）
export type ArticleListResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Blog[];
};

export type CategoryResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Category[];
};

// ▼ 詳細取得
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Blog>({
    endpoint: "blogs", // ★ここを "blogs" に設定
    contentId,
    queries,
  });
  return detailData;
};

// ▼ 一覧取得
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
    endpoint: "blogs", // ★ここを "blogs" に設定
    queries,
  });
  return listData;
};

// ▼ カテゴリ一覧取得
export const getCategories = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Category>({
    endpoint: "categories", // ★ここを "categories" に設定
    queries,
  });
  return listData;
};