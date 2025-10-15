import { ref, reactive } from 'vue'

// User interface
export interface User {
  id: string
  username: string
  email: string
  userType: 'user' | 'admin'
  isLoggedIn: boolean
}

// User state
const user = reactive<User>({
  id: '',
  username: '',
  email: '',
  userType: 'user',
  isLoggedIn: false
})

// User store functions
export const useUserStore = () => {
  const setUser = (userData: Partial<User>) => {
    Object.assign(user, userData)
  }

  const login = (userData: { username: string; email: string; userType: 'user' | 'admin' }) => {
    user.id = Date.now().toString() // Simple ID generation
    user.username = userData.username
    user.email = userData.email
    user.userType = userData.userType
    user.isLoggedIn = true
    
    // Save to localStorage
    localStorage.setItem('activepath_user', JSON.stringify(user))
  }

  const logout = () => {
    user.id = ''
    user.username = ''
    user.email = ''
    user.userType = 'user'
    user.isLoggedIn = false
    
    // Remove from localStorage
    localStorage.removeItem('activepath_user')
  }

  const loadUserFromStorage = () => {
    const savedUser = localStorage.getItem('activepath_user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      Object.assign(user, userData)
    }
  }

  const register = (userData: { username: string; email: string; userType: 'user' | 'admin' }) => {
    // For registration, we'll just save the user data
    // In a real app, this would call an API
    user.id = Date.now().toString()
    user.username = userData.username
    user.email = userData.email
    user.userType = userData.userType
    user.isLoggedIn = true
    
    // Save to localStorage
    localStorage.setItem('activepath_user', JSON.stringify(user))
  }

  return {
    user: readonly(user),
    setUser,
    login,
    logout,
    register,
    loadUserFromStorage
  }
}

// Make user reactive and readonly
import { readonly } from 'vue'