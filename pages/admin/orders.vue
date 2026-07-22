<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <NuxtLink
        to="/admin/unattended-orders"
        class="inline-flex items-center px-4 py-2 rounded-lg border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors"
      >
        <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 mr-2" />
        Unattended Orders
        <span v-if="ordersStore.unattendedOrders.length" class="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-500 text-white">{{ ordersStore.unattendedOrders.length }}</span>
      </NuxtLink>
      <button
        @click="exportOrders"
        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
      >
        <Icon name="heroicons:arrow-down-tray" class="w-5 h-5 mr-2" />
        Export
      </button>
    </div>
        <!-- Order Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Icon name="heroicons:shopping-bag" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ orderStats.total }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Icon name="heroicons:check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Delivered</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ orderStats.delivered }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Icon name="heroicons:clock" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ orderStats.pending }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Icon name="heroicons:currency-dollar" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">${{ orderStats.revenue }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and Search -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="flex-1">
              <div class="relative">
                <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by order ID or product name..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div class="flex items-center gap-4 flex-wrap">
              <select
                v-model="selectedStatus"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                v-model="selectedPeriod"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <select
                v-model="sortOrder"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Orders Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Order ID / Product
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date &amp; Time
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="order in filteredOrders" :key="order.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium text-gray-900 dark:text-white block font-mono">#{{ order.id }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ productNames(order) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <Icon name="heroicons:user" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ order.contact?.firstName }} {{ order.contact?.lastName }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ order.contact?.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ formatDate(order.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  ${{ order.total.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(order.status)">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="viewOrderDetails(order)"
                    class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-2"
                    title="View details"
                  >
                    <Icon name="heroicons:eye" class="w-5 h-5" />
                  </button>
                  <button
                    @click="openStatusEditor(order)"
                    class="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 mr-2"
                    title="Edit / update status"
                  >
                    <Icon name="heroicons:pencil" class="w-5 h-5" />
                  </button>
                  <button
                    v-if="order.status !== 'cancelled'"
                    @click="cancelOrder(order.id)"
                    class="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300 mr-2"
                    title="Cancel order"
                  >
                    <Icon name="heroicons:x-circle" class="w-5 h-5" />
                  </button>
                  <button
                    @click="deleteOrder(order.id)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    title="Delete order"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </td>
              </tr>
              <tr v-if="filteredOrders.length === 0">
                <td colspan="6" class="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                  No orders match your filters.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Order Details Modal -->
        <div v-if="showOrderModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Details</h2>
            
            <div v-if="selectedOrder" class="space-y-6">
              <!-- Order Header -->
              <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 font-mono">Order #{{ selectedOrder.id }}</p>
                    <p class="text-lg font-medium text-gray-900 dark:text-white">{{ formatDate(selectedOrder.createdAt) }}</p>
                  </div>
                  <span class="px-3 py-1 text-sm rounded-full" :class="getStatusClass(selectedOrder.status)">
                    {{ selectedOrder.status }}
                  </span>
                </div>
              </div>
              
              <!-- Customer Info -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Customer Information</h3>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Name</p>
                      <p class="text-gray-900 dark:text-white">{{ selectedOrder.contact?.firstName }} {{ selectedOrder.contact?.lastName }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p class="text-gray-900 dark:text-white">{{ selectedOrder.contact?.email }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p class="text-gray-900 dark:text-white">{{ selectedOrder.contact?.phone }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Address</p>
                      <p class="text-gray-900 dark:text-white">{{ selectedOrder.address?.street }}, {{ selectedOrder.address?.localGovernment }}, {{ selectedOrder.address?.state }}</p>
                    </div>
                    <div v-if="selectedOrder.isGift">
                      <p class="text-sm text-gray-500 dark:text-gray-400">Gift Recipient</p>
                      <p class="text-gray-900 dark:text-white">{{ selectedOrder.recipientName }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Order Items -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Items</h3>
                <div class="space-y-4">
                  <div v-for="item in selectedOrder.items" :key="item.id" class="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div class="flex items-center">
                      <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded object-cover" />
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ item.name }}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">ID: {{ item.id }} &middot; Qty: {{ item.quantity }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">${{ item.price }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">${{ (item.price * item.quantity).toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Order Summary -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Summary</h3>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span class="text-gray-900 dark:text-white">${{ selectedOrder.subtotal.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span class="text-gray-900 dark:text-white">${{ selectedOrder.shipping.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Tax</span>
                      <span class="text-gray-900 dark:text-white">${{ selectedOrder.tax.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between font-bold text-lg">
                      <span class="text-gray-900 dark:text-white">Total</span>
                      <span class="text-gray-900 dark:text-white">${{ selectedOrder.total.toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-4 mt-6">
              <button
                @click="closeOrderModal"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Close
              </button>
              <button
                @click="openStatusEditor(selectedOrder); closeOrderModal()"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>

        <!-- Status Editor Modal -->
        <div v-if="editingOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-1">Update Order Status</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 font-mono">#{{ editingOrder.id }}</p>

            <div class="space-y-2 mb-6">
              <label
                v-for="status in ['pending', 'processing', 'shipped', 'delivered', 'cancelled']"
                :key="status"
                class="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer"
                :class="newStatus === status ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600'"
              >
                <input v-model="newStatus" type="radio" :value="status" class="text-blue-600">
                <span class="capitalize text-gray-900 dark:text-white">{{ status }}</span>
              </label>
            </div>

            <div class="flex justify-end space-x-3">
              <button @click="editingOrder = null" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button @click="applyStatusUpdate" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
  </div>
</template>

<script setup>
import { useOrdersStore } from '~/stores/orders'

definePageMeta({
  adminTitle: 'Order Management'
})

const ordersStore = useOrdersStore()

onMounted(() => {
  ordersStore.loadFromLocalStorage()
})

const searchQuery = ref('')
const selectedStatus = ref('')
const selectedPeriod = ref('')
const sortOrder = ref('newest')
const showOrderModal = ref(false)
const selectedOrder = ref(null)
const editingOrder = ref(null)
const newStatus = ref('pending')

const productNames = (order) => order.items.map(i => i.name).join(', ')

// Computed filtered orders
const filteredOrders = computed(() => {
  let list = ordersStore.orders.filter(order => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch = !q ||
      order.id.toLowerCase().includes(q) ||
      order.items.some(i => i.name.toLowerCase().includes(q))
    const matchesStatus = !selectedStatus.value || order.status === selectedStatus.value
    const matchesPeriod = !selectedPeriod.value || checkPeriod(order.createdAt, selectedPeriod.value)
    return matchesSearch && matchesStatus && matchesPeriod
  })

  list = [...list].sort((a, b) => {
    const diff = new Date(b.createdAt) - new Date(a.createdAt)
    return sortOrder.value === 'newest' ? diff : -diff
  })

  return list
})

// Computed order stats
const orderStats = computed(() => ordersStore.orderStats)

// Methods
const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const checkPeriod = (dateString, period) => {
  const date = new Date(dateString)
  const today = new Date()
  
  switch (period) {
    case 'today':
      return date.toDateString() === today.toDateString()
    case 'week': {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      return date >= weekAgo
    }
    case 'month':
      return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
    default:
      return true
  }
}

const viewOrderDetails = (order) => {
  selectedOrder.value = order
  showOrderModal.value = true
}

const closeOrderModal = () => {
  showOrderModal.value = false
  selectedOrder.value = null
}

const openStatusEditor = (order) => {
  editingOrder.value = order
  newStatus.value = order.status
}

const applyStatusUpdate = () => {
  if (!editingOrder.value) return
  ordersStore.updateStatus(editingOrder.value.id, newStatus.value)
  editingOrder.value = null
}

const cancelOrder = (orderId) => {
  if (confirm('Cancel this order?')) {
    ordersStore.cancelOrder(orderId)
  }
}

const deleteOrder = (orderId) => {
  if (confirm('Permanently delete this order?')) {
    ordersStore.deleteOrder(orderId)
  }
}

const exportOrders = () => {
  const csvContent = ordersStore.orders.map(order =>
    `${order.id},${order.contact?.firstName || ''} ${order.contact?.lastName || ''},${order.contact?.email || ''},${order.createdAt},${order.total},${order.status}`
  ).join('\n')

  const blob = new Blob([`Order ID,Customer Name,Email,Date,Amount,Status\n${csvContent}`], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'orders.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}
</script>
