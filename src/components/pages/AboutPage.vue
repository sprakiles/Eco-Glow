<script setup lang="ts">
import AnimatedWindow from '../AnimatedWindow.vue';

const timelineEvents = [
  {
    year: '2022',
    title: 'The Spark of an Idea',
    description: "As a designer and engineer, I envisioned a home where technology feels natural and sustainability is a given. Eco-Glow was born from this personal passion.",
    image: 'https://img.freepik.com/premium-photo/person-hands-writing-drawing-paper-sheet-notebook-aesthetic-home-office-workspace-work-home-laptop-computer-stationery-flat-lay-top-view_408798-11425.jpg'
  },
  {
    year: '2023',
    title: 'First Prototype',
    description: 'After months of development in my small workshop, the first Aura Smart Lamp came to life. It was crafted from reclaimed wood and powered by custom smart software I wrote myself.',
    image: 'https://images.ctfassets.net/j4m9q0fykyy4/3N3gR2kga3l7aK9sgtOKCb/49d61a6b547c42eb117deec9b7dba9b4/2021-01-Pourquoi-sequiper-dune-lampe-detabli-scaled.jpg'
  },
  {
    year: '2024',
    title: 'Launching Eco-Glow',
    description: 'I launched my online store with a small collection of three products, committed to my vision of quality, design, and environmental promises.',
    image: 'https://media.istockphoto.com/id/1057253610/photo/small-business-owener.jpg?s=612x612&w=0&k=20&c=kzwpx0f6FjonycJc5brB2jo5VxKRYWM2JjTBzjaMad8='
  },
  {
    year: '2025',
    title: 'A Growing Community',
    description: 'Today, Eco-Glow serves thousands of happy customers, and my mission to blend smart living with sustainability continues to grow stronger every day.',
    image: 'https://i.im.ge/2025/10/22/nZXymY.living.png'
  }
];
</script>

<template>
  <div class="bg-brand-beige py-20">
    <div class="container mx-auto px-4">
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-brand-dark">My Story</h1>
        <p class="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">The journey of how a passion for design and sustainability became Eco-Glow.</p>
      </header>

      <!-- Timeline -->
      <div class="relative max-w-3xl mx-auto">
        <div class="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-brand-green"></div>
        <div v-for="(event, index) in timelineEvents" :key="index" :class="`flex items-center w-full mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`">
          <div :class="`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`">
            <AnimatedWindow>
              <div class="bg-white p-6 rounded-lg shadow-xl">
                <p class="text-brand-green font-bold text-xl mb-1">{{ event.year }}</p>
                <h3 class="text-2xl font-semibold mb-2">{{ event.title }}</h3>
                <img :src="event.image" :alt="event.title" class="rounded-md my-4 aspect-[4/3] object-cover"/>
                <p class="text-gray-600">{{ event.description }}</p>
              </div>
            </AnimatedWindow>
          </div>
        </div>
      </div>

      <!-- Founder Section -->
      <section class="mt-24 text-center">
          <h2 class="text-3xl font-bold mb-10">About the Founder</h2>
          <div class="flex flex-wrap justify-center gap-8">
              <AnimatedWindow class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                  <div class="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
                      <img src="https://i.im.ge/2025/10/22/nZXt1M.Liu-Xiao.jpeg" alt="Founder Jane Doe" class="w-40 h-40 rounded-full mx-auto mb-4 object-cover"/>
                      <h3 class="text-xl font-semibold">Sprakiles</h3>
                      <p class="text-gray-500 mb-4">Founder & Designer</p>
                      <p class="text-gray-600 text-sm">
                        Sprakiles is the creative force behind Eco-Glow, personally designing every product with a focus on minimalist aesthetics and maximum functionality. Her background in environmental science fuels the brand's commitment to sustainability.
                      </p>
                  </div>
              </AnimatedWindow>
          </div>
      </section>
    </div>
  </div>
</template>
