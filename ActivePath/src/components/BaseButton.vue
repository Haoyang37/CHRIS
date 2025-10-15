<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})

defineEmits<{
  click: []
}>()

const buttonClasses = computed(() => {
  const baseClasses = 'btn'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  }
  const sizeClasses = {
    small: 'btn-small',
    medium: 'btn-medium',
    large: 'btn-large'
  }
  
  return `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`
})
</script>

<style scoped>
.btn {
  display: inline-block;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
  text-align: center;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Variants */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: #667eea;
  border-color: #667eea;
}

.btn-outline:hover:not(:disabled) {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

/* Sizes */
.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-medium {
  padding: 0.75rem 2rem;
  font-size: 1rem;
}

.btn-large {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
}

/* Responsive */
@media (max-width: 768px) {
  .btn {
    width: 100%;
    max-width: 250px;
  }
}
</style> 