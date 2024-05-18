"use client";

import {
  EmotionWheel,
  IntrospectiveQuestions,
  SelectedEmotions,
} from "./components";
import { useState } from "react";
import { staticEmotions } from "./utils/emotions";
import { StaticEmotion, EmotionMap } from "./types/emotions";

export default function Home() {
  const formatEmotionsInitialState = (
    staticEmotions: StaticEmotion[],
  ): EmotionMap => {
    const formattedEmotions: EmotionMap = {};
    staticEmotions.forEach((staticEmotion) => {
      const emotion = {
        label: staticEmotion.label,
        isSelected: false,
        subEmotions: formatEmotionsInitialState(staticEmotion.subEmotions),
      };
      formattedEmotions[emotion.label] = emotion;
    });
    return formattedEmotions;
  };

  const [emotions, setEmotions] = useState<EmotionMap>(
    formatEmotionsInitialState(staticEmotions),
  );

  const onEmotionSelect = (emotionKeySequence: string[]) => {
    const newEmotions: EmotionMap = JSON.parse(JSON.stringify(emotions));
    const [keyT0, keyT1, keyT2] = emotionKeySequence;

    if (keyT2) {
      const relevantEmotion =
        newEmotions[keyT0].subEmotions[keyT1].subEmotions[keyT2];
      relevantEmotion.isSelected = !relevantEmotion.isSelected;
    } else if (keyT1) {
      const relevantEmotion = newEmotions[keyT0].subEmotions[keyT1];
      relevantEmotion.isSelected = !relevantEmotion.isSelected;
    } else {
      const relevantEmotion = newEmotions[keyT0];
      relevantEmotion.isSelected = !relevantEmotion.isSelected;
    }

    setEmotions(newEmotions);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 text-base">
      <EmotionWheel emotions={emotions} onEmotionSelect={onEmotionSelect} />

      <SelectedEmotions emotions={emotions} />

      <IntrospectiveQuestions />
    </main>
  );
}

/** Possible additions:
 * - View switcher
 *    Switch between seeing the circle or just lists
 *    Switch between seeing the partial and full lists
 * - Language detection
 *    Currently only english is supported
 *      Maybe I can lean on browser's built in translators
 * - Adding/Removing emotions from the wheel
 *    Requires local storage / cookies
 *      This is problematic and might scare the user away. Data privacy is vital within this project
 */
