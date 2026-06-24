export const useAdsStore = defineStore('ads', {
  state: () => ({
    ads: [
      { 
        id: 1, 
        title: 'Summer Sale - 50% Off', 
        image: 'https://picsum.photos/seed/ad1/1200/400', 
        link: '/shop', 
        description: 'Get amazing discounts on all audio equipment',
        active: true, 
        views: 1250, 
        createdAt: new Date('2024-06-01') 
      },
      { 
        id: 2, 
        title: 'New Studio Equipment', 
        image: 'https://picsum.photos/seed/ad2/1200/400', 
        link: '/category/studio-equipment', 
        description: 'Check out our latest studio gear',
        active: true, 
        views: 890, 
        createdAt: new Date('2024-06-10') 
      },
      { 
        id: 3, 
        title: 'Free Shipping Weekend', 
        image: 'https://picsum.photos/seed/ad3/1200/400', 
        link: '/shop', 
        description: 'Free shipping on all orders over $50',
        active: true, 
        views: 560, 
        createdAt: new Date('2024-06-15') 
      }
    ]
  }),

  getters: {
    activeAds: (state) => {
      return state.ads.filter(ad => ad.active)
    },
    
    totalViews: (state) => {
      return state.ads.reduce((sum, ad) => sum + ad.views, 0)
    },
    
    activeAdsCount: (state) => {
      return state.ads.filter(ad => ad.active).length
    }
  },

  actions: {
    addAd(ad) {
      const newAd = {
        ...ad,
        id: Date.now(),
        views: 0,
        createdAt: new Date()
      }
      this.ads.push(newAd)
    },

    updateAd(adId, adData) {
      const index = this.ads.findIndex(ad => ad.id === adId)
      if (index > -1) {
        this.ads[index] = { 
          ...this.ads[index], 
          ...adData, 
          id: adId,
          views: this.ads[index].views,
          createdAt: this.ads[index].createdAt
        }
      }
    },

    deleteAd(adId) {
      const index = this.ads.findIndex(ad => ad.id === adId)
      if (index > -1) {
        this.ads.splice(index, 1)
      }
    },

    toggleAdStatus(adId) {
      const ad = this.ads.find(ad => ad.id === adId)
      if (ad) {
        ad.active = !ad.active
      }
    },

    incrementView(adId) {
      const ad = this.ads.find(ad => ad.id === adId)
      if (ad) {
        ad.views++
      }
    }
  }
})
