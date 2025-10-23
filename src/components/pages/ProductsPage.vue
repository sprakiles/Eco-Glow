<script setup lang="ts">
import { reactive, computed, inject } from 'vue';
import type { Product } from '../../types.ts';
import { PRODUCTS } from '../../constants';
import AnimatedWindow from '../AnimatedWindow.vue';
import CustomDropdown from '../CustomDropdown.vue';

defineProps<{
  viewProduct: (productId: number) => void;
}>();

const filters = reactive({ category: 'All', material: 'All', feature: 'All' });

const addToCart = inject<(product: Product) => void>('addToCart');

const handleAddToCart = (product: Product) => {
    if (addToCart) {
        addToCart(product);
    }
};

const filteredProducts = computed(() => {
  return PRODUCTS.filter(product => {
    const categoryMatch = filters.category === 'All' || product.category === filters.category;
    const materialMatch = filters.material === 'All' || product.material === filters.material;
    const featureMatch = filters.feature === 'All' || product.smartFeatures.includes(filters.feature);
    return categoryMatch && materialMatch && featureMatch;
  });
});

const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
const materials = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.material)))];
const features = ['All', ...Array.from(new Set(PRODUCTS.flatMap(p => p.smartFeatures)))];

</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold text-brand-dark">Our Collection</h1>
        <p class="text-lg text-gray-600 mt-2">Discover our range of smart and sustainable products.</p>
      </header>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Filters Sidebar -->
        <aside class="md:w-1/4 lg:w-1/5">
          <div class="sticky top-24 bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-xl font-bold mb-4">Filters</h2>
            <div class="space-y-6">
              <CustomDropdown
                label="Category"
                name="category"
                :options="categories"
                v-model:value="filters.category"
              />
              <CustomDropdown
                label="Material"
                name="material"
                :options="materials"
                v-model:value="filters.material"
              />
              <CustomDropdown
                label="Smart Features"
                name="feature"
                :options="features"
                v-model:value="filters.feature"
              />
            </div>
          </div>
        </aside>

        <!-- Products Grid -->
        <main class="md:w-3/4 lg:w-4/5">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedWindow v-for="product in filteredProducts" :key="product.id" class="group">
              <div @click="viewProduct(product.id)" class="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl cursor-pointer">
                <div class="relative overflow-hidden">
                  <img :src="product.images.default" :alt="product.name" class="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center space-x-2 p-4">
                    <button @click.stop="handleAddToCart(product)" class="text-white bg-brand-dark bg-opacity-70 hover:bg-opacity-100 py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">
                      Add to Cart
                    </button>
                    <button @click.stop="viewProduct(product.id)" class="text-white bg-brand-green py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 [transition-delay:100ms] text-sm">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="text-lg font-semibold truncate">{{ product.name }}</h3>
                  <p class="text-brand-green font-bold mt-1">${{ product.price.toFixed(2) }}</p>
                </div>
              </div>
            </AnimatedWindow>
          </div>
          <div v-if="filteredProducts.length === 0" class="col-span-full text-center py-16">
            <p class="text-gray-500">No products match your criteria.</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
