-- Обновляем sort_order у дублирующихся записей чтобы правильно отображались
-- Устанавливаем уникальные sort_order для первых записей (id 1-9)
UPDATE price_items SET sort_order = id WHERE id <= 9;
UPDATE price_categories SET sort_order = id WHERE id <= 2;