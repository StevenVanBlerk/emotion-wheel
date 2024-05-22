type CardProps = { children: React.ReactNode; className?: string };

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`${className} bg-surfaceBackground border-surfaceBorder rounded border p-4`}
    >
      {children}
    </div>
  );
};

export default Card;
