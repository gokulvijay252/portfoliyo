import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  const { darkMode, theme } = useTheme();
  const dividerBg = darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(28,43,58,0.3)';

  return (
    <section
      id={id}
      className={`min-h-screen flex flex-col justify-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 ${className}`}
      style={{ background: theme.bg }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {title && (
          <motion.h2
            className="text-2xl sm:text-3xl font-extrabold text-center mb-8 sm:mb-12"
            style={{ color: theme.heading }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {title}
            <div className="w-12 sm:w-16 h-1 mx-auto mt-3 rounded-full" style={{ background: dividerBg }} />
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
