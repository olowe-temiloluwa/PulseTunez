<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/settings" class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4">
          <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2" />
          Back to Settings
        </NuxtLink>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Order History</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">Review products you've purchased before</p>
      </div>

      <!-- Empty state -->
      <div v-if="orders.length === 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 border border-gray-200 dark:border-gray-700 text-center">
        <Icon name="heroicons:shopping-bag" class="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p class="text-gray-500 dark:text-gray-400 mb-4">You haven't placed any orders yet.</p>
        <NuxtLink to="/" class="btn-primary">Start Shopping</NuxtLink>
      </div>

      <!-- Orders list -->
      <div v-else class="space-y-4">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-mono text-sm font-semibold text-gray-900 dark:text-white">#{{ order.id }}</span>
                <span class="px-2 py-0.5 text-xs rounded-full" :class="statusClass(order.status)">{{ order.status }}</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(order.createdAt) }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {{ order.items.map(i => i.name).join(', ') }}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <span class="font-semibold text-gray-900 dark:text-white">${{ order.total.toFixed(2) }}</span>
              <NuxtLink :to="`/track-order/${order.id}`" class="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Track order">
                <Icon name="heroicons:truck" class="w-5 h-5" />
              </NuxtLink>
              <NuxtLink :to="`/receipt/${order.id}`" class="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="View receipt">
                <Icon name="heroicons:eye" class="w-5 h-5" />
              </NuxtLink>
              <button @click="downloadReceipt(order)" class="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Download receipt">
                <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useOrdersStore } from '~/stores/orders'

const authStore = useAuthStore()
const ordersStore = useOrdersStore()
const orders = ref([])

onMounted(() => {
  authStore.initializeAuth()
  ordersStore.loadFromLocalStorage()
  orders.value = ordersStore.getOrdersByEmail(authStore.user?.email)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const statusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const downloadReceipt = (order) => {
  const lines = [
    'PULSETUNEZ',
    'Premium Audio & Music Equipment',
    '--------------------------------',
    `Receipt #${order.id}`,
    `Date: ${formatDate(order.createdAt)}`,
    '',
    'Items:',
    ...order.items.map(i => `  ${i.name} (ID: ${i.id}) x${i.quantity} - $${(i.price * i.quantity).toFixed(2)}`),
    '',
    `Total Paid: $${order.total.toFixed(2)}`,
    '--------------------------------',
    'Thank you for shopping with PulseTunez.'
  ]

  const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `receipt-${order.id}.txt`
  a.click()
  window.URL.revokeObjectURL(url)
}

useHead({
  title: 'Order History - PulseTunez'
})
</script>
