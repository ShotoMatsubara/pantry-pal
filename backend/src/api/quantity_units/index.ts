import { Hono } from 'hono';
import { Env } from '../../types/env';

const app = new Hono<{ Bindings: Env }>();

// 単位一覧を取得する
app.get('/', async (c) => {
  const db = c.env.DB;

  try {
    const quantityUnits = (await db.prepare('SELECT * FROM quantity_units').all()).results;
    return c.json({ quantityUnits });
  } catch (error) {
    console.error('Error retrieving quantity_units:', error);
    return c.json({ error: '単位の取得に失敗しました' }, 500);
  }
});

// TODO: 単位を追加、削除、編集のapiも一応作っとく。

export default app;
