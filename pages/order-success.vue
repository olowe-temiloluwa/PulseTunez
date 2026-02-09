<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-sm p-8 text-center">
        <!-- Success Icon -->
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="check" class="w-10 h-10 text-green-600" />
        </div>

        <h1 class="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        
        <p class="text-lg text-gray-600 mb-8">
          Thank you for your order. We've received your purchase and will begin processing it right away.
        </p>

        <!-- Order Details -->
        <div class="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 class="text-xl font-semibold mb-4">Order Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span class="text-gray-500">Order Number:</span>
              <span class="ml-2 font-medium">#PT-{{ orderNumber }}</span>
            </div>
            <div>
              <span class="text-gray-500">Order Date:</span>
              <span class="ml-2 font-medium">{{ orderDate }}</span>
            </div>
            <div>
              <span class="text-gray-500">Email:</span>
              <span class="ml-2 font-medium">{{ userEmail }}</span>
            </div>
            <div>
              <span class="text-gray-500">Phone:</span>
              <span class="ml-2 font-medium">{{ userPhone }}</span>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">What's Next?</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="mail" class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="font-medium mb-2">Confirmation Email</h3>
              <p class="text-sm text-gray-600">You'll receive an order confirmation email shortly.</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="package" class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="font-medium mb-2">Order Processing</h3>
              <p class="text-sm text-gray-600">We'll prepare your items for shipping within 1-2 business days.</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="truck" class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="font-medium mb-2">Delivery</h3>
              <p class="text-sm text-gray-600">Your order will be delivered within 3-5 business days.</p>
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
      <div class="mt-8 bg-blue-50 rounded-lg p-6 text-center">
        <h3 class="text-lg font-semibold mb-2">Need Help?</h3>
        <p class="text-gray-600 mb-4">Our customer support team is here to assist you.</p>
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
