export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      // Audio Gadgets
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        category: 'audio-gadgets',
        price: 299.99,
        description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
        image: 'https://picsum.photos/400/300?random=1',
        features: ['Bluetooth 5.0', 'Active Noise Cancellation', '30-hour battery life'],
        stock: 15
      },
      {
        id: 2,
        name: 'Professional Studio Microphone',
        category: 'audio-gadgets',
        price: 189.99,
        description: 'Studio-grade USB microphone perfect for podcasting and recording.',
        image: 'https://picsum.photos/400/300?random=2',
        features: ['USB-C Connection', 'Cardioid Pattern', 'Plug and Play'],
        stock: 8
      },
      {
        id: 3,
        name: 'Portable Bluetooth Speaker',
        category: 'audio-gadgets',
        price: 79.99,
        description: 'Compact waterproof speaker with amazing sound quality.',
        image: 'https://picsum.photos/400/300?random=3',
        features: ['Waterproof IPX7', '12-hour battery', '360° sound'],
        stock: 25
      },
      
      // Musical Gadgets
      {
        id: 4,
        name: 'Digital Piano Keyboard',
        category: 'musical-gadgets',
        price: 599.99,
        description: '88-key weighted digital piano with authentic piano sound.',
        image: 'https://picsum.photos/400/300?random=4',
        features: ['88 Weighted Keys', 'Multiple Voices', 'USB Connectivity'],
        stock: 5
      },
      {
        id: 5,
        name: 'Electric Guitar Package',
        category: 'musical-gadgets',
        price: 349.99,
        description: 'Complete electric guitar package with amplifier and accessories.',
        image: 'https://picsum.photos/400/300?random=5',
        features: ['Solid Body', '20W Amp', 'Includes Accessories'],
        stock: 12
      },
      {
        id: 6,
        name: 'MIDI Keyboard Controller',
        category: 'musical-gadgets',
        price: 149.99,
        description: '25-key MIDI controller perfect for music production.',
        image: 'https://picsum.photos/400/300?random=6',
        features: ['25 Keys', 'Velocity Sensitive', 'USB Powered'],
        stock: 18
      },
      
      // Studio Equipment
      {
        id: 7,
        name: 'Audio Interface 2x2',
        category: 'studio-equipment',
        price: 249.99,
        description: 'Professional audio interface for home recording studios.',
        image: 'https://picsum.photos/400/300?random=7',
        features: ['2 Inputs/2 Outputs', '48kHz/24-bit', 'Phantom Power'],
        stock: 10
      },
      {
        id: 8,
        name: 'Studio Monitor Speakers',
        category: 'studio-equipment',
        price: 449.99,
        description: 'Pair of professional studio monitors for accurate sound reproduction.',
        image: 'https://picsum.photos/400/300?random=8',
        features: ['Bi-amped Design', 'Room Correction', 'XLR/TRS Inputs'],
        stock: 6
      },
      {
        id: 9,
        name: 'Recording Studio Bundle',
        category: 'studio-equipment',
        price: 899.99,
        description: 'Complete home recording setup with all essentials.',
        image: 'https://picsum.photos/400/300?random=9',
        features: ['Audio Interface', 'Microphone', 'Headphones', 'Software'],
        stock: 4
      }
    ],
    categories: [
      {
        id: 'audio-gadgets',
        name: 'Audio Gadgets',
        description: 'Headphones, speakers, audio equipment',
        icon: 'heroicons:microphone'
      },
      {
        id: 'musical-gadgets',
        name: 'Musical Gadgets',
        description: 'Instruments and music production tools',
        icon: 'heroicons:musical-note'
      },
      {
        id: 'studio-equipment',
        name: 'Studio Equipment',
        description: 'Professional recording and studio gear',
        icon: 'heroicons:cog-6-tooth'
      }
    ]
  }),

  getters: {
    getProductById: (state) => {
      return (productId) => state.products.find(product => product.id === productId)
    },
    
    getProductsByCategory: (state) => {
      return (categoryId) => state.products.filter(product => product.category === categoryId)
    },
    
    featuredProducts: (state) => {
      return state.products.filter(product => product.price > 200).slice(0, 3)
    }
  }
})
