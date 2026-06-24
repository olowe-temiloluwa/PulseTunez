<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p class="text-gray-600 dark:text-gray-300 mb-6">Last updated: January 2024</p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            PulseTunez collects information you provide directly to us, including when you create an account, make a purchase, or communicate with us. This may include your name, email address, shipping address, payment information, and phone number.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            We use the information we collect to process transactions, send you technical notices and support messages, respond to your comments and questions, provide customer service, and improve our services.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Information Sharing</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Data Security</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            We implement a variety of security measures to maintain the safety of your personal information. All sensitive information is transmitted via Secure Socket Layer (SSL) technology and encrypted using industry-standard encryption protocols.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Cookies</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            We use cookies to enhance your experience on our website. Cookies are small files stored on your device that remember your preferences and help us analyze website traffic. You can configure your browser to refuse cookies.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">6. Third-Party Services</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Our website may include links to third-party services, including social media platforms and payment processors. These third parties have their own privacy policies and we encourage you to review them.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">7. Your Rights</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            You have the right to access, correct, or delete your personal information. You may also opt out of receiving promotional communications from us at any time.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">8. Children's Privacy</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">9. Changes to This Policy</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
          </p>
          
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">10. Contact Us</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
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
  title: 'Privacy Policy - PulseTunez'
})
</script>
