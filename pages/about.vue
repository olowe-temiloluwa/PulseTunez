<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <HeroSection />

      <!-- Why Choose Us -->
      <FeaturesSection />

      <!-- About Content -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12 mb-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4">About PulseTunez</h1>
          <p class="text-xl text-blue-100">Your Premium Audio & Music Equipment Destination</p>
        </div>
      </div>

      <!-- Company Story -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
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
          <p class="text-gray-600">
            At PulseTunez, we don't just sell equipment – we share your passion for sound. Every product 
            in our inventory is carefully selected by our team of audio experts who understand what 
            makes great gear truly exceptional.
          </p>
        </div>
        <div class="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center">
          <Icon name="store" class="w-24 h-24 text-gray-400" />
        </div>
      </div>

      <!-- Values -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="award" class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Quality First</h3>
            <p class="text-gray-600 dark:text-gray-300">We only stock products that meet our rigorous quality standards and deliver exceptional performance.</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="users" class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Customer Focus</h3>
            <p class="text-gray-600">Your satisfaction is our priority. We provide expert advice and support to help you make the right choice.</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="zap" class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Innovation</h3>
            <p class="text-gray-600">We stay ahead of the curve with the latest audio technology and cutting-edge music equipment.</p>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Alex Johnson</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-2">Founder & CEO</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Audio engineer with 15+ years of experience in professional sound design.</p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Sarah Chen</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-2">Product Manager</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Musician and tech enthusiast passionate about finding the perfect gear for creators.</p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Mike Davis</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-2">Customer Support Lead</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Dedicated to ensuring every customer has an exceptional shopping experience.</p>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="surface-card p-8 mb-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5000+</div>
            <p class="text-gray-600 dark:text-gray-300">Happy Customers</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">200+</div>
            <p class="text-gray-600 dark:text-gray-300">Products</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
            <p class="text-gray-600 dark:text-gray-300">Brands</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.8★</div>
            <p class="text-gray-600 dark:text-gray-300">Average Rating</p>
          </div>
        </div>
      </div>

      <!-- FAQs -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        <div class="max-w-3xl mx-auto space-y-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">What is your return policy?</h3>
            <p class="text-gray-600 dark:text-gray-300">We offer a 30-day return policy for all products in their original condition. Contact our support team to initiate a return.</p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Do you offer warranty on products?</h3>
            <p class="text-gray-600 dark:text-gray-300">Yes, all our products come with manufacturer warranty. Warranty periods vary by product and brand.</p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">How long does shipping take?</h3>
            <p class="text-gray-600 dark:text-gray-300">Standard shipping takes 5-7 business days. Express shipping options are available for faster delivery.</p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Do you ship internationally?</h3>
            <p class="text-gray-600 dark:text-gray-300">Currently, we ship within the country only. International shipping will be available soon.</p>
          </div>
        </div>
      </div>

      <!-- Ready to Upgrade Your Sound CTA -->
      <CTASection />

      <!-- CTA -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold mb-4">Ready to Experience the PulseTunez Difference?</h2>
        <p class="text-lg mb-6">Join thousands of satisfied customers who trust us for their audio needs.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/shop" class="btn-primary bg-white text-blue-600 hover:bg-gray-100">
            Shop Now
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-secondary border-2 border-white text-white hover:bg-white hover:text-blue-600">
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import components
import HeroSection from '~/components/HeroSection.vue'
import FeaturesSection from '~/components/FeaturesSection.vue'
import CTASection from '~/components/CTASection.vue'

// Set page title
useHead({
  title: 'About Us - PulseTunez'
})
</script>
