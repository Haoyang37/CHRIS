<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Navigation />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 1rem;
}

/* 全局样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding-top: 0.5rem;
  }
}
</style>
