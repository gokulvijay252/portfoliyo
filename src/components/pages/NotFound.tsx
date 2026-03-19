import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const NotFound: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: theme.bg }}
    >
      <h1 className="text-6xl font-extrabold mb-4" style={{ color: theme.heading }}>404</h1>
      <p className="text-lg mb-8" style={{ color: theme.textSecondary }}>Page not found</p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full font-bold transition-all"
        style={{ background: theme.heading, color: '#000' }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
