<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Ads Management</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Manage promotional ads displayed on the shop page</p>
      </div>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
      >
        <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
        Add New Ad
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Total Ads</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ ads.length }}</p>
          </div>
          <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <Icon name="heroicons:rectangle-stack" class="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Active Ads</p>
            <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ activeAdsCount }}</p>
          </div>
          <div class="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <Icon name="heroicons:check-circle" class="w-6 h-6 text-green-600 dark:text-green-300" />
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
            <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ totalViews }}</p>
          </div>
          <div class="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
            <Icon name="heroicons:eye" class="w-6 h-6 text-purple-600 dark:text-purple-300" />
          </div>
        </div>
      </div>
    </div>

    <!-- Ads List -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Ad
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Title
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Views
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Created
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="ad in ads" :key="ad.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <img :src="ad.image" :alt="ad.title" class="w-20 h-12 rounded-lg object-cover" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ ad.title }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ ad.link }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 text-xs rounded-full" :class="ad.active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'">
                {{ ad.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm text-gray-900 dark:text-white">{{ ad.views }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(ad.createdAt) }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="toggleAdStatus(ad)"
                class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
              >
                <Icon :name="ad.active ? 'heroicons:pause' : 'heroicons:play'" class="w-5 h-5" />
              </button>
              <button
                @click="editAd(ad)"
                class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
              >
                <Icon name="heroicons:pencil" class="w-5 h-5" />
              </button>
              <button
                @click="deleteAd(ad.id)"
                class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              >
                <Icon name="heroicons:trash" class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Empty State -->
      <div v-if="ads.length === 0" class="text-center py-12">
        <Icon name="heroicons:rectangle-stack" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-600 dark:text-gray-300 text-lg">No ads created yet</p>
        <button
          @click="showAddModal = true"
          class="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          Create your first ad
        </button>
      </div>
    </div>

    <!-- Add/Edit Ad Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {{ editingAd ? 'Edit Ad' : 'Add New Ad' }}
        </h2>
        
        <form @submit.prevent="saveAd" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ad Title</label>
            <input
              v-model="adForm.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
            <input
              v-model="adForm.image"
              type="url"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended size: 1200x400px</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Link URL</label>
            <input
              v-model="adForm.link"
              type="url"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description (optional)</label>
            <textarea
              v-model="adForm.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>
          
          <div class="flex items-center space-x-3">
            <input
              v-model="adForm.active"
              type="checkbox"
              id="active"
              class="w-5 h-5 text-green-600 rounded focus:ring-green-500"
            />
            <label for="active" class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Active (show on shop page)
            </label>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {{ editingAd ? 'Update' : 'Add' }} Ad
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  adminTitle: 'Ads Management'
})

const adsStore = useAdsStore()
const ads = computed(() => adsStore.ads)

const showAddModal = ref(false)
const editingAd = ref(null)

const adForm = ref({
  title: '',
  image: '',
  link: '',
  description: '',
  active: true
})

// Computed properties
const activeAdsCount = computed(() => adsStore.activeAdsCount)
const totalViews = computed(() => adsStore.totalViews)

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const toggleAdStatus = (ad) => {
  adsStore.toggleAdStatus(ad.id)
}

const editAd = (ad) => {
  editingAd.value = ad
  adForm.value = { ...ad }
  showAddModal.value = true
}

const deleteAd = (adId) => {
  adsStore.deleteAd(adId)
}

const saveAd = () => {
  if (editingAd.value) {
    // Update existing ad
    adsStore.updateAd(editingAd.value.id, adForm.value)
  } else {
    // Add new ad
    adsStore.addAd(adForm.value)
  }
  
  closeModal()
  console.log('Ad saved:', adForm.value)
}

const closeModal = () => {
  showAddModal.value = false
  editingAd.value = null
  adForm.value = {
    title: '',
    image: '',
    link: '',
    description: '',
    active: true
  }
}
</script>
