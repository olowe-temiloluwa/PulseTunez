<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="handleClose"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        <!-- Modal -->
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
          <!-- Icon -->
          <div class="flex justify-center mb-4">
            <div 
              class="w-16 h-16 rounded-full flex items-center justify-center"
              :class="iconBgClass"
            >
              <Icon :name="icon" :class="iconClass" class="w-8 h-8" />
            </div>
          </div>
          
          <!-- Title -->
          <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
            {{ title }}
          </h3>
          
          <!-- Message -->
          <p class="text-gray-600 dark:text-gray-300 text-center mb-6">
            {{ message }}
          </p>
          
          <!-- Button -->
          <button
            @click="handleClose"
            class="w-full px-4 py-3 rounded-lg transition-colors font-medium"
            :class="buttonClass"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: {
    type: String,
    default: 'Success'
  },
  message: {
    type: String,
    default: 'Operation completed successfully.'
  },
  buttonText: {
    type: String,
    default: 'OK'
  }
})

const emit = defineEmits(['close'])

const typeConfig = {
  success: {
    icon: 'heroicons:check-circle',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconClass: 'text-green-600 dark:text-green-400',
    buttonClass: 'bg-green-600 hover:bg-green-700 text-white'
  },
  error: {
    icon: 'heroicons:x-circle',
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconClass: 'text-red-600 dark:text-red-400',
    buttonClass: 'bg-red-600 hover:bg-red-700 text-white'
  },
  warning: {
    icon: 'heroicons:exclamation-triangle',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconClass: 'text-yellow-600 dark:text-yellow-400',
    buttonClass: 'bg-yellow-600 hover:bg-yellow-700 text-white'
  },
  info: {
    icon: 'heroicons:information-circle',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconClass: 'text-blue-600 dark:text-blue-400',
    buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white'
  }
}

const icon = computed(() => typeConfig[props.type].icon)
const iconBgClass = computed(() => typeConfig[props.type].iconBg)
const iconClass = computed(() => typeConfig[props.type].iconClass)
const buttonClass = computed(() => typeConfig[props.type].buttonClass)

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>
