// about-content.js
export function renderAboutContent() {
  return `
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="animate__animated animate__fadeInDown">Về Chúng Tôi</h1>
        <nav aria-label="breadcrumb" class="animate__animated animate__fadeIn animate__delay-1s">
          <ol class="breadcrumb justify-content-center">
            <li class="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
            <li class="breadcrumb-item active" aria-current="page">Về Chúng Tôi</li>
          </ol>
        </nav>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 animate-up">
            <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Về chúng tôi" class="img-fluid about-img">
          </div>
          <div class="col-lg-6 animate-up animate-delay-1">
            <h2 class="section-title text-start">Câu Chuyện Của Chúng Tôi</h2>
            <p>"Đưa Bạn Đi Khám" được thành lập với sứ mệnh giúp đỡ những người gặp khó khăn khi phải tự mình trải qua các thủ tục y tế phức tạp tại bệnh viện.</p>
            <p>Xuất phát từ chính trải nghiệm cá nhân khi chứng kiến người thân gặp khó khăn trong quá trình khám chữa bệnh, chúng tôi đã nung nấu ý tưởng tạo ra một dịch vụ hỗ trợ toàn diện cho bệnh nhân.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="mission-vision">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="section-title animate-up">Sứ Mệnh & Tầm Nhìn</h2>
            <p class="animate-up animate-delay-1">Định hướng phát triển và giá trị cốt lõi của chúng tôi</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-4 animate-up">
            <div class="mv-card">
              <div class="mv-icon">
                <i class="fas fa-bullseye"></i>
              </div>
              <h3>Sứ Mệnh</h3>
              <p>Tận tâm như người nhà.</p>
            </div>
          </div>
          <div class="col-md-6 mb-4 animate-up animate-delay-1">
            <div class="mv-card">
              <div class="mv-icon">
                <i class="fas fa-eye"></i>
              </div>
              <h3>Tầm Nhìn</h3>
              <p>Trở thành hương hiệu uy tín số 1 - mang lại sự tin tưởng cho khách hàng.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="section-title animate-up">Đội Ngũ Của Chúng Tôi</h2>
            <p class="animate-up animate-delay-1">Những con người tận tâm đằng sau dịch vụ</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4 animate-up">
            <div class="team-card">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Nguyễn Văn A" class="team-img">
              <div class="team-info">
                <h4>Nguyễn Văn A</h4>
                <p>Giám đốc điều hành</p>
                <div class="team-social">
                  <a href="#"><i class="fab fa-facebook-f"></i></a>
                  <a href="#"><i class="fab fa-linkedin-in"></i></a>
                  <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4 animate-up animate-delay-1">
            <div class="team-card">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Nguyễn Ngọc Thắng" class="team-img">
              <div class="team-info">
                <h4>Nguyễn Ngọc Thắng</h4>
                <p>CEO</p>
                <div class="team-social">
                  <a href="#"><i class="fab fa-facebook-f"></i></a>
                  <a href="#"><i class="fab fa-linkedin-in"></i></a>
                  <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4 animate-up animate-delay-2">
            <div class="team-card">
              <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Lê Văn C" class="team-img">
              <div class="team-info">
                <h4>Lê Văn C</h4>
                <p>Chuyên viên đào tạo</p>
                <div class="team-social">
                  <a href="#"><i class="fab fa-facebook-f"></i></a>
                  <a href="#"><i class="fab fa-linkedin-in"></i></a>
                  <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4 animate-up animate-delay-3">
            <div class="team-card">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Phạm Thị D" class="team-img">
              <div class="team-info">
                <h4>Phạm Thị D</h4>
                <p>Chuyên viên hỗ trợ</p>
                <div class="team-social">
                  <a href="#"><i class="fab fa-facebook-f"></i></a>
                  <a href="#"><i class="fab fa-linkedin-in"></i></a>
                  <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="values-section">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="section-title text-white animate-up">Giá Trị Cốt Lõi</h2>
            <p class="text-white-50 animate-up animate-delay-1">Những nguyên tắc không thỏa hiệp trong mọi hoạt động của chúng tôi</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4 animate-up">
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-heart"></i>
              </div>
              <h3>Tận Tâm</h3>
              <p>Chúng tôi đối xử với mọi bệnh nhân như người thân trong gia đình, luôn đặt mình vào vị trí của họ để thấu hiểu và hỗ trợ.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4 animate-up animate-delay-1">
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-award"></i>
              </div>
              <h3>Chuyên Nghiệp</h3>
              <p>Đội ngũ được đào tạo bài bản, am hiểu quy trình y tế, tuân thủ nghiêm ngặt các tiêu chuẩn dịch vụ.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4 animate-up animate-delay-2">
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-handshake"></i>
              </div>
              <h3>Tin Cậy</h3>
              <p>Chúng tôi cam kết bảo mật thông tin bệnh nhân, minh bạch về dịch vụ và chi phí, đúng giờ trong mọi cuộc hẹn.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 animate-up">
            <div class="cta-content">
              <h2>Sẵn Sàng Đồng Hành Cùng Bạn</h2>
              <p>Hãy để chúng tôi giúp bạn có trải nghiệm khám chữa bệnh nhẹ nhàng và hiệu quả hơn</p>
              <a href="/booking" class="btn btn-light btn-lg">Đặt Lịch Ngay</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function setupAboutAnimations() {
  function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-up');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if(elementPosition < screenPosition) {
        element.classList.add('animated');
      }
    });
  }

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
}