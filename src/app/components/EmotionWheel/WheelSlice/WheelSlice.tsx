import { Emotion } from "@/app/types/emotions";

type WheelSliceProps = {
  emotion: Emotion;
  /** measured in degrees */
  sliceWidth: number;
  sliceIndex: number;
  onEmotionSelect: () => void;
};
// TO-DO: rebuild slice styling following this guide https://www.custarddoughnuts.co.uk/article/2016/5/14/making-segmented-circles-and-pie-charts-in-css
const WheelSlice = ({
  emotion,
  sliceWidth,
  sliceIndex,
  onEmotionSelect,
}: WheelSliceProps) => {
  return (
    <div
      style={{
        position: "absolute", // absolute so that all slices have the same origin point (no offset for later slices)
        transform: `translate(50%, -50%) rotate(${sliceWidth * sliceIndex}deg)`, // center within RotatableContainer and rotate that slice
        transformOrigin: "left", // rotating slice from LHS
        width: "100%",
        border: "1px dashed lightgreen",
        opacity: emotion.isActive ? "100%" : "50%",
        transition: "opacity .25s ease-in-out",
      }}
    >
      <div style={{ background: emotion.color }}>
        {/* Anger */}
        <p
          style={{
            marginLeft: "30px",
            border: "1px dashed red",
          }}
        >
          {emotion.label}
          <button
            className="ml-1 bg-gray-400 px-3 py-1"
            onClick={onEmotionSelect}
            disabled={!emotion.isActive}
          >
            {emotion.isSelected ? "-" : "+"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default WheelSlice;
