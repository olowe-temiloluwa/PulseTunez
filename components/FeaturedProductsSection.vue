<template>
  <!-- Featured Products -->
  <section class="relative z-10 py-24 bg-white dark:bg-gray-900 overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iNyIvPjwvZz48L2c+PC9zdmc+');"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black mb-6 text-blue-600 dark:text-blue-400">
          Featured Products
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Handpicked premium audio equipment for the ultimate sound experience</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="product in featuredProducts" 
          :key="product.id"
          class="group scroll-animate"
        >
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700">
            <!-- Product Image -->
            <div class="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute top-4 right-4">
                <button
                  @click="cartStore.addItem(product)"
                  class="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors duration-300 group"
                >
                  <Icon name="heroicons:shopping-cart" class="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white" />
                </button>
              </div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{ product.category }}
                </span>
              </div>
            </div>
            
            <!-- Product Info -->
            <div class="p-6">
              <div class="mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ product.name }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {{ product.description }}
                </p>
              </div>
              
              <!-- Rating -->
              <div class="flex items-center mb-4">
                <div class="flex text-yellow-400">
                  <Icon name="heroicons:star" class="w-4 h-4 fill-current" />
                  <Icon name="heroicons:star" class="w-4 h-4 fill-current" />
                  <Icon name="heroicons:star" class="w-4 h-4 fill-current" />
                  <Icon name="heroicons:star" class="w-4 h-4 fill-current" />
                  <Icon name="heroicons:star" class="w-4 h-4" />
                </div>
                <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">({{ product.reviews }})</span>
              </div>
              
              <!-- Price and Action -->
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">${{ product.originalPrice }}</span>
                </div>
                <NuxtLink 
                  :to="`/product/${product.id}`"
                  class="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 flex items-center"
                >
                  <Icon name="heroicons:eye" class="w-4 h-4 mr-1" />
                  View
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- View All Products Button -->
      <div class="text-center mt-12">
        <NuxtLink 
          to="/category/audio-gadgets"
          class="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-800 transform hover:scale-105 transition-all duration-300 shadow-xl"
        >
          View All Products
          <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-2" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'

const productStore = useProductStore()
const cartStore = useCartStore()

// Get featured products
const featuredProducts = computed(() => productStore.featuredProducts)

// Scroll-triggered animations
onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)

  // Observe all scroll-animate elements
  nextTick(() => {
    const animatedElements = document.querySelectorAll('.scroll-animate')
    animatedElements.forEach(el => observer.observe(el))
  })
})
</script>
