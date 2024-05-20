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
const initialEmotions = formatEmotionsInitialState(staticEmotions);
const EmotionSelection = ({ appendToEmotionGroup }: EmotionSelectionProps) => {
  const [emotions, setEmotions] = useState<EmotionMap>(initialEmotions);

  const [selectedEmotionKeySequence, setSelectedEmotionKeySequence] = useState<
    string[]
  >([]);

  const resetEmotions = () => setEmotions(initialEmotions);
  return (
    <EmotionList
      emotions={emotions}
      onFinalEmotionSelect={() => {
        appendToEmotionGroup(selectedEmotionKeySequence);
        resetEmotions();
      }}
      onEmotionSelect={(emotionKeySequence) => {
        onEmotionSelect(
          emotionKeySequence,
          JSON.parse(JSON.stringify(emotions)) as EmotionMap,
          setEmotions,
          setSelectedEmotionKeySequence,
        );
      }}
      isAddEmotionDisabled={selectedEmotionKeySequence.length === 0}
    />
  );
};

export default EmotionSelection;
