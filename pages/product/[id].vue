<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm">
          <li><NuxtLink to="/" class="text-gray-500 hover:text-gray-700">Home</NuxtLink></li>
          <li class="text-gray-400">/</li>
          <li>
            <NuxtLink :to="`/category/${product.category}`" class="text-gray-500 hover:text-gray-700">
              {{ category?.name }}
            </NuxtLink>
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900 font-medium">{{ product.name }}</li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div class="space-y-4">
          <div class="aspect-square bg-white rounded-lg overflow-hidden">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-full object-cover"
            >
          </div>
          <!-- Thumbnail Gallery -->
          <div class="grid grid-cols-4 gap-2">
            <div 
              v-for="i in 4" 
              :key="i"
              class="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
            >
              <img 
                :src="product.image" 
                :alt="`${product.name} ${i}`"
                class="w-full h-full object-cover"
              >
            </div>
          </div>
        </div>

        <!-- Product Details -->
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
            <div class="flex items-center space-x-4">
              <span class="text-3xl font-bold text-blue-600">${{ product.price }}</span>
              <span class="text-sm text-gray-500">{{ product.stock }} in stock</span>
            </div>
          </div>

          <p class="text-gray-600 text-lg">{{ product.description }}</p>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Key Features</h3>
            <ul class="space-y-2">
              <li 
                v-for="feature in product.features" 
                :key="feature"
                class="flex items-center space-x-2"
              >
                <Icon name="check" class="w-5 h-5 text-green-500" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <!-- Stock Status -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex items-center space-x-2">
              <Icon name="alert-triangle" class="w-5 h-5 text-yellow-600" />
              <span class="text-yellow-800">
                {{ product.stock <= 5 ? `Only ${product.stock} left in stock!` : 'In stock and ready to ship' }}
              </span>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <label class="text-gray-700 font-medium">Quantity:</label>
              <div class="flex items-center space-x-2">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  -
                </button>
                <span class="w-16 text-center font-semibold">{{ quantity }}</span>
                <button 
                  @click="quantity = Math.min(product.stock, quantity + 1)"
                  class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button 
              @click="addToCart"
              class="w-full btn-primary text-lg"
              :disabled="product.stock === 0"
            >
              <Icon name="shopping-cart" class="w-5 h-5 inline mr-2" />
              {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>

            <button class="w-full btn-secondary">
              <Icon name="heart" class="w-5 h-5 inline mr-2" />
              Add to Wishlist
            </button>
          </div>

          <!-- Product Info -->
          <div class="border-t pt-6">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Category:</span>
                <span class="ml-2 font-medium">{{ category?.name }}</span>
              </div>
              <div>
                <span class="text-gray-500">SKU:</span>
                <span class="ml-2 font-medium">PT-{{ product.id.toString().padStart(4, '0') }}</span>
              </div>
              <div>
                <span class="text-gray-500">Warranty:</span>
                <span class="ml-2 font-medium">1 Year</span>
              </div>
              <div>
                <span class="text-gray-500">Shipping:</span>
                <span class="ml-2 font-medium">Free over $100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold mb-8">Related Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id"
            class="product-card group"
          >
            <img 
              :src="relatedProduct.image" 
              :alt="relatedProduct.name"
              class="w-full h-32 object-cover"
            >
            <div class="p-4">
              <h3 class="font-medium text-sm mb-2">{{ relatedProduct.name }}</h3>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-blue-600">${{ relatedProduct.price }}</span>
                <button 
                  @click="cartStore.addItem(relatedProduct)"
                  class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Icon name="plus" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="text-center py-16">
      <Icon name="search-x" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-600 mb-2">Product not found</h3>
      <p class="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="btn-primary">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const quantity = ref(1)

const product = computed(() => {
  return productStore.getProductById(parseInt(route.params.id))
})

const category = computed(() => {
  if (!product.value) return null
  return productStore.categories.find(cat => cat.id === product.value.category)
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.products
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
})

const addToCart = () => {
  if (!product.value) return
  
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addItem(product.value)
  }
  
  // Show success message
  const toast = useToast()
  toast.success(`Added ${quantity.value} × ${product.value.name} to cart`)
}

// Set page title
useHead({
  title: `${product.value?.name || 'Product'} - PulseTunez`
})
</script>
