"use client";

import {
  EmotionList,
  SelectedEmotions,
  IntrospectiveQuestions,
} from "./components";
import { useEffect, useState } from "react";
import {
  evaluateActiveStates,
  formatEmotionsInitialState,
  getSelectedEmotionLabels,
  onEmotionSelect,
  staticEmotions,
} from "./utils/emotions";
import { EmotionMap } from "./types/emotions";

export default function Home() {
  const [emotions, setEmotions] = useState<EmotionMap>(
    formatEmotionsInitialState(staticEmotions),
  );
  const [selectedEmotionLabels, setSelectedEmotionLabels] = useState<string[]>(
    [],
  );

  // An emotion was selected. Reevaluate selected labels
  useEffect(() => {
    const newSelectedEmotionLabels = getSelectedEmotionLabels(emotions);
    setSelectedEmotionLabels(newSelectedEmotionLabels);
  }, [emotions]);

  // An emotion was selected. Reevaluate active states
  useEffect(() => {
    evaluateActiveStates(setEmotions, selectedEmotionLabels);
  }, [selectedEmotionLabels]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 text-base">
      <EmotionList
        emotions={emotions}
        onEmotionSelect={(emotionKeySequence) => {
          onEmotionSelect(emotionKeySequence, emotions, setEmotions);
        }}
      />

      <SelectedEmotions selectedEmotionLabels={selectedEmotionLabels} />

      {/* <IntrospectiveQuestions /> */}
    </main>
  );
}

/** Possible additions:
 * - Language detection
 *    Currently only english is supported
 *      Maybe I can lean on browser's built in translators
 * - Adding/Removing emotions from the wheel
 *    Requires local storage / cookies
 *      This is problematic and might scare the user away. Data privacy is vital within this project
 */
