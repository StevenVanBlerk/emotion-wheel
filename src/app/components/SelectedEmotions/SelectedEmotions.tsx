type SelectedEmotionsProps = { emotionGroup: string[][] };

const SelectedEmotions = ({ emotionGroup }: SelectedEmotionsProps) => {
  return (
    <div className="mt-8">
      <ul>
        {emotionGroup.map((emotionKeySequence) => {
          const [emotionKeyT0, emotionKeyT1, emotionKeyT2] = emotionKeySequence;
          const emotionLabel = emotionKeyT2 || emotionKeyT1 || emotionKeyT0;
          return <li key={emotionLabel}>{emotionLabel}</li>;
        })}
      </ul>
    </div>
  );
};

export default SelectedEmotions;
