import { useEffect, useState } from "react";
import Question from "./Question";
import { Card, SelectedEmotions } from "..";

type IntroSpectiveQuestionsProps = {
  emotionGroup: string[][];
  removeEmotionFromGroup: (emotionKey: string) => void;
};

const IntrospectiveQuestions = ({
  emotionGroup,
  removeEmotionFromGroup,
}: IntroSpectiveQuestionsProps) => {
  const [step, setStep] = useState(0);

  const incrementStep = () => {
    setStep((previousState) => previousState + 1);
  };

  // scrolling the next question into view
  useEffect(() => {
    if (step !== 0) {
      const scrollHeight = document.documentElement.scrollHeight;
      window.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }, [step]);

  return (
    <Card>
      <SelectedEmotions
        emotionGroup={emotionGroup}
        removeEmotionFromGroup={removeEmotionFromGroup}
      />
      <Question
        label="Why am I feeling this way?"
        onSubmit={incrementStep}
        isVisible={step >= 0}
      />
      <Question
        label="What would I say to a friend feeling this way?"
        onSubmit={incrementStep}
        isVisible={step >= 1}
      />
      <Question
        label="What can I do with this feeling?"
        onSubmit={incrementStep}
        isVisible={step >= 2}
      />
      <Question
        label="Do I need help?"
        onSubmit={incrementStep}
        isVisible={step >= 3}
      />
      <Question
        label="Who can help me with this?"
        onSubmit={incrementStep}
        isVisible={step >= 4}
        hasSubmitButton={false}
      />
    </Card>
  );
};

export default IntrospectiveQuestions;
