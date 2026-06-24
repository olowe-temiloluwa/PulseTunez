<template>
  <div>
    <div class="flex justify-end mb-6">
      <button
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
      >
        <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
        Add Product
      </button>
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
                  placeholder="Search products..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <select
                v-model="selectedCategory"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Categories</option>
                <option value="audio-gadgets">Audio Gadgets</option>
                <option value="musical-instruments">Musical Instruments</option>
                <option value="studio-equipment">Studio Equipment</option>
              </select>
              <select
                v-model="selectedStatus"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Products Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
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
                  Price
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Stock
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="product in filteredProducts" :key="product.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img :src="product.image" :alt="product.name" class="w-10 h-10 rounded-lg object-cover" />
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ product.name }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ product.sku }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900 dark:text-white">{{ product.category }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900 dark:text-white">${{ product.price }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm" :class="getStockClass(product.stock)">{{ product.stock }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(product.status)">
                    {{ product.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="editProduct(product)"
                    class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  >
                    <Icon name="heroicons:pencil" class="w-5 h-5" />
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    <!-- Add/Edit Product Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {{ editingProduct ? 'Edit Product' : 'Add New Product' }}
        </h2>
        
        <form @submit.prevent="saveProduct" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
            <input
              v-model="productForm.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              v-model="productForm.category"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Category</option>
              <option value="audio-gadgets">Audio Gadgets</option>
              <option value="musical-instruments">Musical Instruments</option>
              <option value="studio-equipment">Studio Equipment</option>
            </select>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
              <input
                v-model="productForm.price"
                type="number"
                step="0.01"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock</label>
              <input
                v-model="productForm.stock"
                type="number"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              v-model="productForm.description"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
            <input
              v-model="productForm.image"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select
              v-model="productForm.status"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {{ editingProduct ? 'Update' : 'Add' }} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  adminTitle: 'Product Management'
})

// Mock data - in real app, this would come from API
const products = ref([
  { id: 1, name: 'Premium Headphones', sku: 'PH001', category: 'Audio Gadgets', price: 299.99, stock: 45, status: 'active', image: 'https://picsum.photos/seed/headphones/100/100' },
  { id: 2, name: 'Wireless Microphone', sku: 'WM002', category: 'Audio Gadgets', price: 149.99, stock: 0, status: 'out-of-stock', image: 'https://picsum.photos/seed/microphone/100/100' },
  { id: 3, name: 'Electric Guitar', sku: 'EG003', category: 'Musical Instruments', price: 599.99, stock: 12, status: 'active', image: 'https://picsum.photos/seed/guitar/100/100' },
  { id: 4, name: 'Studio Monitor', sku: 'SM004', category: 'Studio Equipment', price: 899.99, stock: 8, status: 'active', image: 'https://picsum.photos/seed/monitor/100/100' },
  { id: 5, name: 'MIDI Keyboard', sku: 'MK005', category: 'Studio Equipment', price: 399.99, stock: 0, status: 'inactive', image: 'https://picsum.photos/seed/keyboard/100/100' }
])

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const showAddModal = ref(false)
const editingProduct = ref(null)

const productForm = ref({
  name: '',
  category: '',
  price: '',
  stock: '',
  description: '',
  image: '',
  status: 'active'
})

// Computed filtered products
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
    const matchesStatus = !selectedStatus.value || product.status === selectedStatus.value
    return matchesSearch && matchesCategory && matchesStatus
  })
})

// Methods
const getStockClass = (stock) => {
  if (stock === 0) return 'text-red-600 dark:text-red-400'
  if (stock < 10) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-green-600 dark:text-green-400'
}

const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    'out-of-stock': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const editProduct = (product) => {
  editingProduct.value = product
  productForm.value = { ...product }
  showAddModal.value = true
}

const deleteProduct = (productId) => {
  const index = products.value.findIndex(p => p.id === productId)
  if (index > -1) {
    products.value.splice(index, 1)
    // In real app, this would make an API call
    console.log(`Product ${productId} deleted`)
  }
}

const saveProduct = () => {
  if (editingProduct.value) {
    // Update existing product
    const index = products.value.findIndex(p => p.id === editingProduct.value.id)
    if (index > -1) {
      products.value[index] = { ...productForm.value, id: editingProduct.value.id }
    }
  } else {
    // Add new product
    const newProduct = {
      ...productForm.value,
      id: Date.now(),
      sku: `PRD${Date.now()}`
    }
    products.value.push(newProduct)
  }
  
  closeModal()
  // In real app, this would make an API call
  console.log('Product saved:', productForm.value)
}

const closeModal = () => {
  showAddModal.value = false
  editingProduct.value = null
  productForm.value = {
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    status: 'active'
  }
}
</script>
