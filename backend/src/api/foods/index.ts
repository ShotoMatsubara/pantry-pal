import { Hono } from 'hono';
import { Env } from '../../types/env';

const app = new Hono<{ Bindings: Env }>();

// ユーザーが持っている食材の一覧を取得する
app.get('/user/:user_id', async (c) => {
  const db = c.env.DB;
  const user_id = c.req.param('user_id');

  const foods = await db
    .prepare(
      `SELECT 
      foods.id,
      foods.food_name,
      foods.quantity_value,
      quantity_units.quantity_unit_name,
      foods.expiration_type,
      foods.expiration_date,
      categories.category_name
    FROM foods
    JOIN quantity_units ON foods.quantity_unit_id = quantity_units.id
    JOIN categories ON foods.category_id = categories.id
    WHERE foods.user_id = ?
    `
    )
    .bind(user_id)
    .all();
  return c.json(foods.results);
});

// ユーザーが持っているカテゴリー別の食材一覧を取得する。
app.get('/', async (c) => {
  try {
    const { user_id, category_id } = await c.req.json();

    // 入力値検証
    if (!user_id || !category_id) {
      return c.json({ error: 'user_idまたはcategory_idが入力されていません' }, 400);
    }

    const query = `
            SELECT * FROM foods
            WHERE user_id = ? AND category_id = ?
        `;

    const statement = c.env.DB.prepare(query);
    const foods = await statement.bind(user_id, category_id).all();

    return c.json(foods);
  } catch (error) {
    console.log(error);
    return c.json({ error: 'サーバーエラーです' }, 500);
  }
});

// レコードの参照
app.get('/:food_id', async (c) => {
  const id = c.req.param('food_id');
  const food = await c.env.DB.prepare('SELECT * FROM foods WHERE id = ?').bind(id).first();

  if (!food) {
    return c.notFound();
  }

  return c.json(food);
});

// foodsテーブルにレコードを追加する
app.post('/', async (c) => {
  const { user_id, category_id, food_name, quantity_value, quantity_unit_id, expiration_type, expiration_date } =
    await c.req.json();

  try {
    await c.env.DB.prepare(
      `
        INSERT INTO foods (user_id, category_id, food_name, quantity_value, quantity_unit_id, expiration_type, expiration_date)
        VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        );
        `
    )
      .bind(user_id, category_id, food_name, quantity_value, quantity_unit_id, expiration_type, expiration_date)
      .run();

    return c.json('レコードの追加に成功しました。');
  } catch (e) {
    console.error(e);
    return c.json({ message: 'レコードが作成されませんでした。' });
  }
});

// レコードの編集
app.put('/:food_id', async (c) => {
  const id = c.req.param('food_id');
  const { category_id, food_name, quantity_value, quantity_unit_id, expiration_type, expiration_date } =
    await c.req.json();

  const result = await c.env.DB.prepare(
    `
    UPDATE foods
    SET category_id = ?, food_name = ?, quantity_value = ?, quantity_unit_id = ?, expiration_type = ?, expiration_date = ?
    WHERE id = ?
    `
  )
    .bind(category_id, food_name, quantity_value, quantity_unit_id, expiration_type, expiration_date, id)
    .run();

  if (!result) {
    return c.notFound();
  }

  return c.json({ message: '食材の編集に成功しました' });
});

// レコードの削除
app.delete('/:food_id', async (c) => {
  const id = c.req.param('food_id');
  const result = await c.env.DB.prepare('DELETE FROM foods WHERE id = ?').bind(id).run();

  if (!result) {
    return c.notFound();
  }

  return c.json({ message: '食材の削除に成功しました' });
});

export default app;
