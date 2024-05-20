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

/** LIST VIEW */
// Object.entries(emotions).map(([keyT0, emotionT0]) => {
//   return (
//     <div key={emotionT0.label} className="border border-white p-1">
//       <button
//         className={`m-1 ml-8 rounded border-2 border-gray-600 ${emotionT0.isSelected ? "bg-green-500" : "bg-gray-500"}`}
//         onClick={() => {
//           onEmotionSelect([keyT0]);
//         }}
//       >
//         {emotionT0.label}
//       </button>
//       <div className="pl-8">
//         {Object.entries(emotionT0.subEmotions).map(([keyT1, emotionT1]) => {
//           return (
//             <div key={emotionT1.label}>
//               <button
//                 className={`m-1 ml-8 rounded border-2 border-gray-600 ${emotionT1.isSelected ? "bg-green-500" : "bg-gray-500"}`}
//                 onClick={() => {
//                   onEmotionSelect([keyT0, keyT1]);
//                 }}
//               >
//                 {emotionT1.label}
//               </button>
//               <div className="pl-8">
//                 {Object.entries(emotionT1.subEmotions).map(
//                   ([keyT2, emotionT2]) => {
//                     return (
//                       <div key={emotionT2.label}>
//                         <button
//                           className={`m-1 ml-8 rounded border-2 border-gray-600 ${emotionT2.isSelected ? "bg-green-500" : "bg-gray-500"}`}
//                           onClick={() => {
//                             onEmotionSelect([keyT0, keyT1, keyT2]);
//                           }}
//                         >
//                           {emotionT2.label}
//                         </button>
//                       </div>
//                     );
//                   },
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// });
