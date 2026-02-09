<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Admin Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <Icon name="heroicons:shield-check" class="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">Admin Settings</h1>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen">
        <nav class="mt-8">
          <div class="px-4 space-y-2">
            <NuxtLink
              to="/admin"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:chart-bar" class="w-5 h-5 mr-3" />
              Dashboard
            </NuxtLink>
            <NuxtLink
              to="/admin/products"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:cube" class="w-5 h-5 mr-3" />
              Products
            </NuxtLink>
            <NuxtLink
              to="/admin/users"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:users" class="w-5 h-5 mr-3" />
              Users
            </NuxtLink>
            <NuxtLink
              to="/admin/analytics"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:chart-pie" class="w-5 h-5 mr-3" />
              Analytics
            </NuxtLink>
            <NuxtLink
              to="/admin/orders"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:shopping-bag" class="w-5 h-5 mr-3" />
              Orders
            </NuxtLink>
            <NuxtLink
              to="/admin/settings"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
            >
              <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 mr-3" />
              Settings
            </NuxtLink>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8">
        <div class="max-w-4xl mx-auto">
          <!-- General Settings -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">General Settings</h2>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Name</label>
                <input
                  v-model="settings.storeName"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Email</label>
                <input
                  v-model="settings.storeEmail"
                  type="email"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Phone</label>
                <input
                  v-model="settings.storePhone"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Address</label>
                <textarea
                  v-model="settings.storeAddress"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Notification Settings -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notification Settings</h2>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Receive email notifications for new orders</p>
                </div>
                <button
                  @click="toggleSetting('emailNotifications')"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    ]"
                  />
                </button>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Low Stock Alerts</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Get notified when products are low in stock</p>
                </div>
                <button
                  @click="toggleSetting('lowStockAlerts')"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    settings.lowStockAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      settings.lowStockAlerts ? 'translate-x-6' : 'translate-x-1'
                    ]"
                  />
                </button>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">New User Notifications</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Get notified when new users register</p>
                </div>
                <button
                  @click="toggleSetting('newUserAlerts')"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    settings.newUserAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      settings.newUserAlerts ? 'translate-x-6' : 'translate-x-1'
                    ]"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Payment Settings -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Settings</h2>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                <select
                  v-model="settings.currency"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="NGN">NGN (₦)</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tax Rate (%)</label>
                <input
                  v-model="settings.taxRate"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shipping Cost</label>
                <input
                  v-model="settings.shippingCost"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Free Shipping Threshold</label>
                <input
                  v-model="settings.freeShippingThreshold"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Security Settings</h2>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Admin Password</label>
                <input
                  v-model="settings.adminPassword"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                <input
                  v-model="settings.confirmPassword"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Enable 2FA for admin accounts</p>
                </div>
                <button
                  @click="toggleSetting('twoFactorAuth')"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    ]"
                  />
                </button>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Session Timeout (minutes)</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Auto-logout after inactivity</p>
                </div>
                <input
                  v-model="settings.sessionTimeout"
                  type="number"
                  min="5"
                  max="480"
                  class="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="flex justify-end">
            <button
              @click="saveSettings"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Icon name="heroicons:check-circle" class="w-5 h-5 mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// Mock settings data - in real app, this would come from API
const settings = ref({
  storeName: 'PulseTunez',
  storeEmail: 'info@pulsetunez.com',
  storePhone: '08022738004',
  storeAddress: '123 Music Street, Lagos, Nigeria',
  emailNotifications: true,
  lowStockAlerts: true,
  newUserAlerts: false,
  currency: 'NGN',
  taxRate: 7.5,
  shippingCost: 10.00,
  freeShippingThreshold: 50.00,
  adminPassword: '',
  confirmPassword: '',
  twoFactorAuth: false,
  sessionTimeout: 60
})

// Methods
const toggleSetting = (setting) => {
  settings.value[setting] = !settings.value[setting]
}

const saveSettings = () => {
  // Validate password if provided
  if (settings.value.adminPassword) {
    if (settings.value.adminPassword !== settings.value.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
  }
  
  // In real app, this would make an API call to save settings
  console.log('Settings saved:', settings.value)
  
  // Clear password fields after saving
  settings.value.adminPassword = ''
  settings.value.confirmPassword = ''
  
  // Show success message
  alert('Settings saved successfully!')
}
</script>
