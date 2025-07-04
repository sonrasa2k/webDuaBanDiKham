from flask import Flask, render_template, request, redirect

app = Flask(__name__)

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

@app.route("/submit-booking", methods=["POST"])
def submit_booking():
    name = request.form["name"]
    phone = request.form["phone"]
    date = request.form["date"]
    guide = request.form["guide"]
    print(f"New Booking: {name}, {phone}, {date}, {guide}")
    return f"Cảm ơn bạn đã đặt lịch, {name}! Người hướng dẫn {guide} sẽ liên hệ sớm."

if __name__ == "__main__":
    app.run(debug=True)