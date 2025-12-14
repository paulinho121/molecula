import { GoogleGenAI, Type } from "@google/genai";
import { GeminiExplanation } from '../types';


// Initialize the client lazily to prevent startup crashes
let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key for Gemini is missing. Features relying on it will not work.");
      // Return a mock or throw a controlled error if critical
      return null;
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};


export const fetchMoleculeDetails = async (moleculeName: string): Promise<GeminiExplanation> => {
  try {
    const modelId = 'gemini-2.5-flash';

    const prompt = `Provide a detailed but concise educational summary for the molecule: ${moleculeName}. 
    Target audience: High school chemistry students.
    Return the response in Portuguese (pt-BR).`;


    const aiClient = getAIClient();
    if (!aiClient) {
      throw new Error("Gemini API Client not initialized (Missing API Key)");
    }

    const response = await aiClient.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "Você é um professor de química especialista. Forneça respostas estruturadas em JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            funFact: {
              type: Type.STRING,
              description: "Uma curiosidade interessante e curta sobre a molécula.",
            },
            structure: {
              type: Type.STRING,
              description: "Descrição breve da geometria molecular ou ligações.",
            },
            usage: {
              type: Type.STRING,
              description: "Onde essa molécula é comumente encontrada ou usada.",
            },
          },
          required: ["funFact", "structure", "usage"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as GeminiExplanation;
  } catch (error) {
    console.error("Error fetching molecule details:", error);
    return {
      funFact: "Informação indisponível no momento.",
      structure: "Estrutura química complexa.",
      usage: "Diversas aplicações conhecidas."
    };
  }
};
