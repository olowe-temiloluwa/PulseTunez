<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Admin Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <Icon name="heroicons:shield-check" class="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">Order Management</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="exportOrders"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <Icon name="heroicons:arrow-down-tray" class="w-5 h-5 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen">
        <nav class="mt-8">
          <div class="px-4 space-y-2">
            <NuxtLink
              to="/admin"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:chart-bar" class="w-5 h-5 mr-3" />
              Dashboard
            </NuxtLink>
            <NuxtLink
              to="/admin/products"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:cube" class="w-5 h-5 mr-3" />
              Products
            </NuxtLink>
            <NuxtLink
              to="/admin/users"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:users" class="w-5 h-5 mr-3" />
              Users
            </NuxtLink>
            <NuxtLink
              to="/admin/analytics"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:chart-pie" class="w-5 h-5 mr-3" />
              Analytics
            </NuxtLink>
            <NuxtLink
              to="/admin/orders"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
            >
              <Icon name="heroicons:shopping-bag" class="w-5 h-5 mr-3" />
              Orders
            </NuxtLink>
            <NuxtLink
              to="/admin/settings"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 mr-3" />
              Settings
            </NuxtLink>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8">
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
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ orderStats.completed }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Icon name="heroicons:clock" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Processing</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ orderStats.processing }}</p>
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
                  placeholder="Search orders..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <select
                v-model="selectedStatus"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
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
            </div>
          </div>
        </div>

        <!-- Orders Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
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
                  <span class="text-sm font-medium text-gray-900 dark:text-white">#{{ order.id }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <Icon name="heroicons:user" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ order.customer.name }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ order.customer.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ formatDate(order.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  ${{ order.amount }}
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
                  >
                    <Icon name="heroicons:eye" class="w-5 h-5" />
                  </button>
                  <button
                    @click="updateOrderStatus(order)"
                    class="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 mr-2"
                  >
                    <Icon name="heroicons:pencil" class="w-5 h-5" />
                  </button>
                  <button
                    @click="deleteOrder(order.id)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
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
                    <p class="text-sm text-gray-500 dark:text-gray-400">Order #{{ selectedOrder.id }}</p>
                    <p class="text-lg font-medium text-gray-900 dark:text-white">{{ formatDate(selectedOrder.date) }}</p>
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
                      <p class="text-gray-900 dark:text-white">{{ selectedOrder.customer.name }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p class="text-gray-900 dark:text-white">{{ selectedOrder.customer.email }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p class="text-gray-900 dark:text-white">{{ selectedOrder.customer.phone }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Address</p>
                      <p class="text-gray-900 dark:text-white">{{ selectedOrder.customer.address }}</p>
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
                        <p class="text-sm text-gray-500 dark:text-gray-400">Qty: {{ item.quantity }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">${{ item.price }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">${{ item.price * item.quantity }}</p>
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
                      <span class="text-gray-900 dark:text-white">${{ selectedOrder.subtotal }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span class="text-gray-900 dark:text-white">${{ selectedOrder.shipping }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Tax</span>
                      <span class="text-gray-900 dark:text-white">${{ selectedOrder.tax }}</span>
                    </div>
                    <div class="flex justify-between font-bold text-lg">
                      <span class="text-gray-900 dark:text-white">Total</span>
                      <span class="text-gray-900 dark:text-white">${{ selectedOrder.amount }}</span>
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
                @click="updateOrderStatus(selectedOrder)"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// Mock data - in real app, this would come from API
const orders = ref([
  { 
    id: 1001, 
    customer: { 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '+1234567890', 
      address: '123 Main St, City, State 12345' 
    }, 
    date: '2024-01-20', 
    amount: 299.99, 
    status: 'completed',
    subtotal: 279.99,
    shipping: 10.00,
    tax: 10.00,
    items: [
      { id: 1, name: 'Premium Headphones', quantity: 1, price: 279.99, image: 'https://picsum.photos/seed/headphones/64/64' }
    ]
  },
  { 
    id: 1002, 
    customer: { 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      phone: '+1234567891', 
      address: '456 Oak Ave, City, State 12345' 
    }, 
    date: '2024-01-19', 
    amount: 149.99, 
    status: 'processing',
    subtotal: 139.99,
    shipping: 5.00,
    tax: 5.00,
    items: [
      { id: 1, name: 'Wireless Microphone', quantity: 1, price: 139.99, image: 'https://picsum.photos/seed/microphone/64/64' }
    ]
  },
  { 
    id: 1003, 
    customer: { 
      name: 'Bob Johnson', 
      email: 'bob@example.com', 
      phone: '+1234567892', 
      address: '789 Pine Rd, City, State 12345' 
    }, 
    date: '2024-01-18', 
    amount: 599.99, 
    status: 'pending',
    subtotal: 569.99,
    shipping: 15.00,
    tax: 15.00,
    items: [
      { id: 1, name: 'Electric Guitar', quantity: 1, price: 569.99, image: 'https://picsum.photos/seed/guitar/64/64' }
    ]
  },
  { 
    id: 1004, 
    customer: { 
      name: 'Alice Brown', 
      email: 'alice@example.com', 
      phone: '+1234567893', 
      address: '321 Elm St, City, State 12345' 
    }, 
    date: '2024-01-17', 
    amount: 899.99, 
    status: 'completed',
    subtotal: 849.99,
    shipping: 25.00,
    tax: 25.00,
    items: [
      { id: 1, name: 'Studio Monitor', quantity: 1, price: 849.99, image: 'https://picsum.photos/seed/monitor/64/64' }
    ]
  }
])

const searchQuery = ref('')
const selectedStatus = ref('')
const selectedPeriod = ref('')
const showOrderModal = ref(false)
const selectedOrder = ref(null)

// Computed filtered orders
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = order.id.toString().includes(searchQuery.value) || 
                         order.customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !selectedStatus.value || order.status === selectedStatus.value
    const matchesPeriod = !selectedPeriod.value || checkPeriod(order.date, selectedPeriod.value)
    return matchesSearch && matchesStatus && matchesPeriod
  })
})

// Computed order stats
const orderStats = computed(() => ({
  total: orders.value.length,
  completed: orders.value.filter(o => o.status === 'completed').length,
  processing: orders.value.filter(o => o.status === 'processing').length,
  revenue: orders.value.reduce((sum, order) => sum + order.amount, 0).toFixed(2)
}))

// Methods
const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const checkPeriod = (dateString, period) => {
  const date = new Date(dateString)
  const today = new Date()
  
  switch (period) {
    case 'today':
      return date.toDateString() === today.toDateString()
    case 'week':
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      return date >= weekAgo
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

const updateOrderStatus = (order) => {
  // In real app, this would show a status selection modal
  const statuses = ['pending', 'processing', 'completed', 'cancelled']
  const currentIndex = statuses.indexOf(order.status)
  const nextStatus = statuses[(currentIndex + 1) % statuses.length]
  
  order.status = nextStatus
  console.log(`Order ${order.id} status updated to ${nextStatus}`)
  
  if (showOrderModal.value) {
    closeOrderModal()
  }
}

const deleteOrder = (orderId) => {
  const index = orders.value.findIndex(o => o.id === orderId)
  if (index > -1) {
    orders.value.splice(index, 1)
    console.log(`Order ${orderId} deleted`)
  }
}

const exportOrders = () => {
  // In real app, this would generate and download a CSV/Excel file
  const csvContent = orders.value.map(order => 
    `${order.id},${order.customer.name},${order.customer.email},${order.date},${order.amount},${order.status}`
  ).join('\n')
  
  const blob = new Blob([`Order ID,Customer Name,Email,Date,Amount,Status\n${csvContent}`], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'orders.csv'
  a.click()
  window.URL.revokeObjectURL(url)
  
  console.log('Orders exported')
}
</script>
