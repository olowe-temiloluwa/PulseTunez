<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="surface-card p-8 text-center">
        <!-- Success Icon -->
        <div class="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="check" class="w-10 h-10 text-green-600" />
        </div>

        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Order Placed Successfully!</h1>
        
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Thank you for your order. We've received your purchase and will begin processing it right away.
        </p>

        <!-- Order Details -->
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8 text-left">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Order Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span class="text-gray-500 dark:text-gray-400">Order Number:</span>
              <span class="ml-2 font-medium text-gray-900 dark:text-white">#PT-{{ orderNumber }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Order Date:</span>
              <span class="ml-2 font-medium text-gray-900 dark:text-white">{{ orderDate }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Email:</span>
              <span class="ml-2 font-medium text-gray-900 dark:text-white">{{ userEmail }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Phone:</span>
              <span class="ml-2 font-medium text-gray-900 dark:text-white">{{ userPhone }}</span>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">What's Next?</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="mail" class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="font-medium mb-2 text-gray-900 dark:text-white">Confirmation Email</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">You'll receive an order confirmation email shortly.</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="package" class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="font-medium mb-2 text-gray-900 dark:text-white">Order Processing</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">We'll prepare your items for shipping within 1-2 business days.</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="truck" class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="font-medium mb-2 text-gray-900 dark:text-white">Delivery</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Your order will be delivered within 3-5 business days.</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/" class="btn-primary">
            <Icon name="home" class="w-5 h-5 inline mr-2" />
            Back to Home
          </NuxtLink>
          <button @click="printOrder" class="btn-secondary">
            <Icon name="printer" class="w-5 h-5 inline mr-2" />
            Print Order
          </button>
        </div>
      </div>

      <!-- Customer Support -->
      <div class="mt-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 text-center border border-blue-100 dark:border-blue-800">
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Need Help?</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">Our customer support team is here to assist you.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:08022738004" class="btn-primary bg-blue-600 text-white hover:bg-blue-700">
            <Icon name="phone" class="w-5 h-5 inline mr-2" />
            Call: 08022738004
          </a>
          <NuxtLink to="/contact" class="btn-secondary">
            <Icon name="mail" class="w-5 h-5 inline mr-2" />
            Contact Support
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Generate random order number
const orderNumber = computed(() => {
  return Math.random().toString(36).substr(2, 9).toUpperCase()
})

const orderDate = computed(() => {
  return new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})

// Mock user data (in real app, this would come from the order form)
const userEmail = ref('customer@example.com')
const userPhone = ref('08022738004')

const printOrder = () => {
  window.print()
}

// Set page title
useHead({
  title: 'Order Success - PulseTunez'
})
</script>
