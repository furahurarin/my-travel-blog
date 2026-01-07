import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDetail } from '@/libs/microcms';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const draftKey = searchParams.get('draftKey');

  if (!id || !draftKey) {
    return new Response('Missing parameters', { status: 400 });
  }

  // 下書き記事を取得して、存在する確認＆カテゴリIDを取得
  const post = await getDetail(id, {
    draftKey,
  }).catch(() => null);

  if (!post) {
    return new Response('Invalid slug', { status: 401 });
  }

  // Next.jsのドラフトモードを有効にする（これでキャッシュが無効になります）
  const draft = await draftMode();
  draft.enable();

  // 記事ページへリダイレクト（draftKeyをURLにつけて渡す）
  const categoryId = post.category?.id ?? 'misc'; // カテゴリがない場合はmiscへ
  redirect(`/blog/${categoryId}/${post.id}?draftKey=${draftKey}`);
}