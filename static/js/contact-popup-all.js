// contact-popup-all.js
(function() {
  // Thêm CSS
  const style = document.createElement('style');
  style.textContent = `
    /* contact-popup.css */
:root {
  --primary-color: #0068d6;
  --messenger-color: #0084FF;
  --zalo-color: #0068FF;
}

.contact-popup {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.contact-btn {
  width: 60px;
  height: 60px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 104, 214, 0.3);
  transition: all 0.3s ease;
}

.contact-btn:hover {
  background-color: #0056b3;
  transform: scale(1.1);
}

.contact-options {
  position: absolute;
  bottom: 70px;
  right: 0;
  display: none;
  flex-direction: column;
  gap: 15px;
}

.contact-popup.active .contact-options {
  display: flex;
  animation: fadeInUp 0.3s ease;
}

.contact-option {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 30px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  transform: translateY(10px);
  opacity: 0;
}

.contact-popup.active .contact-option {
  transform: translateY(0);
  opacity: 1;
}

.contact-option.messenger {
  background-color: var(--messenger-color);
  animation-delay: 0.1s;
}

.contact-option.zalo {
  background-color: var(--zalo-color);
  animation-delay: 0.2s;
}

.contact-option i {
  font-size: 20px;
  margin-right: 10px;
}

.contact-option:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Font Awesome Zalo icon (nếu chưa có) */
.fa-zalo:before {
  content: "Z";
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-style: normal;
}
.contact-option.phone {
  background-color: #28a745;
  animation-delay: 0.3s;
}
  `;
  document.head.appendChild(style);

  // Thêm HTML
  const popupHTML = `
    <div class="contact-popup">
      <div class="contact-btn" id="contact-toggle">
        <i class="fas fa-comments"></i>
      </div>
      <div class="contact-options">
        <a href="https://m.me/duabandikham" target="_blank" class="contact-option messenger">
          <i class="fab fa-facebook-messenger"></i>
          <span>Messenger</span>
        </a>
        <a href="tel:0947206145" class="contact-option phone">
          <i class="fas fa-phone"></i>
          <span>Hotline</span>
        </a>
        <a href="https://zalo.me/0912345678" target="_blank" class="contact-option zalo">
          <i class="fab fa-zalo"></i>
          <span>Zalo</span>
        </a>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', popupHTML);

  // Xử lý sự kiện
  document.getElementById('contact-toggle').addEventListener('click', function(e) {
    e.stopPropagation();
    document.querySelector('.contact-popup').classList.toggle('active');
  });

  document.addEventListener('click', function(e) {
    const popup = document.querySelector('.contact-popup');
    if (!popup.contains(e.target)) {
      popup.classList.remove('active');
    }
  });

  // Tải Font Awesome nếu chưa có
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(faLink);
  }
})();