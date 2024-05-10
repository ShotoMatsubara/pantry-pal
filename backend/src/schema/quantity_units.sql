CREATE TABLE quantity_units (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quantity_unit_name TEXT NOT NULL
);

INSERT INTO quantity_units (quantity_unit_name) VALUES ('個'), ('ml'), ('g'), ('本');