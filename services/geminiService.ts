import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

// Initialize the API client
const apiKey = process.env.API_KEY || ''; 
// Note: In a real app, we'd handle the missing key more gracefully in the UI. 
// For this demo, we assume the environment injects it.

const ai = new GoogleGenAI({ apiKey });

const PRODUCT_CONTEXT = PRODUCTS.map(p => 
  `ID: ${p.id}, Name: ${p.title}, Price: $${p.price}, Category: ${p.category}, Description: ${p.description}`
).join('\n');

const SYSTEM_INSTRUCTION = `
You are "Mind", the intelligent concierge for MindCraft, a digital store for personal growth tools.
Your goal is to help users find the perfect product for their self-improvement needs.

Here is our product catalog:
${PRODUCT_CONTEXT}

Rules:
1. Be concise, empathetic, and professional. Tone: Sophisticated, intellectual, helpful.
2. If a user describes a problem (e.g., "I'm overwhelmed", "I can't focus"), recommend 1-2 specific products from the catalog that solve it.
3. Explain *why* you are recommending the product.
4. If the user asks about something unrelated to productivity, knowledge management, or our products, politely steer them back.
5. Do not invent products. Only recommend what is in the list.
6. Keep responses under 100 words unless detailed advice is requested.
`;

export const sendMessageToGemini = async (history: {role: 'user' | 'model', text: string}[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I apologize, I'm having trouble connecting to my knowledge base right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline. Please try again later.";
  }
};
