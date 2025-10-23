<script setup lang="ts">
import { useScrollAnimation } from '../hooks/useScrollAnimation';

defineProps<{
  className?: string;
}>();

const [elementRef, isVisible] = useScrollAnimation<HTMLDivElement>();
</script>

<template>
  <div
    ref="elementRef"
    :class="[
      'transition-all duration-1000 ease-out',
      className,
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    ]"
  >
    <slot></slot>
  </div>
</template>
