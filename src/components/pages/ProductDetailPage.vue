<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue';
import type { Page, Product } from '@/types';
import { PRODUCTS } from '@/constants.ts';
import AnimatedWindow from '@/components/AnimatedWindow.vue';

const props = defineProps<{
  productId: number;
  navigateTo: (page: Page) => void;
}>();

type Tab = 'Description' | 'Specifications' | 'Sustainability Impact';

/** Ensure computed has an explicit type so `p` is not `any` */
const product = computed<Product | undefined>(() =>
  PRODUCTS.find((p: Product) => p.id === props.productId)
);

/** addToCart may be undefined if not provided via provide() */
const addToCart = inject<(product: Product, variant?: string) => void>('addToCart');

const mainImage = ref<string>('');
const activeTab = ref<Tab>('Description');
const selectedVariant = ref<string>('');

/** watch product and set safe defaults using ?? */
watch(
  product,
  (newProduct) => {
    // images.default might be undefined - use ?? to default to empty string
    mainImage.value = newProduct?.images?.default ?? '';
    activeTab.value = 'Description';

    if (newProduct?.images?.variants && Object.keys(newProduct.images.variants).length > 0) {
      const variants = Object.keys(newProduct.images.variants);
      selectedVariant.value = variants[0] ?? '';
    } else {
      selectedVariant.value = '';
    }
  },
  { immediate: true }
);

/** computed customization options (safe access) */
const customizationOptions = computed<string[]>(() => {
  const variants = product.value?.images?.variants;
  return variants ? Object.keys(variants) : [];
});

/** handleVariantClick uses ?? when indexing (index might return undefined) */
const handleVariantClick = (option: string) => {
  const img = product.value?.images?.variants?.[option] ?? '';
  mainImage.value = img;
  selectedVariant.value = option;
};

const handleAddToCart = () => {
  if (addToCart && product.value) {
    addToCart(product.value, selectedVariant.value || undefined);
  }
};
</script>

<template>
  <div v-if="product" class="bg-white py-12 md:py-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Image Window -->
        <AnimatedWindow>
          <div>
            <img
              :src="mainImage"
              :alt="product.name"
              class="w-full rounded-lg shadow-xl aspect-square object-cover"
            />
          </div>
        </AnimatedWindow>

        <!-- Customization & Details Window -->
        <AnimatedWindow>
          <h1 class="text-4xl font-bold">{{ product.name }}</h1>
          <p class="text-3xl text-brand-green my-4 font-semibold">
            ${{ product.price.toFixed(2) }}
          </p>
          <p class="text-gray-600 leading-relaxed">{{ product.shortDescription }}</p>

          <!-- Customization -->
          <div class="my-8">
            <h3 class="text-lg font-semibold mb-2">
              {{ customizationOptions.length > 0 ? 'Choose your finish' : 'Details' }}
            </h3>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="option in customizationOptions"
                :key="option"
                @click="handleVariantClick(option)"
                :class="`px-4 py-2 border rounded-full text-sm transition-colors ${selectedVariant === option ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'}`"
              >
                {{ option }}
              </button>
            </div>
          </div>

          <button
            @click="handleAddToCart"
            class="w-full bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 text-lg"
          >
            Add to Cart
          </button>

          <!-- Tabs -->
          <div class="mt-10">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  v-for="tab in (['Description', 'Specifications', 'Sustainability Impact'] as Tab[])"
                  :key="tab"
                  @click="activeTab = tab"
                  :class="`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`"
                >
                  {{ tab }}
                </button>
              </nav>
            </div>
            <div class="py-6 text-gray-600">
              <p v-if="activeTab === 'Description'">{{ product.description }}</p>
              <ul v-if="activeTab === 'Specifications'" class="list-disc list-inside space-y-2">
                <li v-for="(value, key) in product.specifications" :key="key">
                  <strong>{{ key }}:</strong> {{ value }}
                </li>
              </ul>
              <p v-if="activeTab === 'Sustainability Impact'">{{ product.sustainabilityImpact }}</p>
            </div>
          </div>
        </AnimatedWindow>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-20">
    Product not found.
    <button @click="navigateTo('products')" class="text-brand-green underline">Go to products</button>
  </div>
</template>
