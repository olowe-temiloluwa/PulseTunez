import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: []
  }),

  getters: {
    itemCount: (state) => state.items.length,
    
    isInWishlist: (state) => (productId) => {
      return state.items.some(item => item.id === productId)
    },
    
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price, 0)
    }
  },

  actions: {
    addItem(product) {
      if (!this.isInWishlist(product.id)) {
        this.items.push({
          ...product,
          addedAt: new Date().toISOString()
        })
        // Persist to localStorage
        this.saveToLocalStorage()
      }
    },

    removeItem(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    toggleItem(product) {
      if (this.isInWishlist(product.id)) {
        this.removeItem(product.id)
        return false
      } else {
        this.addItem(product)
        return true
      }
    },

    clearWishlist() {
      this.items = []
      this.saveToLocalStorage()
    },

    moveToCart(product, cartStore) {
      this.removeItem(product.id)
      cartStore.addItem(product)
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('wishlist', JSON.stringify(this.items))
      }
    },

    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('wishlist')
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (e) {
            console.error('Failed to load wishlist from localStorage:', e)
          }
        }
      }
    }
  }
})
