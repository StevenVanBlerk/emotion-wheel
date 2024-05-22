import { Emotion } from "@/app/types/emotions";
import Image from "next/image";
import triangleRight from "/public/icons/triangleRight.svg";

type EmotionButtonProps = {
  emotion: Emotion;
  emotionKeySequence: string[];
  onEmotionSelect: (emotionKeySequence: string[]) => void;
  onEmotionSubmit: (emotionKeySequence: string[]) => void;
};

const EmotionRecursiveButton = ({
  emotion,
  emotionKeySequence,
  onEmotionSelect,
  onEmotionSubmit,
}: EmotionButtonProps) => {
  const { label, subEmotions, isSelected, isActive, backgroundColor } = emotion;

  const enabledClassNames = "";
  const disabledClassNames = "hidden";

  const hasSubEmotions = Object.keys(subEmotions).length > 0;
  return (
    <li className={`${isActive ? enabledClassNames : disabledClassNames}`}>
      {/* Buttons wrapper */}
      <div className="bg-secondary text-md text-primaryText my-4 flex h-10 w-40 rounded-md">
        {/* Expand button */}
        <button
          onClick={() => onEmotionSelect(emotionKeySequence)}
          disabled={!isActive}
          aria-label={`expand ${label}`}
          className={`${isSelected && "opacity-70"} w-full`}
        >
          <div className="ml-2 flex">
            {hasSubEmotions && <Image src={triangleRight} alt="" width={6} />}
            <label className="ml-2">{label}</label>
          </div>
        </button>
        {/* Submit button */}
        <button
          className="bg-primary ml-auto h-full rounded-r-md px-3"
          onClick={() => onEmotionSubmit(emotionKeySequence)}
        >
          <label
            className="cursor-pointer text-2xl"
            aria-label={`select ${label}`}
          >
            +
          </label>
        </button>
      </div>
      {subEmotions && (
        <ul className="flex flex-wrap gap-x-2">
          {Object.entries(subEmotions).map(([key, subEmotion]) => {
            return (
              <EmotionRecursiveButton
                key={key}
                emotion={subEmotion}
                emotionKeySequence={[...emotionKeySequence, key]}
                onEmotionSelect={onEmotionSelect}
                onEmotionSubmit={onEmotionSubmit}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default EmotionRecursiveButton;
