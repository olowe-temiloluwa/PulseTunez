<template>
  <!-- Categories Section with Solid Background -->
  <section id="categories" class="relative z-10 py-24 bg-white dark:bg-gray-900 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-900/50"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 scroll-animate">
        <h2 class="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Shop by Category
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Discover our curated collection of premium audio equipment</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="category in productStore.categories" 
          :key="category.id"
          class="group scroll-animate-scale"
        >
          <NuxtLink 
            :to="`/category/${category.id}`"
            class="block bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <!-- Glassmorphism Card -->
            <div class="relative p-8 bg-gradient-to-br from-white/80 to-transparent dark:from-gray-800/80 backdrop-blur-xl">
              <!-- Floating Icon -->
              <div class="mb-6 relative">
                <div class="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500"></div>
                <div class="relative bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl p-4 shadow-lg">
                  <Icon :name="category.icon" class="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {{ category.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {{ category.description }}
              </p>
              
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  {{ category.productCount }} Products
                </span>
                <div class="flex items-center text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                  <span class="text-sm font-medium mr-1">Explore</span>
                  <Icon name="heroicons:arrow-right" class="w-4 h-4" />
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useProductStore } from '~/stores/products'

const productStore = useProductStore()

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
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-scale')
    animatedElements.forEach(el => observer.observe(el))
  })
})
</script>
