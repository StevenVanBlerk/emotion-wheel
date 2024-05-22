type PillProps = { label: string };

const Pill = ({ label }: PillProps) => {
  return <li className="w-fit rounded-full bg-gray-200 p-2">{label}</li>;
};

export default Pill;
/**
 * Anything human is mentionable. Anything mentionable is manageable
 */
