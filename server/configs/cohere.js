export async function generateContent(prompt) {
    try {
        const response = await fetch("https://api.cohere.ai/v1/generate", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "command",
                prompt,
                max_tokens: 500,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText);
        }

        const data = await response.json();

        const text = data?.generations?.[0]?.text;

        if (!text) {
            throw new Error("No content returned from Cohere");
        }

        return text;

    } catch (error) {
        console.error("Cohere REST Error:", error.message);

        // HARD fallback so your app never breaks
        return `
Topic: ${prompt}

This is a simple blog about the topic.
It explains key ideas, benefits, and examples in plain text.
`;
    }
}
