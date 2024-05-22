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
    <main className="font-raleway mx-auto flex min-h-screen max-w-screen-sm flex-col gap-4 pt-8 text-base font-light">
      <blockquote className="pb-3 text-center italic">
        ❝Anything that's human is mentionable, and anything that is mentionable
        can be more manageable. When we can talk about our feelings, they become
        less overwhelming, less upsetting, and less scary. The people we trust
        with that important talk can help us know that we are not alone.❞
        <span className="not-italic"> - Mr. Rogers</span>
      </blockquote>
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
