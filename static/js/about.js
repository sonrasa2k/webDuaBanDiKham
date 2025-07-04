// about.js
import { renderNavbar, setupNavbar } from './navbar.js';
import { renderFooter, setupFooter } from './footer.js';
import { renderAboutContent, setupAboutAnimations } from './about-content.js';

// Render các thành phần
document.getElementById('navbar-container').innerHTML = renderNavbar();
document.getElementById('about-container').innerHTML = renderAboutContent();
document.getElementById('footer-container').innerHTML = renderFooter();

// Thiết lập sự kiện
document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setupFooter();
  setupAboutAnimations();
});