<template>
  <!-- Stats Section -->
  <section class="relative z-10 py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
    <!-- Background decorations -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-1/4 w-64 h-64 bg-blue-100/20 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Stat 1 -->
        <div class="text-center scroll-animate">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <div class="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">10K+</div>
            <div class="text-gray-600 dark:text-gray-300 font-medium">Happy Customers</div>
          </div>
        </div>
        
        <!-- Stat 2 -->
        <div class="text-center scroll-animate">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <div class="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">500+</div>
            <div class="text-gray-600 dark:text-gray-300 font-medium">Products</div>
          </div>
        </div>
        
        <!-- Stat 3 -->
        <div class="text-center scroll-animate">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <div class="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-2">50+</div>
            <div class="text-gray-600 dark:text-gray-300 font-medium">Brands</div>
          </div>
        </div>
        
        <!-- Stat 4 -->
        <div class="text-center scroll-animate">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <div class="text-4xl font-black text-green-600 dark:text-green-400 mb-2">24/7</div>
            <div class="text-gray-600 dark:text-gray-300 font-medium">Support</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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
