import { defineStore } from 'pinia'

export const useRecentlyViewedStore = defineStore('recentlyViewed', {
  state: () => ({
    items: []
  }),

  getters: {
    itemCount: (state) => state.items.length,
    
    recentProducts: (state) => {
      // Return unique products, most recent first
      const uniqueItems = []
      const seenIds = new Set()
      
      for (const item of state.items) {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id)
          uniqueItems.push(item)
        }
      }
      
      return uniqueItems.slice(0, 8) // Limit to 8 items
    }
  },

  actions: {
    addProduct(product) {
      if (!product) return
      
      // Add to the beginning of the array (most recent)
      this.items.unshift({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        discount: product.discount,
        salePrice: product.salePrice,
        viewedAt: new Date().toISOString()
      })
      
      // Keep only last 50 items
      if (this.items.length > 50) {
        this.items = this.items.slice(0, 50)
      }
      
      // Persist to localStorage
      this.saveToLocalStorage()
    },

    clearHistory() {
      this.items = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('recentlyViewed', JSON.stringify(this.items))
      }
    },

    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('recentlyViewed')
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (e) {
            console.error('Failed to load recently viewed from localStorage:', e)
          }
        }
      }
    }
  }
})
