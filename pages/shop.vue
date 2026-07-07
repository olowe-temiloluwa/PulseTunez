<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Ads Carousel -->
    <section v-if="activeAds.length > 0" class="bg-white dark:bg-gray-900 overflow-hidden pt-2">
      <div class="relative w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <!-- Carousel Container (3 visible on desktop with peeking sides, 1 full on mobile) -->
        <div class="overflow-hidden">
          <div
            class="carousel-track flex"
            :class="enableTransition ? 'transition-transform duration-500 ease-out' : ''"
            :style="{ transform: `translateX(calc(var(--peek) - ${position} * var(--slide-w)))` }"
            @transitionend="onTransitionEnd"
          >
            <div
              v-for="(ad, index) in loopedAds"
              :key="index"
              class="carousel-slide flex-shrink-0 px-2 transition-opacity duration-500"
              :class="index === position ? 'opacity-100' : 'opacity-60'"
            >
              <NuxtLink
                :to="ad.link"
                class="relative block h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden shadow-xl"
                @click="handleAdClick(ad)"
              >
                <img
                  :src="ad.image"
                  :alt="ad.title"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <!-- Content Overlay -->
                <div class="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                  <span class="inline-block w-fit text-white px-2 md:px-3 py-1 text-xs md:text-sm font-bold mb-2 bg-blue-600">
                    {{ getBadgeText(ad) }}
                  </span>
                  <h3 class="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg leading-tight">{{ ad.title }}</h3>
                  <p v-if="ad.description" class="text-white/90 text-xs md:text-sm line-clamp-2 drop-shadow max-w-lg mb-2 md:mb-3">{{ ad.description }}</p>
                  <span class="inline-flex w-fit items-center bg-white/20 backdrop-blur-sm text-white px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium">
                    <Icon name="heroicons:arrow-right" class="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    Shop Now
                  </span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="flex justify-center py-3 space-x-2">
          <button
            v-for="(ad, index) in activeAds"
            :key="ad.id"
            @click="goToSlide(index)"
            class="h-2 rounded-full transition-all duration-300"
            :class="realIndex === index ? 'w-6 bg-blue-600 dark:bg-blue-400' : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'"
          />
        </div>
      </div>
    </section>

    <!-- Trending Products -->
    <section class="py-4 md:py-6 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-3">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">🔥 Trending Now</h2>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300">Most popular products this week</p>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          <div
            v-for="product in trendingProducts"
            :key="product.id"
            class="group"
          >
            <div class="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <!-- Product Image (navigates to detail) -->
              <div class="relative h-32 md:h-36 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                <NuxtLink :to="`/product/${product.id}`" class="block w-full h-full">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </NuxtLink>
              </div>

              <!-- Product Info -->
              <div class="p-2 md:p-3">
                <h3 class="text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-1 truncate">{{ product.name }}</h3>

                <!-- Price (navigates to detail) -->
                <div class="flex items-center">
                  <NuxtLink :to="`/product/${product.id}`" class="text-sm md:text-base font-bold text-blue-600 dark:text-blue-400 hover:underline">${{ product.price }}</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hot Sale - Audio Gadgets -->
    <section class="py-4 md:py-6 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-3">
          <div>
            <div class="flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2">
              <span class="bg-red-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold">HOT SALE</span>
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Audio Gadgets</h2>
            </div>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300">Limited time offers on audio equipment</p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          <div
            v-for="product in hotSaleAudioGadgets"
            :key="product.id"
            class="group"
          >
            <div class="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <!-- Product Image (navigates to detail) -->
              <div class="relative h-28 md:h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                <NuxtLink :to="`/product/${product.id}`" class="block w-full h-full">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </NuxtLink>
                <div class="absolute top-1.5 md:top-2 left-1.5 md:left-2">
                  <span class="bg-orange-500 text-white px-1.5 md:px-2 py-0.5 rounded-full text-xs font-bold">
                    -{{ product.discount }}%
                  </span>
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-2 md:p-3">
                <h3 class="text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">{{ product.name }}</h3>
                <div class="flex items-center space-x-1 md:space-x-2">
                  <NuxtLink :to="`/product/${product.id}`" class="text-sm md:text-base font-bold text-red-500 hover:underline">${{ product.salePrice }}</NuxtLink>
                  <span class="text-xs text-gray-400 line-through">${{ product.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hot Sale - Musical Gadgets -->
    <section class="py-4 md:py-6 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-3">
          <div>
            <div class="flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2">
              <span class="bg-red-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold">HOT SALE</span>
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Musical Gadgets</h2>
            </div>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300">Limited time offers on musical instruments</p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          <div
            v-for="product in hotSaleMusicalGadgets"
            :key="product.id"
            class="group"
          >
            <div class="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <!-- Product Image (navigates to detail) -->
              <div class="relative h-28 md:h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                <NuxtLink :to="`/product/${product.id}`" class="block w-full h-full">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </NuxtLink>
                <div class="absolute top-1.5 md:top-2 left-1.5 md:left-2">
                  <span class="bg-orange-500 text-white px-1.5 md:px-2 py-0.5 rounded-full text-xs font-bold">
                    -{{ product.discount }}%
                  </span>
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-2 md:p-3">
                <h3 class="text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">{{ product.name }}</h3>
                <div class="flex items-center space-x-1 md:space-x-2">
                  <NuxtLink :to="`/product/${product.id}`" class="text-sm md:text-base font-bold text-red-500 hover:underline">${{ product.salePrice }}</NuxtLink>
                  <span class="text-xs text-gray-400 line-through">${{ product.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recently Viewed -->
    <section v-if="recentlyViewedStore.recentProducts.length > 0" class="py-4 md:py-6 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-3">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">Recently Viewed</h2>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300">Products you've looked at recently</p>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          <div 
            v-for="recentProduct in recentlyViewedStore.recentProducts" 
            :key="recentProduct.id"
            class="group"
          >
            <div class="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <div class="relative h-28 md:h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                <NuxtLink :to="`/product/${recentProduct.id}`" class="block w-full h-full">
                  <img 
                    :src="recentProduct.image" 
                    :alt="recentProduct.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </NuxtLink>
                <div class="absolute top-1.5 md:top-2 right-1.5 md:right-2">
                  <button 
                    @click="wishlistStore.toggleItem(recentProduct)"
                    class="bg-white dark:bg-gray-800 p-1 md:p-1.5 rounded-full shadow-md hover:text-blue-600 transition-colors duration-300"
                  >
                    <Icon 
                      :name="wishlistStore.isInWishlist(recentProduct.id) ? 'heroicons:heart-solid' : 'heroicons:heart'" 
                      class="w-3 md:w-3.5 h-3 md:h-3.5 text-gray-600 dark:text-gray-300"
                    />
                  </button>
                </div>
              </div>
              <div class="p-2 md:p-3">
                <h3 class="text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">{{ recentProduct.name }}</h3>
                <div class="flex items-center justify-between">
                  <NuxtLink :to="`/product/${recentProduct.id}`" class="text-sm md:text-base font-bold text-blue-600 dark:text-blue-400 hover:underline">${{ recentProduct.price }}</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Products Section -->
    <section class="py-4 md:py-6 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-3">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">All Products</h2>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300">Browse our complete collection</p>
          </div>
          <!-- Search Bar in Section Header -->
          <div class="relative w-full sm:w-auto">
            <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="pl-9 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full sm:w-64"
            />
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="group"
          >
            <div class="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <!-- Product Image (navigates to detail) -->
              <div class="relative h-32 md:h-36 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                <NuxtLink :to="`/product/${product.id}`" class="block w-full h-full">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </NuxtLink>
                <div class="absolute top-1.5 md:top-2 right-1.5 md:right-2">
                  <button 
                    @click="wishlistStore.toggleItem(product)"
                    class="bg-white dark:bg-gray-800 p-1 md:p-1.5 rounded-full shadow-md hover:text-blue-600 transition-colors duration-300"
                  >
                    <Icon 
                      :name="wishlistStore.isInWishlist(product.id) ? 'heroicons:heart-solid' : 'heroicons:heart'" 
                      class="w-3 md:w-3.5 h-3 md:h-3.5 text-gray-600 dark:text-gray-300"
                    />
                  </button>
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-2 md:p-3">
                <h3 class="text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-1 truncate">{{ product.name }}</h3>
                <p class="text-gray-600 dark:text-gray-300 text-xs mb-1 md:mb-2 line-clamp-1">{{ product.description }}</p>

                <!-- Features -->
                <div class="flex flex-wrap gap-1 mb-1 md:mb-2">
                  <span
                    v-for="(feature, index) in product.features.slice(0, 1)"
                    :key="index"
                    class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1 md:px-1.5 py-0.5 rounded"
                  >
                    {{ feature }}
                  </span>
                </div>

                <!-- Price (navigates to detail) and Cart -->
                <div class="flex items-center justify-between">
                  <NuxtLink :to="`/product/${product.id}`" class="text-sm md:text-base font-bold text-blue-600 dark:text-blue-400 hover:underline">${{ product.price }}</NuxtLink>
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

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="text-center py-8 md:py-12">
          <Icon name="heroicons:inbox" class="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600 dark:text-gray-300 text-base md:text-lg">No products found in this category</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'
import { useAdsStore } from '~/stores/ads'
import { useWishlistStore } from '~/stores/wishlist'
import { useRecentlyViewedStore } from '~/stores/recentlyViewed'
import { useTheme } from '~/composables/useTheme'

const productStore = useProductStore()
const cartStore = useCartStore()
const adsStore = useAdsStore()
const wishlistStore = useWishlistStore()
const recentlyViewedStore = useRecentlyViewedStore()
const { initTheme } = useTheme()
const route = useRoute()

const searchQuery = ref(typeof route.query.q === 'string' ? route.query.q : '')
// `position` indexes into `loopedAds` (which has a clone at each end).
// Real slides live at positions 1..n; position 0 clones the last, n+1 clones the first.
const position = ref(1)
const enableTransition = ref(true)
const autoPlayInterval = ref(null)

// Keep search in sync if navigated here with a ?q= query (e.g. from the search modal)
watch(() => route.query.q, (q) => {
  searchQuery.value = typeof q === 'string' ? q : ''
})

// Initialize theme and auto-scroll
onMounted(() => {
  initTheme()
  startAutoPlay()
  wishlistStore.loadFromLocalStorage()
  recentlyViewedStore.loadFromLocalStorage()
})

onUnmounted(() => {
  stopAutoPlay()
})

// Ads carousel logic
const activeAds = computed(() => adsStore.activeAds)

// Cloned track: [lastAd, ...ads, firstAd] so the previous/next slide always
// peeks in on both sides, even at the very start or end (infinite loop).
const loopedAds = computed(() => {
  const ads = activeAds.value
  if (ads.length === 0) return []
  if (ads.length === 1) return [ads[0]]
  return [ads[ads.length - 1], ...ads, ads[0]]
})

// Real slide index (for the navigation dots).
const realIndex = computed(() => {
  const n = activeAds.value.length
  if (n <= 1) return 0
  if (position.value === 0) return n - 1
  if (position.value === n + 1) return 0
  return position.value - 1
})

const nextSlide = () => {
  if (activeAds.value.length <= 1) return
  enableTransition.value = true
  position.value++
}

// After the slide animation ends, if we've landed on a clone, jump instantly
// (no transition) to the matching real slide to create a seamless loop.
const onTransitionEnd = () => {
  const n = activeAds.value.length
  if (n <= 1) return
  if (position.value === n + 1) {
    enableTransition.value = false
    position.value = 1
  } else if (position.value === 0) {
    enableTransition.value = false
    position.value = n
  }
}

const goToSlide = (index) => {
  enableTransition.value = true
  position.value = index + 1
  resetAutoPlay()
}

const handleAdClick = (ad) => {
  adsStore.incrementView(ad.id)
}

const startAutoPlay = () => {
  if (activeAds.value.length > 1) {
    autoPlayInterval.value = setInterval(() => {
      nextSlide()
    }, 5000)
  }
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

const resetAutoPlay = () => {
  stopAutoPlay()
  startAutoPlay()
}

// Trending products
const trendingProducts = computed(() => {
  return productStore.products.filter(product => product.trending)
})

// Hot sale - Audio Gadgets
const hotSaleAudioGadgets = computed(() => {
  return productStore.products
    .filter(product => product.category === 'audio-gadgets' && product.hotSale)
    .map(product => ({
      ...product,
      salePrice: product.salePrice || (product.price * (1 - (product.discount || 0) / 100)).toFixed(2)
    }))
})

// Hot sale - Musical Gadgets
const hotSaleMusicalGadgets = computed(() => {
  return productStore.products
    .filter(product => product.category === 'musical-gadgets' && product.hotSale)
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

// Get random badge text based on ad
const badgeTexts = ['FEATURED', 'SPONSORED', 'PROMO', 'SPECIAL', 'DEAL', 'OFFER']
const getBadgeText = (ad) => {
  const index = ad.id % badgeTexts.length
  return badgeTexts[index]
}

// Set page meta
useHead({
  title: 'Shop - PulseTunez'
})
</script>

<style scoped>
/* Carousel: mobile shows 1 full slide; desktop shows the center slide as main
   with the previous/next slides peeking in on both sides. */
.carousel-track {
  --slide-w: 100%;
  --peek: 0%;
}
@media (min-width: 768px) {
  .carousel-track {
    --slide-w: 70%;
    --peek: 15%;
  }
}
.carousel-slide {
  flex: 0 0 var(--slide-w);
  max-width: var(--slide-w);
}

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
  line-clamp: 2;
}
</style>
