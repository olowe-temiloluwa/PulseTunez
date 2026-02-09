<template>
  <!-- CTA Section -->
  <section class="relative z-10 py-24 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-0 w-full h-full bg-black/10"></div>
      <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
      <div class="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
    </div>
    
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="animate-fade-in-up">
        <h2 class="text-4xl md:text-5xl font-black mb-6 text-white">
          Ready to Upgrade Your Sound?
        </h2>
        <p class="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Get in touch with our experts for personalized recommendations and professional guidance
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <NuxtLink 
            to="/contact"
            class="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <Icon name="heroicons:phone" class="w-5 h-5 mr-2" />
            Contact Experts
          </NuxtLink>
          
          <NuxtLink 
            to="/category/audio-gadgets"
            class="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            <Icon name="heroicons:bolt" class="w-5 h-5 mr-2" />
            Quick Shop
          </NuxtLink>
        </div>
        
        <!-- Contact Info -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/90">
          <div class="flex items-center">
            <Icon name="heroicons:envelope" class="w-5 h-5 mr-2" />
            <span>support@pulsetunez.com</span>
          </div>
          <div class="flex items-center">
            <Icon name="heroicons:device-phone-mobile" class="w-5 h-5 mr-2" />
            <span>08022738004</span>
          </div>
          <div class="flex items-center">
            <Icon name="heroicons:clock" class="w-5 h-5 mr-2" />
            <span>24/7 Support</span>
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
    const animatedElements = document.querySelectorAll('.animate-fade-in-up')
    animatedElements.forEach(el => observer.observe(el))
  })
})
</script>
