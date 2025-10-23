<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{
  name: string;
  options: string[];
  value: string;
  label: string;
}>();

const emit = defineEmits(['update:value']);

const isOpen = ref(false);
const dropdownRef = ref<HTMLDivElement | null>(null);

const handleSelect = (option: string) => {
  emit('update:value', option);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <div>
    <label :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div ref="dropdownRef" class="relative mt-1">
      <button
        type="button"
        :id="name"
        class="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
        @click="isOpen = !isOpen"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
      >
        <span class="block truncate">{{ value }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg :class="`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>

      <ul v-if="isOpen" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <li
          v-for="option in options"
          :key="option"
          :class="`relative cursor-pointer select-none py-2 px-3 pr-9 text-gray-900 transition-colors duration-150 hover:font-bold hover:text-brand-green ${value === option ? 'font-bold text-brand-green' : ''}`"
          @click="handleSelect(option)"
          role="option"
          :aria-selected="value === option"
        >
          <span class="block truncate">{{ option }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
