import { ref, reactive, readonly } from 'vue'
import { onAuthChange, logout as firebaseLogout } from '../services/authService'

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
    user.id = userData.email || Date.now().toString() // Use email as ID or fallback
    user.username = userData.username
    user.email = userData.email
    user.userType = userData.userType
    user.isLoggedIn = true
    
    // Save to localStorage
    localStorage.setItem('activepath_user', JSON.stringify(user))
  }

  const logout = async () => {
    try {
      // Sign out from Firebase
      await firebaseLogout()
    } catch (error) {
      console.error('Firebase logout error:', error)
    }
    
    // Clear local state
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
    user.id = userData.email || Date.now().toString()
    user.username = userData.username
    user.email = userData.email
    user.userType = userData.userType
    user.isLoggedIn = true
    
    // Save to localStorage
    localStorage.setItem('activepath_user', JSON.stringify(user))
  }

  // Initialize Firebase auth listener
  const initAuthListener = () => {
    onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        user.id = firebaseUser.uid
        user.username = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User'
        user.email = firebaseUser.email || ''
        user.userType = 'user' // Default to regular user
        user.isLoggedIn = true
        
        // Save to localStorage
        localStorage.setItem('activepath_user', JSON.stringify(user))
      } else {
        // User is signed out
        logout()
      }
    })
  }

  return {
    user: readonly(user),
    setUser,
    login,
    logout,
    register,
    loadUserFromStorage,
    initAuthListener
  }
}