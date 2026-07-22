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
        <!-- Checkout Stages -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Stepper -->
          <div class="surface-card p-6">
            <div class="flex items-center justify-between">
              <div
                v-for="(step, index) in steps"
                :key="step.key"
                class="flex-1 flex items-center"
              >
                <div class="flex flex-col items-center flex-1">
                  <div
                    class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors"
                    :class="currentStep > index + 1
                      ? 'bg-green-600 text-white'
                      : currentStep === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'"
                  >
                    <Icon v-if="currentStep > index + 1" name="heroicons:check" class="w-5 h-5" />
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <span
                    class="mt-2 text-xs font-medium text-center"
                    :class="currentStep === index + 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'"
                  >
                    {{ step.label }}
                  </span>
                </div>
                <div
                  v-if="index < steps.length - 1"
                  class="h-0.5 flex-1 mx-2 -mt-5"
                  :class="currentStep > index + 1 ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'"
                ></div>
              </div>
            </div>
          </div>

          <!-- Step 1: Contact Information -->
          <div v-if="currentStep === 1" class="surface-card p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Contact Information</h2>

            <!-- Saved contact (fixed view) -->
            <div v-if="hasSavedContact && !editingContact" class="mb-4">
              <div class="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/40">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ contactForm.firstName }} {{ contactForm.lastName }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ contactForm.email }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ contactForm.phone }}</p>
                </div>
                <button type="button" @click="editingContact = true" class="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  Edit
                </button>
              </div>
            </div>

            <!-- Contact form (new or editing) -->
            <form v-else class="space-y-4" @submit.prevent="saveContactAndContinue">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">First Name</label>
                  <input v-model="contactForm.firstName" type="text" required class="form-input">
                </div>
                <div>
                  <label class="form-label">Last Name</label>
                  <input v-model="contactForm.lastName" type="text" required class="form-input">
                </div>
              </div>

              <div>
                <label class="form-label">Email</label>
                <input
                  v-model="contactForm.email"
                  type="email"
                  required
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div>
                <label class="form-label">Phone</label>
                <input
                  v-model="contactForm.phone"
                  type="tel"
                  required
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
              </div>
            </form>

            <!-- Gift option -->
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <label class="flex items-center space-x-3 cursor-pointer">
                <input v-model="isGift" type="checkbox" class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
                <span class="text-sm font-medium text-gray-900 dark:text-white">This order is for someone else</span>
              </label>
              <div v-if="isGift" class="mt-3">
                <label class="form-label">Recipient's Name</label>
                <input
                  v-model="recipientName"
                  type="text"
                  required
                  placeholder="Who is this order for?"
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">The recipient's name will be recorded as the owner of this order.</p>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                type="button"
                @click="goToStep(2, saveContactAndContinue)"
                class="btn-primary"
                :disabled="!contactValid"
              >
                Continue to Address
              </button>
            </div>
          </div>

          <!-- Step 2: Shipping Address -->
          <div v-if="currentStep === 2" class="surface-card p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Shipping Address</h2>

            <!-- Saved address (fixed view) -->
            <div v-if="hasSavedAddress && !editingAddress" class="mb-4">
              <div class="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/40">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ addressForm.label || 'Shipping Address' }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ addressForm.street }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ addressForm.localGovernment }}, {{ addressForm.state }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ addressForm.country }} {{ addressForm.postalCode }}</p>
                </div>
                <button type="button" @click="editingAddress = true" class="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  Edit
                </button>
              </div>
            </div>

            <!-- Address form (new or editing) -->
            <form v-else class="space-y-4" @submit.prevent="saveAddressAndContinue">
              <div>
                <label class="form-label">Address Label</label>
                <input v-model="addressForm.label" type="text" placeholder="Home, Office, etc." class="form-input">
              </div>
              <div>
                <label class="form-label">Street Address</label>
                <input
                  v-model="addressForm.street"
                  type="text"
                  required
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Local Government / City</label>
                  <input
                    v-model="addressForm.localGovernment"
                    type="text"
                    required
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                </div>
                <div>
                  <label class="form-label">State</label>
                  <input
                    v-model="addressForm.state"
                    type="text"
                    required
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Country</label>
                  <input
                    v-model="addressForm.country"
                    type="text"
                    required
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                </div>
                <div>
                  <label class="form-label">Postal Code</label>
                  <input
                    v-model="addressForm.postalCode"
                    type="text"
                    required
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                </div>
              </div>
            </form>

            <div class="flex justify-between mt-6">
              <button type="button" @click="currentStep = 1" class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Back
              </button>
              <button
                type="button"
                @click="goToStep(3, saveAddressAndContinue)"
                class="btn-primary"
                :disabled="!addressValid"
              >
                Continue to Payment
              </button>
            </div>
          </div>

          <!-- Step 3: Payment Method -->
          <div v-if="currentStep === 3" class="surface-card p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Payment Method</h2>
            <div class="space-y-3">
              <label class="flex items-center space-x-3 cursor-pointer">
                <input v-model="paymentMethod" type="radio" value="card" class="text-blue-600">
                <span class="text-gray-900 dark:text-gray-100">Credit/Debit Card</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input v-model="paymentMethod" type="radio" value="transfer" class="text-blue-600">
                <span class="text-gray-900 dark:text-gray-100">Bank Transfer</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input v-model="paymentMethod" type="radio" value="cod" class="text-blue-600">
                <span class="text-gray-900 dark:text-gray-100">Cash on Delivery</span>
              </label>
            </div>

            <!-- Card Payment Gateway Form -->
            <div v-if="paymentMethod === 'card'" class="mt-4 space-y-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40">
              <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Icon name="heroicons:lock-closed" class="w-4 h-4 mr-1.5" />
                Secure payment gateway
              </div>
              <div>
                <label class="form-label">Card Number</label>
                <div class="relative">
                  <input
                    :value="cardDetails.cardNumber"
                    @input="onCardNumberInput"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxlength="23"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-16 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                  <span
                    v-if="cardType"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold uppercase px-2 py-1 rounded"
                    :class="cardTypeBadgeClass"
                  >
                    {{ cardType }}
                  </span>
                </div>
                <p v-if="cardDetails.cardNumber && !cardNumberValid" class="text-xs text-red-500 mt-1">
                  Enter a valid card number.
                </p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Expiry Date</label>
                  <input
                    v-model="cardDetails.expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    maxlength="5"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                  <p v-if="cardDetails.expiryDate && !expiryValid" class="text-xs text-red-500 mt-1">
                    Invalid or expired date.
                  </p>
                </div>
                <div>
                  <label class="form-label">CVV</label>
                  <input
                    v-model="cardDetails.cvv"
                    type="text"
                    :placeholder="cardType === 'amex' ? '1234' : '123'"
                    :maxlength="cardType === 'amex' ? 4 : 3"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                  <p v-if="cardDetails.cvv && !cvvValid" class="text-xs text-red-500 mt-1">
                    Invalid CVV.
                  </p>
                </div>
              </div>
            </div>

            <div class="flex justify-between mt-6">
              <button type="button" @click="currentStep = 2" class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Back
              </button>
              <button
                type="button"
                @click="submitOrder"
                class="btn-primary"
                :disabled="isProcessing || !paymentValid"
              >
                <Icon v-if="isProcessing" name="heroicons:arrow-path" class="w-5 h-5 inline mr-2 animate-spin" />
                {{ isProcessing ? 'Processing Payment...' : 'Place Order' }}
              </button>
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
import { useAuthStore } from '~/stores/auth'
import { useOrdersStore } from '~/stores/orders'

definePageMeta({
  middleware: 'auth'
})

const cartStore = useCartStore()
const authStore = useAuthStore()
const ordersStore = useOrdersStore()
const isProcessing = ref(false)

const steps = [
  { key: 'contact', label: 'Contact' },
  { key: 'address', label: 'Address' },
  { key: 'payment', label: 'Payment' }
]
const currentStep = ref(1)

// --- Step 1: Contact ---
const hasSavedContact = ref(false)
const editingContact = ref(false)
const contactForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})
const isGift = ref(false)
const recipientName = ref('')

// --- Step 2: Address ---
const hasSavedAddress = ref(false)
const editingAddress = ref(false)
const addressForm = ref({
  label: '',
  street: '',
  localGovernment: '',
  state: '',
  country: '',
  postalCode: '',
  isDefault: true
})

// --- Step 3: Payment ---
const paymentMethod = ref('card')
const cardDetails = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

// --- Validation ---
const contactValid = computed(() => {
  const c = contactForm.value
  const baseValid = isValidName(c.firstName) && isValidName(c.lastName) && isValidEmail(c.email) && isValidPhone(c.phone)
  if (!baseValid) return false
  if (isGift.value) return isNonEmpty(recipientName.value)
  return true
})

const addressValid = computed(() => {
  const a = addressForm.value
  return isNonEmpty(a.street) && isNonEmpty(a.localGovernment) && isNonEmpty(a.state) && isNonEmpty(a.country) && isValidPostalCode(a.postalCode)
})

const cardType = computed(() => detectCardType(cardDetails.value.cardNumber))
const cardNumberValid = computed(() => isValidCardNumber(cardDetails.value.cardNumber))
const expiryValid = computed(() => isValidExpiryDate(cardDetails.value.expiryDate))
const cvvValid = computed(() => isValidCVV(cardDetails.value.cvv, cardType.value))

const cardTypeBadgeClass = computed(() => {
  const classes = {
    visa: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    mastercard: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    amex: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
    discover: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
  }
  return classes[cardType.value] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
})

const paymentValid = computed(() => {
  if (paymentMethod.value !== 'card') return true
  return cardNumberValid.value && expiryValid.value && cvvValid.value
})

const onCardNumberInput = (event) => {
  cardDetails.value.cardNumber = formatCardNumber(event.target.value)
}

const shippingCost = computed(() => {
  return cartStore.totalPrice >= 100 ? 0 : 10
})

const tax = computed(() => {
  return cartStore.totalPrice * 0.08 // 8% tax
})

const total = computed(() => {
  return cartStore.totalPrice + shippingCost.value + tax.value
})

const goToStep = (step, beforeSave) => {
  if (beforeSave) beforeSave()
  currentStep.value = step
}

const saveContactAndContinue = () => {
  if (!contactValid.value) return

  localStorage.setItem('checkoutContact', JSON.stringify(contactForm.value))
  hasSavedContact.value = true
  editingContact.value = false
}

const saveAddressAndContinue = () => {
  if (!addressValid.value) return

  const saved = localStorage.getItem('shippingAddresses')
  let addresses = saved ? JSON.parse(saved) : []

  if (editingAddress.value && addresses.length > 0) {
    const defaultIndex = addresses.findIndex(a => a.isDefault) 
    const index = defaultIndex > -1 ? defaultIndex : 0
    addresses[index] = { ...addresses[index], ...addressForm.value }
  } else if (addresses.length === 0) {
    addresses.push({ ...addressForm.value, isDefault: true })
  }

  localStorage.setItem('shippingAddresses', JSON.stringify(addresses))
  hasSavedAddress.value = true
  editingAddress.value = false
}

const submitOrder = async () => {
  isProcessing.value = true

  try {
    // Simulate payment gateway processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    const order = ordersStore.createOrder({
      userEmail: authStore.user?.email || contactForm.value.email,
      items: cartStore.items.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      })),
      contact: { ...contactForm.value },
      isGift: isGift.value,
      recipientName: recipientName.value,
      address: { ...addressForm.value },
      paymentMethod: paymentMethod.value,
      subtotal: cartStore.totalPrice,
      shipping: shippingCost.value,
      tax: tax.value,
      total: total.value
    })

    // Clear cart
    cartStore.clearCart()

    // Redirect to the receipt page for this order
    await navigateTo(`/receipt/${order.id}`)
  } catch {
    alert('Failed to place order. Please try again.')
  } finally {
    isProcessing.value = false
  }
}

onMounted(() => {
  // Prefill contact info from a previously saved checkout contact, else from the auth user
  const savedContact = localStorage.getItem('checkoutContact')
  if (savedContact) {
    contactForm.value = JSON.parse(savedContact)
    hasSavedContact.value = true
  } else if (authStore.user) {
    const [firstName, ...rest] = (authStore.user.name || '').split(' ')
    contactForm.value.firstName = firstName || ''
    contactForm.value.lastName = rest.join(' ') || ''
    contactForm.value.email = authStore.user.email || ''
  }

  // Prefill address from saved default shipping address
  const savedAddresses = localStorage.getItem('shippingAddresses')
  if (savedAddresses) {
    const addresses = JSON.parse(savedAddresses)
    const defaultAddress = addresses.find(a => a.isDefault) || addresses[0]
    if (defaultAddress) {
      addressForm.value = { ...addressForm.value, ...defaultAddress }
      hasSavedAddress.value = true
    }
  }
})

// Set page title
useHead({
  title: 'Checkout - PulseTunez'
})
</script>
