<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Settings</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">Customize your experience and preferences</p>
      </div>

      <!-- Settings Sections -->
      <div class="space-y-8">
        <!-- Theme Settings -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-6">
            <Icon name="heroicons:paint-brush" class="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Theme Settings</h2>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Choose your preferred theme
              </label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Light Theme -->
                <button
                  @click="setTheme('light')"
                  :class="[
                    'relative p-4 rounded-lg border-2 transition-all duration-200',
                    theme === 'light' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  ]"
                >
                  <div class="flex flex-col items-center">
                    <div class="w-12 h-12 bg-white rounded-lg border-2 border-gray-200 mb-3 flex items-center justify-center">
                      <Icon name="heroicons:sun" class="w-6 h-6 text-yellow-500" />
                    </div>
                    <span class="font-medium text-gray-900 dark:text-white">Light</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400 mt-1">Bright and clean</span>
                  </div>
                  <div 
                    v-if="theme === 'light'"
                    class="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <Icon name="heroicons:check" class="w-4 h-4 text-white" />
                  </div>
                </button>

                <!-- Dark Theme -->
                <button
                  @click="setTheme('dark')"
                  :class="[
                    'relative p-4 rounded-lg border-2 transition-all duration-200',
                    theme === 'dark' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  ]"
                >
                  <div class="flex flex-col items-center">
                    <div class="w-12 h-12 bg-gray-900 rounded-lg border-2 border-gray-700 mb-3 flex items-center justify-center">
                      <Icon name="heroicons:moon" class="w-6 h-6 text-blue-400" />
                    </div>
                    <span class="font-medium text-gray-900 dark:text-white">Dark</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400 mt-1">Easy on the eyes</span>
                  </div>
                  <div 
                    v-if="theme === 'dark'"
                    class="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <Icon name="heroicons:check" class="w-4 h-4 text-white" />
                  </div>
                </button>

                <!-- Device Theme -->
                <button
                  @click="setTheme('device')"
                  :class="[
                    'relative p-4 rounded-lg border-2 transition-all duration-200',
                    theme === 'device' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  ]"
                >
                  <div class="flex flex-col items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-white to-gray-900 rounded-lg border-2 border-gray-300 dark:border-gray-600 mb-3 flex items-center justify-center">
                      <Icon name="heroicons:computer-desktop" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </div>
                    <span class="font-medium text-gray-900 dark:text-white">Device</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400 mt-1">Follow system</span>
                  </div>
                  <div 
                    v-if="theme === 'device'"
                    class="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <Icon name="heroicons:check" class="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Display Settings -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-6">
            <Icon name="heroicons:computer-desktop" class="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Display Settings</h2>
          </div>
          
          <div class="space-y-6">
            <!-- Font Size -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Font Size
              </label>
              <div class="flex items-center space-x-4">
                <button
                  v-for="size in ['small', 'medium', 'large']"
                  :key="size"
                  @click="setFontSize(size)"
                  :class="[
                    'px-4 py-2 rounded-lg border-2 transition-all duration-200 capitalize',
                    fontSize === size 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Animations -->
            <div>
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Animations
                  </label>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Show smooth transitions and micro-interactions
                  </p>
                </div>
                <button
                  @click="toggleAnimations"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    animationsEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    ]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-6">
            <Icon name="heroicons:bell" class="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
          </div>
          
          <div class="space-y-6">
            <div>
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Notifications
                  </label>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Receive updates about new products and promotions
                  </p>
                </div>
                <button
                  @click="toggleEmailNotifications"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    ]"
                  />
                </button>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stock Alerts
                  </label>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Get notified when items are back in stock
                  </p>
                </div>
                <button
                  @click="toggleStockAlerts"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    stockAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      stockAlerts ? 'translate-x-6' : 'translate-x-1'
                    ]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Admin Access -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-6">
            <Icon name="heroicons:shield-check" class="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Admin</h2>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-4">Manage products, orders, users, and store settings.</p>
          <NuxtLink
            to="/admin"
            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <Icon name="heroicons:arrow-right" class="w-5 h-5 mr-2" />
            Open Admin Dashboard
          </NuxtLink>
        </div>

        <!-- Account Settings -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-6">
            <Icon name="heroicons:user-circle" class="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Account</h2>
          </div>
          
          <div class="space-y-4">
            <NuxtLink to="/profile" class="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors block">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Icon name="heroicons:user" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <span class="text-gray-900 dark:text-white">Profile Information</span>
                </div>
                <Icon name="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
              </div>
            </NuxtLink>

            <NuxtLink to="/payment-methods" class="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors block">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Icon name="heroicons:credit-card" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <span class="text-gray-900 dark:text-white">Payment Methods</span>
                </div>
                <Icon name="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
              </div>
            </NuxtLink>

            <NuxtLink to="/shipping-addresses" class="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors block">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Icon name="heroicons:map-pin" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <span class="text-gray-900 dark:text-white">Shipping Addresses</span>
                </div>
                <Icon name="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
              </div>
            </NuxtLink>

            <button 
              @click="handleLogout"
              class="w-full text-left px-4 py-3 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                  <span class="text-red-600 dark:text-red-400">Sign Out</span>
                </div>
                <Icon name="heroicons:chevron-right" class="w-5 h-5 text-red-400" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const { theme, setTheme } = useTheme()
const authStore = useAuthStore()

const fontSize = ref('medium')
const animationsEnabled = ref(true)
const emailNotifications = ref(true)
const stockAlerts = ref(true)

const handleLogout = () => {
  authStore.logout()
  navigateTo('/')
}

const applyFontSizeClasses = (size) => {
  if (!import.meta.client) return
  const html = document.documentElement
  html.classList.remove('text-sm', 'text-base', 'text-lg')
  if (size === 'small') html.classList.add('text-sm')
  if (size === 'large') html.classList.add('text-lg')
}

const applyAnimationClasses = (enabled) => {
  if (!import.meta.client) return
  document.documentElement.classList.toggle('no-animations', !enabled)
}

const setFontSize = (size) => {
  fontSize.value = size
  localStorage.setItem('fontSize', size)
  applyFontSizeClasses(size)
}

const toggleAnimations = () => {
  animationsEnabled.value = !animationsEnabled.value
  localStorage.setItem('animationsEnabled', String(animationsEnabled.value))
  applyAnimationClasses(animationsEnabled.value)
}

const toggleEmailNotifications = () => {
  emailNotifications.value = !emailNotifications.value
  localStorage.setItem('emailNotifications', String(emailNotifications.value))
}

const toggleStockAlerts = () => {
  stockAlerts.value = !stockAlerts.value
  localStorage.setItem('stockAlerts', String(stockAlerts.value))
}

onMounted(() => {
  fontSize.value = localStorage.getItem('fontSize') || 'medium'
  animationsEnabled.value = localStorage.getItem('animationsEnabled') !== 'false'
  emailNotifications.value = localStorage.getItem('emailNotifications') !== 'false'
  stockAlerts.value = localStorage.getItem('stockAlerts') !== 'false'
  applyFontSizeClasses(fontSize.value)
  applyAnimationClasses(animationsEnabled.value)
})
</script>
