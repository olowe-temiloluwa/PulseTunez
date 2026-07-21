<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Not found -->
      <div v-if="!order" class="surface-card p-10 text-center">
        <Icon name="heroicons:document-magnifying-glass" class="w-14 h-14 text-gray-400 mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Order not found</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-6">We couldn't find an order matching this ID.</p>
        <NuxtLink to="/" class="btn-primary">Back to Home</NuxtLink>
      </div>

      <template v-else>
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Track Order</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 font-mono">#{{ order.id }}</p>
          </div>
          <NuxtLink :to="`/receipt/${order.id}`" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
            <Icon name="heroicons:receipt-percent" class="w-4 h-4 inline mr-1.5" />
            View Receipt
          </NuxtLink>
        </div>

        <!-- Cancelled banner -->
        <div v-if="order.status === 'cancelled'" class="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center">
          <Icon name="heroicons:x-circle" class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
          <span class="text-red-700 dark:text-red-300 font-medium">This order has been cancelled.</span>
        </div>

        <!-- Tracking Timeline -->
        <div v-else class="surface-card p-6 mb-6">
          <div class="flex items-start">
            <div
              v-for="(stage, index) in stages"
              :key="stage.key"
              class="flex-1 flex flex-col items-center relative"
            >
              <div
                v-if="index > 0"
                class="absolute top-5 right-1/2 w-full h-0.5 -z-10"
                :class="stageIndex > index - 1 ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'"
              ></div>
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                :class="stageIndex > index
                  ? 'bg-green-600 text-white'
                  : stageIndex === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'"
              >
                <Icon :name="stage.icon" class="w-5 h-5" />
              </div>
              <span
                class="mt-2 text-xs font-medium text-center"
                :class="stageIndex >= index ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'"
              >
                {{ stage.label }}
              </span>
              <span v-if="stageDate(stage.key)" class="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                {{ stageDate(stage.key) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Order Details -->
        <div class="surface-card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h2>
          <div class="space-y-3 mb-6">
            <div v-for="item in order.items" :key="item.id" class="flex items-center space-x-3">
              <img :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ item.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Product ID: {{ item.id }} &middot; Qty: {{ item.quantity }}</p>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div class="flex justify-between text-gray-600 dark:text-gray-300 text-sm mb-1">
              <span>Shipping to</span>
              <span class="text-right">{{ order.address?.street }}, {{ order.address?.localGovernment }}</span>
            </div>
            <div v-if="order.isGift" class="flex justify-between text-gray-600 dark:text-gray-300 text-sm mb-1">
              <span>Order for</span>
              <span class="text-right">{{ order.recipientName }} (gift)</span>
            </div>
            <div class="flex justify-between text-lg font-bold text-gray-900 dark:text-white mt-2">
              <span>Total</span>
              <span>${{ order.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useOrdersStore } from '~/stores/orders'

const route = useRoute()
const ordersStore = useOrdersStore()
const order = ref(null)

const stages = [
  { key: 'pending', label: 'Pending', icon: 'heroicons:clock' },
  { key: 'processing', label: 'Order Received', icon: 'heroicons:check-circle' },
  { key: 'shipped', label: 'Shipped', icon: 'heroicons:truck' },
  { key: 'delivered', label: 'Delivered', icon: 'heroicons:home' }
]

const stageIndex = computed(() => {
  if (!order.value) return 0
  return stages.findIndex(s => s.key === order.value.status)
})

const stageDate = (key) => {
  if (!order.value) return null
  const entry = order.value.statusHistory?.find(h => h.status === key)
  if (!entry) return null
  return new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

onMounted(() => {
  ordersStore.loadFromLocalStorage()
  order.value = ordersStore.getOrderById(route.params.id)
})

useHead({
  title: 'Track Order - PulseTunez'
})
</script>
