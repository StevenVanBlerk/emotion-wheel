type emotion = { label: string; subEmotions: emotion[] };

export const emotions: emotion[] = [
  {
    label: "Fearful",
    subEmotions: [
      {
        label: "Scared",
        subEmotions: [
          {
            label: "Helpless",
            subEmotions: [],
          },
          { label: "Frightened", subEmotions: [] },
        ],
      },
      {
        label: "Anxious",
        subEmotions: [
          {
            label: "Overwhelmed",
            subEmotions: [],
          },
          { label: "Worried", subEmotions: [] },
        ],
      },
    ],
  },
];
