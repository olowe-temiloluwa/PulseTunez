<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300 print:bg-white">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Not found -->
      <div v-if="!order" class="surface-card p-10 text-center">
        <Icon name="heroicons:document-magnifying-glass" class="w-14 h-14 text-gray-400 mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Receipt not found</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-6">We couldn't find an order matching this ID.</p>
        <NuxtLink to="/" class="btn-primary">Back to Home</NuxtLink>
      </div>

      <template v-else>
        <!-- Actions (hidden on print) -->
        <div class="flex justify-end gap-3 mb-4 print:hidden">
          <NuxtLink :to="`/track-order/${order.id}`" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
            <Icon name="heroicons:truck" class="w-4 h-4 inline mr-1.5" />
            Track Order
          </NuxtLink>
          <button @click="printReceipt" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Icon name="heroicons:printer" class="w-4 h-4 inline mr-1.5" />
            Print / Download
          </button>
        </div>

        <!-- Receipt Card -->
        <div class="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 print:shadow-none print:border-0">
          <!-- Watermark -->
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span class="text-7xl font-extrabold text-gray-900/5 dark:text-white/5 rotate-[-25deg] select-none whitespace-nowrap">
              PULSETUNEZ
            </span>
          </div>

          <div class="relative z-10">
            <!-- Header -->
            <div class="flex items-start justify-between border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
              <div class="flex items-center gap-3">
                <img src="~/assets/css/img/Logo.png" alt="PulseTunez" class="w-12 h-12 object-contain rounded-lg" />
                <div>
                  <p class="text-lg font-bold text-gray-900 dark:text-white">PulseTunez</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Premium Audio & Music Equipment</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-500 dark:text-gray-400">Receipt</p>
                <p class="font-mono font-semibold text-gray-900 dark:text-white">#{{ order.id }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(order.createdAt) }}</p>
              </div>
            </div>

            <!-- Products only: name + price -->
            <div class="space-y-3 mb-6">
              <div v-for="item in order.items" :key="item.id" class="flex items-center justify-between">
                <div>
                  <p class="text-gray-900 dark:text-white font-medium">{{ item.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Product ID: {{ item.id }} &middot; Qty: {{ item.quantity }}</p>
                </div>
                <p class="text-gray-900 dark:text-white font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mb-8">
              <div class="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                <span>Total Paid</span>
                <span>${{ order.total.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Stamp & Signature -->
            <div class="flex items-end justify-between mt-10">
              <div>
                <div class="signature-script text-2xl text-gray-800 dark:text-gray-200">PulseTunez</div>
                <div class="w-40 border-t border-gray-400 dark:border-gray-500 mt-1 pt-1">
                  <p class="text-xs text-gray-500 dark:text-gray-400">Authorized Signature</p>
                </div>
              </div>

              <div class="stamp shrink-0">
                <div class="stamp-ring">
                  <span>PulseTunez</span>
                  <span class="stamp-center">PAID</span>
                </div>
              </div>
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

onMounted(() => {
  ordersStore.loadFromLocalStorage()
  order.value = ordersStore.getOrderById(route.params.id)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const printReceipt = () => {
  window.print()
}

useHead({
  title: 'Receipt - PulseTunez'
})
</script>

<style scoped>
.signature-script {
  font-family: 'Brush Script MT', cursive;
}

.stamp {
  width: 96px;
  height: 96px;
}

.stamp-ring {
  width: 96px;
  height: 96px;
  border-radius: 9999px;
  border: 3px double #dc2626;
  color: #dc2626;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transform: rotate(-12deg);
  opacity: 0.85;
  font-weight: 700;
}

.stamp-ring span:first-child {
  font-size: 8px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stamp-center {
  font-size: 15px;
  letter-spacing: 0.1em;
}

@media print {
  .stamp-ring {
    opacity: 1;
  }
}
</style>
