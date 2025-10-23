<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import type { Ref } from 'vue';
import type { Page, CartItem } from '../../types.ts';

defineProps<{
  navigateTo: (page: Page) => void;
}>();

const cart = inject<Ref<Readonly<CartItem[]>>>('cart', ref([]));
const updateQuantity = inject<(productId: number, quantity: number, variant?: string) => void>('updateQuantity');
const removeFromCart = inject<(productId: number, variant?: string) => void>('removeFromCart');

const handleUpdateQuantity = (item: CartItem, event: Event) => {
    if (updateQuantity) {
        const newQuantity = parseInt((event.target as HTMLInputElement).value, 10);
        if(!isNaN(newQuantity)) {
            updateQuantity(item.id, newQuantity, item.selectedVariant);
        }
    }
};

const handleRemoveItem = (item: CartItem) => {
    if(removeFromCart) {
        removeFromCart(item.id, item.selectedVariant);
    }
};

const subtotal = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0));
const shipping = computed(() => (subtotal.value > 0 ? 15.00 : 0));
const total = computed(() => subtotal.value + shipping.value);
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-12 md:py-20">
    <div class="container mx-auto px-4">
      <h1 class="text-center text-4xl font-bold mb-10">Checkout</h1>
      <div v-if="cart.length === 0" class="text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-gray-700">Your cart is empty.</h2>
          <p class="text-gray-500 mt-2 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <button @click="navigateTo('products')" class="bg-brand-green text-white py-3 px-8 rounded-lg font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-105">
            Continue Shopping
          </button>
      </div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Shipping & Payment Form -->
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <form @submit.prevent>
            <h2 class="text-2xl font-semibold mb-6">Shipping Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" class="p-3 border rounded-md" />
              <input type="text" placeholder="Last Name" class="p-3 border rounded-md" />
              <input type="email" placeholder="Email" class="p-3 border rounded-md md:col-span-2" />
              <input type="text" placeholder="Address" class="p-3 border rounded-md md:col-span-2" />
              <input type="text" placeholder="City" class="p-3 border rounded-md" />
              <input type="text" placeholder="State / Province" class="p-3 border rounded-md" />
              <input type="text" placeholder="Zip / Postal Code" class="p-3 border rounded-md" />
              <input type="text" placeholder="Country" class="p-3 border rounded-md" />
            </div>
            <h2 class="text-2xl font-semibold mt-8 mb-6">Payment Details</h2>
            <div class="space-y-4">
                <input type="text" placeholder="Card Number" class="p-3 border rounded-md w-full" />
                <input type="text" placeholder="Name on Card" class="p-3 border rounded-md w-full" />
                <div class="flex gap-4">
                  <input type="text" placeholder="MM / YY" class="p-3 border rounded-md w-1/2" />
                  <input type="text" placeholder="CVV" class="p-3 border rounded-md w-1/2" />
                </div>
            </div>
            <button type="submit" class="w-full bg-brand-green text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 text-lg mt-8">
              Pay ${{ total.toFixed(2) }}
            </button>
          </form>
        </div>
        <!-- Order Summary -->
        <div class="bg-white p-8 rounded-lg shadow-lg h-fit sticky top-24">
          <h2 class="text-2xl font-semibold mb-6">Order Summary</h2>
          <div class="space-y-4">
            <div v-for="item in cart" :key="`${item.id}-${item.selectedVariant}`" class="flex justify-between items-start">
              <div class="flex items-start gap-4">
                <img :src="item.selectedVariant ? item.images.variants[item.selectedVariant] : item.images.default" :alt="item.name" class="w-20 h-20 rounded-md object-cover" />
                <div>
                  <p class="font-semibold">{{ item.name }}</p>
                  <p v-if="item.selectedVariant" class="text-sm text-gray-500">{{ item.selectedVariant }}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <label :for="`quantity-${item.id}`" class="text-sm text-gray-500">Qty:</label>
                    <input :id="`quantity-${item.id}`" type="number" :value="item.quantity" @input="handleUpdateQuantity(item, $event)" min="1" class="w-16 border rounded-md text-center p-1" />
                  </div>
                   <button @click="handleRemoveItem(item)" class="text-red-500 hover:text-red-700 text-sm mt-1 font-medium">Remove</button>
                </div>
              </div>
              <p class="font-semibold whitespace-nowrap">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
          </div>
          <div class="border-t my-6"></div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <p>Subtotal</p>
              <p>${{ subtotal.toFixed(2) }}</p>
            </div>
            <div class="flex justify-between">
              <p>Shipping</p>
              <p>${{ shipping.toFixed(2) }}</p>
            </div>
          </div>
          <div class="border-t my-6"></div>
          <div class="flex justify-between font-bold text-xl">
            <p>Total</p>
            <p>${{ total.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
