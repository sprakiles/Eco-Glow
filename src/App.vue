<script setup lang="ts">
import { ref, computed, defineAsyncComponent, provide, readonly } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Chatbot from './components/Chatbot.vue';
import type { Page, Product, CartItem } from './types.ts';

const HomePage = defineAsyncComponent(() => import('./components/pages/HomePage.vue'));
const ProductsPage = defineAsyncComponent(() => import('./components/pages/ProductsPage.vue'));
const ProductDetailPage = defineAsyncComponent(() => import('./components/pages/ProductDetailPage.vue'));
const AboutPage = defineAsyncComponent(() => import('./components/pages/AboutPage.vue'));
const CheckoutPage = defineAsyncComponent(() => import('./components/pages/CheckoutPage.vue'));

const currentPage = ref<Page>('home');
const selectedProductId = ref<number | null>(null);

// --- Cart State Management ---
const cart = ref<CartItem[]>([]);

const addToCart = (product: Product, variant?: string) => {
  const existingItem = cart.value.find(item => item.id === product.id && item.selectedVariant === variant);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.value.push({ ...product, quantity: 1, selectedVariant: variant });
  }
};

const removeFromCart = (productId: number, variant?: string) => {
  const index = cart.value.findIndex(item => item.id === productId && item.selectedVariant === variant);
  if (index !== -1) {
    cart.value.splice(index, 1);
  }
};

const updateQuantity = (productId: number, newQuantity: number, variant?: string) => {
  const item = cart.value.find(item => item.id === productId && item.selectedVariant === variant);
  if (item) {
    if (newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      removeFromCart(productId, variant);
    }
  }
};

provide('cart', readonly(cart));
provide('addToCart', addToCart);
provide('removeFromCart', removeFromCart);
provide('updateQuantity', updateQuantity);
// ----------------------------

const navigateTo = (page: Page) => {
  currentPage.value = page;
  window.scrollTo(0, 0);
};

const viewProduct = (productId: number) => {
  selectedProductId.value = productId;
  navigateTo('productDetail');
};

const pageComponents = {
  home: HomePage,
  products: ProductsPage,
  productDetail: ProductDetailPage,
  about: AboutPage,
  checkout: CheckoutPage
};

const activeComponent = computed(() => {
    if (currentPage.value === 'productDetail' && !selectedProductId.value) {
        return ProductsPage;
    }
    return pageComponents[currentPage.value] || HomePage;
});

const componentProps = computed(() => {
    switch(currentPage.value) {
        case 'home':
            return { navigateTo: navigateTo, viewProduct: viewProduct };
        case 'products':
            return { viewProduct: viewProduct };
        case 'productDetail':
             return selectedProductId.value ? { productId: selectedProductId.value, navigateTo: navigateTo } : { viewProduct: viewProduct };
        case 'checkout':
            return { navigateTo: navigateTo };
        case 'about':
            return {};
        default:
            return { navigateTo: navigateTo, viewProduct: viewProduct };
    }
});
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans">
    <Header :navigateTo="navigateTo" />
    <main class="flex-grow">
      <component :is="activeComponent" v-bind="componentProps" />
    </main>
    <Chatbot />
    <Footer :navigateTo="navigateTo" />
  </div>
</template>
