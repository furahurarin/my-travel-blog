import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDetail } from '@/libs/microcms';

export async function GET(request: Request) {
  // URLクエリパラメータから id と draftKey を取得
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const draftKey = searchParams.get('draftKey');

  // パラメータが不足している場合はエラー
  if (!id || !draftKey) {
    return new Response('Missing id or draftKey', { status: 400 });
  }

  // MicroCMSから下書きデータを取得して検証
  // ※getDetail内部で endpoint: "blogs" が使われます
  const post = await getDetail(id, { draftKey }).catch(() => null);

  // 記事が見つからない（draftKeyが無効など）場合はエラー
  if (!post) {
    return new Response('Invalid draft key or content ID', { status: 401 });
  }

  // Draft Modeを有効化（Cookieを設定）
  draftMode().enable();

  // リダイレクト先のパスを作成
  // URL構造: /blog/[categoryId]/[id]
  // カテゴリがない場合のフォールバックも念のため記述
  const categoryId = post.category?.id ?? 'misc';
  
  // 取得した記事ページへリダイレクト
  // draftKeyをクエリに含めることで、リダイレクト先でも下書き取得ができるようにする
  redirect(`/blog/${categoryId}/${post.id}?draftKey=${draftKey}`);
}