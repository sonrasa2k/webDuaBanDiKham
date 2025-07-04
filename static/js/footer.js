export function renderFooter() {
  return `
    <footer>
      <div class="container footer-container">
        <a href="#top" class="back-to-top">
          <i class="fas fa-arrow-up"></i>
        </a>
        
        <div class="row">
          <div class="col-lg-4">
            <div class="footer-brand">
              <a href="/" class="footer-logo">
                <i class="fas fa-hand-holding-heart"></i>
                <span>Đưa Bạn Đi Khám</span>
              </a>
              <p class="footer-about">
                Dịch vụ hỗ trợ y tế tận tâm, đồng hành cùng bạn trên hành trình chăm sóc sức khỏe. 
                Giúp bạn tiết kiệm thời gian và giảm căng thẳng khi khám chữa bệnh.
              </p>
              
              <div class="newsletter">
                <h5>Đăng ký nhận tin</h5>
                <form class="newsletter-form">
                  <input 
                    type="email" 
                    class="newsletter-input" 
                    placeholder="Email của bạn"
                    required
                  >
                  <button type="submit" class="newsletter-btn">
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
              
              <div class="social-links">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          
          <div class="col-lg-8">
            <div class="footer-links-container">
              <div>
                <h5 class="footer-heading">Dịch vụ</h5>
                <ul class="footer-links">
                  <li><a href="#">Hướng dẫn quy trình</a></li>
                  <li><a href="#">Đặt lịch hẹn bác sĩ</a></li>
                  <li><a href="#">Hỗ trợ người cao tuổi</a></li>
                  <li><a href="#">Tư vấn y tế từ xa</a></li>
                  <li><a href="#">Xét nghiệm tại nhà</a></li>
                </ul>
              </div>
              
              <div>
                <h5 class="footer-heading">Thông tin</h5>
                <ul class="footer-links">
                  <li><a href="#">Về chúng tôi</a></li>
                  <li><a href="#">Đội ngũ bác sĩ</a></li>
                  <li><a href="#">Bệnh viện đối tác</a></li>
                  <li><a href="#">Câu hỏi thường gặp</a></li>
                  <li><a href="#">Chính sách bảo mật</a></li>
                </ul>
              </div>
              
              <div>
                <h5 class="footer-heading">Liên hệ</h5>
                <div class="contact-info-footer">
                  <div class="contact-item-footer">
                    <i class="fas fa-map-marker-alt contact-icon"></i>
                    <div class="contact-text-footer">
                      123 Nguyễn Văn Cừ, Quận 5, TP.HCM
                    </div>
                  </div>
                  
                  <div class="contact-item-footer">
                    <i class="fas fa-phone-alt contact-icon"></i>
                    <div class="contact-text-footer">
                      <a href="tel:0123456789">0123 456 789</a>
                    </div>
                  </div>
                  
                  <div class="contact-item-footer">
                    <i class="fas fa-envelope contact-icon"></i>
                    <div class="contact-text-footer">
                      <a href="mailto:lienhe@duubandikham.vn">lienhe@duubandikham.vn</a>
                    </div>
                  </div>
                  
                  <div class="contact-item-footer">
                    <i class="fas fa-clock contact-icon"></i>
                    <div class="contact-text-footer">
                      Thứ 2 - Thứ 7: 7:00 - 19:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="copyright">
          <div>
            &copy; ${new Date().getFullYear()} Đưa Bạn Đi Khám.All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  `;
}

export function setupFooter() {
  // Back to top button functionality
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput.value) {
        alert('Cảm ơn bạn đã đăng ký nhận tin!');
        emailInput.value = '';
      }
    });
  }
}