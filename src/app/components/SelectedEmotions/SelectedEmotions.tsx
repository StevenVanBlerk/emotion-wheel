import { EmotionMap } from "@/app/types/emotions";

type SelectedEmotionsProps = { emotions: EmotionMap };

const SelectedEmotions = ({ emotions }: SelectedEmotionsProps) => {
  let selectedEmotionLabels: string[] = [];
  Object.values(emotions).forEach((emotionT0) => {
    if (emotionT0.isSelected) selectedEmotionLabels.push(emotionT0.label);
    Object.values(emotionT0.subEmotions).forEach((emotionT1) => {
      if (emotionT1.isSelected) selectedEmotionLabels.push(emotionT1.label);
      Object.values(emotionT1.subEmotions).forEach((emotionT2) => {
        if (emotionT2.isSelected) selectedEmotionLabels.push(emotionT2.label);
      });
    });
  });

  return (
    <div>
      <ul>
        {selectedEmotionLabels.map((emotion) => {
          return <li key={emotion}>{emotion}</li>;
        })}
      </ul>
    </div>
  );
};

export default SelectedEmotions;
