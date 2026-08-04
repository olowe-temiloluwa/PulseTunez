<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/settings" class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4">
          <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2" />
          Back to Settings
        </NuxtLink>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Profile Information</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">Manage your personal information and preferences</p>
      </div>

      <!-- Profile Form -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <!-- Profile Image Section -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          <div class="relative">
            <div class="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-4 border-gray-300 dark:border-gray-600">
              <img 
                v-if="profileImage" 
                :src="profileImage" 
                alt="Profile" 
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <Icon name="heroicons:user" class="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            <button
              @click="triggerFileInput"
              class="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <Icon name="heroicons:camera" class="w-5 h-5" />
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
            />
          </div>
          <div class="text-center sm:text-left">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ formData.name || 'Your Name' }}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">@{{ formData.username || 'username' }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">JPG, PNG or GIF. Max size 5MB</p>
          </div>
        </div>

        <!-- Form Fields -->
        <form @submit.prevent="handleSave" class="space-y-6">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              v-model="formData.name"
              type="text"
              required
              placeholder="Enter your full name"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            />
          </div>

          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">@</span>
              <input
                v-model="formData.username"
                type="text"
                required
                placeholder="username"
                class="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div class="relative">
              <input
                v-model="formData.email"
                type="email"
                required
                placeholder="you@example.com"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
              <div v-if="formData.emailVerified" class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-green-600">
                <Icon name="heroicons:check-circle" class="w-5 h-5" />
              </div>
            </div>
            <div v-if="!formData.emailVerified" class="mt-2">
              <button
                type="button"
                @click="verifyEmail"
                class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Verify Email
              </button>
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <div class="relative">
              <input
                v-model="formData.phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
              <div v-if="formData.phoneVerified" class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-green-600">
                <Icon name="heroicons:check-circle" class="w-5 h-5" />
              </div>
            </div>
            <div v-if="!formData.phoneVerified && formData.phone" class="mt-2">
              <button
                type="button"
                @click="verifyPhone"
                class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Verify Phone
              </button>
            </div>
          </div>

          <!-- Bio -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              v-model="formData.bio"
              rows="3"
              placeholder="Tell us about yourself..."
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors resize-none"
            />
          </div>

          <!-- Save Button -->
          <div class="flex justify-end gap-4">
            <NuxtLink
              to="/settings"
              class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </NuxtLink>
            <button
              type="submit"
              :disabled="isSaving"
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Loader v-if="isSaving" size="sm" color="white" />
              {{ isSaving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Alert Modal -->
    <AlertModal
      :is-open="showAlert"
      :type="alertType"
      :title="alertTitle"
      :message="alertMessage"
      @close="showAlert = false"
    />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const fileInput = ref(null)
const isSaving = ref(false)
const profileImage = ref('')
const showAlert = ref(false)
const alertType = ref('success')
const alertTitle = ref('')
const alertMessage = ref('')

const formData = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
  bio: '',
  emailVerified: false,
  phoneVerified: false
})

onMounted(() => {
  // Load user data from auth store
  if (authStore.user) {
    formData.value.name = authStore.user.name || ''
    formData.value.email = authStore.user.email || ''
    formData.value.username = authStore.user.username || ''
    formData.value.phone = authStore.user.phone || ''
    formData.value.bio = authStore.user.bio || ''
    formData.value.emailVerified = authStore.user.emailVerified || false
    formData.value.phoneVerified = authStore.user.phoneVerified || false
    profileImage.value = authStore.user.avatar || ''
  }
  
  // Load from localStorage if available
  const savedProfile = localStorage.getItem('userProfile')
  if (savedProfile) {
    const profile = JSON.parse(savedProfile)
    Object.assign(formData.value, profile)
    profileImage.value = profile.avatar || ''
  }
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('File must be an image')
      return
    }
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      profileImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const verifyEmail = () => {
  // Simulate email verification
  alert('Verification email sent! Please check your inbox.')
}

const verifyPhone = () => {
  // Simulate phone verification
  alert('Verification code sent to your phone!')
}

const handleSave = async () => {
  isSaving.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update auth store
    const updatedUser = {
      ...authStore.user,
      name: formData.value.name,
      email: formData.value.email,
      username: formData.value.username,
      phone: formData.value.phone,
      bio: formData.value.bio,
      avatar: profileImage.value,
      emailVerified: formData.value.emailVerified,
      phoneVerified: formData.value.phoneVerified
    }
    
    authStore.login(updatedUser)
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify({
      ...formData.value,
      avatar: profileImage.value
    }))
    
    // Show success alert
    alertType.value = 'success'
    alertTitle.value = 'Profile Updated'
    alertMessage.value = 'Your profile information has been successfully updated.'
    showAlert.value = true
    
    setTimeout(() => {
      navigateTo('/settings')
    }, 1500)
  } catch (error) {
    console.error('Error saving profile:', error)
    alertType.value = 'error'
    alertTitle.value = 'Error'
    alertMessage.value = 'Failed to save profile. Please try again.'
    showAlert.value = true
  } finally {
    isSaving.value = false
  }
}

// Set page meta
useHead({
  title: 'Profile - PulseTunez'
})
</script>
