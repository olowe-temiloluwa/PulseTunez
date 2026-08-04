<template>
  <!-- Mobile: Full screen modal -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen && isMobile"
      class="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col"
    >
      <!-- Mobile Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex-1 flex items-center">
          <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-lg"
            @input="handleSearch"
          >
        </div>
        <button
          @click="closeSearch"
          class="ml-4 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <Icon name="heroicons:x-mark" class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Results -->
      <div class="flex-1 overflow-y-auto p-4">
        <div v-if="loading" class="text-center py-8 text-gray-500">
          Searching...
        </div>
        <div v-else-if="searchResults.length === 0 && searchQuery" class="text-center py-8 text-gray-500">
          No products found
        </div>
        <div v-else-if="!searchQuery" class="text-center py-8 text-gray-500">
          Start typing to search...
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="product in searchResults"
            :key="product.id"
            @click="goToProduct(product.id)"
            class="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-16 h-16 object-cover rounded"
            >
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-gray-900 dark:text-white truncate">{{ product.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ product.description }}</p>
              <p class="text-blue-600 dark:text-blue-400 font-semibold">${{ product.price }}</p>
            </div>
            <Icon name="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Desktop: Dropdown -->
  <Transition
    enter-active-class="transition-all duration-200"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="isOpen && !isMobile"
      class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
    >
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
          <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            @input="handleSearch"
          >
        </div>
      </div>

      <div class="max-h-[500px] overflow-y-auto">
        <div v-if="loading" class="text-center py-8 text-gray-500">
          Searching...
        </div>
        <div v-else-if="searchResults.length === 0 && searchQuery" class="text-center py-8 text-gray-500">
          No products found
        </div>
        <div v-else-if="!searchQuery" class="text-center py-8 text-gray-500">
          Start typing to search...
        </div>
        <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="product in searchResults.slice(0, 10)"
            :key="product.id"
            @click="goToProduct(product.id)"
            class="flex items-center space-x-4 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-12 h-12 object-cover rounded"
            >
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-gray-900 dark:text-white truncate text-sm">{{ product.name }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ product.description }}</p>
              <p class="text-sm text-blue-600 dark:text-blue-400 font-semibold">${{ product.price }}</p>
            </div>
            <Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div v-if="searchResults.length > 10" class="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
        <button
          @click="viewAllResults"
          class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          View all {{ searchResults.length }} results
        </button>
      </div>
    </div>
  </Transition>

  <!-- Overlay for mobile -->
  <div
    v-if="isOpen && isMobile"
    class="fixed inset-0 bg-black/50 z-40"
    @click="closeSearch"
  />
</template>

<script setup>
import { useProductStore } from '~/stores/products'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const productStore = useProductStore()
const searchQuery = ref('')
const searchResults = ref([])
const loading = ref(false)
const searchInput = ref(null)
const isMobile = ref(false)

// Check if mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// Handle search with debounce
let debounceTimer
const handleSearch = () => {
  clearTimeout(debounceTimer)
  
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  loading.value = true
  
  debounceTimer = setTimeout(() => {
    const query = searchQuery.value.toLowerCase()
    searchResults.value = productStore.products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
    loading.value = false
  }, 300)
}

// Go to product page
const goToProduct = (productId) => {
  closeSearch()
  navigateTo(`/product/${productId}`)
}

// View all results
const viewAllResults = () => {
  closeSearch()
  navigateTo(`/shop?q=${encodeURIComponent(searchQuery.value)}`)
}

// Close search
const closeSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  emit('close')
}

// Focus input when opened
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

// Handle resize
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  clearTimeout(debounceTimer)
})
</script>
