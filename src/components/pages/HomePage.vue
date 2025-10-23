<script setup lang="ts">
import { ref, inject } from 'vue';
import  type { Page, Product } from '../../types.ts';
import  { PRODUCTS } from '@/constants.ts';
import AnimatedWindow from '../AnimatedWindow.vue';
import Modal from '../Modal.vue';

const props = defineProps<{
  navigateTo: (page: Page) => void;
  viewProduct: (productId: number) => void;
}>();

const quickViewProduct = ref<Product | null>(null);

const addToCart = inject<(product: Product) => void>('addToCart');

const featuredProducts = PRODUCTS.slice(0, 4);

const galleryImages = [
  { src: 'https://i.im.ge/2025/10/22/nZX2oT.wmremove-transformed-2.png', alt: 'Aura Smart Lamp in a cozy living room setting' },
  { src: 'https://i.im.ge/2025/10/22/nZXdYL.wmremove-transformed-3.png', alt: 'Terra Smart Shelf displaying decor in a modern office' },
  { src: 'https://i.im.ge/2025/10/22/nZXq4G.Generated-Image-October-21-2025-7-33PM-2.png', alt: 'Oasis Smart Planter on a bright kitchen counter' },
  { src: 'https://i.im.ge/2025/10/22/nZXhWz.canva.png', alt: 'Canva Digital Art Frame showing classic art in a hallway' },
  { src: 'https://i.im.ge/2025/10/22/nZXUmS.DeWatermark-ai-1761064972500.jpeg', alt: 'A person interacting with the Aura Smart Lamp' },
  { src: 'https://i.im.ge/2025/10/22/nZXwaX.smart.png', alt: 'The Terra Smart Shelf charging a phone wirelessly' },
];

const handleViewFullDetails = (product: Product) => {
  const productId = product.id;
  quickViewProduct.value = null;
  props.viewProduct(productId);
};

const handleAddToCartFromQuickView = () => {
  if (quickViewProduct.value && addToCart) {
    addToCart(quickViewProduct.value);
  }
  quickViewProduct.value = null;
};

</script>

<template>
  <div class="overflow-x-hidden">
    <!-- Main Window -->
    <section class="relative h-screen flex items-center justify-center text-center text-white">
      <video
        autoplay
        loop
        muted
        playsinline
        class="absolute top-0 left-0 w-full h-full object-cover -z-10"
        poster="https://i.im.ge/2025/10/23/nZkspK.DeWatermark-ai-1761219841484.jpeg"
      >
        <!-- A real implementation would have a video source here -->
      </video>
      <div class="absolute inset-0 bg-black opacity-40"></div>
      <div class="z-10 p-4">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Eco-Glow</h1>
        <p class="text-lg md:text-2xl mb-8">Smart, Sustainable Decor for Modern Living.</p>
        <button
          @click="navigateTo('products')"
          class="bg-brand-green hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300"
        >
          Shop Now
        </button>
      </div>
    </section>

    <!-- Featured Products Window -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <AnimatedWindow>
          <h2 class="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div class="flex space-x-8 pb-8 overflow-x-auto">
            <div v-for="product in featuredProducts" :key="product.id" class="flex-shrink-0 w-80 md:w-96 group">
              <div class="bg-gray-100 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                <div class="relative">
                  <img :src="product.images.default" :alt="product.name" class="w-full h-96 object-cover" />
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center space-x-2 p-4">
                    <button @click="quickViewProduct = product" class="text-white bg-brand-dark bg-opacity-70 hover:bg-opacity-100 py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">
                      Quick View
                    </button>
                    <button @click="viewProduct(product.id)" class="text-white bg-brand-green py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 [transition-delay:100ms] text-sm">
                      Customize
                    </button>
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-semibold">{{ product.name }}</h3>
                  <p class="text-brand-green font-bold mt-2">${{ product.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedWindow>
      </div>
    </section>

    <!-- Our Mission Window -->
    <section class="bg-brand-beige">
      <AnimatedWindow class="container mx-auto px-4 py-20">
          <div class="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-xl overflow-hidden">
              <div class="md:w-1/2">
                  <img src="https://i.im.ge/2025/10/22/nZXOW0.wmremove-transformed-1.png" alt="A glowing crystal in a terrarium, symbolizing the harmony of technology and nature." class="w-full h-full object-cover" />
              </div>
              <div class="md:w-1/2 p-8 md:p-12 lg:p-16">
                  <h2 class="text-3xl font-bold mb-4">Our Mission</h2>
                  <p class="text-lg text-gray-600 leading-relaxed">
                      We believe in a future where technology and nature coexist. Our products are sustainably sourced and smartly designed.
                  </p>
              </div>
          </div>
      </AnimatedWindow>
    </section>

    <!-- Inspiration Gallery -->
    <section class="py-20 bg-white">
        <AnimatedWindow class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-4">Inspiration Gallery</h2>
          <p class="mb-12 text-lg text-gray-600 max-w-3xl mx-auto">See how our customers are styling Eco-Glow products in their own homes. A testament to versatile design and sustainable living.</p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div v-for="(image, index) in galleryImages" :key="index" class="overflow-hidden rounded-lg shadow-lg group h-64 md:h-80">
                  <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
              </div>
          </div>
        </AnimatedWindow>
    </section>
    
    <Modal v-if="quickViewProduct" @close="quickViewProduct = null">
      <div class="flex flex-col md:flex-row gap-8 p-4">
        <img :src="quickViewProduct.images.default" :alt="quickViewProduct.name" class="w-full md:w-1/2 h-auto object-cover rounded-lg"/>
        <div class="md:w-1/2 flex flex-col justify-center">
          <h2 class="text-3xl font-bold">{{ quickViewProduct.name }}</h2>
          <p class="text-2xl font-semibold text-brand-green my-4">${{ quickViewProduct.price }}</p>
          <p class="text-gray-600 mb-6">{{ quickViewProduct.shortDescription }}</p>
          <div class="space-y-4">
              <button @click="handleAddToCartFromQuickView" class="w-full bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-opacity-90">Add to Cart</button>
              <button @click="handleViewFullDetails(quickViewProduct)" class="w-full bg-gray-200 text-brand-dark py-3 rounded-lg font-semibold hover:bg-gray-300">View Full Details</button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
