export type StaticEmotion = { label: string; subEmotions: StaticEmotion[] };

export type Emotion = {
  label: string;
  subEmotions: EmotionMap;
  /** Whether or not this emotion requires the user's attention */
  isActive: boolean;
  isSelected: boolean;
};

export type EmotionMap = { [key: string]: Emotion };
