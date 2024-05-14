CREATE TABLE foods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  food_name TEXT NOT NULL,
  quantity_value REAL,
  quantity_unit_id INTEGER,
  expiration_type TEXT CHECK(expiration_type IN ('best_before', 'expiration_date')),
  expiration_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (quantity_unit_id) REFERENCES quantity_units(id)
);