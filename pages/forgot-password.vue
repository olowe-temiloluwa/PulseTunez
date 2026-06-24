<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
    <!-- Background decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <!-- Logo and Branding -->
      <div class="text-center mb-8 animate-fade-in-down">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/20 shadow-2xl mb-4">
          <Icon name="heroicons:microphone" class="w-10 h-10 text-blue-600 dark:text-white" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h1>
        <p class="text-gray-600 dark:text-gray-300">No worries, we'll send you reset instructions</p>
      </div>

      <!-- Forgot Password Card -->
      <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 animate-scale-in">
        <form @submit.prevent="handleForgotPassword" class="space-y-4">
          <div>
            <label class="form-label">Email Address</label>
            <div class="relative">
              <Icon name="heroicons:envelope" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="email"
                type="email"
                required
                placeholder="you@example.com"
                class="form-input pl-10"
              />
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full btn-primary flex items-center justify-center"
          >
            <Icon v-if="isLoading" name="heroicons:arrow-path" class="w-5 h-5 mr-2 animate-spin" />
            <span>{{ isLoading ? 'Sending...' : 'Send Reset Link' }}</span>
          </button>
        </form>

        <!-- Back to Login -->
        <p class="text-center mt-6 text-gray-600 dark:text-gray-300">
          Remember your password?
          <NuxtLink to="/login" class="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Sign in
          </NuxtLink>
        </p>
      </div>

      <!-- Back to Home -->
      <div class="text-center mt-6">
        <NuxtLink to="/" class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
          Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'

const { initTheme } = useTheme()

// Form state
const email = ref('')
const isLoading = ref(false)

// Initialize theme
onMounted(() => {
  initTheme()
})

// Handle forgot password
const handleForgotPassword = async () => {
  isLoading.value = true
  
  try {
    // TODO: Implement actual password reset
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // For demo purposes, show success message
    alert('Password reset link sent to your email!')
    await navigateTo('/login')
  } catch (error) {
    console.error('Password reset error:', error)
  } finally {
    isLoading.value = false
  }
}

// Set page meta
useHead({
  title: 'Forgot Password - PulseTunez'
})
</script>
