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

export type Category = {
  id: string;
  name: string;
} & MicroCMSDate;

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
    }
  | {
      fieldId: "postCard";
      post: { id: string };
    };

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

export type BlogCard = {
  id: string;
  title: string;
  eyecatch?: MicroCMSImage;
  category?: Category;
  description?: string;
} & Partial<MicroCMSDate>;

export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
    endpoint: "blogs",
    queries,
  });
  return listData;
};

export const getDetail = async (contentId: string, queries?: MicroCMSQueries) => {
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

export const getAllCategories = async () => {
  const allData = await client.getAllContents<Category>({
    endpoint: "categories",
  });
  return allData;
};

export const getAllBlogs = async () => {
  const allData = await client.getAllContents<Blog>({
    endpoint: "blogs",
  });
  return allData;
};

export const getBlogCardsByIds = async (ids: string[]) => {
  const uniqueIds = Array.from(new Set(ids)).filter((v) => typeof v === "string" && v.length > 0);
  if (uniqueIds.length === 0) return [] as BlogCard[];

  const listData = await client.getList<BlogCard>({
    endpoint: "blogs",
    queries: {
      ids: uniqueIds.join(","),
      limit: uniqueIds.length,
      fields: "id,title,eyecatch,description,category,publishedAt,createdAt",
    },
  });

  const map = new Map(listData.contents.map((p) => [p.id, p]));
  return uniqueIds.map((id) => map.get(id)).filter(Boolean) as BlogCard[];
};
