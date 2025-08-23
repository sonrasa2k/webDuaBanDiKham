import os
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, abort, flash
from flask_cors import CORS
from pymongo import MongoClient, ASCENDING, DESCENDING
from pymongo.errors import DuplicateKeyError
from dotenv import load_dotenv
import requests
import random
import csv
from io import StringIO
from flask import Response

# (A) Nếu dùng pytz cho giờ VN
try:
    import pytz
    VN_TZ = pytz.timezone("Asia/Ho_Chi_Minh")
    def now_vn(): return datetime.now(VN_TZ)
except Exception:
    from zoneinfo import ZoneInfo
    VN_TZ = ZoneInfo("Asia/Ho_Chi_Minh")
    def now_vn(): return datetime.now(VN_TZ)

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET", "dev-secret")  # cần cho session
CORS(app, resources={r"/*": {"origins": "*"}})

# ====== Config ======
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/booking_app")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "changeme")

# ====== MongoDB ======
client = MongoClient(MONGO_URI)
db = client.get_default_database()
bookings = db["bookings"]
bookings.create_index([("bookingCode", ASCENDING)], unique=True)
bookings.create_index([("createdAt", DESCENDING)])

# ====== Helpers ======
def build_filters(q: str, status: str):
    filt = {}
    if q:
        filt["$or"] = [
            {"name": {"$regex": q, "$options": "i"}},
            {"phone": {"$regex": q, "$options": "i"}},
            {"bookingCode": {"$regex": q, "$options": "i"}},
        ]
    if status and status != "all":
        filt["status"] = status
    return filt
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
        f"• Trạng thái: {doc.get('status','new')}",
        f"_Tạo lúc: {now_vn().strftime('%d/%m/%Y %H:%M:%S')}_",
    ]
    return "\n".join(lines)

def login_required(func):
    from functools import wraps
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not session.get("admin_logged"):
            return redirect(url_for("admin_login", next=request.path))
        return func(*args, **kwargs)
    return wrapper

# ====== Site ======
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
    if not name: errors.append("Thiếu họ tên")
    if not phone: errors.append("Thiếu số điện thoại")
    if not date: errors.append("Thiếu ngày đặt")
    if not service: errors.append("Thiếu dịch vụ")
    if not pickup: errors.append("Thiếu vị trí đón")

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
        "status": "new",                # (B) trạng thái mặc định
        "createdAt": now_vn(),          # giờ VN
        "updatedAt": now_vn(),
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

# ====== (C) Admin Auth ======
@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        pwd = request.form.get("password", "")
        if pwd == ADMIN_PASSWORD:
            session["admin_logged"] = True
            return redirect(request.args.get("next") or url_for("admin_orders"))
        flash("Sai mật khẩu", "danger")
    return render_template("admin_login.html")

@app.route("/admin/logout")
def admin_logout():
    session.pop("admin_logged", None)
    return redirect(url_for("admin_login"))

# ====== (D) Admin Orders ======
@app.route("/admin/orders")
@login_required
def admin_orders():
    q = (request.args.get("q") or "").strip()
    status = (request.args.get("status") or "all").strip()
    # phân trang
    try:
        page = max(int(request.args.get("page", 1)), 1)
    except ValueError:
        page = 1
    try:
        per_page = min(max(int(request.args.get("per_page", 20)), 5), 200)  # 5..200
    except ValueError:
        per_page = 20

    filt = build_filters(q, status)

    total = bookings.count_documents(filt)
    total_pages = (total + per_page - 1) // per_page
    if page > total_pages and total_pages > 0:
        page = total_pages

    cursor = (bookings.find(filt)
              .sort("createdAt", DESCENDING)
              .skip((page - 1) * per_page)
              .limit(per_page))
    items = list(cursor)

    pagination = {
        "page": page,
        "per_page": per_page,
        "total": total,
        "total_pages": total_pages,
        "has_prev": page > 1,
        "has_next": page < total_pages,
    }

    return render_template(
        "admin_orders.html",
        items=items,
        q=q,
        status=status,
        pagination=pagination
    )

@app.route("/admin/orders/<booking_code>")
@login_required
def admin_order_detail(booking_code):
    doc = bookings.find_one({"bookingCode": booking_code})
    if not doc:
        abort(404)
    return render_template("admin_order_detail.html", doc=doc)

@app.route("/admin/orders/<booking_code>/status", methods=["POST"])
@login_required
def admin_order_update_status(booking_code):
    new_status = request.form.get("status", "").strip()
    if new_status not in ["new", "confirmed", "in_progress", "done", "cancelled"]:
        return "Trạng thái không hợp lệ", 400
    result = bookings.update_one(
        {"bookingCode": booking_code},
        {"$set": {"status": new_status, "updatedAt": now_vn()}}
    )
    if result.matched_count == 0:
        return "Không tìm thấy đơn", 404
    return redirect(url_for("admin_order_detail", booking_code=booking_code))

@app.route("/admin/orders/<booking_code>/delete", methods=["POST"])
@login_required
def admin_order_delete(booking_code):
    bookings.delete_one({"bookingCode": booking_code})
    return redirect(url_for("admin_orders"))

@app.route("/admin/orders/export")
@login_required
def admin_orders_export():
    q = (request.args.get("q") or "").strip()
    status = (request.args.get("status") or "all").strip()

    filt = build_filters(q, status)
    cursor = bookings.find(filt).sort("createdAt", DESCENDING)

    # Tạo CSV trong memory
    si = StringIO()
    writer = csv.writer(si)
    writer.writerow(["bookingCode","name","phone","service","pickup","date","status","createdAt","updatedAt"])

    for it in cursor:
        created = (it.get("createdAt") or "").strftime("%d/%m/%Y %H:%M:%S") if isinstance(it.get("createdAt"), datetime) else ""
        updated = (it.get("updatedAt") or "").strftime("%d/%m/%Y %H:%M:%S") if isinstance(it.get("updatedAt"), datetime) else ""
        writer.writerow([
            it.get("bookingCode",""),
            it.get("name",""),
            it.get("phone",""),
            it.get("service",""),
            it.get("pickup",""),
            it.get("date",""),
            it.get("status",""),
            created,
            updated
        ])

    output = si.getvalue()
    filename = f"orders_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    return Response(
        output,
        mimetype="text/csv; charset=utf-8",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

if __name__ == "__main__":
    app.run(debug=True)
