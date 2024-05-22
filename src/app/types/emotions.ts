export type StaticEmotion = {
  label: string;
  backgroundColor?: string;
  subEmotions: StaticEmotion[];
};

export type Emotion = {
  label: string;
  subEmotions: EmotionMap;
  /** Whether or not this emotion requires the user's attention */
  isActive: boolean;
  isSelected: boolean;
  backgroundColor?: string;
};

export type EmotionMap = { [key: string]: Emotion };
