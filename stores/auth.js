import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  const login = (userData) => {
    user.value = userData
    isAuthenticated.value = true
    // Store in localStorage for persistence
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    // Clear from localStorage
    if (process.client) {
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    }
  }

  const register = (userData) => {
    user.value = userData
    isAuthenticated.value = true
    // Store in localStorage for persistence
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
    }
  }

  // Initialize from localStorage
  const initializeAuth = () => {
    if (process.client) {
      const storedUser = localStorage.getItem('user')
      const storedAuth = localStorage.getItem('isAuthenticated')
      if (storedUser && storedAuth === 'true') {
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
      }
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    initializeAuth
  }
})
