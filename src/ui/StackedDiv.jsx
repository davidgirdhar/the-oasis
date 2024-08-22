const Stacked = ({ firstChildText, lastChildText }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-medium">{firstChildText}</span>
      <span className="text-gray-500 text-[1.2rem]">{lastChildText}</span>
    </div>
  );
};

export default Stacked;