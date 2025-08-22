// contact-content.js
export function renderContactContent() {
  return `
    <section class="contact-hero">
      <div class="container">
        <h1 class="animate__animated animate__fadeInDown">Liên Hệ Với Chúng Tôi</h1>
        <p class="animate__animated animate__fadeIn animate__delay-1s">Mọi thắc mắc và yêu cầu hỗ trợ, xin vui lòng điền form bên dưới</p>
      </div>
    </section>

    <section class="contact-content py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="contact-form-container">
              <h2 class="mb-4">Gửi Tin Nhắn</h2>
              <form id="contactForm" class="needs-validation" novalidate>
                <div class="mb-3">
                  <label for="name" class="form-label">Họ và Tên <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="name" required>
                  <div class="invalid-feedback">Vui lòng nhập tên của bạn</div>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                  <input type="email" class="form-control" id="email" required>
                  <div class="invalid-feedback">Vui lòng nhập email hợp lệ</div>
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label">Số Điện Thoại</label>
                  <input type="tel" class="form-control" id="phone">
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label">Nội Dung <span class="text-danger">*</span></label>
                  <textarea class="form-control" id="message" rows="5" required></textarea>
                  <div class="invalid-feedback">Vui lòng nhập nội dung tin nhắn</div>
                </div>
                <button type="submit" class="btn btn-primary">Gửi Tin Nhắn</button>
              </form>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="contact-info-container">
              <h2 class="mb-4">Thông Tin Liên Hệ</h2>
              <div class="contact-info-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                  <h5>Địa Chỉ</h5>
                  <p>15 Võ Văn Kiệt, Phường Bình Phú,HCM</p>
                </div>
              </div>
              <div class="contact-info-item">
                <i class="fas fa-phone-alt"></i>
                <div>
                  <h5>Điện Thoại</h5>
                  <p><a href="tel:+84899692207">+84 899 692 207</a></p>
                </div>
              </div>
              <div class="contact-info-item">
                <i class="fas fa-envelope"></i>
                <div>
                  <h5>Email</h5>
                  <p><a href="mailto:lienhe@duubandikham.vn">lienhe@duubandikham.vn</a></p>
                </div>
              </div>
              <div class="contact-info-item">
                <i class="fas fa-clock"></i>
                <div>
                  <h5>Giờ Làm Việc</h5>
                  <p>Thứ 2 - Thứ 7: 7:00 - 19:00</p>
                </div>
              </div>
              <div class="mt-4">
                <h5>Mạng Xã Hội</h5>
                <div class="social-links">
                  <a href="#"><i class="fab fa-facebook-f"></i></a>
                  <a href="#"><i class="fab fa-twitter"></i></a>
                  <a href="#"><i class="fab fa-instagram"></i></a>
                  <a href="#"><i class="fab fa-youtube"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="map-container">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.126865816468!2d106.67727731526097!3d10.802837361735947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d4b5e6cb7f%3A0x5e9a5a5a5a5a5a5a!2s123%20Nguy%E1%BB%85n%20V%C4%83n%20C%E1%BB%AB%2C%20Qu%E1%BA%ADn%205%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s" 
              width="100%" 
              height="450" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy">
      </iframe>
    </section>
  `;
}

export function setupContactForm() {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Xử lý submit form (có thể thay bằng AJAX)
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      message: document.getElementById('message').value
    };

    console.log('Form submitted:', formData);

    // Hiển thị thông báo
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');

    // Reset form
    form.reset();
    form.classList.remove('was-validated');
  }, false);
}