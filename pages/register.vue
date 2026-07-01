<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 py-12 transition-colors duration-300">
    <!-- Background decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <!-- Logo and Branding -->
      <div class="text-center mb-8 animate-fade-in-down">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/20 shadow-2xl mb-4">
          <img src="~/assets/css/img/Logo.png" alt="PulseTunez Logo" class="w-12 h-12 object-contain rounded-lg" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
        <p class="text-gray-600 dark:text-gray-300">Join PulseTunez and discover premium audio equipment</p>
      </div>

      <!-- Register Card -->
      <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 animate-scale-in">
        <!-- Social Sign-up Buttons -->
        <div class="space-y-3 mb-6">
          <button
            @click="handleGoogleSignUp"
            class="w-full flex items-center justify-center px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 group"
          >
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="text-gray-700 dark:text-gray-200 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Sign up with Google</span>
          </button>

          <button
            @click="handleAppleSignUp"
            class="w-full flex items-center justify-center px-4 py-3 bg-black dark:bg-white border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-900 dark:hover:bg-gray-200 transition-all duration-300 group"
          >
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span class="text-white dark:text-gray-900 font-medium group-hover:text-gray-200 dark:group-hover:text-gray-700 transition-colors">Sign up with Apple</span>
          </button>

          <button
            @click="handleFacebookSignUp"
            class="w-full flex items-center justify-center px-4 py-3 bg-blue-600 border border-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300 group"
          >
            <svg class="w-5 h-5 mr-3 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="text-white font-medium group-hover:text-blue-100 transition-colors">Sign up with Facebook</span>
          </button>
        </div>

        <!-- Divider -->
        <div class="relative mb-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or create account with email</span>
          </div>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="form-label">First Name</label>
              <div class="relative">
                <Icon name="heroicons:user" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  v-model="firstName"
                  type="text"
                  required
                  placeholder="John"
                  class="form-input pl-10"
                />
              </div>
            </div>
            <div>
              <label class="form-label">Last Name</label>
              <div class="relative">
                <Icon name="heroicons:user" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  v-model="lastName"
                  type="text"
                  required
                  placeholder="Doe"
                  class="form-input pl-10"
                />
              </div>
            </div>
          </div>

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

          <div>
            <label class="form-label">Password</label>
            <div class="relative">
              <Icon name="heroicons:lock-closed" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="form-input pl-10 pr-10"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="w-5 h-5" />
              </button>
            </div>
            <!-- Password Strength Indicator -->
            <div class="mt-2">
              <div class="flex gap-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  class="h-1 flex-1 rounded-full transition-colors duration-300"
                  :class="passwordStrengthClass(i)"
                ></div>
              </div>
              <p class="text-xs mt-1" :class="passwordStrengthTextClass">
                {{ passwordStrengthText }}
              </p>
            </div>
          </div>

          <div>
            <label class="form-label">Confirm Password</label>
            <div class="relative">
              <Icon name="heroicons:lock-closed" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="form-input pl-10 pr-10"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Icon :name="showConfirmPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="w-5 h-5" />
              </button>
            </div>
            <p v-if="password && confirmPassword && !passwordsMatch" class="text-red-500 text-xs mt-1">
              Passwords do not match
            </p>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <input
              v-model="agreeToTerms"
              type="checkbox"
              required
              id="terms"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            />
            <label for="terms" class="ml-2 text-sm text-gray-600 dark:text-gray-300">
              I agree to the
              <NuxtLink to="/terms" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Terms of Service
              </NuxtLink>
              and
              <NuxtLink to="/privacy" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Privacy Policy
              </NuxtLink>
            </label>
          </div>

          <button
            type="submit"
            :disabled="isLoading || !passwordsMatch || !agreeToTerms"
            class="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon v-if="isLoading" name="heroicons:arrow-path" class="w-5 h-5 mr-2 animate-spin" />
            <span>{{ isLoading ? 'Creating account...' : 'Create Account' }}</span>
          </button>
        </form>

        <!-- Sign In Link -->
        <p class="text-center mt-6 text-gray-600 dark:text-gray-300">
          Already have an account?
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
import { useAuthStore } from '~/stores/auth'

const { initTheme } = useTheme()
const authStore = useAuthStore()

// Form state
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeToTerms = ref(false)
const isLoading = ref(false)

// Password strength calculation
const passwordStrength = computed(() => {
  if (!password.value) return 0
  
  let strength = 0
  if (password.value.length >= 8) strength++
  if (password.value.length >= 12) strength++
  if (/[A-Z]/.test(password.value)) strength++
  if (/[0-9]/.test(password.value)) strength++
  if (/[^A-Za-z0-9]/.test(password.value)) strength++
  
  return Math.min(strength, 4)
})

const passwordsMatch = computed(() => {
  if (!password.value || !confirmPassword.value) return true
  return password.value === confirmPassword.value
})

const passwordStrengthClass = (level) => {
  const strength = passwordStrength.value
  if (strength >= level) {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']
    return colors[strength - 1] || 'bg-gray-300'
  }
  return 'bg-gray-300 dark:bg-gray-600'
}

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  const texts = ['Weak', 'Fair', 'Good', 'Strong']
  return strength > 0 ? texts[strength - 1] : ''
})

const passwordStrengthTextClass = computed(() => {
  const strength = passwordStrength.value
  const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500']
  return strength > 0 ? colors[strength - 1] : 'text-gray-500'
})

// Initialize theme
onMounted(() => {
  initTheme()
})

// Social sign-up handlers
const handleGoogleSignUp = async () => {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    authStore.login({
      email: 'user@google.com',
      name: 'Google User',
      avatar: null
    })
    await navigateTo('/')
  } catch (error) {
    console.error('Google sign-up error:', error)
  } finally {
    isLoading.value = false
  }
}

const handleAppleSignUp = async () => {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    authStore.login({
      email: 'user@apple.com',
      name: 'Apple User',
      avatar: null
    })
    await navigateTo('/')
  } catch (error) {
    console.error('Apple sign-up error:', error)
  } finally {
    isLoading.value = false
  }
}

const handleFacebookSignUp = async () => {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    authStore.login({
      email: 'user@facebook.com',
      name: 'Facebook User',
      avatar: null
    })
    await navigateTo('/')
  } catch (error) {
    console.error('Facebook sign-up error:', error)
  } finally {
    isLoading.value = false
  }
}

// Email/password registration
const handleRegister = async () => {
  if (!passwordsMatch.value) {
    return
  }

  isLoading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (email.value && password.value) {
      authStore.register({
        email: email.value,
        name: `${firstName.value} ${lastName.value}`.trim() || email.value.split('@')[0],
        avatar: null
      })
      await navigateTo('/')
    }
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    isLoading.value = false
  }
}

// Set page meta
useHead({
  title: 'Register - PulseTunez'
})
</script>
