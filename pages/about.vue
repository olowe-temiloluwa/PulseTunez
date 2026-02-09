<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12 mb-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4">About PulseTunez</h1>
          <p class="text-xl text-blue-100">Your Premium Audio & Music Equipment Destination</p>
        </div>
      </div>

      <!-- Company Story -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 class="text-3xl font-bold mb-6">Our Story</h2>
          <p class="text-gray-600 mb-4">
            Founded with a passion for exceptional sound quality, PulseTunez has been serving musicians, 
            audio professionals, and music enthusiasts since 2020. We understand that great music deserves 
            great equipment, and we're committed to providing the finest audio gadgets, musical instruments, 
            and studio equipment to help you create your best work.
          </p>
          <p class="text-gray-600 mb-4">
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
        <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
          <Icon name="store" class="w-24 h-24 text-gray-400" />
        </div>
      </div>

      <!-- Values -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="award" class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Quality First</h3>
            <p class="text-gray-600">We only stock products that meet our rigorous quality standards and deliver exceptional performance.</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="users" class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Customer Focus</h3>
            <p class="text-gray-600">Your satisfaction is our priority. We provide expert advice and support to help you make the right choice.</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="zap" class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Innovation</h3>
            <p class="text-gray-600">We stay ahead of the curve with the latest audio technology and cutting-edge music equipment.</p>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2">Alex Johnson</h3>
            <p class="text-gray-600 mb-2">Founder & CEO</p>
            <p class="text-sm text-gray-500">Audio engineer with 15+ years of experience in professional sound design.</p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2">Sarah Chen</h3>
            <p class="text-gray-600 mb-2">Product Manager</p>
            <p class="text-sm text-gray-500">Musician and tech enthusiast passionate about finding the perfect gear for creators.</p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2">Mike Davis</h3>
            <p class="text-gray-600 mb-2">Customer Support Lead</p>
            <p class="text-sm text-gray-500">Dedicated to ensuring every customer has an exceptional shopping experience.</p>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="bg-white rounded-lg shadow-sm p-8 mb-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-blue-600 mb-2">5000+</div>
            <p class="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-600 mb-2">200+</div>
            <p class="text-gray-600">Products</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <p class="text-gray-600">Brands</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
            <p class="text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold mb-4">Ready to Experience the PulseTunez Difference?</h2>
        <p class="text-lg mb-6">Join thousands of satisfied customers who trust us for their audio needs.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/category/audio-gadgets" class="btn-primary bg-white text-blue-600 hover:bg-gray-100">
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
// Set page title
useHead({
  title: 'About Us - PulseTunez'
})
</script>
