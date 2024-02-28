export type CharacterAppearance = {
  hair: string;
  eyes: string;
  height: string;
  weight: string;
  build: string;
  clothing: string;
};
export type CharacterSheet = {
  name: string;
  age: number;
  origin: string;
  appearance: CharacterAppearance;
  personality: string;
  backstory: string;
  currentGoals: string[];
  suggestedWorldKnowledge?: string[];
};

export type WorldEvent = {
  date: string;
  name: string;
  description: string;
};
export type WorldLocation = {
  name: string;
  description: string;
  locations: WorldLocation[];
};

export type GameContext = {
  events: WorldEvent[];
  locations: WorldLocation[];
  description: string;
  goals: string[];
  mainCharacter: string;
};
export type GameState = {
  description: string;
  date: string;
};

export type SerializedGame = {
  state: GameState;
  context: GameContext;
  characters: CharacterSheet[];
};

export type ReducerAction =
  | {
      type: "add_location";
      payload: WorldLocation;
    }
  | {
      type: "add_event";
      payload: WorldEvent;
    }
  | {
      type: "append_to_character_backstory";
      payload: { name: string; backstory: string };
    }
  | {
      type: "append_to_location_description";
      payload: { name: string; description: string };
    }
  | {
      type: "append_to_world_event";
      payload: { name: string; description: string };
    }
  | {
      type: "add_npc";
      payload: CharacterSheet;
    };
