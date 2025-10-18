<template>
  <div class="account-page">
    <MelbourneCharts />
  </div>
</template>

<script setup lang="ts">
import MelbourneCharts from '../components/MelbourneCharts.vue'
</script>

<style scoped>
.account-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-8) var(--spacing-4);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.page-header h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-2);
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-header p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.page-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
  margin-top: var(--spacing-8);
}

.info-card {
  background: var(--bg-secondary);
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.info-card h3 {
  margin: 0 0 var(--spacing-4) 0;
  color: var(--text-primary);
  font-size: var(--font-size-xl);
}

.info-card p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.info-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-card li {
  padding: var(--spacing-2) 0;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-light);
  position: relative;
  padding-left: var(--spacing-6);
}

.info-card li:last-child {
  border-bottom: none;
}

.info-card li::before {
  content: '✨';
  position: absolute;
  left: 0;
  top: var(--spacing-2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .account-page {
    padding: var(--spacing-6) var(--spacing-3);
  }
  
  .page-header h1 {
    font-size: var(--font-size-3xl);
  }
  
  .page-header p {
    font-size: var(--font-size-base);
  }
  
  .page-info {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    margin-top: var(--spacing-6);
  }
  
  .info-card {
    padding: var(--spacing-4);
  }
}
</style> 