interface ProgressBarProps {
  label: string;
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value }) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-navy">{label}</span>
      <span className="text-sm text-gray-500">{value}%</span>
    </div>
    <div className="w-full bg-light-lighter rounded-full h-2.5">
      <div
        className="bg-navy h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default ProgressBar;
