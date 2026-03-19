import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { getExperience } from '../../services/experienceService';
import Spinner from '../ui/Spinner';
import { FaBriefcase, FaCalendarAlt, FaBuilding, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const formatDate = (date: string | null): string => {
  if (!date) return 'Present';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
};

const getYears = (start: string, end: string | null): string => {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const diff = e.getFullYear() - s.getFullYear();
  const months = e.getMonth() - s.getMonth();
  const totalMonths = diff * 12 + months;
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  if (years === 0) return `${remainingMonths} months`;
  if (remainingMonths === 0) return `${years}+ years`;
  return `${years}+ years`;
};

const Experience: React.FC = () => {
  const { data: experience, loading, error } = useFetch(getExperience);
  const { theme } = useTheme();

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!experience || experience.length === 0) return null;

  return (
    <section
      id="experience"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 w-full"
      style={{ background: theme.bg }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold"
            style={{ color: theme.heading }}
          >
            Experience
          </h2>
        </motion.div>

        <motion.p
          className="text-center font-bold max-w-2xl mx-auto mb-14 sm:mb-20 leading-relaxed"
          style={{ color: theme.textSecondary, fontSize: '17px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          My professional journey and work experience in building modern web applications.
        </motion.p>

        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {experience.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceCard: React.FC<{
  exp: {
    id: number;
    company: string;
    role: string;
    start_date: string;
    end_date: string | null;
    description: string;
  };
  index: number;
}> = ({ exp, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { darkMode, theme } = useTheme();
  const isPresent = !exp.end_date;
  const bullets = exp.description.split('\n').filter((l) => l.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-2xl p-7 sm:p-10 transition-all duration-400"
      style={{
        background: isHovered ? theme.cardBgHover : theme.cardBg,
        boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.08)',
        border: isHovered ? theme.cardBorderHover : theme.cardBorder,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: theme.iconBg }}
          >
            <FaBriefcase style={{ color: theme.text }} className="text-lg sm:text-xl" />
          </div>
          <div>
            <h3 className="font-extrabold" style={{ color: theme.text, fontSize: '22px' }}>
              {exp.role}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <FaBuilding size={13} style={{ color: theme.textSecondary }} />
              <span className="font-extrabold" style={{ color: theme.textSecondary, fontSize: '15px' }}>
                {exp.company}
              </span>
            </div>
          </div>
        </div>
        {isPresent && (
          <span
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Current
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-7">
        <div className="flex items-center gap-1.5">
          <FaCalendarAlt size={14} style={{ color: theme.textSecondary }} />
          <span className="font-bold font-mono" style={{ color: theme.text, fontSize: '15px' }}>
            {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
          </span>
        </div>
        <span
          className="inline-flex items-center px-3 py-1 rounded-full font-bold"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(28,43,58,0.08)',
            color: theme.text,
            border: darkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(28,43,58,0.15)',
            fontSize: '14px',
          }}
        >
          {getYears(exp.start_date, exp.end_date)}
        </span>
      </div>

      <div className="space-y-3.5">
        {bullets.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-2.5"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
          >
            <FaChevronRight
              size={12}
              className="mt-1.5 flex-shrink-0"
              style={{ color: theme.textSecondary }}
            />
            <span className="font-bold leading-relaxed" style={{ color: theme.textSecondary, fontSize: '15px' }}>
              {line.replace(/^[-•]\s*/, '')}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
