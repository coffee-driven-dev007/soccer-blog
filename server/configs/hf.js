import axios from "axios";

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL = "tiiuae/falcon-7b-instruct"; // currently available


export async function generateContent(prompt) {
    if (!prompt || prompt.length < 5) {
        throw new Error("Prompt too short");
    }

    // Simple safety limit
    if (prompt.length > 500) {
        throw new Error("Prompt too long");
    }

    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${MODEL}`,
            {
                inputs: prompt,
                parameters: { max_new_tokens: 400, temperature: 0.7 },
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                },
                timeout: 30000,
            }
        );

        if (response.data.error?.includes("Model is loading")) {
            await new Promise(r => setTimeout(r, 5000)); // wait 5s
            return generateContent(prompt); // retry
        }


        if (!response.data || !response.data[0]?.generated_text) {
            throw new Error("Invalid response from HF API");
        }

        return response.data[0].generated_text;
    } catch (err) {
        console.error("Hugging Face Error:", err.message);
        throw new Error("AI service unavailable. Using fallback template.");
    }
}
