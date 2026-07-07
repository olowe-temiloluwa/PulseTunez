<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Category Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{{ category?.name }}</h1>
        <p class="text-gray-600 dark:text-gray-300">{{ category?.description }}</p>
      </div>

      <!-- Filters and Sort -->
      <div class="surface-card p-4 mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex items-center space-x-4">
            <span class="text-gray-600 dark:text-gray-300">Filter by:</span>
            <select v-model="selectedPriceRange" class="form-input w-auto py-2">
              <option value="all">All Prices</option>
              <option value="0-100">Under $100</option>
              <option value="100-300">$100 - $300</option>
              <option value="300-600">$300 - $600</option>
              <option value="600+">Above $600</option>
            </select>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600 dark:text-gray-300">Sort by:</span>
            <select v-model="sortBy" class="form-input w-auto py-2">
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="group"
        >
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
            <!-- Product Image (navigates to detail) -->
            <div class="relative h-36 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
              <NuxtLink :to="`/product/${product.id}`" class="block w-full h-full">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </NuxtLink>
              <div class="absolute top-2 right-2">
                <button 
                  @click="cartStore.addItem(product)"
                  class="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors duration-300"
                >
                  <Icon name="heroicons:shopping-cart" class="w-3.5 h-3.5 text-gray-600 dark:text-gray-300 hover:text-white" />
                </button>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-3">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1 truncate">{{ product.name }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-xs mb-2 line-clamp-1">{{ product.description }}</p>

              <!-- Features -->
              <div class="flex flex-wrap gap-1 mb-2">
                <span
                  v-for="(feature, index) in product.features.slice(0, 1)"
                  :key="index"
                  class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded"
                >
                  {{ feature }}
                </span>
              </div>

              <!-- Price (navigates to detail) and Cart -->
              <div class="flex items-center justify-between">
                <NuxtLink :to="`/product/${product.id}`" class="text-base font-bold text-blue-600 dark:text-blue-400 hover:underline">${{ product.price }}</NuxtLink>
                <button
                  @click="cartStore.addItem(product)"
                  class="bg-white text-blue-600 p-1.5 md:p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Icon name="heroicons:shopping-cart" class="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Products Found -->
      <div v-else class="text-center py-16">
        <Icon name="heroicons:magnifying-glass-x-mark" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No products found</h3>
        <p class="text-gray-500 dark:text-gray-400">Try adjusting your filters or browse other categories.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const selectedPriceRange = ref('all')
const sortBy = ref('name')

const category = computed(() => {
  return productStore.categories.find(cat => cat.id === route.params.id)
})

const categoryProducts = computed(() => {
  return productStore.getProductsByCategory(route.params.id)
})

const filteredProducts = computed(() => {
  let products = [...categoryProducts.value]

  // Price filter
  if (selectedPriceRange.value !== 'all') {
    const [min, max] = selectedPriceRange.value.split('-').map(p => p === '+' ? Infinity : parseInt(p))
    products = products.filter(product => {
      if (max === undefined) return product.price >= min
      return product.price >= min && product.price <= max
    })
  }

  // Sort
  products.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      default:
        return 0
    }
  })

  return products
})

// Set page title
useHead({
  title: `${category.value?.name || 'Category'} - PulseTunez`
})
</script>
