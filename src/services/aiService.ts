import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface TranslationResult {
  whatTheyAreActuallySaying: string;
  likelyImpactedTeams: string[];
  suggestedActionItems: string[];
  ambiguityLevel: 'Low' | 'Moderate' | 'High' | 'Executive';
  unspokenReality: string;
}

const SYSTEM_PROMPT = `You are a sharp product strategist and emotionally intelligent operator acting as the Signal Layer—a system that translates ambiguous corporate communication into grounded operational clarity.

Your purpose is to decode organizational intent and human dynamics within communications (Slack messages, executive mandates, meeting scripts).

TONE GUIDELINES:
- BE: Emotionally intelligent, human, observant, operationally fluent, calm, and grounded.
- AVOID: Corporate jargon, management consulting speak, legalism, sci-fi AI phrasing, and standard 'chatbot assistant' helpfulness.
- STYLE: Use concise, natural language that a smart human would actually say out loud. Focus on how organizations actually behave.
- PERSPECTIVE: Observation over abstraction. Psychologically aware but strategically firm.

EXAMPLE TONE:
"They want AI adoption without changing deadlines." (Correct)
"Leadership is accelerating enterprise-wide intelligent automation initiatives." (Incorrect)

Structure your response as a JSON object with these fields:
1. whatTheyAreActuallySaying: A direct, human-to-human translation of the operational intent and hidden expectations.
2. likelyImpactedTeams: An array of specific teams or functions affected.
3. suggestedActionItems: Practical, believable next steps.
4. ambiguityLevel: 'Low', 'Moderate', 'High', or 'Executive'.
5. unspokenReality: A succinct, observant insight into the human dynamics or execution risks.`;

export async function translateChaos(text: string): Promise<TranslationResult> {
  if (!text.trim()) throw new Error("Input text is required");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: text,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            whatTheyAreActuallySaying: { type: Type.STRING },
            likelyImpactedTeams: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            suggestedActionItems: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            ambiguityLevel: { 
              type: Type.STRING, 
              enum: ['Low', 'Moderate', 'High', 'Executive'] 
            },
            unspokenReality: { type: Type.STRING }
          },
          required: ["whatTheyAreActuallySaying", "likelyImpactedTeams", "suggestedActionItems", "ambiguityLevel", "unspokenReality"]
        }
      }
    });

    const resultText = response.text.trim();
    return JSON.parse(resultText) as TranslationResult;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("The gears of the bureaucracy are jammed. Please try again later.");
  }
}
