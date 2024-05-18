import { EmotionMap } from "@/app/types/emotions";
import React from "react";

type EmotionWheelProps = {
  emotions: EmotionMap;
  onEmotionSelect: (emotionKey: string[]) => void; //emotion key chain rather? ['Anger', 'Hurt']
};

const EmotionWheel = ({ emotions, onEmotionSelect }: EmotionWheelProps) => {
  return (
    <div className="flex flex-wrap text-xs">
      {Object.entries(emotions).map(([keyT0, emotionT0]) => {
        return (
          <div key={emotionT0.label} className="border border-white p-1">
            <button
              className={`m-1 ml-8 rounded border-2 border-gray-600 ${emotionT0.isSelected ? "bg-green-500" : "bg-gray-500"}`}
              onClick={() => {
                onEmotionSelect([keyT0]);
              }}
            >
              {emotionT0.label}
            </button>
            <div className="pl-8">
              {Object.entries(emotionT0.subEmotions).map(
                ([keyT1, emotionT1]) => {
                  return (
                    <div key={emotionT1.label}>
                      <button
                        className={`m-1 ml-8 rounded border-2 border-gray-600 ${emotionT1.isSelected ? "bg-green-500" : "bg-gray-500"}`}
                        onClick={() => {
                          onEmotionSelect([keyT0, keyT1]);
                        }}
                      >
                        {emotionT1.label}
                      </button>
                      <div className="pl-8">
                        {Object.entries(emotionT1.subEmotions).map(
                          ([keyT2, emotionT2]) => {
                            return (
                              <div key={emotionT2.label}>
                                <button
                                  className={`m-1 ml-8 rounded border-2 border-gray-600 ${emotionT2.isSelected ? "bg-green-500" : "bg-gray-500"}`}
                                  onClick={() => {
                                    onEmotionSelect([keyT0, keyT1, keyT2]);
                                  }}
                                >
                                  {emotionT2.label}
                                </button>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmotionWheel;
