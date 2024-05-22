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

  const enabledClassNames = "opacity-100";
  const disabledClassNames = "opacity-40";

  const cursorClassNames = `${isActive ? "cursor-pointer" : undefined}`;
  const hasSubEmotions = Object.keys(subEmotions).length > 0;
  return (
    <li className={`${isActive ? enabledClassNames : disabledClassNames}`}>
      {/* <li className={`${isActive ? enabledClassNames : disabledClassNames} flex`}> */}
      {/* Buttons wrapper */}
      <div
        className={`text-md my-1 flex h-10 w-40 columns-1 rounded-md bg-secondary text-primaryText`}
      >
        {/* Expand button */}
        <button
          onClick={() => onEmotionSelect(emotionKeySequence)}
          disabled={!isActive || !hasSubEmotions}
          aria-label={`expand ${label}`}
          className={`${isSelected && "opacity-80"} w-full`}
        >
          <div className="ml-2 flex">
            {hasSubEmotions && (
              <Image
                src={triangleRight}
                alt=""
                width={6}
                className={`${isSelected ? "rotate-90" : "rotate-0"} transition-transform`}
              />
            )}
            <label className="ml-2 ">{label}</label>
          </div>
        </button>
        {/* Submit button */}
        <button
          className="ml-auto h-full rounded-r-md bg-primary px-3"
          disabled={!isActive}
          onClick={() => onEmotionSubmit(emotionKeySequence)}
        >
          <label
            className={`${cursorClassNames} text-2xl`}
            aria-label={`select ${label}`}
          >
            +
          </label>
        </button>
      </div>
      {/* SubEmotions */}
      {subEmotions && isSelected && (
        <ul className="ml-16 flex flex-col gap-x-2">
          {/* // <ul className="ml-2 flex flex-col gap-x-2"> */}
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
