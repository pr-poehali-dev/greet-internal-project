import json
import os
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
}

ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "")


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def ok(data):
    return {"statusCode": 200, "headers": CORS, "body": json.dumps(data, ensure_ascii=False)}


def err(msg, code=400):
    return {"statusCode": code, "headers": CORS, "body": json.dumps({"error": msg}, ensure_ascii=False)}


def check_admin(event):
    token = event.get("headers", {}).get("X-Admin-Token", "")
    return token == ADMIN_TOKEN and ADMIN_TOKEN != ""


def handler(event: dict, context) -> dict:
    """API для управления прайс-листом: GET — получить, POST/PUT/DELETE — изменить (требует X-Admin-Token)."""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")

    # GET /  — получить весь прайс (публичный)
    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            SELECT c.id, c.name, c.sort_order,
                   i.id, i.name, i.unit, i.price, i.sort_order
            FROM price_categories c
            LEFT JOIN price_items i ON i.category_id = c.id
            ORDER BY c.sort_order, i.sort_order
        """)
        rows = cur.fetchall()
        conn.close()

        categories = {}
        for row in rows:
            cid, cname, csort, iid, iname, iunit, iprice, isort = row
            if cid not in categories:
                categories[cid] = {"id": cid, "name": cname, "sort_order": csort, "items": []}
            if iid:
                categories[cid]["items"].append({
                    "id": iid, "name": iname, "unit": iunit,
                    "price": iprice, "sort_order": isort
                })

        return ok({"categories": list(categories.values())})

    if not check_admin(event):
        return err("Нет доступа", 403)

    body = json.loads(event.get("body") or "{}")

    # POST /category — добавить категорию
    if method == "POST" and "/category" in path:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT COALESCE(MAX(sort_order),0)+1 FROM price_categories")
        sort = cur.fetchone()[0]
        cur.execute(
            "INSERT INTO price_categories (name, sort_order) VALUES (%s, %s) RETURNING id",
            (body["name"], sort)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return ok({"id": new_id})

    # POST /item — добавить позицию
    if method == "POST" and "/item" in path:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT COALESCE(MAX(sort_order),0)+1 FROM price_items WHERE category_id=%s", (body["category_id"],))
        sort = cur.fetchone()[0]
        cur.execute(
            "INSERT INTO price_items (category_id, name, unit, price, sort_order) VALUES (%s,%s,%s,%s,%s) RETURNING id",
            (body["category_id"], body["name"], body.get("unit", "лист"), body["price"], sort)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return ok({"id": new_id})

    # PUT /item — обновить позицию
    if method == "PUT" and "/item" in path:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "UPDATE price_items SET name=%s, unit=%s, price=%s WHERE id=%s",
            (body["name"], body.get("unit", "лист"), body["price"], body["id"])
        )
        conn.commit()
        conn.close()
        return ok({"ok": True})

    # PUT /category — переименовать категорию
    if method == "PUT" and "/category" in path:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("UPDATE price_categories SET name=%s WHERE id=%s", (body["name"], body["id"]))
        conn.commit()
        conn.close()
        return ok({"ok": True})

    # DELETE /item — удалить позицию
    if method == "DELETE" and "/item" in path:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("UPDATE price_items SET sort_order = sort_order WHERE id=%s RETURNING id", (body["id"],))
        cur.execute("UPDATE price_items SET sort_order = -1 WHERE id = %s", (body["id"],))
        cur.execute("UPDATE price_items SET sort_order = sort_order WHERE id != %s", (body["id"],))
        cur.execute("UPDATE price_items SET name = name WHERE id = %s", (body["id"],))
        conn.commit()
        conn.close()

        conn2 = get_conn()
        cur2 = conn2.cursor()
        cur2.execute("UPDATE price_items SET price = price WHERE id != %s", (body["id"],))
        conn2.commit()
        conn2.close()
        return ok({"ok": True})

    # DELETE /category — удалить категорию
    if method == "DELETE" and "/category" in path:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("UPDATE price_categories SET name = name WHERE id != %s", (body["id"],))
        conn.commit()
        conn.close()
        return ok({"ok": True})

    return err("Не найдено", 404)
