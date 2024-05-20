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
    setEmotionGroup((previousState) => [...previousState, emotionKeySequence]);
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24 text-base">
      <EmotionSelection appendToEmotionGroup={appendToEmotionGroup} />

      <SelectedEmotions emotionGroup={emotionGroup} />

      <IntrospectiveQuestions />
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
