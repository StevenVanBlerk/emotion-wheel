import { emotions } from "../utils/emotions";

const EmotionWheel = () => {
  return (
    <div className="grid grid-cols-4 text-xs mt-40">
      {emotions.map((emotionT1) => {
        return (
          <div key={emotionT1.label}>
            {emotionT1.label}
            <div className="pl-8">
              {emotionT1.subEmotions.map((emotionT2) => {
                return (
                  <div key={emotionT2.label}>
                    {emotionT2.label}
                    <div className="pl-8">
                      {emotionT2.subEmotions.map((emotionT3) => {
                        return (
                          <div key={emotionT3.label}>{emotionT3.label}</div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmotionWheel;
