import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на почту владельца."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "")
    phone = body.get("phone", "")
    product = body.get("product", "")
    quantity = body.get("quantity", "")
    comment = body.get("comment", "")

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    sender = "temaflip@mail.ru"
    recipient = "temaflip@mail.ru"

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f3ef; padding: 24px;">
      <div style="background: #1a3d1a; padding: 20px 24px; margin-bottom: 0;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">
          НОВАЯ ЗАЯВКА — ЛесПлита
        </h2>
      </div>
      <div style="background: #ffffff; border: 2px solid #0d0d0d; border-top: none; padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px 0; color: #666; font-size: 12px; text-transform: uppercase; width: 40%;">Имя</td>
            <td style="padding: 10px 0; color: #0d0d0d; font-size: 15px; font-weight: bold;">{name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px 0; color: #666; font-size: 12px; text-transform: uppercase;">Телефон</td>
            <td style="padding: 10px 0; color: #0d0d0d; font-size: 15px; font-weight: bold;">{phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px 0; color: #666; font-size: 12px; text-transform: uppercase;">Продукция</td>
            <td style="padding: 10px 0; color: #0d0d0d; font-size: 15px;">{product or "Не указана"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px 0; color: #666; font-size: 12px; text-transform: uppercase;">Количество</td>
            <td style="padding: 10px 0; color: #0d0d0d; font-size: 15px;">{quantity or "Не указано"} листов</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; font-size: 12px; text-transform: uppercase; vertical-align: top;">Комментарий</td>
            <td style="padding: 10px 0; color: #0d0d0d; font-size: 15px;">{comment or "—"}</td>
          </tr>
        </table>
      </div>
      <div style="background: #2d6e2d; padding: 12px 24px; margin-top: 0;">
        <p style="color: #ffffff; margin: 0; font-size: 12px; text-align: center;">
          Заявка отправлена с сайта ЛесПлита
        </p>
      </div>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка от {name} — {phone}"
    msg["From"] = sender
    msg["To"] = recipient
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }
