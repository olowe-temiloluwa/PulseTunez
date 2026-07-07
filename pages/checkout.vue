<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Checkout</h1>

      <div v-if="cartStore.items.length === 0" class="text-center py-16">
        <Icon name="shopping-cart" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Your cart is empty</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">Add some products to your cart before checkout.</p>
        <NuxtLink to="/" class="btn-primary">Continue Shopping</NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Checkout Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Contact Information -->
          <div class="surface-card p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Contact Information</h2>
            <form @submit.prevent="submitOrder" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">First Name</label>
                  <input 
                    v-model="orderForm.firstName"
                    type="text" 
                    required
                    class="form-input"
                  >
                </div>
                <div>
                  <label class="form-label">Last Name</label>
                  <input 
                    v-model="orderForm.lastName"
                    type="text" 
                    required
                    class="form-input"
                  >
                </div>
              </div>
              
              <div>
                <label class="form-label">Email</label>
                <input 
                  v-model="orderForm.email"
                  type="email" 
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              
              <div>
                <label class="form-label">Phone</label>
                <input 
                  v-model="orderForm.phone"
                  type="tel" 
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
            </form>
          </div>

          <!-- Shipping Address -->
          <div class="surface-card p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Shipping Address</h2>
            <form class="space-y-4">
              <div>
                <label class="form-label">Street Address</label>
                <input 
                  v-model="orderForm.address"
                  type="text" 
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">City</label>
                  <input 
                    v-model="orderForm.city"
                    type="text" 
                    required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="form-label">State</label>
                  <input 
                    v-model="orderForm.state"
                    type="text" 
                    required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
              </div>
              
              <div>
                <label class="form-label">ZIP Code</label>
                <input 
                  v-model="orderForm.zipCode"
                  type="text" 
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
            </form>
          </div>

          <!-- Payment Method -->
          <div class="surface-card p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Payment Method</h2>
            <div class="space-y-3">
              <label class="flex items-center space-x-3 cursor-pointer">
                <input 
                  v-model="orderForm.paymentMethod"
                  type="radio" 
                  value="card"
                  class="text-blue-600"
                >
                <span>Credit/Debit Card</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input 
                  v-model="orderForm.paymentMethod"
                  type="radio" 
                  value="transfer"
                  class="text-blue-600"
                >
                <span>Bank Transfer</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input 
                  v-model="orderForm.paymentMethod"
                  type="radio" 
                  value="cod"
                  class="text-blue-600"
                >
                <span class="text-gray-900 dark:text-gray-100">Cash on Delivery</span>
              </label>
            </div>

            <!-- Card Payment Form -->
            <div v-if="orderForm.paymentMethod === 'card'" class="mt-4 space-y-4">
              <div>
                <label class="form-label">Card Number</label>
                <input 
                  v-model="orderForm.cardNumber"
                  type="text" 
                  placeholder="1234 5678 9012 3456"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Expiry Date</label>
                  <input 
                    v-model="orderForm.expiryDate"
                    type="text" 
                    placeholder="MM/YY"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="form-label">CVV</label>
                  <input 
                    v-model="orderForm.cvv"
                    type="text" 
                    placeholder="123"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="surface-card p-6 sticky top-24">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
            
            <!-- Cart Items -->
            <div class="space-y-3 mb-6">
              <div 
                v-for="item in cartStore.items" 
                :key="item.id"
                class="flex items-center space-x-3"
              >
                <img 
                  :src="item.image" 
                  :alt="item.name"
                  class="w-12 h-12 object-cover rounded"
                >
                <div class="flex-1">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ item.name }}</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Qty: {{ item.quantity }}</p>
                </div>
                <span class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span>{{ shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}` }}</span>
              </div>
              <div class="flex justify-between">
                <span>Tax</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
              <div class="border-t pt-2">
                <div class="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span class="text-blue-600">${{ total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Place Order Button -->
            <button 
              @click="submitOrder"
              class="w-full btn-primary mt-6"
              :disabled="isProcessing"
            >
              <Icon v-if="isProcessing" name="loader-2" class="w-5 h-5 inline mr-2 animate-spin" />
              {{ isProcessing ? 'Processing...' : 'Place Order' }}
            </button>

            <!-- Security Note -->
            <div class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              <Icon name="shield" class="w-4 h-4 inline mr-1" />
              Secure checkout powered by PulseTunez
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

definePageMeta({
  middleware: 'auth'
})

const cartStore = useCartStore()
const isProcessing = ref(false)

const orderForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  paymentMethod: 'card',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

const shippingCost = computed(() => {
  return cartStore.totalPrice >= 100 ? 0 : 10
})

const tax = computed(() => {
  return cartStore.totalPrice * 0.08 // 8% tax
})

const total = computed(() => {
  return cartStore.totalPrice + shippingCost.value + tax.value
})

const submitOrder = async () => {
  isProcessing.value = true
  
  try {
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear cart
    cartStore.clearCart()
    
    // Redirect to success page
    await navigateTo('/order-success')
  } catch {
    alert('Failed to place order. Please try again.')
  } finally {
    isProcessing.value = false
  }
}

// Set page title
useHead({
  title: 'Checkout - PulseTunez'
})
</script>
