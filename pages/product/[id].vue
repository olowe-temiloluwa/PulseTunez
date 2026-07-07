<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
    <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm">
          <li><NuxtLink to="/" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Home</NuxtLink></li>
          <li class="text-gray-400 dark:text-gray-500">/</li>
          <li>
            <NuxtLink :to="`/category/${product.category}`" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              {{ category?.name }}
            </NuxtLink>
          </li>
          <li class="text-gray-400 dark:text-gray-500">/</li>
          <li class="text-gray-900 dark:text-white font-medium">{{ product.name }}</li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <!-- Product Images -->
        <div class="space-y-4">
          <div class="relative aspect-square bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <img 
              :src="currentImage" 
              :alt="product.name"
              class="w-full h-full object-cover transition-opacity duration-300"
            >
            <!-- Navigation Buttons -->
            <button 
              @click="prevImage"
              class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <Icon name="heroicons:chevron-left" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button 
              @click="nextImage"
              class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <Icon name="heroicons:chevron-right" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <!-- Image Counter -->
            <div class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {{ currentImageIndex + 1 }} / {{ productImages.length }}
            </div>
          </div>
          <!-- Thumbnail Gallery -->
          <div class="grid grid-cols-4 gap-2">
            <div 
              v-for="(image, index) in productImages" 
              :key="index"
              @click="currentImageIndex = index"
              class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity border-2"
              :class="currentImageIndex === index ? 'border-blue-600 dark:border-blue-400' : 'border-transparent'"
            >
              <img 
                :src="image" 
                :alt="`${product.name} ${index + 1}`"
                class="w-full h-full object-cover"
              >
            </div>
          </div>
        </div>

        <!-- Product Details -->
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ product.name }}</h1>
            <div class="flex items-center space-x-4">
              <span class="text-3xl font-bold text-blue-600 dark:text-blue-400">${{ product.price }}</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ product.stock }} in stock</span>
            </div>
          </div>

          <div class="relative">
            <p 
              class="text-gray-600 dark:text-gray-300 text-lg"
              :class="{ 'line-clamp-3': !showFullDescription }"
            >
              {{ product.description }}
            </p>
            <button 
              v-if="product.description"
              @click="showFullDescription = !showFullDescription"
              class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mt-2 text-sm"
            >
              {{ showFullDescription ? 'Show less' : 'View more' }}
            </button>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Key Features</h3>
            <ul class="space-y-2">
              <li 
                v-for="feature in product.features" 
                :key="feature"
                class="flex items-center space-x-2"
              >
                <Icon name="check" class="w-5 h-5 text-green-500" />
                <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
              </li>
            </ul>
          </div>

          <!-- Stock Status -->
          <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div class="flex items-center space-x-2">
              <Icon name="alert-triangle" class="w-5 h-5 text-yellow-600" />
              <span class="text-yellow-800 dark:text-yellow-200">
                {{ product.stock <= 5 ? `Only ${product.stock} left in stock!` : 'In stock and ready to ship' }}
              </span>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Quantity:</label>
              <div class="flex items-center space-x-2">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  -
                </button>
                <span class="w-16 text-center font-semibold text-gray-900 dark:text-white">{{ quantity }}</span>
                <button 
                  @click="quantity = Math.min(product.stock, quantity + 1)"
                  class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button 
              @click="addToCart"
              class="w-full btn-primary text-lg"
              :disabled="product.stock === 0"
            >
              <Icon name="shopping-cart" class="w-5 h-5 inline mr-2" />
              {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>

            <button 
              @click="addToWishlist"
              class="w-full btn-secondary"
              :class="{ 'bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600': wishlistStore.isInWishlist(product?.id) }"
            >
              <Icon 
                :name="wishlistStore.isInWishlist(product?.id) ? 'heroicons:heart-solid' : 'heroicons:heart'" 
                class="w-5 h-5 inline mr-2" 
              />
              {{ wishlistStore.isInWishlist(product?.id) ? 'Remove from Wishlist' : 'Add to Wishlist' }}
            </button>
          </div>

          <!-- Product Info -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500 dark:text-gray-400">Category:</span>
                <span class="ml-2 font-medium text-gray-900 dark:text-white">{{ category?.name }}</span>
              </div>
              <div>
                <span class="text-gray-500 dark:text-gray-400">SKU:</span>
                <span class="ml-2 font-medium text-gray-900 dark:text-white">PT-{{ product.id.toString().padStart(4, '0') }}</span>
              </div>
              <div>
                <span class="text-gray-500 dark:text-gray-400">Warranty:</span>
                <span class="ml-2 font-medium text-gray-900 dark:text-white">1 Year</span>
              </div>
              <div>
                <span class="text-gray-500 dark:text-gray-400">Shipping:</span>
                <span class="ml-2 font-medium text-gray-900 dark:text-white">Free over $100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-12 md:mt-16">
        <h2 class="text-2xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">Related Products</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          <div 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id"
            class="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group"
          >
            <div class="relative h-32 md:h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
              <NuxtLink :to="`/product/${relatedProduct.id}`">
                <img 
                  :src="relatedProduct.image" 
                  :alt="relatedProduct.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
              </NuxtLink>
              <div class="absolute top-2 right-2">
                <button 
                  @click="wishlistStore.toggleItem(relatedProduct)"
                  class="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md hover:bg-red-500 transition-colors duration-300"
                >
                  <Icon 
                    :name="wishlistStore.isInWishlist(relatedProduct.id) ? 'heroicons:heart-solid' : 'heroicons:heart'" 
                    class="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-white"
                  />
                </button>
              </div>
            </div>
            <div class="p-3 md:p-4">
              <NuxtLink :to="`/product/${relatedProduct.id}`">
                <h3 class="font-medium text-sm md:text-base mb-2 text-gray-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{{ relatedProduct.name }}</h3>
              </NuxtLink>
              <div class="flex items-center justify-between">
                <NuxtLink :to="`/product/${relatedProduct.id}`" class="text-base md:text-lg font-bold text-blue-600 dark:text-blue-400 hover:underline">${{ relatedProduct.price }}</NuxtLink>
                <button 
                  @click="cartStore.addItem(relatedProduct)"
                  class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Icon name="heroicons:shopping-cart" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="relatedProducts.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
          No related products found
        </div>
      </div>

      <!-- Recently Viewed -->
      <div v-if="recentlyViewedStore.recentProducts.length > 0" class="mt-12 md:mt-16">
        <h2 class="text-2xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">Recently Viewed</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          <div 
            v-for="recentProduct in recentlyViewedStore.recentProducts" 
            :key="recentProduct.id"
            class="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group"
          >
            <div class="relative h-32 md:h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
              <NuxtLink :to="`/product/${recentProduct.id}`">
                <img 
                  :src="recentProduct.image" 
                  :alt="recentProduct.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
              </NuxtLink>
              <div class="absolute top-2 right-2">
                <button 
                  @click="wishlistStore.toggleItem(recentProduct)"
                  class="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md hover:bg-red-500 transition-colors duration-300"
                >
                  <Icon 
                    :name="wishlistStore.isInWishlist(recentProduct.id) ? 'heroicons:heart-solid' : 'heroicons:heart'" 
                    class="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-white"
                  />
                </button>
              </div>
            </div>
            <div class="p-3 md:p-4">
              <NuxtLink :to="`/product/${recentProduct.id}`">
                <h3 class="font-medium text-sm md:text-base mb-2 text-gray-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{{ recentProduct.name }}</h3>
              </NuxtLink>
              <div class="flex items-center justify-between">
                <NuxtLink :to="`/product/${recentProduct.id}`" class="text-base md:text-lg font-bold text-blue-600 dark:text-blue-400 hover:underline">${{ recentProduct.price }}</NuxtLink>
                <button 
                  @click="cartStore.addItem(recentProduct)"
                  class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Icon name="heroicons:shopping-cart" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="text-center py-16">
      <Icon name="search-x" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Product not found</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">The product you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="btn-primary">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useRecentlyViewedStore } from '~/stores/recentlyViewed'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const recentlyViewedStore = useRecentlyViewedStore()

const quantity = ref(1)
const currentImageIndex = ref(0)
const showFullDescription = ref(false)

const product = computed(() => {
  return productStore.getProductById(parseInt(route.params.id))
})

const productImages = computed(() => {
  if (!product.value) return []
  // Generate multiple image variations using different random seeds
  const baseImage = product.value.image
  const images = [baseImage]
  for (let i = 1; i < 4; i++) {
    const seedMatch = baseImage.match(/random=(\d+)/)
    if (seedMatch) {
      const newSeed = parseInt(seedMatch[1]) + i
      images.push(baseImage.replace(/random=\d+/, `random=${newSeed}`))
    } else {
      images.push(baseImage)
    }
  }
  return images
})

const currentImage = computed(() => {
  return productImages.value[currentImageIndex.value] || product.value?.image
})

const category = computed(() => {
  if (!product.value) return null
  return productStore.categories.find(cat => cat.id === product.value.category)
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.products
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
})

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % productImages.value.length
}

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + productImages.value.length) % productImages.value.length
}

const addToCart = () => {
  if (!product.value) return
  
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addItem(product.value)
  }
  
  cartStore.toggleCart()
}

const addToWishlist = () => {
  if (!product.value) return
  wishlistStore.toggleItem(product.value)
}

// Load wishlist and recently viewed from localStorage on mount
onMounted(() => {
  wishlistStore.loadFromLocalStorage()
  recentlyViewedStore.loadFromLocalStorage()
  
  // Track product view
  if (product.value) {
    recentlyViewedStore.addProduct(product.value)
  }
})

// Set page title
useHead({
  title: `${product.value?.name || 'Product'} - PulseTunez`
})
</script>
