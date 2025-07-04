// main.js
import { renderNavbar, setupNavbar } from './navbar.js';
import { renderFooter, setupFooter } from './footer.js';
import { setupScrollEffects, setupSmoothScrolling, setupAnimations } from './utils.js';

// Render navbar và footer
document.getElementById('navbar-container').innerHTML = renderNavbar();
document.getElementById('footer-container').innerHTML = renderFooter();

// Thiết lập các sự kiện
document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setupFooter();
  setupScrollEffects();
  setupSmoothScrolling();
  setupAnimations();
});