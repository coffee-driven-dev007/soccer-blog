import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main(prompt, retries = 2) {
    if (!prompt || typeof prompt !== "string") {
        throw new Error("Invalid prompt");
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        // Handle quota / rate limits
        if (error.status === 429 && retries > 0) {
            await sleep(9000); // wait before retry
            return main(prompt, retries - 1);
        }

        console.error("Gemini Error:", error.message);
        throw new Error("AI service unavailable");
    }
}

export default main;
