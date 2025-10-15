<template>
  <nav class="navigation">
    <div class="nav-container">
      <div class="logo">
        <h1>ActivePath</h1>
        <span class="logo-subtitle">Fitness Community</span>
      </div>
      
      <!-- Desktop Navigation -->
      <div class="nav-links desktop-nav">
        <RouterLink to="/" class="nav-item" active-class="active">
          <div class="nav-icon">🏠</div>
          <span>Home</span>
        </RouterLink>
        <RouterLink to="/program" class="nav-item" active-class="active">
          <div class="nav-icon">📋</div>
          <span>Program</span>
        </RouterLink>
        <RouterLink to="/activities" class="nav-item" active-class="active">
          <div class="nav-icon">🎯</div>
          <span>Activities</span>
        </RouterLink>
        <RouterLink to="/community" class="nav-item" active-class="active">
          <div class="nav-icon">👥</div>
          <span>Community</span>
        </RouterLink>
        <RouterLink to="/resources" class="nav-item" active-class="active">
          <div class="nav-icon">📚</div>
          <span>Resources</span>
        </RouterLink>
        <RouterLink to="/account" class="nav-item" active-class="active">
          <div class="nav-icon">👤</div>
          <span>Account</span>
        </RouterLink>
      </div>

      <!-- Auth Buttons -->
      <div class="auth-buttons desktop-auth">
        <RouterLink to="/login" class="auth-btn auth-btn-login">Login</RouterLink>
        <RouterLink to="/register" class="auth-btn auth-btn-signup">Sign Up</RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ 'open': isMobileMenuOpen }">
      <div class="mobile-nav-header">
        <h3>Menu</h3>
        <button class="close-btn" @click="closeMobileMenu">×</button>
      </div>
      
      <RouterLink to="/" class="mobile-nav-item" @click="closeMobileMenu">
        <div class="nav-icon">🏠</div>
        <span>Home</span>
      </RouterLink>
      <RouterLink to="/program" class="mobile-nav-item" @click="closeMobileMenu">
        <div class="nav-icon">📋</div>
        <span>Program</span>
      </RouterLink>
      <RouterLink to="/activities" class="mobile-nav-item" @click="closeMobileMenu">
        <div class="nav-icon">🎯</div>
        <span>Activities</span>
      </RouterLink>
      <RouterLink to="/community" class="mobile-nav-item" @click="closeMobileMenu">
        <div class="nav-icon">👥</div>
        <span>Community</span>
      </RouterLink>
      <RouterLink to="/resources" class="mobile-nav-item" @click="closeMobileMenu">
        <div class="nav-icon">📚</div>
        <span>Resources</span>
      </RouterLink>
      <RouterLink to="/account" class="mobile-nav-item" @click="closeMobileMenu">
        <div class="nav-icon">👤</div>
        <span>Account</span>
      </RouterLink>
      
      <div class="mobile-auth">
        <RouterLink to="/login" class="mobile-auth-btn" @click="closeMobileMenu">Login</RouterLink>
        <RouterLink to="/register" class="mobile-auth-btn primary" @click="closeMobileMenu">Sign Up</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.navigation {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: var(--spacing-4) 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid var(--border-light);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo h1 {
  color: var(--primary-color);
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-subtitle {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  gap: var(--spacing-6);
  align-items: center;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--text-secondary);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-lg);
  transition: var(--transition-normal);
  min-width: 80px;
  position: relative;
}

.nav-item:hover {
  color: var(--primary-color);
  background-color: var(--bg-tertiary);
  transform: translateY(-2px);
}

.nav-item.active {
  color: var(--primary-color);
  background: var(--primary-gradient);
  color: white;
  box-shadow: var(--shadow-md);
}

.nav-item.active .nav-icon {
  transform: scale(1.1);
}

.nav-icon {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-1);
  transition: var(--transition-normal);
}

.nav-item span {
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.auth-buttons {
  display: flex;
  gap: var(--spacing-3);
  align-items: center;
}

.auth-btn {
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-lg);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--font-size-sm);
  transition: var(--transition-normal);
  border: 2px solid transparent;
}

.auth-btn-login {
  color: var(--text-secondary);
  background: transparent;
}

.auth-btn-login:hover {
  color: var(--primary-color);
  background: var(--bg-tertiary);
}

.auth-btn-signup {
  color: white;
  background: var(--primary-gradient);
  box-shadow: var(--shadow-sm);
}

.auth-btn-signup:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
  transition: var(--transition-normal);
}

.mobile-menu-btn:hover {
  background: var(--bg-tertiary);
}

.mobile-menu-btn span {
  width: 24px;
  height: 3px;
  background: var(--text-primary);
  margin: 3px 0;
  transition: var(--transition-normal);
  border-radius: 2px;
}

.mobile-nav {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  flex-direction: column;
  padding: var(--spacing-4);
  transform: translateY(-100%);
  opacity: 0;
  transition: var(--transition-normal);
  box-shadow: var(--shadow-lg);
  border-bottom: 1px solid var(--border-light);
}

.mobile-nav.open {
  transform: translateY(0);
  opacity: 1;
}

.mobile-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-3);
  border-bottom: 1px solid var(--border-light);
}

.mobile-nav-header h3 {
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  color: var(--text-muted);
  cursor: pointer;
  padding: var(--spacing-1);
  border-radius: var(--radius-md);
  transition: var(--transition-normal);
}

.close-btn:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-secondary);
  padding: var(--spacing-3);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-2);
  transition: var(--transition-normal);
}

.mobile-nav-item:hover {
  background: var(--bg-tertiary);
  color: var(--primary-color);
}

.mobile-nav-item .nav-icon {
  margin-right: var(--spacing-3);
  font-size: var(--font-size-lg);
}

.mobile-auth {
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.mobile-auth-btn {
  padding: var(--spacing-3);
  border-radius: var(--radius-lg);
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: var(--transition-normal);
  border: 2px solid var(--border-color);
  color: var(--text-secondary);
}

.mobile-auth-btn:hover {
  background: var(--bg-tertiary);
  color: var(--primary-color);
}

.mobile-auth-btn.primary {
  background: var(--primary-gradient);
  color: white;
  border-color: transparent;
  box-shadow: var(--shadow-sm);
}

.mobile-auth-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Responsive Design */
@media (max-width: 768px) {
  .desktop-nav,
  .desktop-auth {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .mobile-nav {
    display: flex;
  }
  
  .nav-container {
    padding: 0 var(--spacing-3);
  }
  
  .logo h1 {
    font-size: var(--font-size-xl);
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 var(--spacing-2);
  }
  
  .logo h1 {
    font-size: var(--font-size-lg);
  }
  
  .logo-subtitle {
    font-size: 10px;
  }
}
</style> 