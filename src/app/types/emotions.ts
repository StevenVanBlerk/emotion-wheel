export type StaticEmotion = { label: string; subEmotions: StaticEmotion[] };

type Emotion = {
  label: string;
  subEmotions: EmotionMap;
  isSelected: boolean;
};

export type EmotionMap = { [key: string]: Emotion };
