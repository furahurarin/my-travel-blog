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

export type Category = {
  id: string;
  name: string;
} & MicroCMSDate;

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

export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
    endpoint: "blogs",
    queries,
  });
  return listData;
};

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

export const getCategories = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Category>({
    endpoint: "categories",
    queries,
  });
  return listData;
};

// ▼ 追加: カテゴリ全件取得
export const getAllCategories = async () => {
  const allData = await client.getAllContents<Category>({
    endpoint: "categories",
  });
  return allData;
};

// ▼ 追加: 記事全件取得
export const getAllBlogs = async () => {
  const allData = await client.getAllContents<Blog>({
    endpoint: "blogs",
  });
  return allData;
};