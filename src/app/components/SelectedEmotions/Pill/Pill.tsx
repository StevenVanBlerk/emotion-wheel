import Image from "next/image";
import close from "/public/icons/closeIcon.svg";

type PillProps = { label: string; onClear: (label: string) => void };

const Pill = ({ label, onClear }: PillProps) => {
  const buttonId = `emotion-${label}`;
  return (
    <li className="flex w-fit justify-between gap-2 rounded-full bg-primary pl-2 text-primaryText">
      <label
        className="py-2"
        // htmlFor={buttonId} // removing this is a bandaid solution to label triggering button onClick
      >
        {label}
      </label>
      <button
        id={buttonId}
        className="h-full rounded-r-full bg-secondary pr-3 text-primaryText"
        onClick={(e) => onClear(label)}
        aria-label={`remove ${label}`}
      >
        <div className="ml-2 flex">
          <Image src={close} alt="" height={12} />
        </div>
      </button>
    </li>
  );
};

export default Pill;
/**
 * Anything human is mentionable. Anything mentionable is manageable
 */
