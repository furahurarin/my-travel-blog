import { createClient, MicroCMSQueries } from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export type Category = {
  id: string;
  name: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: { url: string; height: number; width: number };
  category?: Category;
  publishedAt: string;
  updatedAt?: string;
};

// ▼ 変更: 条件(queries)を指定できるように修正
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
    endpoint: "blogs",
    queries,
  });
  return listData;
};

// ▼ 追加: 特定のカテゴリ情報を取得する関数
export const getCategory = async (contentId: string) => {
  const detailData = await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
  });
  return detailData;
};

export const getDetail = async (contentId: string) => {
  const detailData = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
  });
  return detailData;
};