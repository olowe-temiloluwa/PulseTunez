<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 border-b border-transparent dark:border-gray-700 fixed top-0 left-0 right-0 z-40 transition-colors duration-300">
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
              to="/shop" 
              class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              :class="{ 'text-blue-600 font-bold': $route.path === '/shop' }"
            >
              Shop
            </NuxtLink>
            
            <!-- Category Dropdown -->
            <div class="relative group">
              <button class="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center">
                Category
                <Icon name="heroicons:chevron-down" class="w-4 h-4 ml-1" />
              </button>
              <div class="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink 
                    v-for="category in productStore.categories" 
                    :key="category.id"
                    :to="`/category/${category.id}`"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': $route.path.startsWith(`/category/${category.id}`) }"
                  >
                    {{ category.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
            
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
            <!-- Show when NOT signed in -->
            <template v-if="!authStore.isAuthenticated">
              <!-- Login Button -->
              <NuxtLink 
                to="/login" 
                class="hidden sm:inline-flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                :class="{ 'text-blue-600': $route.path === '/login' }"
              >
                <Icon name="heroicons:user" class="w-5 h-5 mr-1" />
                <span>Sign In</span>
              </NuxtLink>
              
              <!-- Register Button -->
              <NuxtLink 
                to="/register" 
                class="hidden sm:inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                :class="{ 'bg-blue-700': $route.path === '/register' }"
              >
                Sign Up
              </NuxtLink>
            </template>

            <!-- Show when signed in -->
            <template v-else>
              <!-- User Icon -->
              <NuxtLink 
                to="/settings" 
                class="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                :class="{ 'text-blue-600': $route.path === '/settings' }"
              >
                <Icon name="heroicons:user-circle" class="w-7 h-7" />
              </NuxtLink>
              
              <!-- Cart Button (only when signed in) -->
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
            </template>

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
      <div v-if="mobileMenuOpen" class="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div class="px-4 py-2 space-y-2">
          <NuxtLink 
            to="/" 
            class="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ 'text-blue-600 font-bold': $route.path === '/' }"
            @click="mobileMenuOpen = false"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/shop" 
            class="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ 'text-blue-600 font-bold': $route.path === '/shop' }"
            @click="mobileMenuOpen = false"
          >
            Shop
          </NuxtLink>
          
          <!-- Mobile Category Dropdown -->
          <div>
            <button 
              @click="categoryDropdownOpen = !categoryDropdownOpen"
              class="w-full flex items-center justify-between py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Category
              <Icon :name="categoryDropdownOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="w-4 h-4" />
            </button>
            <div v-if="categoryDropdownOpen" class="pl-4 space-y-1 mt-2">
              <NuxtLink 
                v-for="category in productStore.categories" 
                :key="category.id"
                :to="`/category/${category.id}`"
                class="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                :class="{ 'text-blue-600 font-bold': $route.path.startsWith(`/category/${category.id}`) }"
                @click="mobileMenuOpen = false"
              >
                {{ category.name }}
              </NuxtLink>
            </div>
          </div>
          
          <NuxtLink 
            to="/about" 
            class="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ 'text-blue-600 font-bold': $route.path === '/about' }"
            @click="mobileMenuOpen = false"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ 'text-blue-600 font-bold': $route.path === '/contact' }"
            @click="mobileMenuOpen = false"
          >
            Contact
          </NuxtLink>
          <!-- Show when signed in -->
          <template v-if="authStore.isAuthenticated">
            <NuxtLink 
              to="/settings" 
              class="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              :class="{ 'text-blue-600 font-bold': $route.path === '/settings' }"
              @click="mobileMenuOpen = false"
            >
              <div class="flex items-center">
                <Icon name="heroicons:user-circle" class="w-5 h-5 mr-2" />
                My Account
              </div>
            </NuxtLink>
          </template>
          
          <!-- Show when NOT signed in -->
          <template v-else>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-2">
              <NuxtLink 
                to="/login" 
                class="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                :class="{ 'text-blue-600 font-bold': $route.path === '/login' }"
                @click="mobileMenuOpen = false"
              >
                Sign In
              </NuxtLink>
              <NuxtLink 
                to="/register" 
                class="block py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
                :class="{ 'bg-blue-700': $route.path === '/register' }"
                @click="mobileMenuOpen = false"
              >
                Sign Up
              </NuxtLink>
            </div>
          </template>
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
        class="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col transition-colors duration-300"
      >
        <!-- Cart Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
          <button 
            @click="cartStore.closeCart"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="cartStore.items.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            Your cart is empty
          </div>
          <div v-else class="space-y-4">
            <div 
              v-for="item in cartStore.items" 
              :key="item.id"
              class="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"
            >
              <img 
                :src="item.image" 
                :alt="item.name"
                class="w-16 h-16 object-cover rounded"
              >
              <div class="flex-1">
                <h3 class="font-medium text-sm text-gray-900 dark:text-white">{{ item.name }}</h3>
                <p class="text-blue-600 font-semibold">${{ item.price }}</p>
                <div class="flex items-center space-x-2 mt-1">
                  <button 
                    @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                    class="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200"
                  >
                    -
                  </button>
                  <span class="text-sm w-8 text-center">{{ item.quantity }}</span>
                  <button 
                    @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                    class="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200"
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
        <div v-if="cartStore.items.length > 0" class="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
          <div class="flex justify-between items-center text-gray-900 dark:text-white">
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

    <!-- Footer: fixed dark background; text follows theme -->
    <footer class="bg-gray-900 border-t border-gray-800 py-12 relative z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 footer-text transition-colors duration-300">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:microphone" class="w-6 h-6 text-white" />
              </div>
              <span class="text-lg font-bold footer-heading">PulseTunez</span>
            </div>
            <p class="footer-muted">Your premium destination for audio gadgets, musical instruments, and studio equipment.</p>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4 footer-heading">Categories</h3>
            <ul class="space-y-2 footer-muted">
              <li v-for="category in productStore.categories" :key="category.id">
                <NuxtLink 
                  :to="`/category/${category.id}`" 
                  class="footer-link transition-colors"
                  :class="{ 'footer-link-active font-medium': $route.path.startsWith(`/category/${category.id}`) }"
                >
                  {{ category.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4 footer-heading">Quick Links</h3>
            <ul class="space-y-2 footer-muted">
              <li>
                <NuxtLink 
                  to="/about" 
                  class="footer-link transition-colors"
                  :class="{ 'footer-link-active font-medium': $route.path === '/about' }"
                >
                  About Us
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/contact" 
                  class="footer-link transition-colors"
                  :class="{ 'footer-link-active font-medium': $route.path === '/contact' }"
                >
                  Contact
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/settings" 
                  class="footer-link transition-colors"
                  :class="{ 'footer-link-active font-medium': $route.path === '/settings' }"
                >
                  Settings
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/faq" 
                  class="footer-link transition-colors"
                  :class="{ 'footer-link-active font-medium': $route.path === '/faq' }"
                >
                  FAQ
                </NuxtLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4 footer-heading">Contact Info</h3>
            <div class="space-y-2 footer-muted">
              <p class="flex items-center space-x-2">
                <Icon name="heroicons:device-phone-mobile" class="w-4 h-4" />
                <span>08022738004</span>
              </p>
              <p class="flex items-center space-x-2">
                <Icon name="heroicons:envelope" class="w-4 h-4" />
                <span>info@pulsetunez.com</span>
              </p>
              <div class="flex space-x-4 pt-4">
                <a href="#" class="footer-social transition-colors">
                  <Icon name="heroicons:facebook" class="w-5 h-5" />
                </a>
                <a href="#" class="footer-social transition-colors">
                  <Icon name="heroicons:twitter" class="w-5 h-5" />
                </a>
                <a href="#" class="footer-social transition-colors">
                  <Icon name="heroicons:instagram" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center footer-muted">
          <p>&copy; 2024 PulseTunez. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'

const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)
const categoryDropdownOpen = ref(false)

// Initialize auth on mount
onMounted(() => {
  authStore.initializeAuth()
})
</script>
