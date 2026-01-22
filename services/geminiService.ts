import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

// Lazy-load the API client to prevent app crashes when API key is missing
let ai: any = null;

const getApiKey = (): string | null => {
  return process.env.API_KEY || process.env.GEMINI_API_KEY || null;
};

const initializeAI = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

const PRODUCT_CONTEXT = PRODUCTS.map(p => 
  `ID: ${p.id}, Name: ${p.title}, Price: $${p.price}, Category: ${p.category}, Description: ${p.description}`
).join('\n');

const SYSTEM_INSTRUCTION = `
You are "Mind", the intelligent concierge for MindsCraft, a digital store for personal growth tools.
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

export const isAIAvailable = (): boolean => {
  return getApiKey() !== null;
};

export const sendMessageToGemini = async (history: {role: 'user' | 'model', text: string}[], message: string): Promise<string> => {
  // Check if API key is available
  if (!isAIAvailable()) {
    return "I'm sorry, but the AI assistant is currently unavailable. The administrator needs to configure the GEMINI_API_KEY to enable this feature.";
  }

  try {
    const aiClient = initializeAI();
    if (!aiClient) {
      return "I'm sorry, I couldn't initialize the AI service. Please contact support.";
    }

    const chat = aiClient.chats.create({
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
