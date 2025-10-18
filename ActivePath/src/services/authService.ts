// Firebase Authentication Service
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../config/firebase'

export interface UserData {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

// Sign up with email and password
export const signUp = async (email: string, password: string, displayName?: string): Promise<UserData> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update display name if provided
    if (displayName && user) {
      await updateProfile(user, { displayName })
    }

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code))
  }
}

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<UserData> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code))
  }
}

// Sign out
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error('Failed to sign out')
  }
}

// Send password reset email
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code))
  }
}

// Listen to auth state changes
export const onAuthChange = (callback: (user: UserData | null) => void): (() => void) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      })
    } else {
      callback(null)
    }
  })
}

// Get current user
export const getCurrentUser = (): UserData | null => {
  const user = auth.currentUser
  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
  }
  return null
}

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No user found with this email address'
    case 'auth/wrong-password':
      return 'Incorrect password'
    case 'auth/email-already-in-use':
      return 'This email is already registered'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters'
    case 'auth/invalid-email':
      return 'Invalid email address'
    case 'auth/user-disabled':
      return 'This account has been disabled'
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection'
    default:
      return 'An error occurred. Please try again'
  }
}

export default {
  signUp,
  signIn,
  logout,
  resetPassword,
  onAuthChange,
  getCurrentUser
}
