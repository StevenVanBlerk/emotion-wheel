import { ViewOptions } from "@/app/types/views";

type ViewPickerProps = {
  selectedView: ViewOptions;
  onViewSelect: (view: ViewOptions) => void;
};

const ViewPicker = ({ selectedView, onViewSelect }: ViewPickerProps) => {
  return (
    <div className="mb-4">
      <button
        className="rounded border-2 bg-gray-500"
        onClick={() => {
          onViewSelect("LIST");
        }}
      >
        List
      </button>
      <button
        className="ml-4 rounded border-2 bg-gray-500"
        onClick={() => {
          onViewSelect("WHEEL");
        }}
      >
        Wheel
      </button>
    </div>
  );
};

export default ViewPicker;
