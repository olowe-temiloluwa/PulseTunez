<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/settings" class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4">
          <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2" />
          Back to Settings
        </NuxtLink>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Payment Methods</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">Manage your payment methods for checkout</p>
      </div>

      <!-- Add New Payment Method -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
        <button
          @click="showAddForm = !showAddForm"
          class="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
        >
          <Icon name="heroicons:plus" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          <span class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">Add New Payment Method</span>
        </button>

        <!-- Add Payment Form -->
        <div v-if="showAddForm" class="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <form @submit.prevent="handleAddPayment" class="space-y-4">
            <!-- Card Type Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Type
              </label>
              <div class="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  @click="selectedCardType = 'visa'"
                  :class="[
                    'p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center',
                    selectedCardType === 'visa' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  ]"
                >
                  <div class="w-12 h-8 bg-blue-600 rounded mb-2 flex items-center justify-center">
                    <span class="text-white text-xs font-bold">VISA</span>
                  </div>
                  <span class="text-sm text-gray-700 dark:text-gray-300">Visa</span>
                </button>
                <button
                  type="button"
                  @click="selectedCardType = 'mastercard'"
                  :class="[
                    'p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center',
                    selectedCardType === 'mastercard' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  ]"
                >
                  <div class="w-12 h-8 bg-red-500 rounded mb-2 flex items-center justify-center">
                    <span class="text-white text-xs font-bold">MC</span>
                  </div>
                  <span class="text-sm text-gray-700 dark:text-gray-300">Mastercard</span>
                </button>
                <button
                  type="button"
                  @click="selectedCardType = 'amex'"
                  :class="[
                    'p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center',
                    selectedCardType === 'amex' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  ]"
                >
                  <div class="w-12 h-8 bg-blue-500 rounded mb-2 flex items-center justify-center">
                    <span class="text-white text-xs font-bold">AMEX</span>
                  </div>
                  <span class="text-sm text-gray-700 dark:text-gray-300">Amex</span>
                </button>
              </div>
            </div>

            <!-- Card Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Number
              </label>
              <input
                v-model="newCard.number"
                type="text"
                required
                placeholder="1234 5678 9012 3456"
                maxlength="19"
                @input="formatCardNumber"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
            </div>

            <!-- Cardholder Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cardholder Name
              </label>
              <input
                v-model="newCard.name"
                type="text"
                required
                placeholder="John Doe"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
            </div>

            <!-- Expiry and CVV -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiry Date
                </label>
                <input
                  v-model="newCard.expiry"
                  type="text"
                  required
                  placeholder="MM/YY"
                  maxlength="5"
                  @input="formatExpiry"
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CVV
                </label>
                <input
                  v-model="newCard.cvv"
                  type="text"
                  required
                  placeholder="123"
                  maxlength="4"
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                />
              </div>
            </div>

            <!-- Set as Default -->
            <div class="flex items-center">
              <input
                v-model="newCard.isDefault"
                type="checkbox"
                id="setDefault"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label for="setDefault" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Set as default payment method
              </label>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end gap-4">
              <button
                type="button"
                @click="showAddForm = false"
                class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isAdding"
                class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon v-if="isAdding" name="heroicons:arrow-path" class="w-5 h-5 mr-2 animate-spin inline" />
                {{ isAdding ? 'Adding...' : 'Add Card' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Saved Payment Methods -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Saved Payment Methods</h2>
        
        <div v-if="paymentMethods.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
          <Icon name="heroicons:credit-card" class="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No payment methods saved yet</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(card, index) in paymentMethods"
            :key="index"
            class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div class="flex items-center space-x-4">
              <!-- Card Icon -->
              <div class="w-12 h-8 rounded flex items-center justify-center" :class="getCardColor(card.type)">
                <span class="text-white text-xs font-bold">{{ getCardInitials(card.type) }}</span>
              </div>
              
              <!-- Card Info -->
              <div>
                <div class="flex items-center space-x-2">
                  <span class="font-medium text-gray-900 dark:text-white">{{ card.name }}</span>
                  <span v-if="card.isDefault" class="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">Default</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300">•••• •••• •••• {{ card.lastFour }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Expires {{ card.expiry }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center space-x-2">
              <button
                v-if="!card.isDefault"
                @click="setDefault(index)"
                class="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Set as default"
              >
                <Icon name="heroicons:star" class="w-5 h-5" />
              </button>
              <button
                @click="deleteCard(index)"
                class="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Remove card"
              >
                <Icon name="heroicons:trash" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showAddForm = ref(false)
const isAdding = ref(false)
const selectedCardType = ref('visa')

const newCard = ref({
  type: 'visa',
  number: '',
  name: '',
  expiry: '',
  cvv: '',
  isDefault: false
})

const paymentMethods = ref([])

onMounted(() => {
  // Load saved payment methods from localStorage
  const savedMethods = localStorage.getItem('paymentMethods')
  if (savedMethods) {
    paymentMethods.value = JSON.parse(savedMethods)
  }
})

const getCardColor = (type) => {
  const colors = {
    visa: 'bg-blue-600',
    mastercard: 'bg-red-500',
    amex: 'bg-blue-500'
  }
  return colors[type] || 'bg-gray-600'
}

const getCardInitials = (type) => {
  const initials = {
    visa: 'VISA',
    mastercard: 'MC',
    amex: 'AMEX'
  }
  return initials[type] || 'CARD'
}

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '')
  let formatted = value.match(/.{1,4}/g)?.join(' ') || value
  newCard.value.number = formatted
}

const formatExpiry = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2)
  }
  newCard.value.expiry = value
}

const handleAddPayment = async () => {
  isAdding.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Extract last four digits
    const lastFour = newCard.value.number.replace(/\s/g, '').slice(-4)
    
    // If setting as default, remove default from others
    if (newCard.value.isDefault) {
      paymentMethods.value.forEach(card => card.isDefault = false)
    }
    
    // Add new card
    paymentMethods.value.push({
      type: selectedCardType.value,
      number: newCard.value.number,
      name: newCard.value.name,
      expiry: newCard.value.expiry,
      lastFour: lastFour,
      isDefault: newCard.value.isDefault
    })
    
    // Save to localStorage
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods.value))
    
    // Reset form
    newCard.value = {
      type: 'visa',
      number: '',
      name: '',
      expiry: '',
      cvv: '',
      isDefault: false
    }
    selectedCardType.value = 'visa'
    showAddForm.value = false
    
    alert('Payment method added successfully!')
  } catch (error) {
    console.error('Error adding payment method:', error)
    alert('Error adding payment method. Please try again.')
  } finally {
    isAdding.value = false
  }
}

const setDefault = (index) => {
  paymentMethods.value.forEach((card, i) => {
    card.isDefault = i === index
  })
  localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods.value))
}

const deleteCard = (index) => {
  if (confirm('Are you sure you want to remove this payment method?')) {
    paymentMethods.value.splice(index, 1)
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods.value))
  }
}

// Set page meta
useHead({
  title: 'Payment Methods - PulseTunez'
})
</script>
