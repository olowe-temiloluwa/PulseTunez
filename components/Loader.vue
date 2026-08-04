<template>
  <div class="flex flex-col items-center justify-center" :class="containerClass">
    <div class="relative">
      <div 
        class="rounded-full animate-spin"
        :class="spinnerClass"
        :style="spinnerStyle"
      ></div>
      <div 
        v-if="!small"
        class="absolute top-0 left-0 rounded-full animate-pulse"
        :class="innerSpinnerClass"
        :style="innerSpinnerStyle"
      ></div>
    </div>
    <p v-if="text" class="mt-4 text-gray-600 dark:text-gray-300 font-medium" :class="textClass">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'white', 'gray'].includes(value)
  },
  text: {
    type: String,
    default: ''
  },
  small: {
    type: Boolean,
    default: false
  },
  fullScreen: {
    type: Boolean,
    default: false
  }
})

const sizeConfig = {
  sm: { width: '24px', height: '24px', borderWidth: '2px' },
  md: { width: '40px', height: '40px', borderWidth: '3px' },
  lg: { width: '56px', height: '56px', borderWidth: '4px' },
  xl: { width: '72px', height: '72px', borderWidth: '5px' }
}

const colorConfig = {
  blue: {
    spinner: 'border-blue-200 dark:border-blue-800',
    inner: 'border-t-blue-600 dark:border-t-blue-400'
  },
  white: {
    spinner: 'border-white/30',
    inner: 'border-t-white'
  },
  gray: {
    spinner: 'border-gray-200 dark:border-gray-700',
    inner: 'border-t-gray-600 dark:border-t-gray-400'
  }
}

const spinnerStyle = computed(() => {
  const config = sizeConfig[props.size]
  return {
    width: config.width,
    height: config.height,
    borderWidth: config.borderWidth
  }
})

const innerSpinnerStyle = computed(() => {
  const config = sizeConfig[props.size]
  const innerSize = parseInt(config.width) * 0.7
  const innerBorder = parseInt(config.borderWidth) * 0.8
  return {
    width: `${innerSize}px`,
    height: `${innerSize}px`,
    borderWidth: `${innerBorder}px`,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
})

const spinnerClass = computed(() => {
  return `border ${colorConfig[props.color].spinner} border-t-transparent`
})

const innerSpinnerClass = computed(() => {
  return `border ${colorConfig[props.color].inner} border-transparent`
})

const containerClass = computed(() => {
  if (props.fullScreen) {
    return 'fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50'
  }
  return ''
})

const textClass = computed(() => {
  if (props.size === 'sm') return 'text-sm'
  if (props.size === 'lg') return 'text-lg'
  if (props.size === 'xl') return 'text-xl'
  return 'text-base'
})
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
