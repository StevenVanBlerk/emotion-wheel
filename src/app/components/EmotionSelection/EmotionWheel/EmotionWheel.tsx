import { EmotionMap } from "@/app/types/emotions";
import React from "react";
import RotatableContainer from "./RotatableContainer";
import WheelSlice from "./WheelSlice";

type EmotionWheelProps = {
  emotions: EmotionMap;
  onEmotionSelect: (emotionKeySequence: string[]) => void;
};

const EmotionWheel = ({ emotions, onEmotionSelect }: EmotionWheelProps) => {
  console.log("EmotionWheel", { emotions });

  const emotionsArray = Object.entries(emotions);
  return (
    <div className="flex flex-wrap text-xs">
      <RotatableContainer>
        <div
          style={{
            width: "300px",
            height: "300px",
            border: "1px dashed lightblue",
            placeContent: "center",
            // TO-DO: add background image here that is a collection of slice colors. This one image will act as all slice backgrounds
          }}
        >
          {emotionsArray.map(([keyT0, emotion], index) => {
            const sliceCount = emotionsArray.length;
            const sliceWidth = 360 / sliceCount; //degrees
            return (
              <WheelSlice
                key={keyT0}
                emotion={emotion}
                sliceWidth={sliceWidth}
                sliceIndex={index}
                onEmotionSelect={() => {
                  onEmotionSelect([keyT0]);
                }}
              />
            );
          })}
        </div>
      </RotatableContainer>
    </div>
  );
};

export default EmotionWheel;
