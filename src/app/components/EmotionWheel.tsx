import { emotions } from "../utils/emotions";

const EmotionWheel = () => {
  return (
    <div>
      {emotions.map((emotionT1) => {
        return (
          <div>
            {emotionT1.label}
            <div className="pl-8">
              {emotionT1.subEmotions.map((emotionT2) => {
                return (
                  <div>
                    {emotionT2.label}
                    <div className="pl-8">
                      {emotionT2.subEmotions.map((emotionT3) => {
                        return <div>{emotionT3.label}</div>;
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
