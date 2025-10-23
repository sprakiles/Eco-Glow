<script setup lang="ts">
import type { Page } from '../types.ts';

defineProps<{
  navigateTo: (page: Page) => void;
}>();
</script>

<template>
  <footer class="bg-brand-dark text-white">
    <div class="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold">Eco-Glow</h3>
          <p class="mt-2 text-sm text-gray-300">Smart, Sustainable Decor for Modern Living.</p>
        </div>
        <div>
          <h3 class="text-sm font-semibold tracking-wider uppercase">Quick Links</h3>
          <ul class="mt-4 space-y-2">
            <li><button @click="navigateTo('home')" class="text-sm text-gray-300 hover:text-white">Home</button></li>
            <li><button @click="navigateTo('products')" class="text-sm text-gray-300 hover:text-white">Shop</button></li>
            <li><button @click="navigateTo('about')" class="text-sm text-gray-300 hover:text-white">About Me</button></li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold tracking-wider uppercase">Contact</h3>
          <ul class="mt-4 space-y-2 text-sm text-gray-300">
            <li>123 Eco Lane, Green City</li>
            <li>contact@ecoglow.com</li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold tracking-wider uppercase">Newsletter</h3>
          <p class="mt-4 text-sm text-gray-300">Subscribe for updates and promotions.</p>
          <form class="mt-2 flex">
            <input type="email" placeholder="Your email" class="w-full px-2 py-1 text-gray-800 rounded-l-md focus:outline-none"/>
            <button type="submit" class="px-4 py-1 bg-brand-green rounded-r-md hover:bg-opacity-80">Go</button>
          </form>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Eco-Glow. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
