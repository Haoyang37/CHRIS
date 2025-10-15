<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Create Your ActivePath Account</h2>
      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            :class="{ 'error': v$.username.$error }"
            placeholder="Enter your username"
            @blur="v$.username.$touch"
          />
          <span v-if="v$.username.$error" class="error-message">
            {{ v$.username.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            :class="{ 'error': v$.email.$error }"
            placeholder="Enter your email"
            @blur="v$.email.$touch"
          />
          <span v-if="v$.email.$error" class="error-message">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            :class="{ 'error': v$.password.$error }"
            placeholder="Enter password (minimum 6 characters)"
            @blur="v$.password.$touch"
          />
          <span v-if="v$.password.$error" class="error-message">
            {{ v$.password.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            :class="{ 'error': v$.confirmPassword.$error }"
            placeholder="Confirm your password"
            @blur="v$.confirmPassword.$touch"
          />
          <span v-if="v$.confirmPassword.$error" class="error-message">
            {{ v$.confirmPassword.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group">
          <label for="userType">Account Type</label>
          <select
            id="userType"
            v-model="form.userType"
            :class="{ 'error': v$.userType.$error }"
            @blur="v$.userType.$touch"
          >
            <option value="">Select account type</option>
            <option value="user">Regular User</option>
            <option value="admin">Administrator</option>
          </select>
          <span v-if="v$.userType.$error" class="error-message">
            {{ v$.userType.$errors[0].$message }}
          </span>
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>

      <div class="auth-links">
        <p>Already have an account? <RouterLink to="/login">Sign in now</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const isLoading = ref(false)
const router = useRouter()
const { register } = useUserStore()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  userType: ''
})

const rules = computed(() => ({
  username: { 
    required, 
    minLength: minLength(3) 
  },
  email: { required, email },
  password: { 
    required, 
    minLength: minLength(6) 
  },
  confirmPassword: { 
    required, 
    sameAsPassword: sameAs(form.password) 
  },
  userType: { required }
}))

const v$ = useVuelidate(rules, form)

const handleRegister = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  isLoading.value = true
  
  try {
    // Simulate registration request
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Register user and save to store
    register({
      username: form.username,
      email: form.email,
      userType: form.userType as 'user' | 'admin'
    })
    
    // Handle successful registration
    alert(`Welcome ${form.username}! Your account has been created successfully.`)
    
    // Redirect based on user type
    if (form.userType === 'admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error('Registration failed:', error)
    alert('Registration failed, please try again')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-gradient);
  padding: var(--spacing-8) var(--spacing-4);
}

.auth-card {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--spacing-10);
  box-shadow: var(--shadow-2xl);
  width: 100%;
  max-width: 400px;
}

.auth-card h2 {
  text-align: center;
  color: var(--text-primary);
  margin-bottom: var(--spacing-8);
  font-size: var(--font-size-3xl);
  font-weight: 700;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.form-group label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.form-group input,
.form-group select {
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: var(--transition-normal);
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group input.error,
.form-group select.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-1);
}

.submit-btn {
  background: var(--primary-gradient);
  color: white;
  border: none;
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-normal);
  margin-top: var(--spacing-4);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-links {
  margin-top: var(--spacing-8);
  text-align: center;
}

.auth-links a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
}

.auth-links a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .auth-container {
    padding: var(--spacing-6) var(--spacing-3);
  }
  
  .auth-card {
    padding: var(--spacing-8) var(--spacing-6);
    max-width: 350px;
  }
  
  .auth-card h2 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-6);
  }
  
  .auth-form {
    gap: var(--spacing-5);
  }
  
  .form-group input {
    padding: var(--spacing-3) var(--spacing-3);
  }
  
  .submit-btn {
    padding: var(--spacing-3) var(--spacing-4);
  }
}

@media (max-width: 480px) {
  .auth-container {
    padding: var(--spacing-4) var(--spacing-2);
  }
  
  .auth-card {
    padding: var(--spacing-6) var(--spacing-4);
    margin: var(--spacing-2);
    max-width: 320px;
  }
  
  .auth-card h2 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-5);
  }
  
  .auth-form {
    gap: var(--spacing-4);
  }
  
  .form-group label {
    font-size: var(--font-size-xs);
  }
  
  .form-group input {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
  }
  
  .submit-btn {
    padding: var(--spacing-3) var(--spacing-3);
    font-size: var(--font-size-sm);
  }
  
  .auth-links {
    margin-top: var(--spacing-6);
  }
  
  .auth-links a {
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 360px) {
  .auth-card {
    padding: var(--spacing-4) var(--spacing-3);
    max-width: 280px;
  }
  
  .auth-card h2 {
    font-size: var(--font-size-lg);
  }
  
  .form-group input {
    padding: var(--spacing-2) var(--spacing-2);
  }
  
  .submit-btn {
    padding: var(--spacing-2) var(--spacing-2);
  }
}
</style> 