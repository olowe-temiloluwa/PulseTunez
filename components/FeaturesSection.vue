<template>
  <!-- Features Section -->
  <section class="relative z-10 py-24 bg-gray-50 dark:bg-gray-800 overflow-hidden">
    <!-- Animated background decorations -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-1/4 w-64 h-64 bg-blue-100/20 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Why Choose PulseTunez?
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Experience the difference with our premium service and quality products</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div class="group scroll-animate-left">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 p-8 border border-gray-100 dark:border-gray-700">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="heroicons:truck" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Free Shipping
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Enjoy free shipping on all orders over $50. Fast and reliable delivery to your doorstep.
            </p>
          </div>
        </div>
        
        <!-- Feature 2 -->
        <div class="group scroll-animate">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 p-8 border border-gray-100 dark:border-gray-700">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="heroicons:shield-check" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Warranty Protected
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              All products come with comprehensive warranty coverage for your peace of mind.
            </p>
          </div>
        </div>
        
        <!-- Feature 3 -->
        <div class="group scroll-animate-right">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 p-8 border border-gray-100 dark:border-gray-700">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="heroicons:headphones" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Expert Support
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Professional guidance and technical support for all your audio needs.
            </p>
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
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right')
    animatedElements.forEach(el => observer.observe(el))
  })
})
</script>
