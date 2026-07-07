<template>
  <div>
    <div class="flex justify-end mb-6">
      <select
        v-model="selectedPeriod"
        class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      >
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
        <option value="365">Last Year</option>
      </select>
    </div>
        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">${{ metrics.totalRevenue }}</p>
                <p class="text-sm text-green-600 dark:text-green-400">+12.5% from last period</p>
              </div>
              <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Icon name="heroicons:currency-dollar" class="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ metrics.totalOrders }}</p>
                <p class="text-sm text-green-600 dark:text-green-400">+8.2% from last period</p>
              </div>
              <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Icon name="heroicons:shopping-bag" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ metrics.activeUsers }}</p>
                <p class="text-sm text-green-600 dark:text-green-400">+15.3% from last period</p>
              </div>
              <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Icon name="heroicons:users" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ metrics.conversionRate }}%</p>
                <p class="text-sm text-red-600 dark:text-red-400">-2.1% from last period</p>
              </div>
              <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Icon name="heroicons:chart-bar" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Revenue Chart -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h2>
            <div class="h-64 flex items-end justify-between">
              <div v-for="(bar, index) in revenueChart" :key="index" class="flex flex-col items-center flex-1">
                <div 
                  class="w-full bg-blue-500 dark:bg-blue-400 rounded-t"
                  :style="{ height: bar.height + '%' }"
                ></div>
                <span class="text-xs text-gray-500 dark:text-gray-400 mt-2">{{ bar.label }}</span>
              </div>
            </div>
          </div>

          <!-- Sales by Category -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales by Category</h2>
            <div class="space-y-4">
              <div v-for="category in salesByCategory" :key="category.name" class="flex items-center justify-between">
                <div class="flex items-center flex-1">
                  <div class="w-3 h-3 rounded-full mr-3" :style="{ backgroundColor: category.color }"></div>
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ category.name }}</span>
                </div>
                <div class="flex items-center">
                  <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                    <div class="h-2 rounded-full" :style="{ width: category.percentage + '%', backgroundColor: category.color }"></div>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">${{ category.sales }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Website Traffic -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Website Traffic</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ traffic.visitors }}</div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Visitors</p>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ traffic.pageViews }}</div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Page Views</p>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ traffic.avgSession }}</div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Avg Session (min)</p>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ traffic.bounceRate }}%</div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Bounce Rate</p>
            </div>
          </div>
        </div>

        <!-- Top Products -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Selling Products</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Units Sold
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="product in topProducts" :key="product.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img :src="product.image" :alt="product.name" class="w-8 h-8 rounded object-cover" />
                      <div class="ml-3">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">{{ product.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ product.category }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ product.unitsSold }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${{ product.revenue }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- User Activity Heatmap -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Activity Heatmap</h2>
          <div class="grid grid-cols-7 gap-2">
            <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="text-center">
              <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ day }}</div>
              <div class="space-y-1">
                <div v-for="hour in 24" :key="hour" class="w-2 h-2 rounded" :class="getHeatmapColor(hour, day)"></div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script setup>
definePageMeta({
  adminTitle: 'Analytics Dashboard'
})

// Mock data - in real app, this would come from API
const selectedPeriod = ref('30')

const metrics = ref({
  totalRevenue: 45678,
  totalOrders: 892,
  activeUsers: 1247,
  conversionRate: 3.2
})

const revenueChart = ref([
  { label: 'Mon', height: 65 },
  { label: 'Tue', height: 80 },
  { label: 'Wed', height: 45 },
  { label: 'Thu', height: 90 },
  { label: 'Fri', height: 70 },
  { label: 'Sat', height: 85 },
  { label: 'Sun', height: 60 }
])

const salesByCategory = ref([
  { name: 'Audio Gadgets', sales: 12345, percentage: 75, color: '#3B82F6' },
  { name: 'Musical Instruments', sales: 8900, percentage: 55, color: '#8B5CF6' },
  { name: 'Studio Equipment', sales: 15600, percentage: 95, color: '#10B981' },
  { name: 'Accessories', sales: 4567, percentage: 28, color: '#F59E0B' }
])

const traffic = ref({
  visitors: 8976,
  pageViews: 45678,
  avgSession: 3.5,
  bounceRate: 32.5
})

const topProducts = ref([
  { id: 1, name: 'Premium Headphones', category: 'Audio Gadgets', unitsSold: 234, revenue: 70266, image: 'https://picsum.photos/seed/headphones/50/50' },
  { id: 2, name: 'Wireless Microphone', category: 'Audio Gadgets', unitsSold: 156, revenue: 23398, image: 'https://picsum.photos/seed/microphone/50/50' },
  { id: 3, name: 'Electric Guitar', category: 'Musical Instruments', unitsSold: 89, revenue: 53311, image: 'https://picsum.photos/seed/guitar/50/50' },
  { id: 4, name: 'Studio Monitor', category: 'Studio Equipment', unitsSold: 67, revenue: 60299, image: 'https://picsum.photos/seed/monitor/50/50' },
  { id: 5, name: 'MIDI Keyboard', category: 'Studio Equipment', unitsSold: 45, revenue: 17999, image: 'https://picsum.photos/seed/keyboard/50/50' }
])

// Methods
const getHeatmapColor = (hour, day) => {
  // Mock heatmap data - in real app, this would be based on actual user activity
  const intensity = Math.random()
  
  if (intensity > 0.8) return 'bg-red-500'
  if (intensity > 0.6) return 'bg-orange-500'
  if (intensity > 0.4) return 'bg-yellow-500'
  if (intensity > 0.2) return 'bg-green-500'
  return 'bg-gray-300'
}

// Watch for period changes
watch(selectedPeriod, (newPeriod) => {
  // In real app, this would fetch new data based on the selected period
  console.log(`Fetching data for last ${newPeriod} days`)
})
</script>
