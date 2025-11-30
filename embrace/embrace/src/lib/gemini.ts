
import { GoogleGenerativeAI } from '@google/generative-ai';

// This function is designed to work in an environment where process.env.API_KEY is available.
// In this sandboxed environment, we'll include a fallback for demonstration purposes.

const MOCK_API_KEY = "YOUR_API_KEY_HERE"; // This is a placeholder.

export const generateArtistBio = async (artistName: string, genre: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || MOCK_API_KEY;

    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
        console.warn("API key not found. Using fallback bio.");
        return `A promising ${genre} artist known as ${artistName}, ready to make their mark on the music scene with a unique and captivating sound.`;
    }

    try {
        const ai = new GoogleGenerativeAI(apiKey);
        const model = ai.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `Create a short, exciting, and professional artist biography (around 30-40 words) for a new musician.
        Artist Name: ${artistName}
        Genre: ${genre}
        Focus on their unique sound and potential. Do not use quotation marks.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text.trim();
    } catch (error) {
        console.error("Error generating artist bio with Gemini:", error);
        return `An emerging talent in the ${genre} world, ${artistName} is quickly gaining attention for their innovative sound and compelling performances.`;
    }
};
