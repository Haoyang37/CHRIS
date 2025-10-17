<template>
  <div class="ai-chat-container">
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="chat-title">
        <div class="ai-avatar">🤖</div>
        <div class="title-info">
          <h3>AI Assistant</h3>
          <p>{{ isOnline ? 'Online' : 'Offline' }}</p>
        </div>
      </div>
      <button class="clear-chat-btn" @click="clearChat" title="Clear chat history">
        🗑️
      </button>
    </div>

    <!-- Chat Messages -->
    <div class="chat-messages" ref="messagesContainer">
      <div v-if="messages.length === 0" class="welcome-message">
        <div class="welcome-avatar">👋</div>
        <h4>Hello! I'm your AI Assistant</h4>
        <p>I can answer your questions, help you learn, or just chat with you. What would you like to talk about?</p>
      </div>
      
      <div 
        v-for="message in messages" 
        :key="message.id" 
        class="message"
        :class="{ 'user-message': message.type === 'user', 'ai-message': message.type === 'ai' }"
      >
        <div class="message-avatar">
          {{ message.type === 'user' ? '👤' : '🤖' }}
        </div>
        <div class="message-content">
          <div class="message-text" v-html="formatMessage(message.content)"></div>
          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="isTyping" class="message ai-message">
        <div class="message-avatar">🤖</div>
        <div class="message-content">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="chat-input-container">
      <form @submit.prevent="sendMessage" class="chat-form">
        <div class="input-wrapper">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Type your message..."
            class="chat-input"
            :disabled="isLoading"
            ref="messageInput"
          />
          <button 
            type="submit" 
            class="send-btn"
            :disabled="!inputMessage.trim() || isLoading"
            :class="{ 'loading': isLoading }"
          >
            <span v-if="!isLoading">📤</span>
            <span v-else class="spinner">⏳</span>
          </button>
        </div>
      </form>
      <div class="input-footer">
        <small>Press Enter to send, Shift + Enter for new line</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

const messages = ref<Message[]>([])
const inputMessage = ref('')
const isLoading = ref(false)
const isTyping = ref(false)
const isOnline = ref(true)
const messagesContainer = ref<HTMLElement>()
const messageInput = ref<HTMLInputElement>()

// 生成唯一ID
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9)

// 格式化消息内容
const formatMessage = (content: string) => {
  // 简单的markdown支持
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
}

// Format time
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Scroll to bottom
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Send message
const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage: Message = {
    id: generateId(),
    type: 'user',
    content: inputMessage.value.trim(),
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  const currentInput = inputMessage.value.trim()
  inputMessage.value = ''
  
  await scrollToBottom()
  
  // Show typing indicator
  isTyping.value = true
  isLoading.value = true
  await scrollToBottom()

  try {
    // Call AI API
    const aiResponse = await callAIAPI(currentInput)
    
    // Remove typing indicator
    isTyping.value = false
    
    // Add AI response
    const aiMessage: Message = {
      id: generateId(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date()
    }
    
    messages.value.push(aiMessage)
    await scrollToBottom()
    
  } catch (error) {
    console.error('AI API Error:', error)
    isTyping.value = false
    
    // Add error message
    const errorMessage: Message = {
      id: generateId(),
      type: 'ai',
      content: 'Sorry, I cannot respond to your message right now. Please try again later.',
      timestamp: new Date()
    }
    
    messages.value.push(errorMessage)
    await scrollToBottom()
  } finally {
    isLoading.value = false
  }
}

// Call AI API
const callAIAPI = async (message: string): Promise<string> => {
  const { callAIAPI: aiService } = await import('../services/aiService')
  return await aiService(message)
}

// Clear chat history
const clearChat = () => {
  if (confirm('Are you sure you want to clear all chat history?')) {
    messages.value = []
  }
}

// Focus input on component mount
onMounted(() => {
  if (messageInput.value) {
    messageInput.value.focus()
  }
})
</script>

<style scoped>
.ai-chat-container {
  display: flex;
  flex-direction: column;
  height: 600px;
  max-width: 800px;
  margin: 0 auto;
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
}

.chat-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.ai-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
}

.title-info h3 {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--text-primary);
}

.title-info p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}

.clear-chat-btn {
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  cursor: pointer;
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
  transition: var(--transition-normal);
}

.clear-chat-btn:hover {
  background: var(--bg-tertiary);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.welcome-message {
  text-align: center;
  padding: var(--spacing-8) var(--spacing-4);
  color: var(--text-secondary);
}

.welcome-avatar {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-4);
}

.welcome-message h4 {
  margin: 0 0 var(--spacing-2) 0;
  color: var(--text-primary);
}

.welcome-message p {
  margin: 0;
  line-height: 1.6;
}

.message {
  display: flex;
  gap: var(--spacing-3);
  max-width: 80%;
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.ai-message {
  align-self: flex-start;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  flex-shrink: 0;
}

.user-message .message-avatar {
  background: var(--primary-gradient);
}

.message-content {
  background: var(--bg-secondary);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.user-message .message-content {
  background: var(--primary-gradient);
  color: white;
}

.message-text {
  line-height: 1.5;
  word-wrap: break-word;
}

.message-text :deep(strong) {
  font-weight: 600;
}

.message-text :deep(em) {
  font-style: italic;
}

.message-text :deep(code) {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9em;
}

.message-time {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  margin-top: var(--spacing-1);
  text-align: right;
}

.user-message .message-time {
  color: rgba(255, 255, 255, 0.8);
}

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.chat-input-container {
  padding: var(--spacing-4);
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
}

.chat-form {
  margin-bottom: var(--spacing-2);
}

.input-wrapper {
  display: flex;
  gap: var(--spacing-2);
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background: var(--bg-primary);
  color: var(--text-primary);
  resize: none;
  transition: var(--transition-normal);
}

.chat-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.chat-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-btn {
  padding: var(--spacing-3) var(--spacing-4);
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-size: var(--font-size-lg);
  transition: var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.input-footer {
  text-align: center;
}

.input-footer small {
  color: var(--text-muted);
  font-size: var(--font-size-xs);
}

/* Dark theme adjustments */
.dark .message-text :deep(code) {
  background: rgba(255, 255, 255, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .ai-chat-container {
    height: 500px;
    margin: 0 var(--spacing-2);
  }
  
  .message {
    max-width: 90%;
  }
  
  .chat-header {
    padding: var(--spacing-3);
  }
  
  .chat-messages {
    padding: var(--spacing-3);
  }
  
  .chat-input-container {
    padding: var(--spacing-3);
  }
}
</style>
