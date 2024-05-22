import { useState } from "react";

type QuestionProps = {
  label: string;
  onSubmit: () => void;
  isVisible: boolean;
  hasSubmitButton?: boolean;
};

const Question = ({
  label,
  onSubmit,
  isVisible,
  hasSubmitButton = true,
}: QuestionProps) => {
  if (!isVisible) return;
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <div className="radius bg-surfaceForeground border-surfaceBorder mt-8 border p-4">
      <label className="grid gap-1">
        {label}
        <textarea className="pt-2 text-sm" rows={4} />
      </label>

      {hasSubmitButton && (
        <button
          className={`${isDisabled ? "opacity-50" : "opacity-100"} bg-primary text-md text-primaryText ml-auto mt-2 flex h-10 items-center text-nowrap rounded p-2 text-left`}
          onClick={() => {
            onSubmit();
            setIsDisabled(true);
          }}
          disabled={isDisabled}
        >
          I&apos;m ready to move on
        </button>
      )}
    </div>
  );
};

export default Question;
