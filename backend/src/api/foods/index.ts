import { Hono } from 'hono';
import { Env } from '../../types/env';

const app = new Hono<{ Bindings: Env }>();

// user_idとcategory_idと紐づく食材の一覧を取得する
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
