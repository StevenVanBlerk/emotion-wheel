import { getBackgroundColor } from "@/app/utils/emotions";
import { Card } from "..";
import Pill from "./Pill";

type SelectedEmotionsProps = {
  emotionGroup: string[][];
  removeEmotionFromGroup: (emotionKey: string) => void;
};

const SelectedEmotions = ({
  emotionGroup,
  removeEmotionFromGroup,
}: SelectedEmotionsProps) => {
  return (
    <Card className="mt-8 bg-surfaceForeground">
      <ul className="flex flex-wrap gap-2">
        {emotionGroup.map((emotionKeySequence) => {
          const [emotionKeyT0, emotionKeyT1, emotionKeyT2] = emotionKeySequence;
          const emotionLabel = emotionKeyT2 || emotionKeyT1 || emotionKeyT0;
          const backgroundColor = getBackgroundColor(emotionKeyT0);
          return (
            <Pill
              key={emotionLabel}
              label={emotionLabel}
              onClear={removeEmotionFromGroup}
              backgroundColor={backgroundColor}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default SelectedEmotions;
