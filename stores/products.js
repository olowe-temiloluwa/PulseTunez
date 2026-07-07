export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      // Audio Gadgets
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        category: 'audio-gadgets',
        price: 299.99,
        discount: 15,
        salePrice: 254.99,
        description: 'Experience premium audio quality with these high-performance wireless headphones featuring advanced active noise cancellation technology that blocks out ambient noise for an immersive listening experience. The headphones deliver crystal-clear sound with deep bass and crisp highs, perfect for music, podcasts, and calls. With Bluetooth 5.0 connectivity, you get seamless pairing with your devices and a stable connection up to 30 feet away. The 30-hour battery life ensures you can enjoy your music all day long on a single charge. The comfortable over-ear design with memory foam ear cushions provides hours of comfortable wear, while the foldable design makes them easy to carry. Includes a carrying case, USB-C charging cable, and 3.5mm audio cable for wired listening.',
        image: 'https://picsum.photos/400/300?random=1',
        features: ['Bluetooth 5.0', 'Active Noise Cancellation', '30-hour battery life'],
        stock: 15,
        hotSale: true,
        trending: true
      },
      {
        id: 2,
        name: 'Professional Studio Microphone',
        category: 'audio-gadgets',
        price: 189.99,
        discount: 20,
        salePrice: 151.99,
        description: 'Elevate your audio recordings with this professional-grade USB microphone designed for podcasting, streaming, voice-overs, and music production. The microphone features a cardioid polar pattern that captures sound directly in front while minimizing background noise from the sides and rear. With plug-and-play USB-C connectivity, you can start recording immediately without any complicated setup. The microphone delivers studio-quality audio with a wide frequency response and low self-noise. Perfect for content creators, musicians, and anyone looking to improve their audio quality. Includes a desktop stand, pop filter, and USB-C cable. Compatible with Windows, Mac, and Linux systems.',
        image: 'https://picsum.photos/400/300?random=2',
        features: ['USB-C Connection', 'Cardioid Pattern', 'Plug and Play'],
        stock: 8,
        hotSale: true,
        trending: false
      },
      {
        id: 3,
        name: 'Portable Bluetooth Speaker',
        category: 'audio-gadgets',
        price: 79.99,
        discount: 10,
        salePrice: 71.99,
        description: 'Take your music anywhere with this compact yet powerful portable Bluetooth speaker that delivers impressive sound in a waterproof design. Rated IPX7 for water resistance, this speaker can handle rain, splashes, and even brief submersion in water. The 360-degree sound projection ensures everyone hears the music clearly from any angle. With a 12-hour battery life, you can keep the party going all day long. The speaker features Bluetooth 5.0 for stable connectivity and supports wireless pairing with two devices simultaneously. The rugged design with a built-in carrying strap makes it perfect for outdoor adventures, beach trips, and camping. Also includes a built-in microphone for hands-free calls.',
        image: 'https://picsum.photos/400/300?random=3',
        features: ['Waterproof IPX7', '12-hour battery', '360° sound'],
        stock: 25,
        hotSale: false,
        trending: true
      },
      
      // Musical Gadgets
      {
        id: 4,
        name: 'Digital Piano Keyboard',
        category: 'musical-gadgets',
        price: 599.99,
        discount: 25,
        salePrice: 449.99,
        description: 'Experience the authentic feel and sound of an acoustic piano with this 88-key weighted digital piano that brings the concert hall to your home. The fully weighted keys with graded hammer action provide realistic piano touch, heavier in the bass and lighter in the treble, just like a real acoustic piano. The piano features multiple high-quality voices including grand piano, electric piano, organ, strings, and more. With advanced sampling technology, each note sounds rich and natural. The USB connectivity allows you to connect to computers for recording and MIDI applications. The built-in metronome, recording function, and lesson modes make it perfect for beginners and professionals alike. Includes a sustain pedal, power adapter, and music rest.',
        image: 'https://picsum.photos/400/300?random=4',
        features: ['88 Weighted Keys', 'Multiple Voices', 'USB Connectivity'],
        stock: 5,
        hotSale: true,
        trending: true
      },
      {
        id: 5,
        name: 'Electric Guitar Package',
        category: 'musical-gadgets',
        price: 349.99,
        discount: 18,
        salePrice: 286.99,
        description: 'Start your musical journey with this complete electric guitar package that includes everything you need to begin playing right away. The package features a solid-body electric guitar with a comfortable neck and smooth fretboard, perfect for beginners and intermediate players. The 20-watt amplifier provides clean and distorted tones, allowing you to explore different musical styles. The package also includes a guitar cable, digital tuner, guitar strap, picks, and a gig bag for protection. The guitar features three single-coil pickups for versatile tone options, a 5-way pickup selector switch, and volume and tone controls. Whether you want to rock out or play blues, this package has you covered.',
        image: 'https://picsum.photos/400/300?random=5',
        features: ['Solid Body', '20W Amp', 'Includes Accessories'],
        stock: 12,
        hotSale: true,
        trending: false
      },
      {
        id: 6,
        name: 'MIDI Keyboard Controller',
        category: 'musical-gadgets',
        price: 149.99,
        discount: 12,
        salePrice: 131.99,
        description: 'Unleash your creativity with this versatile 25-key MIDI keyboard controller designed for music production, live performance, and DJ setups. The velocity-sensitive keys respond to your playing dynamics, allowing for expressive performances. The keyboard features assignable knobs, buttons, and faders for hands-on control of your DAW parameters, virtual instruments, and effects. With USB-powered operation, you can connect directly to your computer without needing an external power supply. The compact size makes it perfect for small studios and portable setups. Compatible with all major DAW software including Ableton Live, FL Studio, Logic Pro, and more. Includes USB cable and software downloads.',
        image: 'https://picsum.photos/400/300?random=6',
        features: ['25 Keys', 'Velocity Sensitive', 'USB Powered'],
        stock: 18,
        hotSale: false,
        trending: false
      },
      
      // Studio Equipment
      {
        id: 7,
        name: 'Audio Interface 2x2',
        category: 'studio-equipment',
        price: 249.99,
        discount: 22,
        salePrice: 194.99,
        description: 'Transform your computer into a professional recording studio with this high-quality 2x2 audio interface designed for musicians, podcasters, and content creators. The interface features two combo inputs that accept both XLR and 1/4" connections, allowing you to record microphones, guitars, and other instruments simultaneously. With 48kHz/24-bit resolution, you capture studio-quality audio with exceptional clarity and detail. The interface includes 48V phantom power for condenser microphones and direct monitoring for zero-latency recording. The rugged metal construction ensures durability for home and mobile recording. Compatible with Windows, Mac, and iOS devices. Includes USB cable and recording software.',
        image: 'https://picsum.photos/400/300?random=7',
        features: ['2 Inputs/2 Outputs', '48kHz/24-bit', 'Phantom Power'],
        stock: 10,
        hotSale: true,
        trending: true
      },
      {
        id: 8,
        name: 'Studio Monitor Speakers',
        category: 'studio-equipment',
        price: 449.99,
        discount: 15,
        salePrice: 382.49,
        description: 'Hear your music exactly as it was meant to be heard with this pair of professional studio monitor speakers designed for accurate sound reproduction and critical listening. The bi-amped design with separate amplifiers for woofers and tweeters ensures precise frequency response and minimal distortion. The speakers feature room correction technology that adapts to your acoustic environment for optimal performance. With XLR and TRS inputs, you can connect to a wide range of audio equipment. The rear-ported bass reflex design delivers deep, tight bass while the silk dome tweeters provide smooth, detailed highs. Perfect for mixing, mastering, and critical listening applications. Includes power cables and acoustic isolation pads.',
        image: 'https://picsum.photos/400/300?random=8',
        features: ['Bi-amped Design', 'Room Correction', 'XLR/TRS Inputs'],
        stock: 6,
        hotSale: false,
        trending: false
      },
      {
        id: 9,
        name: 'Recording Studio Bundle',
        category: 'studio-equipment',
        price: 899.99,
        discount: 30,
        salePrice: 629.99,
        description: 'Create professional-quality recordings at home with this complete recording studio bundle that includes all the essential equipment you need to get started. The bundle features a professional 2x2 audio interface for connecting your instruments and microphones, a large-diaphragm condenser microphone for capturing vocals and acoustic instruments, and studio-quality headphones for monitoring your recordings. Also includes a microphone stand, pop filter, XLR cables, and professional recording software with virtual instruments and effects. Whether you want to record podcasts, music, voice-overs, or streams, this bundle provides everything you need in one convenient package. Perfect for beginners and home studio enthusiasts.',
        image: 'https://picsum.photos/400/300?random=9',
        features: ['Audio Interface', 'Microphone', 'Headphones', 'Software'],
        stock: 4,
        hotSale: true,
        trending: true
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
