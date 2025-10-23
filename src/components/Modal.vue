<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['close']);

const handleEsc = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close');
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleEsc);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc);
});
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
    @click="emit('close')"
  >
    <div
      class="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <div class="relative">
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
