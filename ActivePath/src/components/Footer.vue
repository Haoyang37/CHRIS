<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <h3>ActivePath</h3>
            <p>Transform your life through fitness</p>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Features</h4>
          <ul class="footer-links">
            <li><RouterLink to="/program">Program</RouterLink></li>
            <li><RouterLink to="/activities">Activities</RouterLink></li>
            <li><RouterLink to="/community">Community</RouterLink></li>
            <li><RouterLink to="/resources">Resources</RouterLink></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Account</h4>
          <ul class="footer-links">
            <li><RouterLink to="/login">Sign In</RouterLink></li>
            <li><RouterLink to="/register">Create Account</RouterLink></li>
            <li><RouterLink to="/account">My Profile</RouterLink></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.footer {
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-12) 0;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--spacing-12);
}

.footer-logo h3 {
  color: var(--primary-color);
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-2);
  font-weight: 700;
}

.footer-logo p {
  color: var(--text-secondary);
}

.footer-section h4 {
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-4);
  font-weight: 600;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: var(--spacing-2);
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition-normal);
  font-size: var(--font-size-sm);
}

.footer-links a:hover {
  color: var(--primary-color);
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-8);
  }
  
  .footer-section:first-child {
    grid-column: 1 / -1;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: var(--spacing-8) 0;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
  
  .footer-section:first-child {
    grid-column: 1;
  }
}
</style> 