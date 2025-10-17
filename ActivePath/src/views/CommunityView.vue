<template>
  <div class="community-page">
    <div class="page-header">
      <h1>🤖 AI Assistant</h1>
      <p>Chat freely with AI assistant and get help and advice</p>
    </div>
    
    <AIChat />
    
    <div class="chat-info">
      <div class="info-card">
        <h3>💡 Usage Tips</h3>
        <ul>
          <li>You can ask me any questions and I'll do my best to help you</li>
          <li>Supports various topics: learning, work, life advice, etc.</li>
          <li>Chat history is saved in the current session</li>
          <li>Click the clear button to remove all chat history</li>
        </ul>
      </div>
      
      <div class="info-card">
        <h3>🔧 Features</h3>
        <ul>
          <li>Real-time AI conversation responses</li>
          <li>Supports Markdown formatted messages</li>
          <li>Typing indicator shows AI is thinking</li>
          <li>Responsive design, supports mobile devices</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AIChat from '../components/AIChat.vue'
</script>

<style scoped>
.community-page {
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

.chat-info {
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
  .community-page {
    padding: var(--spacing-6) var(--spacing-3);
  }
  
  .page-header h1 {
    font-size: var(--font-size-3xl);
  }
  
  .page-header p {
    font-size: var(--font-size-base);
  }
  
  .chat-info {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    margin-top: var(--spacing-6);
  }
  
  .info-card {
    padding: var(--spacing-4);
  }
}
</style> 