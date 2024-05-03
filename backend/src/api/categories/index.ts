import { Hono } from 'hono';
import { Env } from '../../types/env';

const app = new Hono<{ Bindings: Env }>();

// カテゴリー一覧を取得する
app.get('/', async (c) => {
  const db = c.env.DB;

  try {
    const categories = (await db.prepare('SELECT * FROM categories').all()).results;
    return c.json({ categories });
  } catch (error) {
    console.error('Error retrieving categories:', error);
    return c.json({ error: 'カテゴリーの取得に失敗しました' }, 500);
  }
});

// カテゴリーの編集
app.put('/:id', async (c) => {
  const id = c.req.param('id');
  const { category_name } = await c.req.json();

  if (!category_name) {
    return c.json({ error: 'カテゴリー名が不正または入力されていません' }, 400);
  }
  const db = c.env.DB;

  try {
    await db.prepare('UPDATE categories SET category_name = ? WHERE id = ?').bind(category_name, id).run();
    return c.json({ message: 'カテゴリーの変更に成功しました' });
  } catch (e) {
    return c.json({ error: 'サーバーエラー' }, 500);
  }
});

export default app;
