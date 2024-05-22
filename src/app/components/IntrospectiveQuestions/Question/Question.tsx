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
  const [isDisabled, setIsDisabled] = useState(false);

  if (!isVisible) return;

  return (
    <div className="radius mt-8 border border-surfaceBorder bg-surfaceForeground p-4">
      <label className="grid gap-2">
        {label}
        <textarea
          placeholder="Think to yourself or write it down here.."
          className="rounded p-2 text-sm outline-primary"
          rows={6}
        />
      </label>

      {hasSubmitButton && (
        <button
          className={`${isDisabled ? "opacity-50" : "opacity-100"} text-md mx-auto mt-3 flex h-10 items-center text-nowrap rounded bg-secondary p-2 text-left text-primaryText`}
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
