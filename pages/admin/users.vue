<template>
  <div>
    <div class="flex justify-end mb-6">
      <button
        @click="exportUsers"
        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
      >
        <Icon name="heroicons:arrow-down-tray" class="w-5 h-5 mr-2" />
        Export
      </button>
    </div>
        <!-- User Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Icon name="heroicons:users" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ userStats.total }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Icon name="heroicons:check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ userStats.active }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Icon name="heroicons:clock" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">New This Month</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ userStats.newThisMonth }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <Icon name="heroicons:x-circle" class="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Inactive</h3>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ userStats.inactive }}</p>
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
                  placeholder="Search users..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
              <select
                v-model="selectedRole"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Joined
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Active
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="user in filteredUsers" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <Icon name="heroicons:user" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs rounded-full" :class="getRoleClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(user.status)">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ formatDate(user.joinedDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ formatDate(user.lastActive) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="viewUserDetails(user)"
                    class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-2"
                  >
                    <Icon name="heroicons:eye" class="w-5 h-5" />
                  </button>
                  <button
                    @click="toggleUserStatus(user)"
                    class="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 mr-2"
                  >
                    <Icon :name="user.status === 'active' ? 'heroicons:pause' : 'heroicons:play'" class="w-5 h-5" />
                  </button>
                  <button
                    @click="deleteUser(user.id)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- User Details Modal -->
        <div v-if="showUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Details</h2>
            
            <div v-if="selectedUser" class="space-y-6">
              <div class="flex items-center">
                <div class="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:user" class="w-10 h-10 text-gray-500 dark:text-gray-400" />
                </div>
                <div class="ml-6">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedUser.name }}</h3>
                  <p class="text-gray-500 dark:text-gray-400">{{ selectedUser.email }}</p>
                  <div class="flex items-center space-x-4 mt-2">
                    <span class="px-2 py-1 text-xs rounded-full" :class="getRoleClass(selectedUser.role)">
                      {{ selectedUser.role }}
                    </span>
                    <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(selectedUser.status)">
                      {{ selectedUser.status }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</h4>
                  <p class="text-gray-900 dark:text-white">{{ formatDate(selectedUser.joinedDate) }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Last Active</h4>
                  <p class="text-gray-900 dark:text-white">{{ formatDate(selectedUser.lastActive) }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</h4>
                  <p class="text-gray-900 dark:text-white">{{ selectedUser.totalOrders }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</h4>
                  <p class="text-gray-900 dark:text-white">${{ selectedUser.totalSpent }}</p>
                </div>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recent Activity</h4>
                <div class="space-y-2">
                  <div v-for="activity in selectedUser.recentActivity" :key="activity.id" class="flex items-center justify-between text-sm">
                    <span class="text-gray-700 dark:text-gray-300">{{ activity.action }}</span>
                    <span class="text-gray-500 dark:text-gray-400">{{ formatDate(activity.date) }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end mt-6">
              <button
                @click="closeUserModal"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
  </div>
</template>

<script setup>
definePageMeta({
  adminTitle: 'User Management'
})

// Mock data - in real app, this would come from API
const users = ref([
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'user', 
    status: 'active', 
    joinedDate: '2024-01-15', 
    lastActive: '2024-01-20',
    totalOrders: 5,
    totalSpent: 1299.99,
    recentActivity: [
      { id: 1, action: 'Purchased Premium Headphones', date: '2024-01-20' },
      { id: 2, action: 'Updated profile', date: '2024-01-18' }
    ]
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'user', 
    status: 'active', 
    joinedDate: '2024-01-10', 
    lastActive: '2024-01-19',
    totalOrders: 3,
    totalSpent: 599.99,
    recentActivity: [
      { id: 1, action: 'Purchased Wireless Microphone', date: '2024-01-19' },
      { id: 2, action: 'Left review', date: '2024-01-17' }
    ]
  },
  { 
    id: 3, 
    name: 'Bob Johnson', 
    email: 'bob@example.com', 
    role: 'admin', 
    status: 'active', 
    joinedDate: '2023-12-01', 
    lastActive: '2024-01-20',
    totalOrders: 12,
    totalSpent: 3456.78,
    recentActivity: [
      { id: 1, action: 'Added new product', date: '2024-01-20' },
      { id: 2, action: 'Updated user settings', date: '2024-01-19' }
    ]
  },
  { 
    id: 4, 
    name: 'Alice Brown', 
    email: 'alice@example.com', 
    role: 'user', 
    status: 'inactive', 
    joinedDate: '2024-01-05', 
    lastActive: '2024-01-10',
    totalOrders: 1,
    totalSpent: 299.99,
    recentActivity: [
      { id: 1, action: 'Purchased Electric Guitar', date: '2024-01-10' }
    ]
  },
  { 
    id: 5, 
    name: 'Charlie Wilson', 
    email: 'charlie@example.com', 
    role: 'moderator', 
    status: 'banned', 
    joinedDate: '2023-11-15', 
    lastActive: '2024-01-01',
    totalOrders: 0,
    totalSpent: 0,
    recentActivity: []
  }
])

const searchQuery = ref('')
const selectedStatus = ref('')
const selectedRole = ref('')
const showUserModal = ref(false)
const selectedUser = ref(null)

// Computed filtered users
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !selectedStatus.value || user.status === selectedStatus.value
    const matchesRole = !selectedRole.value || user.role === selectedRole.value
    return matchesSearch && matchesStatus && matchesRole
  })
})

// Computed user stats
const userStats = computed(() => ({
  total: users.value.length,
  active: users.value.filter(u => u.status === 'active').length,
  inactive: users.value.filter(u => u.status === 'inactive').length,
  newThisMonth: users.value.filter(u => {
    const joinedDate = new Date(u.joinedDate)
    const thisMonth = new Date()
    return joinedDate.getMonth() === thisMonth.getMonth() && joinedDate.getFullYear() === thisMonth.getFullYear()
  }).length
}))

// Methods
const getRoleClass = (role) => {
  const classes = {
    admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    moderator: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    user: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    inactive: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    banned: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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

const viewUserDetails = (user) => {
  selectedUser.value = user
  showUserModal.value = true
}

const closeUserModal = () => {
  showUserModal.value = false
  selectedUser.value = null
}

const toggleUserStatus = (user) => {
  const newStatus = user.status === 'active' ? 'inactive' : 'active'
  user.status = newStatus
  // In real app, this would make an API call
  console.log(`User ${user.id} status changed to ${newStatus}`)
}

const deleteUser = (userId) => {
  const index = users.value.findIndex(u => u.id === userId)
  if (index > -1) {
    users.value.splice(index, 1)
    // In real app, this would make an API call
    console.log(`User ${userId} deleted`)
  }
}

const exportUsers = () => {
  // In real app, this would generate and download a CSV/Excel file
  const csvContent = users.value.map(user => 
    `${user.name},${user.email},${user.role},${user.status},${user.joinedDate}`
  ).join('\n')
  
  const blob = new Blob([`Name,Email,Role,Status,Joined Date\n${csvContent}`], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'users.csv'
  a.click()
  window.URL.revokeObjectURL(url)
  
  console.log('Users exported')
}
</script>
