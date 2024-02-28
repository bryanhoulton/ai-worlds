import { blue, green, grey } from "console-log-colors";
import { textSync } from "figlet";
import { writeFileSync } from "fs";
import { prompt } from "promptly";

import { AI } from "./client";
import { logger } from "./logging";
import {
  AI_DM_PROMPT_FULL,
  AI_NPC_PROMPT_FULL,
  AIResponse,
  INFORMATION_EXTRACTION_PROMPT_FULL,
  NPCResponse,
} from "./prompts";
import { getGameFile, useGameReducer } from "./reducer/actions";
import { SEEDED_GAME } from "./reducer/seed";

(async () => {
  console.log(textSync("P(ai)rates"));
  logger.debug("Creating a new game...");
  const gameFileName = "./games/" + new Date().getTime().toString() + ".json";
  await writeFileSync(gameFileName, JSON.stringify(SEEDED_GAME, null, 2));

  // State variables [things that shouldn't be in the context]
  let currentTarget: number | null = null;
  const NPC_INSTANCES: AI[] = [];
  let inGame = true;
  let currentConversation: { name: string; message: string }[] = [];

  // Make the DM.
  const DM = new AI({ prompt: AI_DM_PROMPT_FULL(), name: "Game Manager" });
  await DM.init();

  // Game created!
  logger.debug("Game created.");

  while (inGame) {
    // If talking to an NPC.
    if (currentTarget !== null) {
      // Prompt the user.
      const command = await prompt(
        green(`You, to ${NPC_INSTANCES[currentTarget].name}> `)
      );

      if (command === "exit") {
        currentTarget = null;
        const response = await DM.prompt<AIResponse>(
          INFORMATION_EXTRACTION_PROMPT_FULL(
            JSON.stringify(currentConversation),
            getGameFile(gameFileName)
          )
        );
        useGameReducer(gameFileName, response.actions);
        currentConversation = [];
        continue;
      }

      currentConversation.push({ name: "player", message: command });

      // Handle the response.
      const response = await NPC_INSTANCES[currentTarget].prompt<NPCResponse>(
        command
      );
      currentConversation.push({
        name: NPC_INSTANCES[currentTarget].name,
        message: response.message,
      });
      console.log(
        `${green(NPC_INSTANCES[currentTarget].name)}> ${response.message}`
      );
    }

    // If talking to the DM.
    if (currentTarget === null) {
      const command = await prompt(blue(`You, to ${DM.name}> `));
      if (command === "exit") {
        inGame = false;
        continue;
      }

      if (command.startsWith("talk to ")) {
        const target = command.split("talk to ")[1];
        const index = NPC_INSTANCES.findIndex((npc) => npc.name === target);
        if (index !== -1) {
          currentTarget = index;
          continue;
        }
        logger.debug(`Could not find NPC with name ${target}`);
      }

      const response = await DM.prompt<AIResponse>(command);
      useGameReducer(gameFileName, response.actions);
      for (const action of response.actions) {
        if (action.type === "add_npc") {
          const newNPC = new AI({
            prompt: AI_NPC_PROMPT_FULL(
              action.payload.name,
              getGameFile(gameFileName)
            ),
            name: action.payload.name,
          });
          console.log(grey(`Created a new NPC: ${newNPC.name}`));
          NPC_INSTANCES.push(newNPC);
        }
      }
    }
  }
})();
