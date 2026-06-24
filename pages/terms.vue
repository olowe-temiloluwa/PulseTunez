<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p class="text-gray-600 dark:text-gray-300 mb-6">Last updated: January 2024</p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            By accessing and using PulseTunez, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. User Accounts</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Products and Services</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            PulseTunez offers audio equipment, musical instruments, and studio products for purchase. All products are subject to availability and we reserve the right to discontinue any product at any time.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Pricing and Payment</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            All prices are listed in USD and are subject to change without notice. We accept various payment methods including credit cards, PayPal, and other secure payment options.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Shipping and Delivery</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            We offer free shipping on orders over $50. Delivery times vary based on location and product availability. We are not responsible for delays caused by shipping carriers.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">6. Returns and Refunds</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Products can be returned within 30 days of purchase if they are in their original condition. Refunds will be processed within 5-7 business days of receiving the returned item.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">7. Privacy Policy</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Your use of PulseTunez is also subject to our Privacy Policy. Please review our Privacy Policy, which also governs the service and describes how we collect, use, and protect your personal data.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">8. Contact Information</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <ul class="text-gray-600 dark:text-gray-300 list-disc list-inside mb-4">
            <li>Email: info@pulsetunez.com</li>
            <li>Phone: 08022738004</li>
          </ul>
        </div>
        
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <NuxtLink to="/register" class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
            Back to Register
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})

useHead({
  title: 'Terms of Service - PulseTunez'
})
</script>
