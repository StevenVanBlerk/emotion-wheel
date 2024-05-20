import { EmotionMap } from "@/app/types/emotions";

type EmotionListProps = {
  emotions: EmotionMap;
  onEmotionSelect: (emotionKeySequence: string[]) => void;
};

const EmotionList = ({ emotions, onEmotionSelect }: EmotionListProps) => {
  const emotionsT0 = Object.entries(emotions);

  return (
    <ul>
      {emotionsT0.map(([keyT0, emotionT0]) => {
        if (!emotionT0.isActive) return;

        const emotionsT1 = Object.entries(emotionT0.subEmotions);
        return (
          <li key={emotionT0.label}>
            <button
              className={`m-1 ml-8 rounded border-2 border-gray-600 ${emotionT0.isSelected ? "bg-green-500" : "bg-gray-500"}`}
              onClick={() => {
                onEmotionSelect([keyT0]);
              }}
            >
              {emotionT0.label}
            </button>

            <ul className="pl-8">
              {emotionsT1.map(([keyT1, emotionT1]) => {
                if (!emotionT1.isActive) return;

                const emotionsT2 = Object.entries(emotionT1.subEmotions);
                return (
                  <li key={emotionT1.label}>
                    <button
                      className={`m-1 ml-8 rounded border-2 border-gray-600 ${emotionT1.isSelected ? "bg-green-500" : "bg-gray-500"}`}
                      onClick={() => {
                        onEmotionSelect([keyT0, keyT1]);
                      }}
                    >
                      {emotionT1.label}
                    </button>
                    <ul className="pl-8">
                      {emotionsT2.map(([keyT2, emotionT2]) => {
                        if (!emotionT2.isActive) return;

                        return (
                          <li key={emotionT2.label}>
                            <button
                              className={`m-1 ml-8 rounded border-2 border-gray-600 ${emotionT2.isSelected ? "bg-green-500" : "bg-gray-500"}`}
                              onClick={() => {
                                onEmotionSelect([keyT0, keyT1, keyT2]);
                              }}
                            >
                              {emotionT2.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default EmotionList;
