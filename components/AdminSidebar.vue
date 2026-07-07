<template>
  <aside class="w-64 bg-white dark:bg-gray-800 shadow-md min-h-[calc(100vh-4rem)] shrink-0">
    <nav class="mt-8">
      <div class="px-4 space-y-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors"
          :class="isActive(item.to)
            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          <Icon :name="item.icon" class="w-5 h-5 mr-3 shrink-0" />
          {{ item.label }}
        </NuxtLink>
      </div>

      <div class="px-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <NuxtLink
          to="/"
          class="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-3 shrink-0" />
          Back to Store
        </NuxtLink>
      </div>
    </nav>
  </aside>
</template>

<script setup>
const route = useRoute()

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'heroicons:chart-bar' },
  { to: '/admin/products', label: 'Products', icon: 'heroicons:cube' },
  { to: '/admin/ads', label: 'Ads', icon: 'heroicons:rectangle-stack' },
  { to: '/admin/users', label: 'Users', icon: 'heroicons:users' },
  { to: '/admin/analytics', label: 'Analytics', icon: 'heroicons:chart-pie' },
  { to: '/admin/orders', label: 'Orders', icon: 'heroicons:shopping-bag' },
  { to: '/admin/settings', label: 'Settings', icon: 'heroicons:cog-6-tooth' }
]

const isActive = (path) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}
</script>
