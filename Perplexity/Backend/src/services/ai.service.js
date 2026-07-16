import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogle } from "@langchain/google";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { createAgent, tool } from "langchain";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";

const gemniModel = new ChatGoogle({
  apiKey: process.env.GEMNI_API_KEY,
  model: "gemini-2.5-flash",
});

const mistralModel = new ChatMistralAI({
model: "mistral-small-latest",
apiKey:process.env.MISTRAL_API_KEY
});


const searchInternetTool = tool(
  searchInternet,
  {
   name: "searchInternet",
        description: "Use this tool to get the latest information from the internet.",
        schema: z.object({
            query: z.string().describe("The search query to look up on the internet.")
        })  
  }
)

const agent =  createAgent({
  model:gemniModel,
  tools:[searchInternetTool]
})


export async function generateResponse(messages) {
  const chatMessages = messages
    .filter(msg => msg.role === "user" || msg.role === "ai")
    .map(msg =>
      msg.role === "user"
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content)
    );

  console.log(chatMessages);

  const response = await agent.invoke({
    messages: chatMessages,
  });

  console.log(response);

  return response.messages.at(-1).content;
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`
You are an AI that generates concise chat titles.

Rules:
- Generate a title based on the user's message.
- Keep it between 2 to 3 words.
- Make it descriptive and meaningful.
- Do not use quotation marks.
- Do not add punctuation at the end.
- Return only the title and nothing else.
    `),

    new HumanMessage(message)
  ]);

  return response.content.trim();
}