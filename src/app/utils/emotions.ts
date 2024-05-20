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
  setSelectedEmotionKeySequence: React.Dispatch<React.SetStateAction<string[]>>,
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
  setSelectedEmotionKeySequence(newSelectedEmotionKeySequence);
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
        // T1 emotions are inactive if their T0 parent is NOT selected
        let isT2Active = true;
        if (!selectedEmotionKeySequence.includes(emotionT1.label))
          isT2Active = false;
        // T2 emotions are inactive if any T2 siblings are selected
        for (const siblingKey in emotionT1.subEmotions) {
          if (!isT2Active) break; //no need to keep evaluating T2
          const siblingEmotion = emotionT1.subEmotions[siblingKey];
          if (
            siblingEmotion.label !== emotionT2.label &&
            siblingEmotion.isSelected
          ) {
            isT2Active = false;
          }
        }
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
      color: staticEmotion.color,
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
    color: "pink",
    subEmotions: [
      {
        label: "Hurt",
        subEmotions: [
          {
            label: "Embarrassed",
            subEmotions: [],
          },
          { label: "Devastated", subEmotions: [] },
        ],
      },
      {
        label: "Threatened",
        subEmotions: [
          {
            label: "Insecure",
            subEmotions: [],
          },
          { label: "Jealous", subEmotions: [] },
        ],
      },
      {
        label: "Hateful",
        subEmotions: [
          {
            label: "Resentful",
            subEmotions: [],
          },
          { label: "Violated", subEmotions: [] },
        ],
      },
      {
        label: "Mad",
        subEmotions: [
          {
            label: "Furious",
            subEmotions: [],
          },
          { label: "Enraged", subEmotions: [] },
        ],
      },
      {
        label: "Aggressive",
        subEmotions: [
          {
            label: "Provoked",
            subEmotions: [],
          },
          { label: "Hostile", subEmotions: [] },
        ],
      },
      {
        label: "Frustrated",
        subEmotions: [
          {
            label: "Infuriated",
            subEmotions: [],
          },
          { label: "Irritated", subEmotions: [] },
        ],
      },
      {
        label: "Distant",
        subEmotions: [
          {
            label: "Withdrawn",
            subEmotions: [],
          },
          { label: "Suspicious", subEmotions: [] },
        ],
      },
      {
        label: "Critical",
        subEmotions: [
          {
            label: "Skeptical",
            subEmotions: [],
          },
          { label: "Sarcastic", subEmotions: [] },
        ],
      },
    ],
  },
  {
    label: "Disgust",
    color: "brown",
    subEmotions: [
      {
        label: "Disapproval",
        subEmotions: [
          { label: "Judgemental", subEmotions: [] },
          { label: "Loathing", subEmotions: [] },
        ],
      },
      {
        label: "Disappointed",
        subEmotions: [
          { label: "Repugnant", subEmotions: [] },
          { label: "Revolted", subEmotions: [] },
        ],
      },
      {
        label: "Awful",
        subEmotions: [
          { label: "Revulsion", subEmotions: [] },
          { label: "Detestable", subEmotions: [] },
        ],
      },
      {
        label: "Avoidance",
        subEmotions: [
          { label: "Aversion", subEmotions: [] },
          { label: "Hesitant", subEmotions: [] },
        ],
      },
    ],
  },
  {
    label: "Sad",
    color: "lightblue",
    subEmotions: [
      {
        label: "Guilty",
        subEmotions: [
          { label: "Remorseful", subEmotions: [] },
          { label: "Ashamed", subEmotions: [] },
        ],
      },
      {
        label: "Abandoned",
        subEmotions: [
          { label: "Ignored", subEmotions: [] },
          { label: "Victimised", subEmotions: [] },
        ],
      },
      {
        label: "Despair",
        subEmotions: [
          { label: "Powerless", subEmotions: [] },
          { label: "Vulnerable", subEmotions: [] },
        ],
      },
      {
        label: "Depressed",
        subEmotions: [
          { label: "Inferior", subEmotions: [] },
          { label: "Empty", subEmotions: [] },
        ],
      },
      {
        label: "Lonely",
        subEmotions: [
          { label: "Abandoned", subEmotions: [] },
          { label: "Isolated", subEmotions: [] },
        ],
      },
      {
        label: "Bored",
        subEmotions: [
          { label: "Apathetic", subEmotions: [] },
          { label: "Indifferent", subEmotions: [] },
        ],
      },
    ],
  },
  {
    label: "Happy",
    color: "orange",
    subEmotions: [
      {
        label: "Optimistic",
        subEmotions: [
          { label: "Inspired", subEmotions: [] },
          { label: "Open", subEmotions: [] },
        ],
      },
      {
        label: "Intimate",
        subEmotions: [
          { label: "Playful", subEmotions: [] },
          { label: "Sensitive", subEmotions: [] },
        ],
      },
      {
        label: "Peaceful",
        subEmotions: [
          { label: "Hopeful", subEmotions: [] },
          { label: "Loving", subEmotions: [] },
        ],
      },
      {
        label: "Powerful",
        subEmotions: [
          { label: "Provocative", subEmotions: [] },
          { label: "Courageous", subEmotions: [] },
        ],
      },
      {
        label: "Accepted",
        subEmotions: [
          { label: "Fulfilled", subEmotions: [] },
          { label: "Respected", subEmotions: [] },
        ],
      },
      {
        label: "Proud",
        subEmotions: [
          { label: "Confident", subEmotions: [] },
          { label: "Important", subEmotions: [] },
        ],
      },
      {
        label: "Interested",
        subEmotions: [
          { label: "Inquisitive", subEmotions: [] },
          { label: "Amused", subEmotions: [] },
        ],
      },
      {
        label: "Joyful",
        subEmotions: [
          { label: "Estatic", subEmotions: [] },
          { label: "Liberated", subEmotions: [] },
        ],
      },
    ],
  },
  {
    label: "Surprise",
    color: "lightgreen",
    subEmotions: [
      {
        label: "Excited",
        subEmotions: [
          { label: "Energetic", subEmotions: [] },
          { label: "Eager", subEmotions: [] },
        ],
      },
      {
        label: "Amazed",
        subEmotions: [
          { label: "Awe", subEmotions: [] },
          { label: "Astonished", subEmotions: [] },
        ],
      },
      {
        label: "Confused",
        subEmotions: [
          { label: "Perplexed", subEmotions: [] },
          { label: "Disillusioned", subEmotions: [] },
        ],
      },
      {
        label: "Startled",
        subEmotions: [
          { label: "Dismayed", subEmotions: [] },
          { label: "Shocked", subEmotions: [] },
        ],
      },
    ],
  },
  {
    label: "Fear",
    color: "yellow",
    subEmotions: [
      {
        label: "Scared",
        subEmotions: [
          { label: "Terrified", subEmotions: [] },
          { label: "Frightened", subEmotions: [] },
        ],
      },
      {
        label: "Anxious",
        subEmotions: [
          { label: "Overwhelmed", subEmotions: [] },
          { label: "Worried", subEmotions: [] },
        ],
      },
      {
        label: "Insecure",
        subEmotions: [
          { label: "Inadequate", subEmotions: [] },
          { label: "Inferior", subEmotions: [] },
        ],
      },
      {
        label: "Submissive",
        subEmotions: [
          { label: "Worthless", subEmotions: [] },
          { label: "Insignificant", subEmotions: [] },
        ],
      },
      {
        label: "Rejected",
        subEmotions: [
          { label: "Inadequate", subEmotions: [] },
          { label: "Alienated", subEmotions: [] },
        ],
      },
      {
        label: "Humiliated",
        subEmotions: [
          { label: "Disrespected", subEmotions: [] },
          { label: "Ridiculed", subEmotions: [] },
        ],
      },
    ],
  },
];
