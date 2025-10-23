<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import type { Ref } from 'vue';
import type { Page, CartItem } from '../types.ts';

defineProps<{
  navigateTo: (page: Page) => void;
}>();

const isMenuOpen = ref(false);

const cart = inject<Ref<Readonly<CartItem[]>>>('cart', ref([]));
const cartItemCount = computed(() => {
    if (!cart.value) return 0;
    return cart.value.reduce((sum, item) => sum + item.quantity, 0)
});

const handleNavLinkClick = (page: Page, navigateFunc: (page: Page) => void) => {
    navigateFunc(page);
    isMenuOpen.value = false;
};
</script>

<template>
    <header class="sticky top-0 z-50 bg-brand-beige/80 backdrop-blur-lg shadow-sm">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex-shrink-0">
            <button @click="navigateTo('home')" class="text-2xl font-bold text-brand-green tracking-wider">
              Eco-Glow
            </button>
          </div>
          <nav class="hidden md:flex items-center space-x-8">
            <button @click="navigateTo('home')" class="text-brand-dark hover:text-brand-green transition-colors duration-300 py-2">Home</button>
            <button @click="navigateTo('products')" class="text-brand-dark hover:text-brand-green transition-colors duration-300 py-2">Shop</button>
            <button @click="navigateTo('about')" class="text-brand-dark hover:text-brand-green transition-colors duration-300 py-2">About Me</button>
          </nav>
          <div class="flex items-center">
            <button @click="navigateTo('checkout')" class="relative mr-4 text-brand-dark hover:text-brand-green transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span v-if="cartItemCount > 0" class="absolute -top-2 -right-2 bg-brand-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {{ cartItemCount }}
              </span>
            </button>
            <div class="md:hidden">
              <button @click="isMenuOpen = !isMenuOpen" class="text-brand-dark focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path v-if="isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div v-if="isMenuOpen" class="md:hidden pb-4">
          <nav class="flex flex-col items-center space-y-4">
             <button @click="handleNavLinkClick('home', navigateTo)" class="text-brand-dark hover:text-brand-green transition-colors duration-300 py-2">Home</button>
             <button @click="handleNavLinkClick('products', navigateTo)" class="text-brand-dark hover:text-brand-green transition-colors duration-300 py-2">Shop</button>
             <button @click="handleNavLinkClick('about', navigateTo)" class="text-brand-dark hover:text-brand-green transition-colors duration-300 py-2">About Me</button>
          </nav>
        </div>
      </div>
    </header>
</template>
