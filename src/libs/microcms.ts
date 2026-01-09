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
  category?: Category;
  body?: BodyBlock[];
  content: string;
  description?: string;
  related_posts?: Blog[];
  is_recommended?: boolean;
  show_ads?: boolean;
} & MicroCMSDate;

// ▼ 通常の一覧取得（ページネーション付き）
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
    endpoint: "blogs",
    queries,
  });
  return listData;
};

// ▼ 詳細取得
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });
  return detailData;
};

// ▼ カテゴリ一覧取得
export const getCategories = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Category>({
    endpoint: "categories",
    queries,
  });
  return listData;
};

// ▼▼▼ 追加: 記事の全件取得（100件制限突破用） ▼▼▼
// サイトマップ、RSS、generateStaticParamsで使用
export const getAllBlogs = async () => {
  const allData = await client.getAllContents<Blog>({
    endpoint: "blogs",
  });
  return allData;
};

// ▼▼▼ 追加: カテゴリの全件取得 ▼▼▼
export const getAllCategories = async () => {
  const allData = await client.getAllContents<Category>({
    endpoint: "categories",
  });
  return allData;
};