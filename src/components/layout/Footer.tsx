import { motion } from 'framer-motion';
import { FaLinkedinIn, FaEnvelope, FaHeart } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const Footer: React.FC = () => {
  const { darkMode, theme } = useTheme();
  const borderColor = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(28,43,58,0.1)';

  return (
    <motion.footer
      className="py-6 sm:py-10"
      style={{ background: theme.bg, borderTop: `1px solid ${borderColor}` }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="font-bold text-xs sm:text-sm" style={{ color: theme.text }}>
            &copy; {new Date().getFullYear()} Vijay A. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="https://linkedin.com/in/vijay-a-1a83b4221" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70" style={{ color: theme.text }} aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </a>
            <a href="mailto:vijay160400@gmail.com" className="transition-opacity hover:opacity-70" style={{ color: theme.text }} aria-label="Email">
              <FaEnvelope size={18} />
            </a>
          </div>
          <p className="font-bold text-xs sm:text-sm flex items-center gap-1" style={{ color: theme.text }}>
            Made with <FaHeart className="text-red-500" size={12} /> using React
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
