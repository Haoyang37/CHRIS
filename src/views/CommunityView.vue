<template>
  <div class="community-page">
    <PageHeader 
      title="Community" 
      description="Coming soon..."
    />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue'
</script>

<style scoped>
.community-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-8) var(--spacing-4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .community-page {
    padding: var(--spacing-6) var(--spacing-3);
  }
}
</style> 