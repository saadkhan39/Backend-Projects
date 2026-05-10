import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";

// Gemini Model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

// Gemini Function
export async function testAi() {
  try {
    const response = await model.invoke(
      "what is ai explain in under 100 words? explain in hinglish"
    );

    console.log(response.text);
  } catch (error) {
    console.log(error);
  }
}

// Mistral Model
const llm = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.MISTRAL_API_KEY,
});

// Mistral Function
export async function testMistralAi() {
  try {
    const response = await llm.invoke(
      "what is computer science engineering in 20 words ?"
    );

    console.log(response.text);
  } catch (error) {
    console.log(error);
  }
}