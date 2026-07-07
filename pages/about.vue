<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div class="mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6">
            <Icon name="heroicons:microphone" class="w-10 h-10 text-white" />
          </div>
          <h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
            PulseTunez
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Your Premium Audio & Music Equipment Destination
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/shop" class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Shop Now
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
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
        <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center">
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Upgrade Your Sound?</h2>
          <p class="text-lg text-blue-100 mb-6">Get in touch with our experts for personalized recommendations</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/contact" class="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Contact Experts
            </NuxtLink>
            <NuxtLink to="/shop" class="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Quick Shop
            </NuxtLink>
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
</script>
