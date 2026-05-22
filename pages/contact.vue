<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">We're here to help with all your audio and music equipment needs</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="surface-card p-8">
          <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Send us a Message</h2>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="form-label mb-2">First Name</label>
                <input 
                  v-model="form.firstName"
                  type="text" 
                  required
                  class="form-input px-4 py-2"
                >
              </div>
              <div>
                <label class="form-label mb-2">Last Name</label>
                <input 
                  v-model="form.lastName"
                  type="text" 
                  required
                  class="form-input px-4 py-2"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input 
                v-model="form.phone"
                type="tel" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select 
                v-model="form.subject"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="product-inquiry">Product Inquiry</option>
                <option value="technical-support">Technical Support</option>
                <option value="order-status">Order Status</option>
                <option value="returns">Returns & Refunds</option>
                <option value="partnership">Partnership Opportunities</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                v-model="form.message"
                rows="5" 
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <button 
              type="submit"
              class="w-full btn-primary"
              :disabled="isSubmitting"
            >
              <Icon v-if="isSubmitting" name="loader-2" class="w-5 h-5 inline mr-2 animate-spin" />
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Quick Contact -->
          <div class="surface-card p-8">
            <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Get in Touch</h2>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="phone" class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-semibold mb-1 text-gray-900 dark:text-white">Phone</h3>
                  <p class="text-gray-600 dark:text-gray-300">08022738004</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="mail" class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-semibold mb-1 text-gray-900 dark:text-white">Email</h3>
                  <p class="text-gray-600 dark:text-gray-300">info@pulsetunez.com</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">We'll respond within 24 hours</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="map-pin" class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-semibold mb-1 text-gray-900 dark:text-white">Showroom</h3>
                  <p class="text-gray-600 dark:text-gray-300">123 Music Street, Audio District</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="surface-card p-8">
            <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Business Hours</h2>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Monday - Friday</span>
                <span class="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Saturday</span>
                <span class="font-medium">10:00 AM - 4:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Sunday</span>
                <span class="font-medium">Closed</span>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="surface-card p-8">
            <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Follow Us</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Stay updated with our latest products and promotions</p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Icon name="facebook" class="w-5 h-5" />
              </a>
              <a href="#" class="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Icon name="twitter" class="w-5 h-5" />
              </a>
              <a href="#" class="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors">
                <Icon name="instagram" class="w-5 h-5" />
              </a>
              <a href="#" class="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors">
                <Icon name="youtube" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-16">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="surface-card p-6">
            <h3 class="font-semibold mb-3 text-gray-900 dark:text-white">Do you offer international shipping?</h3>
            <p class="text-gray-600">Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.</p>
          </div>
          <div class="surface-card p-6">
            <h3 class="font-semibold mb-3 text-gray-900 dark:text-white">What's your return policy?</h3>
            <p class="text-gray-600">We offer a 30-day return policy for unused items in original packaging. Some restrictions apply.</p>
          </div>
          <div class="surface-card p-6">
            <h3 class="font-semibold mb-3 text-gray-900 dark:text-white">Do you provide technical support?</h3>
            <p class="text-gray-600">Yes, our expert team provides free technical support for all products purchased from us.</p>
          </div>
          <div class="surface-card p-6">
            <h3 class="font-semibold mb-3 text-gray-900 dark:text-white">Can I test products before buying?</h3>
            <p class="text-gray-600">Absolutely! Our showroom has demo units available for you to try before making a purchase.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isSubmitting = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Message sent successfully! We\'ll get back to you soon.')
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  } catch {
    alert('Failed to send message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Set page title
useHead({
  title: 'Contact Us - PulseTunez'
})
</script>
