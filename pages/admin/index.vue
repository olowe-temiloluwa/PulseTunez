<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Admin Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <Icon name="heroicons:shield-check" class="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Icon name="heroicons:bell" class="w-5 h-5" />
            </button>
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Icon name="heroicons:user" class="w-5 h-5 text-white" />
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Admin</span>
            </div>
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
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
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
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Icon name="heroicons:users" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalUsers }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Icon name="heroicons:cube" class="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalProducts }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Icon name="heroicons:shopping-bag" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalOrders }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Icon name="heroicons:currency-dollar" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">${{ stats.totalRevenue }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Orders -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Icon name="heroicons:shopping-bag" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ order.customer }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ order.date }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">${{ order.amount }}</p>
                    <span class="text-xs px-2 py-1 rounded-full" :class="getStatusClass(order.status)">
                      {{ order.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Users -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Users</h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="user in recentUsers" :key="user.id" class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Icon name="heroicons:user" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button
                      @click="toggleUserStatus(user.id)"
                      class="p-1 rounded"
                      :class="user.active ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900' : 'text-red-600 hover:bg-red-100 dark:hover:bg-red-900'"
                    >
                      <Icon :name="user.active ? 'heroicons:check-circle' : 'heroicons:x-circle'" class="w-5 h-5" />
                    </button>
                    <button
                      @click="deleteUser(user.id)"
                      class="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                    >
                      <Icon name="heroicons:trash" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Website Activity -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Website Activity</h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ activity.visitors.today }}</div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Visitors Today</p>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ activity.visitors.thisWeek }}</div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Visitors This Week</p>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ activity.visitors.thisMonth }}</div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Visitors This Month</p>
              </div>
            </div>
            
            <!-- Sales by Section -->
            <div class="mt-8">
              <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">Sales by Section</h3>
              <div class="space-y-3">
                <div v-for="section in salesBySection" :key="section.name" class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full mr-3" :style="{ backgroundColor: section.color }"></div>
                    <span class="text-sm text-gray-700 dark:text-gray-300">{{ section.name }}</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                      <div class="h-2 rounded-full" :style="{ width: section.percentage + '%', backgroundColor: section.color }"></div>
                    </div>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">${{ section.sales }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// Mock data - in real app, this would come from API
const stats = ref({
  totalUsers: 1247,
  totalProducts: 156,
  totalOrders: 892,
  totalRevenue: 45678
})

const recentOrders = ref([
  { id: 1, customer: 'John Doe', date: '2024-01-15', amount: 299, status: 'completed' },
  { id: 2, customer: 'Jane Smith', date: '2024-01-15', amount: 149, status: 'processing' },
  { id: 3, customer: 'Bob Johnson', date: '2024-01-14', amount: 599, status: 'pending' },
  { id: 4, customer: 'Alice Brown', date: '2024-01-14', amount: 89, status: 'completed' }
])

const recentUsers = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: true },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', active: false },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', active: true }
])

const activity = ref({
  visitors: {
    today: 342,
    thisWeek: 2341,
    thisMonth: 8976
  }
})

const salesBySection = ref([
  { name: 'Audio Gadgets', sales: 12345, percentage: 75, color: '#3B82F6' },
  { name: 'Musical Instruments', sales: 8900, percentage: 55, color: '#8B5CF6' },
  { name: 'Studio Equipment', sales: 15600, percentage: 95, color: '#10B981' }
])

// Methods
const getStatusClass = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const toggleUserStatus = (userId) => {
  const user = recentUsers.value.find(u => u.id === userId)
  if (user) {
    user.active = !user.active
    // In real app, this would make an API call
    console.log(`User ${userId} status toggled to ${user.active}`)
  }
}

const deleteUser = (userId) => {
  const index = recentUsers.value.findIndex(u => u.id === userId)
  if (index > -1) {
    recentUsers.value.splice(index, 1)
    // In real app, this would make an API call
    console.log(`User ${userId} deleted`)
  }
}
</script>
