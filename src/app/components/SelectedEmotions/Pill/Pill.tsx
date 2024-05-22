import Image from "next/image";
import close from "/public/icons/closeIcon.svg";

type PillProps = {
  label: string;
  onClear: (label: string) => void;
  backgroundColor: string;
};

const Pill = ({ label, onClear, backgroundColor }: PillProps) => {
  const buttonId = `emotion-${label}`;
  return (
    <li
      className="flex w-fit justify-between gap-2 rounded-full pl-2 text-primaryText"
      style={{ backgroundColor }}
    >
      <label
        className="py-2"
        // htmlFor={buttonId} // removing this is a bandaid solution to label triggering button onClick
      >
        {label}
      </label>
      <button
        id={buttonId}
        className="relative h-full rounded-r-full pr-3 text-primaryText"
        onClick={(e) => onClear(label)}
        aria-label={`remove ${label}`}
      >
        <div className="relative z-20 ml-2 flex">
          <Image src={close} alt="" height={12} />
        </div>
        {/* dark opacity layer */}
        <div className="absolute left-0 top-0 z-10 h-full w-full rounded-r-full bg-black opacity-15" />
      </button>
    </li>
  );
};

export default Pill;
/**
 * Anything human is mentionable. Anything mentionable is manageable
 */
