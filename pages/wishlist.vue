<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Wishlist</h1>
        <p class="text-gray-600 dark:text-gray-300">{{ wishlistStore.itemCount }} items saved</p>
      </div>

      <!-- Empty State -->
      <div v-if="wishlistStore.items.length === 0" class="text-center py-16">
        <Icon name="heroicons:heart" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Your wishlist is empty</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">Save items you love to your wishlist</p>
        <NuxtLink to="/shop" class="btn-primary">Browse Products</NuxtLink>
      </div>

      <!-- Wishlist Items -->
      <div v-else class="space-y-4">
        <div 
          v-for="item in wishlistStore.items" 
          :key="item.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          <div class="flex flex-col sm:flex-row">
            <!-- Product Image -->
            <div class="relative w-full sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <NuxtLink :to="`/product/${item.id}`">
                <img 
                  :src="item.image" 
                  :alt="item.name"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                >
              </NuxtLink>
            </div>

            <!-- Product Details -->
            <div class="flex-1 p-4 sm:p-6">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div class="flex-1">
                  <NuxtLink :to="`/product/${item.id}`">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{{ item.name }}</h3>
                  </NuxtLink>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{{ item.description }}</p>
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">${{ item.price }}</span>
                    <span v-if="item.discount" class="text-sm text-gray-400 line-through">${{ item.salePrice || (item.price * (1 - item.discount / 100)).toFixed(2) }}</span>
                  </div>
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="feature in item.features.slice(0, 2)" 
                      :key="feature"
                      class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      {{ feature }}
                    </span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <button 
                    @click="moveToCart(item)"
                    class="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Icon name="heroicons:shopping-cart" class="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                  <button 
                    @click="wishlistStore.removeItem(item.id)"
                    class="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Icon name="heroicons:trash" class="w-4 h-4 mr-2" />
                    Remove
                  </button>
                </div>
              </div>

              <!-- Stock Status -->
              <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center space-x-2 text-sm">
                  <Icon 
                    :name="item.stock > 0 ? 'heroicons:check-circle' : 'heroicons:x-circle'" 
                    :class="item.stock > 0 ? 'text-green-500' : 'text-red-500'"
                    class="w-4 h-4"
                  />
                  <span :class="item.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                    {{ item.stock > 0 ? `${item.stock} in stock` : 'Out of stock' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wishlist Summary -->
      <div v-if="wishlistStore.items.length > 0" class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Wishlist Summary</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Total value: ${{ wishlistStore.totalPrice.toFixed(2) }}</p>
          </div>
          <div class="flex space-x-2">
            <button 
              @click="addAllToCart"
              class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Icon name="heroicons:shopping-cart" class="w-4 h-4 mr-2" />
              Add All to Cart
            </button>
            <button 
              @click="clearWishlist"
              class="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Icon name="heroicons:trash" class="w-4 h-4 mr-2" />
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWishlistStore } from '~/stores/wishlist'
import { useCartStore } from '~/stores/cart'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const moveToCart = (product) => {
  wishlistStore.moveToCart(product, cartStore)
}

const addAllToCart = () => {
  wishlistStore.items.forEach(item => {
    cartStore.addItem(item)
  })
  wishlistStore.clearWishlist()
  cartStore.toggleCart()
}

const clearWishlist = () => {
  if (confirm('Are you sure you want to clear your wishlist?')) {
    wishlistStore.clearWishlist()
  }
}

// Load wishlist from localStorage on mount
onMounted(() => {
  wishlistStore.loadFromLocalStorage()
})

// Set page title
useHead({
  title: 'Wishlist - PulseTunez'
})
</script>
