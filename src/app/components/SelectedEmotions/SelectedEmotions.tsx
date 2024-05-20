type SelectedEmotionsProps = { selectedEmotionLabels: string[] };

const SelectedEmotions = ({ selectedEmotionLabels }: SelectedEmotionsProps) => {
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
