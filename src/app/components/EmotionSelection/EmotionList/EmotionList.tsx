import { EmotionMap } from "@/app/types/emotions";
import EmotionRecursiveButton from "./EmotionRecursiveButton";
import { Card } from "../..";

type EmotionListProps = {
  emotions: EmotionMap;
  onEmotionSelect: (emotionKeySequence: string[]) => void;
  onEmotionSubmit: (keySequence: string[]) => void;
};

const EmotionList = ({
  emotions,
  onEmotionSelect,
  onEmotionSubmit,
}: EmotionListProps) => {
  const emotionsT0 = Object.entries(emotions);

  return (
    <div>
      <ul className="flex flex-col flex-wrap gap-x-2">
        {emotionsT0.map(([keyT0, emotionT0]) => {
          return (
            <EmotionRecursiveButton
              key={keyT0}
              emotion={emotionT0}
              emotionKeySequence={[keyT0]}
              onEmotionSelect={onEmotionSelect}
              onEmotionSubmit={onEmotionSubmit}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default EmotionList;
