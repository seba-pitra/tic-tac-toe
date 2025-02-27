interface Props {
  children: string | string[];
  updateBoard?: (index: number) => void;
  isSelected?: boolean;
  index?: number;
}

export const Square: React.FC<Props> = ({
  children,
  updateBoard,
  isSelected,
  index,
}) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    if (updateBoard) updateBoard(index!);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
