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

// line_user_idに紐づくusersテーブルのIDを取得
app.post('/get', async (c) => {
  const { line_user_id } = await c.req.json();
  console.log(line_user_id);
  const db = c.env.DB;
  try {
    const result = await db.prepare(`SELECT id FROM users WHERE line_user_id = ?`).bind(line_user_id).first();
    return c.json(result);
  } catch {
    return c.json({ message: 'ユーザーの取得に失敗しました' });
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

// ユーザー削除のエンドポイント
app.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const db = c.env.DB;

  try {
    // foodsテーブルから該当ユーザーのデータを削除
    const deleteFoodsResult = await db.prepare('DELETE FROM foods WHERE user_id = ?').bind(id).run();
    if (!deleteFoodsResult.success) {
      throw new Error('ユーザーに紐づく食材の削除に失敗しました');
    }
    // usersテーブルからユーザーを削除
    const deleteUserResult = await db.prepare('DELETE FROM users WHERE id = ?').bind(id).run();
    if (!deleteUserResult.success) {
      throw new Error('ユーザーの削除に失敗しました。');
    }

    return c.json({ message: 'ユーザーの削除が完了しました' });
  } catch (error) {
    return c.json({ message: 'ユーザーの削除に失敗しました', error }, 500);
  }
});

export default app;
