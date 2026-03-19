interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-light-lighter border border-light-border rounded-xl hover:border-gray-400 transition-all duration-300 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

export default Card;
