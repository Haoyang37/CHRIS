<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'
import BaseCard from '../components/BaseCard.vue'
import PageHeader from '../components/PageHeader.vue'

const router = useRouter()

const features = [
  {
    id: 1,
    icon: '📋',
    title: 'Program',
    description: 'Curated pathways: beginner plans, inclusive sports, and club connections.',
    route: '/program'
  },
  {
    id: 2,
    icon: '🎯',
    title: 'Activities',
    description: 'Find and join sessions via map, calendar, and community challenges',
    route: '/activities'
  },
  {
    id: 3,
    icon: '👥',
    title: 'Community',
    description: 'Social spaces: groups, mentoring, and real stories from participants',
    route: '/community'
  },
  {
    id: 4,
    icon: '👤',
    title: 'Account',
    description: 'User area: profile, progress tracking, saved items, notifications.',
    route: '/account'
  }
]

const navigateTo = (route: string) => {
  router.push(route)
}

const navigateToActivities = () => {
  router.push('/activities')
}

const navigateToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="hero-image"></div>
        <div class="hero-overlay"></div>
        <div class="hero-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badge">
          <span>🚀 Join the Movement</span>
        </div>
        <h1>Transform Your Life</h1>
        <p class="hero-description">
          Connect with fitness enthusiasts, explore activities, and achieve your goals.
          Start your fitness journey today.
        </p>
        <div class="hero-buttons">
          <BaseButton variant="primary" size="large" @click="navigateToActivities">
            Explore Activities
          </BaseButton>
          <BaseButton variant="outline" size="large" @click="navigateToRegister">
            Join Community
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <PageHeader 
          title="Everything You Need" 
          description="Comprehensive tools and features to support your fitness journey"
        />
        <div class="features-grid">
          <BaseCard 
            v-for="feature in features" 
            :key="feature.id"
            variant="elevated" 
            padding="large"
            class="feature-card"
            @click="navigateTo(feature.route)"
          >
            <div class="feature-icon-wrapper">
              <div class="feature-icon">{{ feature.icon }}</div>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <div class="feature-arrow">→</div>
          </BaseCard>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/runn2.jpg') center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: -1;
}

.hero-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.hero-content {
  text-align: center;
  color: white;
  max-width: 900px;
  padding: 0 var(--spacing-4);
  z-index: 1;
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-8);
  font-weight: 600;
  font-size: var(--font-size-base);
  border: 1px solid rgba(255, 255, 255, 0.2);
  letter-spacing: 0.5px;
}

.hero-content h1 {
  font-size: var(--font-size-6xl);
  margin-bottom: var(--spacing-8);
  font-weight: 800;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-10);
  opacity: 1;
  line-height: 1.7;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
  color: black;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  background: rgba(255, 255, 255, 0.1);
  padding: var(--spacing-4) var(--spacing-6);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-6);
  justify-content: center;
  flex-wrap: wrap;
}

/* Features Section */
.features {
  padding: var(--spacing-24) 0;
  background: var(--bg-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-8);
  margin-top: var(--spacing-12);
}

.feature-card {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-8px);
}

.feature-icon-wrapper {
  width: 80px;
  height: 80px;
  background: var(--primary-gradient);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-6);
  position: relative;
  overflow: hidden;
}

.feature-icon-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-100%);
  transition: var(--transition-normal);
}

.feature-card:hover .feature-icon-wrapper::before {
  transform: translateX(0);
}

.feature-icon {
  font-size: var(--font-size-3xl);
  z-index: 1;
}

.feature-card h3 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-3);
  font-weight: 700;
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-4);
}

.feature-arrow {
  position: absolute;
  top: var(--spacing-6);
  right: var(--spacing-6);
  font-size: var(--font-size-xl);
  color: var(--text-muted);
  transition: var(--transition-normal);
}

.feature-card:hover .feature-arrow {
  color: var(--primary-color);
  transform: translateX(4px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero-content {
    max-width: 800px;
  }
  
  .hero-content h1 {
    font-size: var(--font-size-5xl);
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 80vh;
    padding: var(--spacing-8) 0;
  }
  
  .hero-content {
    max-width: 600px;
    padding: 0 var(--spacing-3);
  }
  
  .hero-content h1 {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--spacing-6);
  }
  
  .hero-description {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-8);
  }
  
  .hero-badge {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-6);
  }
  
  .hero-buttons {
    gap: var(--spacing-4);
  }
  
  .features {
    padding: var(--spacing-16) 0;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
    margin-top: var(--spacing-8);
  }
  
  .features .container {
    padding: 0 var(--spacing-3);
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: 70vh;
    padding: var(--spacing-6) 0;
  }
  
  .hero-content {
    max-width: 100%;
    padding: 0 var(--spacing-2);
  }
  
  .hero-content h1 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-4);
    line-height: 1.2;
  }
  
  .hero-description {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-6);
    line-height: 1.6;
  }
  
  .hero-badge {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-xs);
    margin-bottom: var(--spacing-4);
  }
  
  .hero-buttons {
    flex-direction: column;
    gap: var(--spacing-3);
    align-items: center;
  }
  
  .hero-buttons button {
    width: 100%;
    max-width: 280px;
  }
  
  .features {
    padding: var(--spacing-12) 0;
  }
  
  .features .container {
    padding: 0 var(--spacing-2);
  }
  
  .features-grid {
    gap: var(--spacing-4);
    margin-top: var(--spacing-6);
  }
  
  .feature-card {
    padding: var(--spacing-4);
  }
  
  .feature-icon-wrapper {
    width: 60px;
    height: 60px;
    margin-bottom: var(--spacing-4);
  }
  
  .feature-icon {
    font-size: var(--font-size-2xl);
  }
  
  .feature-card h3 {
    font-size: var(--font-size-xl);
  }
  
  .feature-card p {
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 360px) {
  .hero-content h1 {
    font-size: var(--font-size-2xl);
  }
  
  .hero-description {
    font-size: var(--font-size-sm);
  }
  
  .hero-badge {
    font-size: 10px;
    padding: var(--spacing-1) var(--spacing-2);
  }
  
  .feature-card {
    padding: var(--spacing-3);
  }
  
  .feature-icon-wrapper {
    width: 50px;
    height: 50px;
  }
  
  .feature-icon {
    font-size: var(--font-size-xl);
  }
}
</style>
