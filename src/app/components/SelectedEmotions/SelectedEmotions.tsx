import { Card } from "..";
import Pill from "./Pill";

type SelectedEmotionsProps = { emotionGroup: string[][] };

const SelectedEmotions = ({ emotionGroup }: SelectedEmotionsProps) => {
  return (
    <Card className="mt-8">
      <ul className="flex flex-wrap gap-2">
        {emotionGroup.map((emotionKeySequence) => {
          const [emotionKeyT0, emotionKeyT1, emotionKeyT2] = emotionKeySequence;
          const emotionLabel = emotionKeyT2 || emotionKeyT1 || emotionKeyT0;
          return <Pill key={emotionLabel} label={emotionLabel} />;
        })}
        add remove button
      </ul>
    </Card>
  );
};

export default SelectedEmotions;
