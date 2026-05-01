CREATE TABLE price_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE price_items (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES price_categories(id),
  name TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT 'лист',
  price TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO price_categories (name, sort_order) VALUES
  ('OSB плиты', 1),
  ('Фанера', 2);

INSERT INTO price_items (category_id, name, unit, price, sort_order) VALUES
  (1, 'OSB-3, 9 мм (2440×1220)', 'лист', '790', 1),
  (1, 'OSB-3, 12 мм (2440×1220)', 'лист', '980', 2),
  (1, 'OSB-3, 15 мм (2440×1220)', 'лист', '1 190', 3),
  (1, 'OSB-3, 18 мм (2440×1220)', 'лист', '1 420', 4),
  (2, 'Фанера ФК, 6 мм (1525×1525)', 'лист', '680', 1),
  (2, 'Фанера ФК, 10 мм (1525×1525)', 'лист', '1 050', 2),
  (2, 'Фанера ФСФ, 12 мм (1220×2440)', 'лист', '1 280', 3),
  (2, 'Фанера ФСФ, 18 мм (1525×1525)', 'лист', '1 750', 4),
  (2, 'Фанера ламинированная, 18 мм', 'лист', '2 100', 5);
