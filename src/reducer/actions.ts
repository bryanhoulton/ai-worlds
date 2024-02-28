import { readFileSync, writeFileSync } from "fs";

import { logger } from "../logging";
import { ReducerAction, SerializedGame } from "../types";

export async function useGameReducer(
  fileName: string,
  actions: ReducerAction[]
) {
  let game = getGameFile(fileName);

  function reduce(state: SerializedGame, action: ReducerAction) {
    switch (action.type) {
      case "add_npc":
        return {
          ...state,
          characters: [...state.characters, action.payload],
        };
      case "add_location":
        return {
          ...state,
          context: {
            ...state.context,
            locations: [...state.context.locations, action.payload],
          },
        };
      case "add_event":
        return {
          ...state,
          context: {
            ...state.context,
            events: [...state.context.events, action.payload],
          },
        };
      case "append_to_character_backstory":
        return {
          ...state,
          characters: state.characters.map((character) => {
            if (character.name === action.payload.name) {
              return {
                ...character,
                backstory: character.backstory + action.payload.backstory,
              };
            }
            return character;
          }),
        };
      case "append_to_location_description":
        return {
          ...state,
          context: {
            ...state.context,
            locations: state.context.locations.map((location) => {
              if (location.name === action.payload.name) {
                return {
                  ...location,
                  description:
                    location.description + action.payload.description,
                };
              }
              return location;
            }),
          },
        };
      case "append_to_world_event":
        return {
          ...state,
          context: {
            ...state.context,
            events: state.context.events.map((event) => {
              if (event.name === action.payload.name) {
                return {
                  ...event,
                  description: event.description + action.payload.description,
                };
              }
              return event;
            }),
          },
        };
      default:
        return state;
    }
  }

  for (const action of actions) {
    logger.debug("Reducing action: ", action);
    game = reduce(game, action);
  }
  await writeFileSync(fileName, JSON.stringify(game, null, 2));
}

export function getGameFile(fileName: string): SerializedGame {
  return JSON.parse(readFileSync(fileName, "utf-8"));
}
