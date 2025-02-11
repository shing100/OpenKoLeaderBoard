import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, you should use a backend proxy
});

export const MODEL_NAME = "gpt-4o-mini";

export async function* streamChat(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
) {
  try {
    const stream = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        {
          role: "system",
          content:
            "You are IXI, a helpful AI assistant specialized in Korean language. Always respond in Korean unless specifically asked otherwise. When appropriate, use markdown formatting to make your responses more readable, including code blocks, tables, and lists.",
        },
        ...messages,
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 2000,
    });

    let accumulatedText = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      accumulatedText += content;
      yield { content: accumulatedText, done: false };
    }

    yield { content: accumulatedText, done: true };
  } catch (error) {
    console.error("Error in streamChat:", error);
    throw error;
  }
}
