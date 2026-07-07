<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/settings" class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4">
          <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2" />
          Back to Settings
        </NuxtLink>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Shipping Addresses</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">Manage your shipping addresses for delivery</p>
      </div>

      <!-- Add New Address -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
        <button
          @click="showAddForm = !showAddForm"
          class="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
        >
          <Icon name="heroicons:plus" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          <span class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">Add New Address</span>
        </button>

        <!-- Add Address Form -->
        <div v-if="showAddForm" class="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <!-- Map Section -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Location on Map
              </label>
              <button
                type="button"
                @click="getCurrentLocation"
                :disabled="isGettingLocation"
                class="flex items-center px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon v-if="isGettingLocation" name="heroicons:arrow-path" class="w-4 h-4 mr-1.5 animate-spin" />
                <Icon v-else name="heroicons:map-pin" class="w-4 h-4 mr-1.5" />
                {{ isGettingLocation ? 'Getting Location...' : 'Use Current Location' }}
              </button>
            </div>
            <div id="map" class="w-full h-64 rounded-lg border border-gray-300 dark:border-gray-600"></div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Click on the map or use your current location to auto-fill address fields</p>
          </div>

          <form @submit.prevent="handleAddAddress" class="space-y-4">
            <!-- Address Label -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address Label
              </label>
              <input
                v-model="newAddress.label"
                type="text"
                required
                placeholder="Home, Office, etc."
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
            </div>

            <!-- Country -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country
              </label>
              <select
                v-model="newAddress.country"
                required
                @change="handleCountryChange"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors"
              >
                <option value="">Select Country</option>
                <option v-for="country in countries" :key="country.code" :value="country.name">
                  {{ country.name }}
                </option>
              </select>
            </div>

            <!-- State -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                State/Province
              </label>
              <select
                v-model="newAddress.state"
                required
                :disabled="!newAddress.country"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select State</option>
                <option v-for="state in states" :key="state" :value="state">
                  {{ state }}
                </option>
              </select>
            </div>

            <!-- Local Government -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Local Government Area
              </label>
              <input
                v-model="newAddress.localGovernment"
                type="text"
                required
                placeholder="Enter local government area"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
            </div>

            <!-- Street Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Street Address
              </label>
              <input
                v-model="newAddress.street"
                type="text"
                required
                placeholder="Enter street address"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
            </div>

            <!-- Postal Code -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Postal Code
              </label>
              <input
                v-model="newAddress.postalCode"
                type="text"
                required
                placeholder="Enter postal code"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
            </div>

            <!-- Set as Default -->
            <div class="flex items-center">
              <input
                v-model="newAddress.isDefault"
                type="checkbox"
                id="setDefault"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label for="setDefault" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Set as default shipping address
              </label>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end gap-4">
              <button
                type="button"
                @click="showAddForm = false"
                class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isAdding"
                class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon v-if="isAdding" name="heroicons:arrow-path" class="w-5 h-5 mr-2 animate-spin inline" />
                {{ isAdding ? 'Adding...' : 'Add Address' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Saved Addresses -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Saved Addresses</h2>
        
        <div v-if="addresses.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
          <Icon name="heroicons:map-pin" class="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No shipping addresses saved yet</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(address, index) in addresses"
            :key="index"
            class="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div class="flex items-start space-x-4">
              <!-- Address Icon -->
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:map-pin" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              
              <!-- Address Info -->
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="font-medium text-gray-900 dark:text-white">{{ address.label }}</span>
                  <span v-if="address.isDefault" class="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">Default</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ address.street }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ address.localGovernment }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ address.state }}, {{ address.country }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ address.postalCode }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center space-x-2">
              <button
                v-if="!address.isDefault"
                @click="setDefault(index)"
                class="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Set as default"
              >
                <Icon name="heroicons:star" class="w-5 h-5" />
              </button>
              <button
                @click="deleteAddress(index)"
                class="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Remove address"
              >
                <Icon name="heroicons:trash" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let map = null
let marker = null

const showAddForm = ref(false)
const isAdding = ref(false)
const isGettingLocation = ref(false)

const newAddress = ref({
  label: '',
  country: '',
  state: '',
  localGovernment: '',
  street: '',
  postalCode: '',
  isDefault: false,
  latitude: null,
  longitude: null
})

const addresses = ref([])

// Countries with their states
const countries = [
  { code: 'US', name: 'United States', states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'] },
  { code: 'NG', name: 'Nigeria', states: ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'Federal Capital Territory'] },
  { code: 'GB', name: 'United Kingdom', states: ['England', 'Scotland', 'Wales', 'Northern Ireland'] },
  { code: 'CA', name: 'Canada', states: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'] },
  { code: 'DE', name: 'Germany', states: ['Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse', 'Mecklenburg-Vorpommern', 'Lower Saxony', 'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'] },
  { code: 'FR', name: 'France', states: ['Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Brittany', 'Centre-Val de Loire', 'Corsica', 'Grand Est', 'Hauts-de-France', 'Île-de-France', 'Normandy', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte d\'Azur'] }
]

const states = computed(() => {
  const selectedCountry = countries.find(c => c.name === newAddress.value.country)
  return selectedCountry ? selectedCountry.states : []
})

onMounted(() => {
  // Load saved addresses from localStorage
  const savedAddresses = localStorage.getItem('shippingAddresses')
  if (savedAddresses) {
    addresses.value = JSON.parse(savedAddresses)
  }
})

watch(showAddForm, (newValue) => {
  if (newValue) {
    // Initialize map when form is shown
    nextTick(() => {
      initMap()
    })
  }
})

const initMap = () => {
  if (typeof window === 'undefined' || document.getElementById('map') === null) return
  
  // Load Leaflet CSS and JS dynamically
  if (!document.querySelector('link[href*="leaflet"]')) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)
  }
  
  if (!window.L) {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => {
      createMap()
    }
    document.head.appendChild(script)
  } else {
    createMap()
  }
}

const createMap = () => {
  if (!window.L || document.getElementById('map') === null) return
  
  // Destroy existing map if it exists
  if (map) {
    map.remove()
    map = null
  }
  
  // Create new map centered on a default location
  map = window.L.map('map').setView([6.5244, 3.3792], 13) // Default: Lagos, Nigeria
  
  // Add OpenStreetMap tiles
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
  
  // Add click handler
  map.on('click', async (e) => {
    const { lat, lng } = e.latlng
    
    // Remove existing marker
    if (marker) {
      map.removeLayer(marker)
    }
    
    // Add new marker
    marker = window.L.marker([lat, lng]).addTo(map)
    
    // Store coordinates
    newAddress.value.latitude = lat
    newAddress.value.longitude = lng
    
    // Reverse geocode to get address
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      const data = await response.json()
      
      if (data.address) {
        // Auto-fill form fields from geocoded data
        if (data.address.road) {
          newAddress.value.street = data.address.road
        }
        if (data.address.city || data.address.town || data.address.village) {
          newAddress.value.localGovernment = data.address.city || data.address.town || data.address.village
        }
        if (data.address.state || data.address.region) {
          newAddress.value.state = data.address.state || data.address.region
        }
        if (data.address.country) {
          newAddress.value.country = data.address.country
        }
        if (data.address.postcode) {
          newAddress.value.postalCode = data.address.postcode
        }
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error)
    }
  })
}

const handleCountryChange = () => {
  newAddress.value.state = ''
}

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')
    return
  }

  isGettingLocation.value = true

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords
      
      // Store coordinates
      newAddress.value.latitude = latitude
      newAddress.value.longitude = longitude
      
      // Update map if it exists
      if (map) {
        map.setView([latitude, longitude], 15)
        
        // Remove existing marker
        if (marker) {
          map.removeLayer(marker)
        }
        
        // Add new marker
        marker = window.L.marker([latitude, longitude]).addTo(map)
      }
      
      // Reverse geocode to get address
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        const data = await response.json()
        
        if (data.address) {
          // Auto-fill form fields from geocoded data
          if (data.address.road) {
            newAddress.value.street = data.address.road
          }
          if (data.address.city || data.address.town || data.address.village) {
            newAddress.value.localGovernment = data.address.city || data.address.town || data.address.village
          }
          if (data.address.state || data.address.region) {
            newAddress.value.state = data.address.state || data.address.region
          }
          if (data.address.country) {
            newAddress.value.country = data.address.country
          }
          if (data.address.postcode) {
            newAddress.value.postalCode = data.address.postcode
          }
        }
      } catch (error) {
        console.error('Error reverse geocoding:', error)
        alert('Error getting address details. Please try again.')
      } finally {
        isGettingLocation.value = false
      }
    },
    (error) => {
      console.error('Error getting location:', error)
      isGettingLocation.value = false
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert('Location permission denied. Please enable location services.')
          break
        case error.POSITION_UNAVAILABLE:
          alert('Location information is unavailable.')
          break
        case error.TIMEOUT:
          alert('Location request timed out.')
          break
        default:
          alert('An unknown error occurred while getting your location.')
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  )
}

const handleAddAddress = async () => {
  isAdding.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // If setting as default, remove default from others
    if (newAddress.value.isDefault) {
      addresses.value.forEach(addr => addr.isDefault = false)
    }
    
    // Add new address
    addresses.value.push({
      ...newAddress.value
    })
    
    // Save to localStorage
    localStorage.setItem('shippingAddresses', JSON.stringify(addresses.value))
    
    // Reset form
    newAddress.value = {
      label: '',
      country: '',
      state: '',
      localGovernment: '',
      street: '',
      postalCode: '',
      isDefault: false,
      latitude: null,
      longitude: null
    }
    
    // Remove marker
    if (marker && map) {
      map.removeLayer(marker)
      marker = null
    }
    
    showAddForm.value = false
    
    alert('Address added successfully!')
  } catch (error) {
    console.error('Error adding address:', error)
    alert('Error adding address. Please try again.')
  } finally {
    isAdding.value = false
  }
}

const setDefault = (index) => {
  addresses.value.forEach((addr, i) => {
    addr.isDefault = i === index
  })
  localStorage.setItem('shippingAddresses', JSON.stringify(addresses.value))
}

const deleteAddress = (index) => {
  if (confirm('Are you sure you want to remove this address?')) {
    addresses.value.splice(index, 1)
    localStorage.setItem('shippingAddresses', JSON.stringify(addresses.value))
  }
}

// Set page meta
useHead({
  title: 'Shipping Addresses - PulseTunez'
})
</script>
