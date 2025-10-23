<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{
  productImage: string;
}>();

const emit = defineEmits(['close']);

const videoRef = ref<HTMLVideoElement | null>(null);
const error = ref<string | null>(null);

let stream: MediaStream | null = null;

onMounted(async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    if (videoRef.value) {
      videoRef.value.srcObject = stream;
    }
  } catch (err) {
    console.error("Error accessing camera: ", err);
    error.value = "Could not access the camera. Please ensure you have given permission.";
  }
});

onUnmounted(() => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
});
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
    <div class="relative w-full h-full max-w-4xl max-h-[80vh]">
      <video ref="videoRef" autoplay playsinline class="w-full h-full object-cover rounded-lg"></video>
      <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-4 text-center">{{ error }}</div>
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img :src="productImage" alt="Product in AR" class="w-1/2 h-1/2 object-contain opacity-80" />
      </div>
      <button @click="emit('close')" class="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold z-10">
        &times;
      </button>
      <div class="absolute bottom-4 left-4 right-4 text-white text-center bg-black/50 p-2 rounded-md">
          Move your camera to see the product in your space.
      </div>
    </div>
  </div>
</template>
