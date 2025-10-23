import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

export function useScrollAnimation<T extends HTMLElement>(): [Ref<T | null>, Ref<boolean>] {
  const elementRef = ref<T | null>(null) as Ref<T | null>;
  const isVisible = ref(false);

  let observer: IntersectionObserver | null = null;

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (!entry) return; 
    if (entry.isIntersecting) {
      isVisible.value = true;
      if (elementRef.value && observer) {
        observer.unobserve(elementRef.value);
      }
    }
  };

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '0px',
      threshold: 0.2,
    });

    if (elementRef.value && observer) {
      observer.observe(elementRef.value);
    }
  });

  onUnmounted(() => {
    if (elementRef.value && observer) {
      observer.unobserve(elementRef.value);
    }
    observer = null;
  });

  return [elementRef, isVisible];
}
