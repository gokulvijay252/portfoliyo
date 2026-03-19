interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => (
  <span
    className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-navy/10 text-navy ${className}`}
  >
    {children}
  </span>
);

export default Badge;
