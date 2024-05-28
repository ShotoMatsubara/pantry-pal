import { Hono } from 'hono';
import { Env } from '../../types/env';

const app = new Hono<{ Bindings: Env }>();

// ユーザー認証
app.post('/', async (c) => {
  const { lineUserId } = await c.req.json();
  const db = c.env.DB;

  try {
    const result = await db.prepare('SELECT * FROM users WHERE line_user_id = ?').bind(lineUserId).first();
    if (result) {
      return c.json({ authenticated: true, id: result.id });
    } else {
      return c.json({ authenticated: false });
    }
  } catch (error) {
    console.error('認証エラー:', error);
    return c.json({ authenticated: false }, 500);
  }
});

export default app;
