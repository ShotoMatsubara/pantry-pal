CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_name TEXT NOT NULL
);

INSERT INTO categories (category_name)
VALUES
  ('staple'),
  ('meat'),
  ('seafood'),
  ('vegetable'),
  ('fruit'),
  ('dairy'),
  ('seasoning'),
  ('beverage'),
  ('other');