// src/libs/microcms.ts
import { createClient } from "microcms-js-sdk";

// 環境変数が設定されていない場合にエラーを出す（ミス防止）
if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY is required");
}

// MicroCMSと通信するためのクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ブログ記事の型定義（データの形をTypeScriptに教える）
export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: { url: string; height: number; width: number };
  publishedAt: string;
};

// 記事一覧を取得する関数
export const getList = async () => {
  const listData = await client.getList<Blog>({
    endpoint: "blogs",
  });
  return listData;
};

// 記事の詳細を取得する関数
export const getDetail = async (contentId: string) => {
  const detailData = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
  });
  return detailData;
};