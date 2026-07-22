<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Unattended Orders</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Orders that are still pending and haven't been processed yet.</p>
      </div>
      <NuxtLink to="/admin/orders" class="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2" />
        All Orders
      </NuxtLink>
    </div>

    <div v-if="ordersStore.unattendedOrders.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow p-10 text-center">
      <Icon name="heroicons:check-badge" class="w-12 h-12 text-green-500 mx-auto mb-3" />
      <p class="text-gray-600 dark:text-gray-300">All caught up! No unattended orders right now.</p>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID / Product</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Placed</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="order in ordersStore.unattendedOrders" :key="order.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm font-medium text-gray-900 dark:text-white block font-mono">#{{ order.id }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ order.items.map(i => i.name).join(', ') }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ order.contact?.firstName }} {{ order.contact?.lastName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ timeSince(order.createdAt) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              ${{ order.total.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <button @click="ordersStore.updateStatus(order.id, 'processing')" class="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700">
                Mark Processing
              </button>
              <button @click="ordersStore.cancelOrder(order.id)" class="px-3 py-1.5 rounded-md border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-50 dark:hover:bg-red-900/20">
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useOrdersStore } from '~/stores/orders'

definePageMeta({
  adminTitle: 'Unattended Orders'
})

const ordersStore = useOrdersStore()

onMounted(() => {
  ordersStore.loadFromLocalStorage()
})

const timeSince = (dateString) => {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000)
  const intervals = [
    { label: 'day', secs: 86400 },
    { label: 'hour', secs: 3600 },
    { label: 'minute', secs: 60 }
  ]
  for (const { label, secs } of intervals) {
    const count = Math.floor(seconds / secs)
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`
  }
  return 'just now'
}
</script>
