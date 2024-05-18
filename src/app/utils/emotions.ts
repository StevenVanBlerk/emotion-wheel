type emotion = { label: string; subEmotions: emotion[] };

export const emotions: emotion[] = [
  {
    label: "Anger",
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
    ],
  },
];
