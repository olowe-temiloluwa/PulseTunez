<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg fixed top-0 left-0 right-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:microphone" class="w-6 h-6 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-800">PulseTunez</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink 
              to="/" 
              class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              :class="{ 'text-blue-600 font-bold': $route.path === '/' }"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              v-for="category in productStore.categories" 
              :key="category.id"
              :to="`/category/${category.id}`"
              class="text-gray-600 hover:text-blue-600 transition-colors"
              :class="{ 'text-blue-600 font-bold': $route.path.startsWith(`/category/${category.id}`) }"
            >
              {{ category.name }}
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              :class="{ 'text-blue-600 font-bold': $route.path === '/about' }"
            >
              About
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              :class="{ 'text-blue-600 font-bold': $route.path === '/contact' }"
            >
              Contact
            </NuxtLink>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center space-x-4">
            <!-- Settings Icon -->
            <NuxtLink 
              to="/settings" 
              class="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              :class="{ 'text-blue-600': $route.path === '/settings' }"
            >
              <Icon name="heroicons:cog-6-tooth" class="w-6 h-6" />
            </NuxtLink>
            
            <!-- Cart Button -->
            <button 
              @click="cartStore.toggleCart"
              class="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Icon name="heroicons:shopping-cart" class="w-6 h-6" />
              <span 
                v-if="cartStore.items.length > 0"
                class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartStore.items.length }}
              </span>
            </button>

            <!-- Mobile Menu Toggle -->
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Icon name="heroicons:bars-3" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
        <div class="px-4 py-2 space-y-2">
          <NuxtLink 
            to="/" 
            class="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
            :class="{ 'text-blue-600 font-bold': $route.path === '/' }"
            @click="mobileMenuOpen = false"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            v-for="category in productStore.categories" 
            :key="category.id"
            :to="`/category/${category.id}`"
            class="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
            :class="{ 'text-blue-600 font-bold': $route.path.startsWith(`/category/${category.id}`) }"
            @click="mobileMenuOpen = false"
          >
            {{ category.name }}
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
            :class="{ 'text-blue-600 font-bold': $route.path === '/about' }"
            @click="mobileMenuOpen = false"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
            :class="{ 'text-blue-600 font-bold': $route.path === '/contact' }"
            @click="mobileMenuOpen = false"
          >
            Contact
          </NuxtLink>
          <NuxtLink 
            to="/settings" 
            class="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
            :class="{ 'text-blue-600 font-bold': $route.path === '/settings' }"
            @click="mobileMenuOpen = false"
          >
            Settings
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-16 bg-white dark:bg-gray-900 relative z-10">
      <slot />
    </main>

    <!-- Shopping Cart Sidebar -->
    <Transition
      enter-active-class="transition-transform duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div 
        v-if="cartStore.isOpen"
        class="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
      >
        <!-- Cart Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-semibold">Shopping Cart</h2>
          <button 
            @click="cartStore.closeCart"
            class="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="cartStore.items.length === 0" class="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
          <div v-else class="space-y-4">
            <div 
              v-for="item in cartStore.items" 
              :key="item.id"
              class="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg"
            >
              <img 
                :src="item.image" 
                :alt="item.name"
                class="w-16 h-16 object-cover rounded"
              >
              <div class="flex-1">
                <h3 class="font-medium text-sm">{{ item.name }}</h3>
                <p class="text-blue-600 font-semibold">${{ item.price }}</p>
                <div class="flex items-center space-x-2 mt-1">
                  <button 
                    @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                    class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span class="text-sm w-8 text-center">{{ item.quantity }}</span>
                  <button 
                    @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                    class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                @click="cartStore.removeItem(item.id)"
                class="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Icon name="heroicons:trash" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Footer -->
        <div v-if="cartStore.items.length > 0" class="border-t p-4 space-y-3">
          <div class="flex justify-between items-center">
            <span class="font-semibold">Total:</span>
            <span class="text-xl font-bold text-blue-600">${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <NuxtLink 
            to="/checkout"
            class="btn-primary w-full text-center block"
            @click="cartStore.closeCart"
          >
            Proceed to Checkout
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- Cart Overlay -->
    <div 
      v-if="cartStore.isOpen"
      @click="cartStore.closeCart"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
    />

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 relative z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:microphone" class="w-6 h-6 text-white" />
              </div>
              <span class="text-lg font-bold">PulseTunez</span>
            </div>
            <p class="text-gray-400">Your premium destination for audio gadgets, musical instruments, and studio equipment.</p>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">Categories</h3>
            <ul class="space-y-2 text-gray-400">
              <li v-for="category in productStore.categories" :key="category.id">
                <NuxtLink 
                  :to="`/category/${category.id}`" 
                  class="hover:text-white transition-colors"
                  :class="{ 'text-blue-300 !text-gray-400': $route.path.startsWith(`/category/${category.id}`) }"
                >
                  {{ category.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-gray-400">
              <li>
                <NuxtLink 
                  to="/about" 
                  class="hover:text-white transition-colors"
                  :class="{ 'text-blue-300 !text-gray-400': $route.path === '/about' }"
                >
                  About Us
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/contact" 
                  class="hover:text-white transition-colors"
                  :class="{ 'text-blue-300 !text-gray-400': $route.path === '/contact' }"
                >
                  Contact
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/settings" 
                  class="hover:text-white transition-colors"
                  :class="{ 'text-blue-300 !text-gray-400': $route.path === '/settings' }"
                >
                  Settings
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/faq" 
                  class="hover:text-white transition-colors"
                  :class="{ 'text-blue-300 !text-gray-400': $route.path === '/faq' }"
                >
                  FAQ
                </NuxtLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">Contact Info</h3>
            <div class="space-y-2 text-gray-400">
              <p class="flex items-center space-x-2">
                <Icon name="heroicons:device-phone-mobile" class="w-4 h-4" />
                <span>08022738004</span>
              </p>
              <p class="flex items-center space-x-2">
                <Icon name="heroicons:envelope" class="w-4 h-4" />
                <span>info@pulsetunez.com</span>
              </p>
              <div class="flex space-x-4 pt-4">
                <a href="#" class="hover:text-blue-400 transition-colors">
                  <Icon name="heroicons:facebook" class="w-5 h-5" />
                </a>
                <a href="#" class="hover:text-blue-400 transition-colors">
                  <Icon name="heroicons:twitter" class="w-5 h-5" />
                </a>
                <a href="#" class="hover:text-blue-400 transition-colors">
                  <Icon name="heroicons:instagram" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PulseTunez. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'

const productStore = useProductStore()
const cartStore = useCartStore()
const mobileMenuOpen = ref(false)
</script>
