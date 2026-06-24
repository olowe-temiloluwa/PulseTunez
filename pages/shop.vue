<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Trending Products Carousel -->
    <section class="py-8 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">🔥 Trending Now</h2>
            <p class="text-gray-600 dark:text-gray-300">Most popular products this week</p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="scrollCarousel('left')"
              class="p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Icon name="heroicons:chevron-left" class="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
            <button
              @click="scrollCarousel('right')"
              class="p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Icon name="heroicons:chevron-right" class="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        </div>

        <!-- Carousel Container -->
        <div
          ref="carouselRef"
          class="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <div
            v-for="product in trendingProducts"
            :key="product.id"
            class="flex-shrink-0 w-72"
          >
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <!-- Product Image -->
              <div class="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute top-3 left-3">
                  <span class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                    TRENDING
                  </span>
                </div>
                <div class="absolute top-3 right-3">
                  <button
                    @click="cartStore.addItem(product)"
                    class="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Icon name="heroicons:shopping-cart" class="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-white" />
                  </button>
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">{{ product.name }}</h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-xl font-bold text-blue-600 dark:text-blue-400">${{ product.price }}</span>
                  <NuxtLink
                    :to="`/product/${product.id}`"
                    class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    View Details
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hot Sale - Audio Gadgets -->
    <section class="py-8 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">HOT SALE</span>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Audio Gadgets</h2>
            </div>
            <p class="text-gray-600 dark:text-gray-300">Limited time offers on audio equipment</p>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="product in hotSaleAudioGadgets"
            :key="product.id"
            class="group"
          >
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <!-- Product Image -->
              <div class="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute top-2 left-2">
                  <span class="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    -{{ product.discount }}%
                  </span>
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-3">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">{{ product.name }}</h3>
                <div class="flex items-center space-x-2">
                  <span class="text-base font-bold text-red-500">${{ product.salePrice }}</span>
                  <span class="text-xs text-gray-400 line-through">${{ product.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hot Sale - Musical Gadgets -->
    <section class="py-8 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">HOT SALE</span>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Musical Gadgets</h2>
            </div>
            <p class="text-gray-600 dark:text-gray-300">Limited time offers on musical instruments</p>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="product in hotSaleMusicalGadgets"
            :key="product.id"
            class="group"
          >
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <!-- Product Image -->
              <div class="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute top-2 left-2">
                  <span class="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    -{{ product.discount }}%
                  </span>
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-3">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">{{ product.name }}</h3>
                <div class="flex items-center space-x-2">
                  <span class="text-base font-bold text-red-500">${{ product.salePrice }}</span>
                  <span class="text-xs text-gray-400 line-through">${{ product.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Products Section -->
    <section class="py-8 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Products</h2>
            <p class="text-gray-600 dark:text-gray-300">Browse our complete collection</p>
          </div>
          <!-- Search Bar in Section Header -->
          <div class="relative hidden md:block">
            <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="pl-9 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-64"
            />
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="group"
          >
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <!-- Product Image -->
              <div class="relative h-36 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute top-2 right-2 flex space-x-1">
                  <button
                    @click="cartStore.addItem(product)"
                    class="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Icon name="heroicons:shopping-cart" class="w-3.5 h-3.5 text-gray-600 dark:text-gray-300 hover:text-white" />
                  </button>
                  <button class="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md hover:bg-red-500 transition-colors duration-300">
                    <Icon name="heroicons:heart" class="w-3.5 h-3.5 text-gray-600 dark:text-gray-300 hover:text-white" />
                  </button>
                </div>
                <div class="absolute bottom-2 left-2">
                  <span class="bg-blue-600 text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                    {{ getCategoryName(product.category) }}
                  </span>
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

                <!-- Price and Stock -->
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-base font-bold text-blue-600 dark:text-blue-400">${{ product.price }}</span>
                  </div>
                  <NuxtLink
                    :to="`/product/${product.id}`"
                    class="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="text-center py-12">
          <Icon name="heroicons:inbox" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600 dark:text-gray-300 text-lg">No products found in this category</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'
import { useTheme } from '~/composables/useTheme'

const productStore = useProductStore()
const cartStore = useCartStore()
const { initTheme } = useTheme()

const carouselRef = ref(null)
const searchQuery = ref('')

// Initialize theme
onMounted(() => {
  initTheme()
})

// Trending products (randomly selected for demo)
const trendingProducts = computed(() => {
  return productStore.products.slice(0, 5).map(product => ({
    ...product,
    discount: Math.floor(Math.random() * 20) + 10
  }))
})

// Hot sale - Audio Gadgets
const hotSaleAudioGadgets = computed(() => {
  return productStore.products
    .filter(product => product.category === 'audio-gadgets' && product.discount > 0)
    .map(product => ({
      ...product,
      salePrice: product.salePrice || (product.price * (1 - (product.discount || 0) / 100)).toFixed(2)
    }))
})

// Hot sale - Musical Gadgets
const hotSaleMusicalGadgets = computed(() => {
  return productStore.products
    .filter(product => product.category === 'musical-gadgets' && product.discount > 0)
    .map(product => ({
      ...product,
      salePrice: product.salePrice || (product.price * (1 - (product.discount || 0) / 100)).toFixed(2)
    }))
})

// Filter products by search
const filteredProducts = computed(() => {
  let products = productStore.products
  
  // Filter by search query
  if (searchQuery.value && searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  }
  
  return products
})

// Get category name by ID
const getCategoryName = (categoryId) => {
  const category = productStore.categories.find(cat => cat.id === categoryId)
  return category ? category.name : categoryId
}

// Carousel scroll functionality
const scrollCarousel = (direction) => {
  if (carouselRef.value) {
    const scrollAmount = 350
    if (direction === 'left') {
      carouselRef.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else {
      carouselRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }
}

// Set page meta
useHead({
  title: 'Shop - PulseTunez'
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
