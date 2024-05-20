import { EmotionMap } from "@/app/types/emotions";
import {
  evaluateActiveStates,
  formatEmotionsInitialState,
  getSelectedEmotionLabels as getSelectedEmotionKeySequence,
  onEmotionSelect,
  staticEmotions,
} from "@/app/utils/emotions";
import { useEffect, useState } from "react";
import EmotionList from "./EmotionList";

type EmotionSelectionProps = {
  appendToEmotionGroup: (emotionKeySequence: string[]) => void;
};

const EmotionSelection = ({ appendToEmotionGroup }: EmotionSelectionProps) => {
  const [emotions, setEmotions] = useState<EmotionMap>(
    formatEmotionsInitialState(staticEmotions),
  );

  const [selectedEmotionKeySequence, setSelectedEmotionKeySequence] = useState<
    string[]
  >([]);

  // // An emotion was selected. Reevaluate selected key sequence
  useEffect(() => {
    const newSelectedEmotionKeySequence =
      getSelectedEmotionKeySequence(emotions);
    setSelectedEmotionKeySequence(newSelectedEmotionKeySequence);

    // BUGGED INFINITE CALLS
    // evaluateActiveStates(setEmotions, newSelectedEmotionKeySequence);
  }, [emotions]);

  // // An emotion was selected. Reevaluate active states
  // useEffect(() => {
  // evaluateActiveStates(setEmotions, selectedEmotionKeySequence);
  // }, [selectedEmotionKeySequence]);

  return (
    <EmotionList
      emotions={emotions}
      onFinalEmotionSelect={() => {
        appendToEmotionGroup(selectedEmotionKeySequence);
      }}
      onEmotionSelect={(emotionKeySequence) => {
        onEmotionSelect(emotionKeySequence, emotions, setEmotions);
      }}
      isAddEmotionDisabled={selectedEmotionKeySequence.length === 0}
    />
  );
};

export default EmotionSelection;
