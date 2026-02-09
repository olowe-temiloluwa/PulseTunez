<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Category Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">{{ category?.name }}</h1>
        <p class="text-gray-600">{{ category?.description }}</p>
      </div>

      <!-- Filters and Sort -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">Filter by:</span>
            <select v-model="selectedPriceRange" class="border rounded-lg px-3 py-2">
              <option value="all">All Prices</option>
              <option value="0-100">Under $100</option>
              <option value="100-300">$100 - $300</option>
              <option value="300-600">$300 - $600</option>
              <option value="600+">Above $600</option>
            </select>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">Sort by:</span>
            <select v-model="sortBy" class="border rounded-lg px-3 py-2">
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="product-card group"
        >
          <div class="relative">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-48 object-cover"
            >
            <div v-if="product.stock <= 5" class="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">
              Low Stock
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 mb-4">{{ product.description }}</p>
            
            <!-- Features -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="feature in product.features.slice(0, 2)" 
                  :key="feature"
                  class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {{ feature }}
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-blue-600">${{ product.price }}</span>
              <span class="text-sm text-gray-500">{{ product.stock }} in stock</span>
            </div>

            <div class="flex gap-2">
              <button 
                @click="cartStore.addItem(product)"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add to Cart
              </button>
              <NuxtLink 
                :to="`/product/${product.id}`"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Icon name="heroicons:eye" class="w-5 h-5" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- No Products Found -->
      <div v-else class="text-center py-16">
        <Icon name="heroicons:magnifying-glass-x-mark" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
        <p class="text-gray-500">Try adjusting your filters or browse other categories.</p>
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
