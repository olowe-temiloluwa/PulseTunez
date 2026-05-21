<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Fixed Musical Gadget Background -->
    <div class="fixed inset-0 z-0">
      <!-- Musical Equipment Showcase Background -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a233a] to-[#0b1120]">
        <!-- Musical Equipment Grid Pattern -->
        <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.1) 2px, transparent 2px); background-size: 60px 60px;"></div>
        
        <!-- Floating Musical Equipment Icons -->
        <div class="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 backdrop-blur-2xl rounded-full animate-float flex items-center justify-center">
          <Icon name="heroicons:speaker-wave" class="w-16 h-16 text-blue-300/40" />
        </div>
        <div class="absolute top-40 right-20 w-40 h-40 bg-purple-500/10 backdrop-blur-2xl rounded-full animate-float animation-delay-2000 flex items-center justify-center">
          <Icon name="heroicons:musical-note" class="w-20 h-20 text-purple-300/40" />
        </div>
        <div class="absolute bottom-32 left-20 w-36 h-36 bg-indigo-500/10 backdrop-blur-2xl rounded-full animate-float animation-delay-4000 flex items-center justify-center">
          <Icon name="heroicons:headphones" class="w-18 h-18 text-indigo-300/40" />
        </div>
        <div class="absolute top-1/3 right-1/4 w-28 h-28 bg-blue-500/10 backdrop-blur-2xl rounded-full animate-float animation-delay-3000 flex items-center justify-center">
          <Icon name="heroicons:microphone" class="w-14 h-14 text-blue-300/40" />
        </div>
        <div class="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 backdrop-blur-2xl rounded-full animate-float animation-delay-1000 flex items-center justify-center">
          <Icon name="heroicons:cog-6-tooth" class="w-16 h-16 text-purple-300/40" />
        </div>
        <div class="absolute top-60 left-1/3 w-24 h-24 bg-indigo-500/10 backdrop-blur-2xl rounded-full animate-float animation-delay-5000 flex items-center justify-center">
          <Icon name="heroicons:radio" class="w-12 h-12 text-indigo-300/40" />
        </div>
        
        <!-- Sound Wave Visualizations -->
        <div class="absolute inset-0 flex items-center justify-center opacity-20">
          <div class="flex space-x-2">
            <div class="w-2 h-24 bg-blue-400/30 animate-pulse rounded-full"></div>
            <div class="w-2 h-32 bg-purple-400/30 animate-pulse animation-delay-200 rounded-full"></div>
            <div class="w-2 h-28 bg-indigo-400/30 animate-pulse animation-delay-400 rounded-full"></div>
            <div class="w-2 h-36 bg-blue-400/30 animate-pulse animation-delay-600 rounded-full"></div>
            <div class="w-2 h-24 bg-purple-400/30 animate-pulse animation-delay-800 rounded-full"></div>
            <div class="w-2 h-30 bg-indigo-400/30 animate-pulse animation-delay-1000 rounded-full"></div>
            <div class="w-2 h-34 bg-blue-400/30 animate-pulse animation-delay-1200 rounded-full"></div>
            <div class="w-2 h-28 bg-purple-400/30 animate-pulse animation-delay-1400 rounded-full"></div>
          </div>
        </div>
        
        <!-- Musical Equipment Silhouettes -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-10 left-20 text-white/20">
            <Icon name="heroicons:speaker-x-mark" class="w-24 h-24" />
          </div>
          <div class="absolute top-20 right-30 text-white/20">
            <Icon name="heroicons:musical-note" class="w-32 h-32" />
          </div>
          <div class="absolute bottom-20 left-40 text-white/20">
            <Icon name="heroicons:headphones" class="w-28 h-28" />
          </div>
          <div class="absolute bottom-40 right-20 text-white/20">
            <Icon name="heroicons:microphone" class="w-20 h-20" />
          </div>
        </div>
      </div>
      
      <!-- Dark Overlay for better text visibility -->
      <div class="absolute inset-0 bg-black/50"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="text-center">
        <!-- Enhanced Logo -->
        <div class="mb-8 animate-fade-in-down">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500">
            <Icon name="heroicons:microphone" class="w-12 h-12 text-white animate-pulse" />
          </div>
          <div class="mt-4">
            <h1 class="text-6xl md:text-7xl font-black text-purple-400 ">
              PulseTunez
            </h1>
            <p class="text-xl md:text-2xl text-white/90 font-light tracking-wide">Your Audio Universe</p>
          </div>
        </div>
        
        <!-- Enhanced Hero Content -->
        <div>
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Premium
            <span class="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Audio Equipment
            </span>
          </h2>
          <p class="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of cutting-edge technology and exceptional sound quality. 
            From professional studio gear to personal audio essentials.
          </p>
          
          <!-- Enhanced CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <NuxtLink 
              to="/category/audio-gadgets" 
              class="group inline-flex items-center px-8 py-4 bg-blue-600  text-white font-semibold rounded-xl hover:bg-blue-900 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Icon name="heroicons:shopping-bag" class="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Shop Now
              <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </NuxtLink>
            
            <NuxtLink 
              to="/about" 
              class="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
            >
              <Icon name="heroicons:play-circle" class="w-5 h-5 mr-2" />
              Explore More
            </NuxtLink>
          </div>
          
          <!-- Enhanced Trust Indicators -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
            <div class="flex items-center space-x-2">
              <Icon name="heroicons:truck" class="w-5 h-5" />
              <span class="font-medium">Free Shipping</span>
            </div>
            <div class="flex items-center space-x-2">
              <Icon name="heroicons:shield-check" class="w-5 h-5" />
              <span class="font-medium">Warranty Protected</span>
            </div>
            <div class="flex items-center space-x-2">
              <Icon name="heroicons:star" class="w-5 h-5" />
              <span class="font-medium">Expert Support</span>
            </div>
          </div>
        </div>
        
        <!-- Enhanced Scroll Indicator -->
        <div 
          v-if="showScrollIndicator"
          class="absolute bottom-2 left-1 right-1 transform -translate-x-1/2 animate-bounce cursor-pointer"
          @click="scrollToNextSection"
        >
          <div class="flex flex-col items-center text-white/80 hover:text-white transition-colors">
            <span class="text-xs mb-2 font-medium tracking-wider animate-pulse">EXPLORE MORE</span>
            <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div class="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Scroll indicator visibility and functionality
const showScrollIndicator = ref(true)

// Scroll to next section
const scrollToNextSection = () => {
  const categoriesSection = document.getElementById('categories')
  if (categoriesSection) {
    categoriesSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// Handle scroll to hide/show scroll indicator
onMounted(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    
    // Hide scroll indicator when scrolled past hero section
    showScrollIndicator.value = scrollPosition < windowHeight * 0.8
  }
  
  window.addEventListener('scroll', handleScroll)
  
  // Initial check
  handleScroll()
  
  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>
