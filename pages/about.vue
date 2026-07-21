<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section
      ref="heroSection"
      class="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-200 dark:bg-gray-950"
      @mousemove="onHeroMouseMove"
      @mouseenter="onHeroMouseEnter"
      @mouseleave="onHeroMouseLeave"
    >
      <!-- Calm, muted background -->
      <div class="absolute inset-0 bg-slate-200 dark:bg-gray-950">
        <!-- Soft radial spotlight, grayscale -->
        <div
          class="hero-orb absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-50 dark:opacity-100"
          style="background: radial-gradient(circle, rgba(71,85,105,0.5) 0%, rgba(71,85,105,0.18) 40%, transparent 70%);"
          :style="{ transform: `translate(-50%, ${-200 + scrollOffset}px)` }"
        ></div>
        <!-- Faint waveform texture tiled across the whole background -->
        <div
          class="absolute inset-0 opacity-20 dark:opacity-20"
          :style="{ backgroundImage: waveformTileUrl, backgroundSize: '140px 64px' }"
        ></div>
        <!-- Equalizer/waveform strip along the base of the hero -->
        <div
          class="absolute bottom-0 left-0 right-0 h-32 opacity-30 dark:opacity-40"
          :style="{ backgroundImage: waveformTileUrl, backgroundSize: '140px 128px', backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom' }"
        ></div>
        <!-- Cursor-follow spotlight: brightens the pattern/glow right under the pointer -->
        <div
          class="hero-spotlight absolute inset-0 pointer-events-none"
          :style="{
            background: `radial-gradient(circle 260px at ${mouseX}px ${mouseY}px, rgba(30,41,59,0.28), rgba(30,41,59,0.08) 55%, transparent 75%)`,
            opacity: spotlightOpacity
          }"
        ></div>
        <!-- Base fade so edges stay calm -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-200 dark:to-gray-950"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-200 dark:from-gray-950 via-transparent to-transparent opacity-60"></div>
      </div>

      <div class="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center" :class="{ 'hero-content-visible': heroVisible }">
        <div class="mb-8">
          <div class="relative inline-flex items-center justify-center w-24 h-24 mb-6">
            <!-- Pulse rings emanating from the logo -->
            <span class="pulse-ring absolute inset-0 rounded-2xl border border-slate-400/50 dark:border-slate-500/40"></span>
            <span class="pulse-ring pulse-ring-delay absolute inset-0 rounded-2xl border border-slate-400/50 dark:border-slate-500/40"></span>
            <div class="relative z-10 w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-slate-300/60 dark:shadow-black/40 ring-1 ring-slate-200 dark:ring-gray-700 p-3">
              <img src="~/assets/css/img/Logo.png" alt="PulseTunez Logo" class="w-full h-full object-contain rounded-xl" />
            </div>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold text-slate-800 dark:text-white mb-4">
            PulseTunez
          </h1>
          <p class="text-xl md:text-2xl text-slate-600 dark:text-gray-300 mb-8">
            Your Premium Audio & Music Equipment Destination
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/shop" class="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Shop Now
          </NuxtLink>
          <NuxtLink to="/contact" class="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-200 font-semibold rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose PulseTunez?
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <Icon name="heroicons:truck" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Free Shipping</h3>
            <p class="text-gray-600 dark:text-gray-300">Free shipping on orders over $50</p>
          </div>
          
          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <Icon name="heroicons:shield-check" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Warranty Protected</h3>
            <p class="text-gray-600 dark:text-gray-300">All products come with warranty</p>
          </div>
          
          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <Icon name="heroicons:headphones" class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Support</h3>
            <p class="text-gray-600 dark:text-gray-300">Professional guidance available</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Content -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About PulseTunez
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your Premium Audio & Music Equipment Destination
          </p>
        </div>

        <!-- Our Story -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Founded with a passion for exceptional sound quality, PulseTunez has been serving musicians, 
              audio professionals, and music enthusiasts since 2020. We understand that great music deserves 
              great equipment, and we're committed to providing the finest audio gadgets, musical instruments, 
              and studio equipment to help you create your best work.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Our mission is to bridge the gap between professional-grade equipment and accessibility, 
              ensuring that everyone from beginners to seasoned professionals can access high-quality 
              audio gear without breaking the bank.
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              At PulseTunez, we don't just sell equipment – we share your passion for sound. Every product 
              in our inventory is carefully selected by our team of audio experts who understand what 
              makes great gear truly exceptional.
            </p>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg h-80 flex items-center justify-center">
            <Icon name="heroicons:building-storefront" class="w-24 h-24 text-gray-400" />
          </div>
        </div>

        <!-- Our Values -->
        <div class="mb-16">
          <h3 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Our Values</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:trophy" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quality First</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">We only stock products that meet our rigorous quality standards.</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:users" class="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customer Focus</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">Your satisfaction is our priority.</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:lightning-bolt" class="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Innovation</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">We stay ahead with the latest technology.</p>
            </div>
          </div>
        </div>

        <!-- Team -->
        <div class="mb-16">
          <h3 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Meet Our Team</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Alex Johnson</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-1">Founder & CEO</p>
              <p class="text-gray-500 dark:text-gray-400 text-xs">Audio engineer with 15+ years experience</p>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Sarah Chen</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-1">Product Manager</p>
              <p class="text-gray-500 dark:text-gray-400 text-xs">Musician and tech enthusiast</p>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Mike Davis</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-1">Customer Support Lead</p>
              <p class="text-gray-500 dark:text-gray-400 text-xs">Dedicated to exceptional service</p>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg mb-16">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5000+</div>
              <p class="text-gray-600 dark:text-gray-300">Happy Customers</p>
            </div>
            <div>
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">200+</div>
              <p class="text-gray-600 dark:text-gray-300">Products</p>
            </div>
            <div>
              <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">50+</div>
              <p class="text-gray-600 dark:text-gray-300">Brands</p>
            </div>
            <div>
              <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">4.8★</div>
              <p class="text-gray-600 dark:text-gray-300">Average Rating</p>
            </div>
          </div>
        </div>

        <!-- FAQs -->
        <div class="mb-16">
          <h3 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h3>
          <div class="max-w-3xl mx-auto space-y-4">
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">What is your return policy?</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">We offer a 30-day return policy for all products in their original condition.</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Do you offer warranty on products?</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">Yes, all our products come with manufacturer warranty.</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">How long does shipping take?</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">Standard shipping takes 5-7 business days.</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Do you ship internationally?</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">Currently, we ship within the country only.</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <section class="relative overflow-hidden py-14 sm:py-16 md:py-20 px-6 sm:px-10 bg-slate-900 dark:bg-slate-800 rounded-2xl text-center">
          <!-- Subtle waveform accent, matches hero theme -->
          <div
            class="absolute inset-0 opacity-10"
            :style="{ backgroundImage: waveformTileUrl, backgroundSize: '140px 64px' }"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-slate-950/60 via-transparent to-transparent"></div>

          <div class="relative z-10">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">Ready to Upgrade Your Sound?</h2>
            <p class="text-base md:text-lg text-slate-300 mb-6 md:mb-8 max-w-xl mx-auto">Get in touch with our experts for personalized recommendations</p>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <NuxtLink to="/contact" class="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-900 font-semibold rounded-xl shadow-lg hover:bg-slate-100 transition-colors duration-300">
                Contact Experts
              </NuxtLink>
              <NuxtLink to="/shop" class="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-600 text-white font-semibold rounded-xl hover:border-white hover:bg-white/10 transition-colors duration-300">
                Quick Shop
              </NuxtLink>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'About Us - PulseTunez'
})

// Gentle entrance animation for the hero content
const heroVisible = ref(false)

// Subtle audio-waveform / equalizer texture (monochrome, ties into the audio brand)
const waveformSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='64'>
  <rect x='2' y='40' width='8' height='24' fill='#475569'/>
  <rect x='18' y='24' width='8' height='40' fill='#475569'/>
  <rect x='34' y='8' width='8' height='56' fill='#475569'/>
  <rect x='50' y='30' width='8' height='34' fill='#475569'/>
  <rect x='66' y='2' width='8' height='62' fill='#475569'/>
  <rect x='82' y='20' width='8' height='44' fill='#475569'/>
  <rect x='98' y='36' width='8' height='28' fill='#475569'/>
  <rect x='114' y='14' width='8' height='50' fill='#475569'/>
  <rect x='130' y='44' width='8' height='20' fill='#475569'/>
</svg>`
const waveformTileUrl = `url("data:image/svg+xml,${encodeURIComponent(waveformSvg)}")`

// Subtle background parallax on scroll (capped, disabled for reduced-motion users)
const scrollOffset = ref(0)
let prefersReducedMotion = false
let scrollTicking = false

const updateScrollOffset = () => {
  if (prefersReducedMotion) return
  const maxOffset = 40
  scrollOffset.value = Math.min(window.scrollY * 0.08, maxOffset)
  scrollTicking = false
}

const onScroll = () => {
  if (!scrollTicking) {
    scrollTicking = true
    requestAnimationFrame(updateScrollOffset)
  }
}

// Cursor-follow spotlight: highlights the background right under the pointer,
// so the region you're hovering is more visible than the rest of the hero.
const heroSection = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)
const spotlightOpacity = ref(0)
let mouseTicking = false
let pendingX = 0
let pendingY = 0

const onHeroMouseMove = (e) => {
  if (prefersReducedMotion || !heroSection.value) return
  const rect = heroSection.value.getBoundingClientRect()
  pendingX = e.clientX - rect.left
  pendingY = e.clientY - rect.top
  if (!mouseTicking) {
    mouseTicking = true
    requestAnimationFrame(() => {
      mouseX.value = pendingX
      mouseY.value = pendingY
      mouseTicking = false
    })
  }
}

const onHeroMouseEnter = () => {
  if (prefersReducedMotion) return
  spotlightOpacity.value = 1
}

const onHeroMouseLeave = () => {
  spotlightOpacity.value = 0
}

onMounted(() => {
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  requestAnimationFrame(() => {
    heroVisible.value = true
  })
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.hero-content {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.hero-content-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-orb {
  transition: transform 0.3s ease-out;
}

.hero-spotlight {
  transition: opacity 0.4s ease-out;
}

.pulse-ring {
  animation: pulse-ring 3s ease-out infinite;
}

.pulse-ring-delay {
  animation-delay: 1.5s;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-content {
    transition: none;
  }
  .hero-spotlight {
    display: none;
  }
  .hero-orb {
    transition: none;
  }
  .pulse-ring {
    animation: none;
    display: none;
  }
}
</style>
