interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      className={`w-full px-4 py-2 bg-light-lighter border rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy outline-none transition text-navy placeholder-gray-400 ${
        error ? 'border-red-500' : 'border-light-border'
      } ${className}`}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Input;
