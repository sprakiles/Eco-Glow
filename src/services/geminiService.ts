import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getAI = () => {
  if (!ai) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Gemini API key not found and Chatbot disabled.");
      return {
        chats: {
          create: () => ({
            sendMessage: async () => ({ text: "Chatbot unavailable." })
          })
        }
      } as unknown as GoogleGenAI;
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const startChat = () => {
  try {
    const genAI = getAI();
    chat = genAI.chats.create({
      model: "gemini-flash-latest",
      config: {
        systemInstruction: `
          You are a friendly and knowledgeable customer support assistant for Eco-Glow,
          a brand specializing in smart, sustainable home decor.
          Your goal is to help users with their questions, provide product recommendations,
          and guide them through the website.
          Be concise and helpful. When recommending products, mention their key features
          and sustainable aspects.
          The available products are: Aura Smart Lamp, Terra Smart Shelf, Oasis Smart Planter,
          and Canva Digital Art Frame.
        `,
      },
    });
  } catch (error) {
    console.error("Failed to start chat session:", error);
    throw error;
  }
};

export const sendMessageToAI = async (message: string): Promise<string> => {
  if (!chat) {
    startChat();
  }

  if (!chat) {
    return "Sorry, I am unable to connect to the chat service at the moment.";
  }

  try {
    const response = await chat.sendMessage({ message });
    return response.text ?? "";
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return "Sorry, something went wrong while processing your request.";
  }
};
