import React from "react";
import { EmotionMap, StaticEmotion } from "../types/emotions";

const selectEmotion = (emotionKeySequence: string[], emotions: EmotionMap) => {
  const [emotionT0Key, emotionT1Key, emotionT2Key] = emotionKeySequence;
  const emotionT0 = emotions[emotionT0Key];
  const emotionT1 = emotionT0?.subEmotions[emotionT1Key];
  const emotionT2 = emotionT1?.subEmotions[emotionT2Key];

  if (emotionT2) {
    emotionT2.isSelected = true;
    return emotions;
  } else if (emotionT1) {
    emotionT1.isSelected = true;
    return emotions;
  } else if (emotionT0) {
    emotionT0.isSelected = true;
  }

  return emotions;
};

const deselectEmotion = (
  emotionKeySequence: string[],
  emotions: EmotionMap,
) => {
  const [emotionT0Key, emotionT1Key, emotionT2Key] = emotionKeySequence;
  const emotionT0 = emotions[emotionT0Key];
  const emotionT1 = emotionT0?.subEmotions[emotionT1Key];
  const emotionT2 = emotionT1?.subEmotions[emotionT2Key];

  if (emotionT2) {
    emotionT2.isSelected = false;
  } else if (emotionT1) {
    emotionT1.isSelected = false;
    // clear T2 emotions
    for (const keyT2 in emotionT1.subEmotions) {
      emotionT1.subEmotions[keyT2].isSelected = false;
    }
  } else if (emotionT0) {
    emotionT0.isSelected = false;
    // clear T1 emotions
    for (const keyT1 in emotionT0.subEmotions) {
      emotionT0.subEmotions[keyT1].isSelected = false;
      // clear T2 emotions
      for (const keyT2 in emotionT0.subEmotions[keyT1].subEmotions) {
        emotionT0.subEmotions[keyT1].subEmotions[keyT2].isSelected = false;
      }
    }
  }

  return emotions;
};

export const onEmotionSelect = (
  emotionKeySequence: string[],
  emotionsCopy: EmotionMap,
  setEmotions: React.Dispatch<React.SetStateAction<EmotionMap>>,
) => {
  const [emotionKeyT0, emotionKeyT1, emotionKeyT2] = emotionKeySequence;
  const emotionT0 = emotionsCopy[emotionKeyT0];
  const emotionT1 = emotionT0?.subEmotions[emotionKeyT1];
  const emotionT2 = emotionT1?.subEmotions[emotionKeyT2];

  // a T2 emotion was selected
  if (emotionT2) {
    if (emotionT2.isSelected)
      deselectEmotion([emotionKeyT0, emotionKeyT1, emotionKeyT2], emotionsCopy);
    else
      selectEmotion([emotionKeyT0, emotionKeyT1, emotionKeyT2], emotionsCopy);
  }
  // a T1 emotion was selected
  else if (emotionT1) {
    if (emotionT1.isSelected)
      deselectEmotion([emotionKeyT0, emotionKeyT1], emotionsCopy);
    else selectEmotion([emotionKeyT0, emotionKeyT1], emotionsCopy);
  }
  // a T0 emotion was selected
  else {
    if (emotionT0.isSelected) deselectEmotion([emotionKeyT0], emotionsCopy);
    else selectEmotion([emotionKeyT0], emotionsCopy);
  }

  // evaluating selected emotion key sequence
  const newSelectedEmotionKeySequence =
    getSelectedEmotionKeySequence(emotionsCopy);

  validateActiveStates(emotionsCopy, newSelectedEmotionKeySequence);

  setEmotions(emotionsCopy);
};

export const validateActiveStates = (
  emotions: EmotionMap,
  selectedEmotionKeySequence: string[],
) => {
  Object.values(emotions).forEach((emotionT0) => {
    // T0 emotions are active if no emotions are selected OR that specific emotion is selected
    let isT0Active =
      selectedEmotionKeySequence.length == 0
        ? true
        : selectedEmotionKeySequence.includes(emotionT0.label);
    emotionT0.isActive = isT0Active;

    // Evaluating T1 emotions
    Object.values(emotionT0.subEmotions).forEach((emotionT1) => {
      // T1 emotions are inactive if their T0 parent is NOT selected
      let isT1Active = true;

      if (!selectedEmotionKeySequence.includes(emotionT0.label)) {
        isT1Active = false;
      }
      // T1 emotions are inactive if any T1 siblings are selected
      for (const siblingKey in emotionT0.subEmotions) {
        if (!isT1Active) break; //no need to keep evaluating T1
        const siblingEmotion = emotionT0.subEmotions[siblingKey];
        if (
          siblingEmotion.label !== emotionT1.label &&
          siblingEmotion.isSelected
        ) {
          isT1Active = false;
        }
      }
      emotionT1.isActive = isT1Active;

      // Evaluating T2 emotions
      Object.values(emotionT1.subEmotions).forEach((emotionT2) => {
        // T2 emotions are inactive if their T1 parent is NOT selected
        let isT2Active = true;
        if (!selectedEmotionKeySequence.includes(emotionT1.label))
          isT2Active = false;
        emotionT2.isActive = isT2Active;
      });
    });
  });

  return emotions;
};

export const getSelectedEmotionKeySequence = (emotions: EmotionMap) => {
  let selectedEmotionKeySequence: string[] = [];
  Object.values(emotions).forEach((emotionT0) => {
    if (emotionT0.isSelected) selectedEmotionKeySequence.push(emotionT0.label);
    Object.values(emotionT0.subEmotions).forEach((emotionT1) => {
      if (emotionT1.isSelected)
        selectedEmotionKeySequence.push(emotionT1.label);
      Object.values(emotionT1.subEmotions).forEach((emotionT2) => {
        if (emotionT2.isSelected)
          selectedEmotionKeySequence.push(emotionT2.label);
      });
    });
  });

  return selectedEmotionKeySequence;
};

export const formatEmotionsInitialState = (
  staticEmotions: StaticEmotion[],
): EmotionMap => {
  const formattedEmotions: EmotionMap = {};

  staticEmotions.forEach((staticEmotion) => {
    const emotion = {
      label: staticEmotion.label,
      backgroundColor: staticEmotion.backgroundColor,
      isSelected: false,
      isActive: [
        "Anger",
        "Disgust",
        "Sad",
        "Happy",
        "Surprise",
        "Fear",
      ].includes(staticEmotion.label),
      subEmotions: formatEmotionsInitialState(staticEmotion.subEmotions),
    };
    formattedEmotions[emotion.label] = emotion;
  });
  return formattedEmotions;
};

export const staticEmotions: StaticEmotion[] = [
  {
    label: "Anger",
    backgroundColor: "#8B2B41",
    subEmotions: [
      {
        label: "Hurt",
        backgroundColor: "#E7A3CD",
        subEmotions: [
          {
            label: "Embarrassed",
            backgroundColor: "#DE94C3",
            subEmotions: [],
          },
          { label: "Devastated", backgroundColor: "#C394C2", subEmotions: [] },
        ],
      },
      {
        label: "Threatened",
        backgroundColor: "#C8A3C5",
        subEmotions: [
          {
            label: "Insecure",
            backgroundColor: "",
            subEmotions: [],
          },
          { label: "Jealous", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Hateful",
        backgroundColor: "#E7A3CD",
        subEmotions: [
          {
            label: "Resentful",
            backgroundColor: "",
            subEmotions: [],
          },
          { label: "Violated", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Mad",
        backgroundColor: "#C8A3C5",
        subEmotions: [
          {
            label: "Furious",
            backgroundColor: "",
            subEmotions: [],
          },
          { label: "Enraged", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Aggressive",
        backgroundColor: "#E7A3CD",
        subEmotions: [
          {
            label: "Provoked",
            backgroundColor: "",
            subEmotions: [],
          },
          { label: "Hostile", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Frustrated",
        backgroundColor: "#C8A3C5",
        subEmotions: [
          {
            label: "Infuriated",
            backgroundColor: "",
            subEmotions: [],
          },
          { label: "Irritated", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Distant",
        backgroundColor: "#E7A3CD",
        subEmotions: [
          {
            label: "Withdrawn",
            backgroundColor: "",
            subEmotions: [],
          },
          { label: "Suspicious", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Critical",
        backgroundColor: "#C8A3C5",
        subEmotions: [
          {
            label: "Skeptical",
            backgroundColor: "",
            subEmotions: [],
          },
          { label: "Sarcastic", backgroundColor: "", subEmotions: [] },
        ],
      },
    ],
  },
  {
    label: "Disgust",
    backgroundColor: "#616161",
    subEmotions: [
      {
        label: "Disapproval",
        backgroundColor: "",
        subEmotions: [
          { label: "Judgemental", backgroundColor: "", subEmotions: [] },
          { label: "Loathing", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Disappointed",
        backgroundColor: "",
        subEmotions: [
          { label: "Repugnant", backgroundColor: "", subEmotions: [] },
          { label: "Revolted", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Awful",
        backgroundColor: "",
        subEmotions: [
          { label: "Revulsion", backgroundColor: "", subEmotions: [] },
          { label: "Detestable", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Avoidance",
        backgroundColor: "",
        subEmotions: [
          { label: "Aversion", backgroundColor: "", subEmotions: [] },
          { label: "Hesitant", backgroundColor: "", subEmotions: [] },
        ],
      },
    ],
  },
  {
    label: "Sad",
    backgroundColor: "#1F5F77",
    subEmotions: [
      {
        label: "Guilty",
        backgroundColor: "",
        subEmotions: [
          { label: "Remorseful", backgroundColor: "", subEmotions: [] },
          { label: "Ashamed", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Abandoned",
        backgroundColor: "",
        subEmotions: [
          { label: "Ignored", backgroundColor: "", subEmotions: [] },
          { label: "Victimised", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Despair",
        backgroundColor: "",
        subEmotions: [
          { label: "Powerless", backgroundColor: "", subEmotions: [] },
          { label: "Vulnerable", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Depressed",
        backgroundColor: "",
        subEmotions: [
          { label: "Inferior", backgroundColor: "", subEmotions: [] },
          { label: "Empty", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Lonely",
        backgroundColor: "",
        subEmotions: [
          { label: "Abandoned", backgroundColor: "", subEmotions: [] },
          { label: "Isolated", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Bored",
        backgroundColor: "",
        subEmotions: [
          { label: "Apathetic", backgroundColor: "", subEmotions: [] },
          { label: "Indifferent", backgroundColor: "", subEmotions: [] },
        ],
      },
    ],
  },
  {
    label: "Happy",
    backgroundColor: "#6C8B76",
    subEmotions: [
      {
        label: "Optimistic",
        backgroundColor: "",
        subEmotions: [
          { label: "Inspired", backgroundColor: "", subEmotions: [] },
          { label: "Open", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Intimate",
        backgroundColor: "",
        subEmotions: [
          { label: "Playful", backgroundColor: "", subEmotions: [] },
          { label: "Sensitive", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Peaceful",
        backgroundColor: "",
        subEmotions: [
          { label: "Hopeful", backgroundColor: "", subEmotions: [] },
          { label: "Loving", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Powerful",
        backgroundColor: "",
        subEmotions: [
          { label: "Provocative", backgroundColor: "", subEmotions: [] },
          { label: "Courageous", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Accepted",
        backgroundColor: "",
        subEmotions: [
          { label: "Fulfilled", backgroundColor: "", subEmotions: [] },
          { label: "Respected", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Proud",
        backgroundColor: "",
        subEmotions: [
          { label: "Confident", backgroundColor: "", subEmotions: [] },
          { label: "Important", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Interested",
        backgroundColor: "",
        subEmotions: [
          { label: "Inquisitive", backgroundColor: "", subEmotions: [] },
          { label: "Amused", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Joyful",
        backgroundColor: "",
        subEmotions: [
          { label: "Estatic", backgroundColor: "", subEmotions: [] },
          { label: "Liberated", backgroundColor: "", subEmotions: [] },
        ],
      },
    ],
  },
  {
    label: "Surprise",
    backgroundColor: "#B39C7E",
    subEmotions: [
      {
        label: "Excited",
        backgroundColor: "",
        subEmotions: [
          { label: "Energetic", backgroundColor: "", subEmotions: [] },
          { label: "Eager", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Amazed",
        backgroundColor: "",
        subEmotions: [
          { label: "Awe", backgroundColor: "", subEmotions: [] },
          { label: "Astonished", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Confused",
        backgroundColor: "",
        subEmotions: [
          { label: "Perplexed", backgroundColor: "", subEmotions: [] },
          { label: "Disillusioned", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Startled",
        backgroundColor: "",
        subEmotions: [
          { label: "Dismayed", backgroundColor: "", subEmotions: [] },
          { label: "Shocked", backgroundColor: "", subEmotions: [] },
        ],
      },
    ],
  },
  {
    label: "Fear",
    backgroundColor: "#D66D1C",
    subEmotions: [
      {
        label: "Scared",
        backgroundColor: "",
        subEmotions: [
          { label: "Terrified", backgroundColor: "", subEmotions: [] },
          { label: "Frightened", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Anxious",
        backgroundColor: "",
        subEmotions: [
          { label: "Overwhelmed", backgroundColor: "", subEmotions: [] },
          { label: "Worried", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Insecure",
        backgroundColor: "",
        subEmotions: [
          { label: "Inadequate", backgroundColor: "", subEmotions: [] },
          { label: "Inferior", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Submissive",
        backgroundColor: "",
        subEmotions: [
          { label: "Worthless", backgroundColor: "", subEmotions: [] },
          { label: "Insignificant", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Rejected",
        backgroundColor: "",
        subEmotions: [
          { label: "Inadequate", backgroundColor: "", subEmotions: [] },
          { label: "Alienated", backgroundColor: "", subEmotions: [] },
        ],
      },
      {
        label: "Humiliated",
        backgroundColor: "",
        subEmotions: [
          { label: "Disrespected", backgroundColor: "", subEmotions: [] },
          { label: "Ridiculed", backgroundColor: "", subEmotions: [] },
        ],
      },
    ],
  },
];

export const getBackgroundColor = (emotionKey: string) => {
  const color = staticEmotions.find(
    (emotion) => emotion.label === emotionKey,
  )?.backgroundColor;
  return color || "bg-primary";
};
