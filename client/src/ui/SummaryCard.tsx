interface SummaryCardProps {
  title: string;
  count: number;
  icon: JSX.Element;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  count,
  icon,
  color,
}) => {
  return (
    <div className="flex items-center p-4 bg-white shadow rounded-lg">
      <div className={`mr-4 ${color}`}>{icon}</div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-xl">{count}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
