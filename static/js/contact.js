// contact.js
import { renderNavbar, setupNavbar } from './navbar.js';
import { renderFooter, setupFooter } from './footer.js';
import { renderContactContent, setupContactForm } from './contact-content.js';

// Render các thành phần
document.getElementById('navbar-container').innerHTML = renderNavbar();
document.getElementById('contact-container').innerHTML = renderContactContent();
document.getElementById('footer-container').innerHTML = renderFooter();

// Thiết lập sự kiện
document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setupFooter();
  setupContactForm();
});