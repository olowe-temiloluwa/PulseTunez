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
                    currentTheme === 'light' 
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
                    v-if="currentTheme === 'light'"
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
                    currentTheme === 'dark' 
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
                    v-if="currentTheme === 'dark'"
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
                    currentTheme === 'device' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  ]"
                >
                  <div class="flex flex-col items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-white to-gray-900 rounded-lg border-2 border-gray-300 mb-3 flex items-center justify-center">
                      <Icon name="heroicons:computer-desktop" class="w-6 h-6 text-gray-600" />
                    </div>
                    <span class="font-medium text-gray-900 dark:text-white">Device</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400 mt-1">Follow system</span>
                  </div>
                  <div 
                    v-if="currentTheme === 'device'"
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
                  @click="setFontSize('small')"
                  :class="[
                    'px-4 py-2 rounded-lg border-2 transition-all duration-200',
                    fontSize === 'small' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                  ]"
                >
                  Small
                </button>
                <button
                  @click="setFontSize('medium')"
                  :class="[
                    'px-4 py-2 rounded-lg border-2 transition-all duration-200',
                    fontSize === 'medium' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                  ]"
                >
                  Medium
                </button>
                <button
                  @click="setFontSize('large')"
                  :class="[
                    'px-4 py-2 rounded-lg border-2 transition-all duration-200',
                    fontSize === 'large' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                  ]"
                >
                  Large
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
            <!-- Email Notifications -->
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

            <!-- Stock Alerts -->
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

        <!-- Account Settings -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-6">
            <Icon name="heroicons:user-circle" class="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Account</h2>
          </div>
          
          <div class="space-y-4">
            <button class="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Icon name="heroicons:user" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <span class="text-gray-900 dark:text-white">Profile Information</span>
                </div>
                <Icon name="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button class="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Icon name="heroicons:credit-card" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <span class="text-gray-900 dark:text-white">Payment Methods</span>
                </div>
                <Icon name="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button class="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Icon name="heroicons:map-pin" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <span class="text-gray-900 dark:text-white">Shipping Addresses</span>
                </div>
                <Icon name="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button class="w-full text-left px-4 py-3 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
import { ref, onMounted } from 'vue'

// Theme settings
const currentTheme = ref('device')

// Display settings
const fontSize = ref('medium')
const animationsEnabled = ref(true)

// Notification settings
const emailNotifications = ref(true)
const stockAlerts = ref(true)

// Load settings from localStorage
onMounted(() => {
  // Load theme
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    currentTheme.value = savedTheme
    applyTheme(savedTheme)
  } else {
    // Default to light theme
    currentTheme.value = 'light'
    applyTheme('light')
  }

  // Load other settings
  fontSize.value = localStorage.getItem('fontSize') || 'medium'
  animationsEnabled.value = localStorage.getItem('animationsEnabled') !== 'false'
  emailNotifications.value = localStorage.getItem('emailNotifications') !== 'false'
  stockAlerts.value = localStorage.getItem('stockAlerts') !== 'false'

  // Apply font size
  applyFontSize(fontSize.value)
  
  // Apply animations setting
  applyAnimations(animationsEnabled.value)
})

// Theme functions
const setTheme = (theme) => {
  currentTheme.value = theme
  localStorage.setItem('theme', theme)
  applyTheme(theme)
}

const applyTheme = (theme) => {
  const html = document.documentElement
  const body = document.body
  
  console.log(`Applying theme: ${theme}`)
  
  // Remove dark class first
  html.classList.remove('dark')
  
  if (theme === 'dark') {
    html.classList.add('dark')
    console.log('Added dark class to HTML')
  } else if (theme === 'light') {
    // Light theme - no dark class
    console.log('Removed dark class from HTML')
  } else if (theme === 'device') {
    // Follow system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add('dark')
      console.log('Applied device theme (dark)')
    } else {
      console.log('Applied device theme (light)')
    }
  }
  
  // Force a complete repaint
  setTimeout(() => {
    html.style.display = 'none'
    html.offsetHeight // Force reflow
    html.style.display = ''
    
    // Also force body repaint
    body.style.display = 'none'
    body.offsetHeight
    body.style.display = ''
  }, 10)
}

// Display functions
const setFontSize = (size) => {
  fontSize.value = size
  localStorage.setItem('fontSize', size)
  applyFontSize(size)
}

const applyFontSize = (size) => {
  const html = document.documentElement
  html.classList.remove('text-sm', 'text-base', 'text-lg')
  
  if (size === 'small') {
    html.classList.add('text-sm')
  } else if (size === 'large') {
    html.classList.add('text-lg')
  }
  // medium is default (text-base)
}

const toggleAnimations = () => {
  animationsEnabled.value = !animationsEnabled.value
  localStorage.setItem('animationsEnabled', animationsEnabled.value)
  applyAnimations(animationsEnabled.value)
}

const applyAnimations = (enabled) => {
  const html = document.documentElement
  if (enabled) {
    html.classList.remove('no-animations')
  } else {
    html.classList.add('no-animations')
  }
}

// Notification functions
const toggleEmailNotifications = () => {
  emailNotifications.value = !emailNotifications.value
  localStorage.setItem('emailNotifications', emailNotifications.value)
}

const toggleStockAlerts = () => {
  stockAlerts.value = !stockAlerts.value
  localStorage.setItem('stockAlerts', stockAlerts.value)
}

// Listen for system theme changes
onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    if (currentTheme.value === 'device') {
      applyTheme('device')
    }
  })
})
</script>

<style scoped>
.no-animations * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}
</style>
