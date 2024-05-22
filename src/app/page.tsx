"use client";

import {
  SelectedEmotions,
  IntrospectiveQuestions,
  EmotionSelection,
} from "./components";
import { useState } from "react";

export default function Home() {
  const [emotionGroup, setEmotionGroup] = useState<string[][]>([]);

  const appendToEmotionGroup = (emotionKeySequence: string[]) => {
    setEmotionGroup((previousState) => {
      const previousEmotions = previousState.map(
        (keyArray) => keyArray[keyArray.length - 1],
      );
      const newEmotion = emotionKeySequence[emotionKeySequence.length - 1];
      // avoiding duplicate values
      if (previousEmotions.includes(newEmotion)) return previousState;
      else return [...previousState, emotionKeySequence];
    });
  };
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-sm flex-col p-4 text-base">
      <EmotionSelection appendToEmotionGroup={appendToEmotionGroup} />

      {emotionGroup.length > 0 && (
        <IntrospectiveQuestions emotionGroup={emotionGroup} />
      )}
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
