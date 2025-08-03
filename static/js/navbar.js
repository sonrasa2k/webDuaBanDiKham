// navbar.js
function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/') return 'home';
  if (path.includes('booking')) return 'booking';
  if (path.includes('services')) return 'services';
  if (path.includes('about')) return 'about';
  if (path.includes('contact')) return 'contact';
  return '';
}

export function renderNavbar(currentPage = getCurrentPage()) {
  const pages = {
    'home': { href: '/', text: 'Trang Chủ' },
    'booking': { href: '/booking', text: 'Đặt Lịch' },
    'services': { href: '/services', text: 'Dịch Vụ' },
    'about': { href: '/about', text: 'Về Chúng Tôi' },
    'contact': { href: '/contact', text: 'Liên Hệ' }
  };

  const navItems = Object.entries(pages).map(([key, page]) => {
    const activeClass = key === currentPage ? 'active' : '';
    return `
      <li class="nav-item">
        <a class="nav-link ${activeClass}" href="${page.href}">${page.text}</a>
      </li>
    `;
  }).join('');

  return `
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="/static/images/logo.png" alt="Đưa Bạn Đi Khám" class="navbar-logo">
          <span class="brand-text">ĐƯA BẠN ĐI KHÁM</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            ${navItems}
          </ul>
        </div>
      </div>
    </nav>
  `;
}

export function setupNavbar() {
  // Navbar scroll effect
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

