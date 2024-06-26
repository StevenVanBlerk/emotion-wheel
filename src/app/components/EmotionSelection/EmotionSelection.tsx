import { EmotionMap } from "@/app/types/emotions";
import {
  formatEmotionsInitialState,
  onEmotionSelect,
  staticEmotions,
} from "@/app/utils/emotions";
import { useState } from "react";
import EmotionList from "./EmotionList";

type EmotionSelectionProps = {
  appendToEmotionGroup: (emotionKeySequence: string[]) => void;
};

const EmotionSelection = ({ appendToEmotionGroup }: EmotionSelectionProps) => {
  const initialEmotions = formatEmotionsInitialState(staticEmotions);
  const [emotions, setEmotions] = useState<EmotionMap>(initialEmotions);

  const resetEmotions = () => {
    setEmotions(initialEmotions);
  };

  const handleEmotionSubmit = (emotionKeySequence: string[]) => {
    appendToEmotionGroup(emotionKeySequence);
    resetEmotions();
  };

  const handleEmotionSelection = (emotionKeySequence: string[]) => {
    onEmotionSelect(
      emotionKeySequence,
      JSON.parse(JSON.stringify(emotions)) as EmotionMap,
      setEmotions,
    );
  };

  return (
    <EmotionList
      emotions={emotions}
      onEmotionSubmit={handleEmotionSubmit}
      onEmotionSelect={handleEmotionSelection}
    />
  );
};

export default EmotionSelection;
