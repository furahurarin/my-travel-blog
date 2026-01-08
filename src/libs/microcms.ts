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
export type BodyBlock =
  | {
      fieldId: "richText";
      richText: string;
    }
  | {
      fieldId: "html";
      html: string;
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

// ▼ レスポンス型
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
    endpoint: "blogs", // ★ここを 'blogs'（複数形）に修正しました
    contentId,
    queries,
  });
  return detailData;
};

// ▼ 一覧取得
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
    endpoint: "blogs", // ★ここを 'blogs'（複数形）に修正しました
    queries,
  });
  return listData;
};

// ▼ カテゴリ一覧取得
export const getCategories = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Category>({
    endpoint: "categories", // ★ここを 'categories'（複数形）に修正しました
    queries,
  });
  return listData;
};