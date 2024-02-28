import OpenAI from "openai";

import { logger } from "./logging";

const openai = new OpenAI({
  apiKey: "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",
});

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};
export async function prompt(messages: Message[]) {
  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
  });

  return completion.choices[0];
}

export class AI {
  messages: Message[];
  name: string;

  constructor({ prompt, name }: { prompt: string; name: string }) {
    this.messages = [
      {
        role: "system",
        content: prompt,
      },
    ];
    this.name = name;
  }

  async init() {
    return await this.prompt("Acknowledge receipt of prompt.");
  }

  async prompt<T>(s: string) {
    logger.debug("User Prompt:", s);
    this.messages.push({
      role: "user",
      content: s,
    });
    const response = await prompt(this.messages);
    if (response.message.content != null) {
      this.messages.push(response.message as Message);
    }
    logger.debug("AI Response:", { response });
    return JSON.parse(response.message.content ?? "{}") as T;
  }
}
