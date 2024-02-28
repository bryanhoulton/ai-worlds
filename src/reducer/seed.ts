import { SerializedGame } from "../types";

export const SEEDED_GAME: SerializedGame = {
  state: {
    date: "04/02/1658",
    description: `Captain Elias Hawk stands at the helm of the Nightingale, just as dawn
      breaks over Thieves' Haven. The Nightingale, a sleek and formidable brigantine, cuts
      through the water with grace, making its way towards the bustling pirate port. Today
      is significant; it's the day after the grand summit, and Elias has crucial information
      that could lead him to the legendary sunken city. But first, he must navigate the
      dangerous politics of Thieves' Haven, recruit a crew brave enough to face the unknown,
      and possibly confront rivals with the same ambition. As the Nightingale docks, Elias
      steps onto the wooden planks of Thieves' Haven, ready to embark on a journey that
      could immortalize his name among the greatest pirates of legend.`,
  },
  context: {
    events: [
      {
        name: "The Great Storm of Maris",
        date: "03/05/1650",
        description:
          "A massive storm hits the Maris Archipelago, sinking half of the Imperial Navy, leading to a power vacuum and the rise of pirate activity in the region.",
      },
      {
        name: "Formation of the Pirate Coalition",
        date: "07/12/1652",
        description:
          "The most notorious pirates of the seven seas form an alliance, establishing the Pirate Coalition, to collectively defend against the empires and share treasures.",
      },
      {
        name: "The Sacking of Port Valen",
        date: "09/22/1654",
        description:
          "Pirates under the Pirate Coalition launch a massive assault on Port Valen, a major trading hub, marking the largest pirate victory in history and solidifying their power.",
      },
      {
        name: "The Discovery of the Sunken City",
        date: "05/18/1656",
        description:
          "A young pirate uncovers the location of a legendary sunken city filled with ancient treasures, attracting the attention of pirates and empires alike.",
      },
      {
        name: "The Pirate Coalition's Summit",
        date: "04/01/1658",
        description:
          "The Pirate Coalition holds a grand summit on the Isle of Shadows, inviting young, upstart pirates to join their ranks and expand their influence across the seas.",
      },
    ],
    locations: [
      {
        name: "Theives' Haven",
        description:
          "A lawless pirate port built within the ruins of an ancient city, hidden within a treacherous network of cliffs and caves. It's a haven for pirates, smugglers, and other outlaws, where the Pirate Coalition holds sway.",
        locations: [
          {
            name: "The Siren's Call",
            description:
              "The most infamous tavern in Thieves' Haven, known for its potent brews, brawls, and the gathering of pirates looking for crew or to share news. It serves as a de facto meeting place for those seeking passage or to hire out their blades.",
            locations: [],
          },
          {
            name: "The Black Market",
            description:
              "A labyrinth of stalls and tents hidden beneath the city, where one can buy or sell anything from stolen imperial treasures to maps of hidden locations. It's said that if you can't find it in the Black Market, it doesn't exist.",
            locations: [],
          },
          {
            name: "The Docks",
            description:
              "A sprawling maze of piers and moorings where ships from across the seven seas come to rest. The docks are always alive with activity, from the loading and unloading of goods to the arrival of new faces seeking fortune and glory.",
            locations: [],
          },
        ],
      },
    ],
    description: "",
    goals: [
      "The player recruits a crew of skilled and loyal pirates to join the Nightingale.",
      "The player sets sail to the sunken city, facing various challenges and rival pirates along the way.",
      "The player discovers the sunken city and claims its treasures, earning a seat at the Pirate Coalition's Summit.",
    ],
    mainCharacter: "Elias Hawk",
  },
  characters: [
    {
      name: "Elias Hawk",
      age: 25,
      origin:
        "Born on the high seas during a storm, son of a renowned pirate captain and a navigator mother.",
      appearance: {
        hair: "Long, black hair, often tied back with a bandana.",
        eyes: "Piercing green, with a scar running down the left cheek.",
        height: "",
        weight: "",
        build:
          "Muscular and agile, bearing tattoos of his conquests and travels.",
        clothing:
          "Wears a mix of looted finery and practical seafaring gear, including a tricorn hat adorned with feathers from exotic birds.",
      },
      personality: "unset",
      backstory: `Grew up aboard his parents' ship, learning the ways of the sea and the code of the pirates.
        At 18, inherited his father's ship, the Nightingale, after a tragic battle.
        Made a name for himself by outsmarting the Imperial Navy and unearthing lost treasures.`,
      currentGoals: [
        "To find the legendary sunken city and claim its treasures, earning a seat at the Pirate Coalition's Summit and establishing his place among the pirate legends.",
      ],
    },
  ],
};
