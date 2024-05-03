import { Hono } from 'hono';
import { Env } from '../../types/env';

const app = new Hono<{ Bindings: Env }>();

// ユーザーidの一覧を取得する（開発者の確認のため）
app.get('/', async (c) => {
  const db = c.env.DB;
  try {
    const results = (await db.prepare('SELECT * FROM users').all()).results;
    return c.json(results, 200);
  } catch (e) {
    return c.json({ message: 'ユーザー情報の取得に失敗しました' }, 500);
  }
});

// ユーザーidをテーブルに追加
app.post('/', async (c) => {
  const { line_user_id } = await c.req.json();
  const db = c.env.DB;
  try {
    await db.prepare('INSERT INTO users (line_user_id) VALUES (?)').bind(line_user_id).run();
    return c.json({ message: 'ユーザーの作成に成功しました' }, 200);
  } catch (error) {
    console.error('Error creating user:', error);
    return c.json({ message: 'ユーザーの作成に失敗しました' }, 500);
  }
});

// ユーザー情報をテーブルから削除
app.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const db = c.env.DB;
  try {
    const result = await db.prepare('DELETE FROM users WHERE id = ?').bind(id).run();

    if (result.error) {
      return c.json({ message: 'ユーザーが見つかりません' }, 400);
    }
    return c.json({ message: 'ユーザーの削除に成功しました' }, 200);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

export default app;
