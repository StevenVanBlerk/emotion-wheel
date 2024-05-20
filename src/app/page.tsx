"use client";

import {
  EmotionWheel,
  IntrospectiveQuestions,
  SelectedEmotions,
} from "./components";
import { useState } from "react";
import { staticEmotions } from "./utils/emotions";
import { StaticEmotion, EmotionMap, Emotion } from "./types/emotions";

export default function Home() {
  const formatEmotionsInitialState = (
    staticEmotions: StaticEmotion[],
  ): EmotionMap => {
    const formattedEmotions: EmotionMap = {};
    staticEmotions.forEach((staticEmotion) => {
      const emotion = {
        label: staticEmotion.label,
        color: staticEmotion.color,
        isSelected: false,
        isActive: [
          "Anger",
          "Disgust",
          "Sad",
          "Happy",
          "Surprise",
          "Fear",
        ].includes(staticEmotion.label),
        subEmotions: formatEmotionsInitialState(staticEmotion.subEmotions),
      };
      formattedEmotions[emotion.label] = emotion;
    });
    return formattedEmotions;
  };

  const [emotions, setEmotions] = useState<EmotionMap>(
    formatEmotionsInitialState(staticEmotions),
  );
  const [selectedEmotionLabels, setSelectedEmotionLabels] = useState<string[]>(
    [],
  );

  const evaluateActiveStates = (
    emotionsCopy: EmotionMap,
    newSelectedEmotionLabels: string[],
  ) => {
    Object.values(emotionsCopy).forEach((emotionT0) => {
      let isT0Active =
        newSelectedEmotionLabels.length == 0
          ? true
          : newSelectedEmotionLabels.includes(emotionT0.label);
      emotionT0.isActive = isT0Active;

      Object.values(emotionT0.subEmotions).forEach((emotionT1) => {
        let isT1Active = newSelectedEmotionLabels.includes(emotionT0.label);
        emotionT1.isActive = isT1Active;

        Object.values(emotionT1.subEmotions).forEach((emotionT2) => {
          let isT2Active = newSelectedEmotionLabels.includes(emotionT1.label);
          emotionT2.isActive = isT2Active;
        });
      });
    });
  };

  const onEmotionSelect = (emotionKeySequence: string[]) => {
    const newEmotions: EmotionMap = JSON.parse(JSON.stringify(emotions));
    let newSelectedEmotionLabels = [];
    const [keyT0, keyT1, keyT2] = emotionKeySequence;

    if (keyT2) {
      const relevantEmotion =
        newEmotions[keyT0].subEmotions[keyT1].subEmotions[keyT2];
      relevantEmotion.isSelected = !relevantEmotion.isSelected;

      newSelectedEmotionLabels = selectedEmotionLabels.includes(
        relevantEmotion.label,
      )
        ? selectedEmotionLabels.filter(
            (label) => label !== relevantEmotion.label,
          )
        : [...selectedEmotionLabels, relevantEmotion.label];
    } else if (keyT1) {
      const relevantEmotion = newEmotions[keyT0].subEmotions[keyT1];
      relevantEmotion.isSelected = !relevantEmotion.isSelected;

      newSelectedEmotionLabels = selectedEmotionLabels.includes(
        relevantEmotion.label,
      )
        ? selectedEmotionLabels.filter(
            (label) => label !== relevantEmotion.label,
          )
        : [...selectedEmotionLabels, relevantEmotion.label];
    } else {
      const relevantEmotion = newEmotions[keyT0];
      relevantEmotion.isSelected = !relevantEmotion.isSelected;
      newSelectedEmotionLabels = selectedEmotionLabels.includes(
        relevantEmotion.label,
      )
        ? selectedEmotionLabels.filter(
            (label) => label !== relevantEmotion.label,
          )
        : [...selectedEmotionLabels, relevantEmotion.label];
    }

    evaluateActiveStates(newEmotions, newSelectedEmotionLabels);
    setEmotions(newEmotions);
    setSelectedEmotionLabels(newSelectedEmotionLabels);
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
