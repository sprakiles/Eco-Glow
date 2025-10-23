<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { sendMessageToAI, startChat } from '@/services/geminiService';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const isOpen = ref(false);
const messages = ref<Message[]>([]);
const userInput = ref('');
const isLoading = ref(false);
const chatBodyRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  startChat();
  messages.value = [{ text: "Hi! I'm the Eco-Glow assistant. How can I help you?", sender: 'bot' }];
});

watch(messages, () => {
  if (chatBodyRef.value) {
    chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight;
  }
}, { deep: true, flush: 'post' });

const handleSendMessage = async () => {
  if (!userInput.value.trim()) return;

  const newUserMessage: Message = { text: userInput.value, sender: 'user' };
  messages.value.push(newUserMessage);
  userInput.value = '';
  isLoading.value = true;

  try {
    const botResponse = await sendMessageToAI(newUserMessage.text);
    const newBotMessage: Message = { text: botResponse, sender: 'bot' };
    messages.value.push(newBotMessage);
  } catch (error) {
    const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' };
    messages.value.push(errorMessage);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="fixed bottom-6 right-6 z-50">
      <button
        @click="isOpen = !isOpen"
        class="bg-brand-green text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-transform transform hover:scale-110"
        aria-label="Toggle Chatbot"
      >
        <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      </button>
    </div>

    <div :class="`fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`">
      <div class="bg-brand-green text-white p-4">
        <h3 class="font-bold text-lg">Eco-Glow Assistant</h3>
      </div>
      <div ref="chatBodyRef" class="h-96 p-4 overflow-y-auto space-y-4">
        <div v-for="(msg, index) in messages" :key="index" :class="`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`">
          <div :class="`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-green text-white rounded-br-none' : 'bg-gray-200 text-brand-dark rounded-bl-none'}`">
            <p class="text-sm">{{ msg.text }}</p>
          </div>
        </div>
        <div v-if="isLoading" class="flex justify-start">
          <div class="bg-gray-200 text-brand-dark rounded-2xl rounded-bl-none px-4 py-2">
            <div class="flex items-center space-x-1">
                <span class="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                <span class="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                <span class="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="handleSendMessage" class="p-4 border-t border-gray-200">
        <div class="flex">
          <input
            type="text"
            v-model="userInput"
            placeholder="Ask a question..."
            class="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-green"
            :disabled="isLoading"
          />
          <button type="submit" class="bg-brand-green text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 disabled:bg-gray-400" :disabled="isLoading">
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</template>