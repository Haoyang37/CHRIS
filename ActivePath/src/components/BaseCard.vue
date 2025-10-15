<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'medium'
})

const cardClasses = computed(() => {
  const baseClasses = 'base-card'
  const variantClasses = {
    default: 'card-default',
    elevated: 'card-elevated',
    outlined: 'card-outlined'
  }
  const paddingClasses = {
    small: 'card-padding-small',
    medium: 'card-padding-medium',
    large: 'card-padding-large'
  }
  
  return `${baseClasses} ${variantClasses[props.variant]} ${paddingClasses[props.padding]}`
})
</script>

<style scoped>
.base-card {
  border-radius: 12px;
  transition: all 0.3s ease;
}

/* Variants */
.card-default {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-elevated {
  background: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.card-outlined {
  background: white;
  border: 2px solid #e1e5e9;
}

/* Padding */
.card-padding-small {
  padding: 1rem;
}

.card-padding-medium {
  padding: 1.5rem;
}

.card-padding-large {
  padding: 2rem;
}

/* Hover effects */
.card-elevated:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card-default:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-outlined:hover {
  border-color: #667eea;
}
</style> 