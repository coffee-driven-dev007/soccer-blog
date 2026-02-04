import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Safe AI content generation
export async function generateContent(prompt) {
    if (!prompt || prompt.length < 5) {
        throw new Error("Prompt too short");
    }

    if (prompt.length > 500) {
        throw new Error("Prompt too long");
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that writes blog content in simple text format. No markdown, no emojis.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            max_tokens: 600,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Error:", error);
        throw new Error("AI service unavailable. Try again later.");
    }
}
