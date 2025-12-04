import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getStylingAdvice = async (userQuery: string, contextItems: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, I cannot provide styling advice at the moment. Please configure the API Key.";
  }

  try {
    const model = "gemini-2.5-flash";
    const systemInstruction = `You are a high-end fashion consultant for '1985-Timeless', an exclusive e-commerce store with an 'Old Money' and 'Streetwear' aesthetic. 
    The store sells Hoodies, Branded Shoes (Nike, Adidas, etc.), Formal Shirts (Raymond, etc.), Anime T-Shirts, and Jeans.
    
    Your goal is to suggest outfits based on the user's query and the available products context provided.
    Always be polite, sophisticated, and helpful. Use emojis sparingly but effectively.
    Keep responses concise (under 100 words) unless detailed advice is asked.
    If the user asks about prices, refer to the general market rates in INR (₹).`;

    const prompt = `
    Context - Available Product Categories in store: ${contextItems}
    
    User Query: ${userQuery}
    
    Please provide styling advice or product recommendations.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response regarding that style right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to my fashion database. Please try again later.";
  }
};