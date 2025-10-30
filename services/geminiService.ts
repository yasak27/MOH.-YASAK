
import { GoogleGenAI, Chat } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined. Please set it in your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const createChatSession = (systemInstruction: string): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
};

const sendMessage = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw new Error("Failed to get response from AI service.");
  }
};

export const geminiService = {
  createChatSession,
  sendMessage,
};
