import { defineStore } from 'pinia'

// Status flow used across the storefront + admin:
// pending -> processing -> shipped -> delivered
// (an order can be cancelled from pending/processing)
export const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: []
  }),

  getters: {
    sortedOrders: (state) => {
      return [...state.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },

    // Orders that still need admin attention (nothing done yet)
    unattendedOrders: (state) => {
      return state.orders
        .filter(o => o.status === 'pending')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },

    orderStats: (state) => ({
      total: state.orders.length,
      pending: state.orders.filter(o => o.status === 'pending').length,
      processing: state.orders.filter(o => o.status === 'processing').length,
      shipped: state.orders.filter(o => o.status === 'shipped').length,
      delivered: state.orders.filter(o => o.status === 'delivered').length,
      cancelled: state.orders.filter(o => o.status === 'cancelled').length,
      revenue: state.orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + (o.total || 0), 0)
        .toFixed(2)
    })
  },

  actions: {
    generateOrderId() {
      const year = new Date().getFullYear()
      const random = Math.random().toString(36).substr(2, 5).toUpperCase()
      return `PT-${year}-${random}`
    },

    createOrder(payload) {
      const order = {
        id: this.generateOrderId(),
        userEmail: payload.userEmail || null,
        items: payload.items || [],
        contact: payload.contact || {},
        isGift: !!payload.isGift,
        recipientName: payload.isGift ? (payload.recipientName || '') : null,
        address: payload.address || {},
        paymentMethod: payload.paymentMethod || 'card',
        subtotal: payload.subtotal || 0,
        shipping: payload.shipping || 0,
        tax: payload.tax || 0,
        total: payload.total || 0,
        status: 'pending',
        statusHistory: [
          { status: 'pending', date: new Date().toISOString() }
        ],
        createdAt: new Date().toISOString()
      }

      this.orders.unshift(order)
      this.saveToLocalStorage()
      return order
    },

    updateStatus(orderId, status) {
      const order = this.orders.find(o => o.id === orderId)
      if (!order) return
      order.status = status
      order.statusHistory.push({ status, date: new Date().toISOString() })
      this.saveToLocalStorage()
    },

    cancelOrder(orderId) {
      this.updateStatus(orderId, 'cancelled')
    },

    deleteOrder(orderId) {
      const index = this.orders.findIndex(o => o.id === orderId)
      if (index > -1) {
        this.orders.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    getOrderById(orderId) {
      return this.orders.find(o => o.id === orderId) || null
    },

    getOrdersByEmail(email) {
      if (!email) return []
      return this.orders
        .filter(o => o.userEmail === email)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('orders', JSON.stringify(this.orders))
      }
    },

    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('orders')
        if (saved) {
          try {
            this.orders = JSON.parse(saved)
          } catch (e) {
            console.error('Failed to load orders from localStorage:', e)
          }
        }
      }
    }
  }
})
