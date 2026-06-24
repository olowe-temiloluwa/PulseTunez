<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center min-w-0">
            <NuxtLink to="/admin" class="flex items-center shrink-0">
              <Icon name="heroicons:shield-check" class="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <span class="text-xl font-bold text-gray-900 dark:text-white truncate">{{ pageTitle }}</span>
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4 shrink-0">
            <button
              type="button"
              class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg"
              aria-label="Notifications"
            >
              <Icon name="heroicons:bell" class="w-5 h-5" />
            </button>
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Icon name="heroicons:user" class="w-5 h-5 text-white" />
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex max-w-[1600px] mx-auto w-full">
      <AdminSidebar />
      <main class="flex-1 p-6 sm:p-8 min-w-0">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const pageTitle = computed(() => {
  return route.meta.adminTitle || 'Admin Dashboard'
})
</script>
