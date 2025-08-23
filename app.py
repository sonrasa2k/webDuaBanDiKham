import os
from datetime import datetime
from flask import Flask, render_template, request
from flask_cors import CORS
from pymongo import MongoClient, ASCENDING
from pymongo.errors import DuplicateKeyError
from dotenv import load_dotenv
import requests
import random

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ====== Config ======
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/booking_app")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")

# ====== MongoDB ======
client = MongoClient(MONGO_URI)
db = client.get_default_database()
bookings = db["bookings"]
bookings.create_index([("bookingCode", ASCENDING)], unique=True)

# ====== Helpers ======
def gen_booking_code() -> str:
    rand_part = "".join([random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ") for _ in range(3)]) + \
                "".join([random.choice("0123456789") for _ in range(3)])
    return f"DL-{datetime.now().strftime('%d%m%y')}-{rand_part}"

def send_telegram_message(text: str):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {"chat_id": TELEGRAM_CHAT_ID, "text": text, "parse_mode": "Markdown"}
    r = requests.post(url, json=payload, timeout=10)
    r.raise_for_status()

def build_tg_text(doc: dict) -> str:
    lines = [
        "🧾 *ĐƠN ĐẶT LỊCH MỚI*",
        f"• Mã đơn: *{doc.get('bookingCode','')}*",
        f"• Khách: {doc.get('name','')}",
        f"• SĐT: {doc.get('phone','')}",
        f"• Ngày hẹn: {doc.get('date','')}",
        f"• Dịch vụ: {doc.get('service','')}",
        f"• Vị trí đón: {doc.get('pickup','')}",
        f"_Tạo lúc: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}_",
    ]
    return "\n".join(lines)

# ====== Routes ======
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/booking")
def booking():
    return render_template("booking.html")

@app.route("/services")
def services():
    return render_template("services.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/about")
def about():
    return render_template("about.html")

# ====== Submit booking ======
@app.route("/submit-booking", methods=["POST"])
def submit_booking():
    name = request.form.get("name", "").strip()
    phone = request.form.get("phone", "").strip()
    date = request.form.get("date", "").strip()
    service = request.form.get("service", "").strip()
    pickup = request.form.get("pickup", "").strip()

    errors = []
    if not name:
        errors.append("Thiếu họ tên")
    if not phone:
        errors.append("Thiếu số điện thoại")
    if not date:
        errors.append("Thiếu ngày đặt")
    if not service:
        errors.append("Thiếu dịch vụ")
    if not pickup:
        errors.append("Thiếu vị trí đón")

    if errors:
        return " | ".join(errors), 400

    booking_code = gen_booking_code()
    doc = {
        "bookingCode": booking_code,
        "name": name,
        "phone": phone,
        "date": date,
        "service": service,
        "pickup": pickup,
        "createdAt": datetime.utcnow(),
    }

    try:
        bookings.insert_one(doc)
    except DuplicateKeyError:
        doc["bookingCode"] = gen_booking_code()
        bookings.insert_one(doc)
    except Exception as e:
        return f"Lỗi DB: {str(e)}", 500

    try:
        send_telegram_message(build_tg_text(doc))
    except Exception as e:
        print("Telegram error:", e)

    return f"Cảm ơn bạn đã đặt lịch, {name}! Dịch vụ {service} sẽ liên hệ sớm. Vị trí đón: {pickup}. Mã đơn: {doc['bookingCode']}"

if __name__ == "__main__":
    app.run(debug=True)
    # 	103.29.2.7