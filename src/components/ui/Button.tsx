interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const base = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50';
  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-hover active:bg-navy',
    secondary: 'bg-light-lighter text-gray-600 border border-light-border hover:bg-light-border active:bg-light-lighter',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
