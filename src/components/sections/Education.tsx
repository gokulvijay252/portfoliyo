import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { getEducation } from '../../services/educationService';
import Spinner from '../ui/Spinner';
import { FaGraduationCap } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const Education: React.FC = () => {
  const { data: education, loading, error } = useFetch(getEducation);
  const { theme } = useTheme();

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!education || education.length === 0) return null;

  return (
    <section
      id="education"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 w-full"
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
            Education
          </h2>
        </motion.div>

        <motion.p
          className="text-center text-sm sm:text-base font-normal max-w-2xl mx-auto mb-10 sm:mb-14 leading-relaxed"
          style={{ color: theme.textSecondary }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          My academic background and qualifications.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              className="w-full sm:w-[calc(50%-0.75rem)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
            >
              <div
                className="rounded-xl p-4 sm:p-6 h-full"
                style={{
                  background: theme.cardBg,
                  border: theme.cardBorder,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: theme.iconBg }}
                  >
                    <FaGraduationCap className="text-lg sm:text-xl" style={{ color: theme.text }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold" style={{ color: theme.heading }}>{edu.degree}</h3>
                    {edu.field && (
                      <p className="text-sm font-normal" style={{ color: theme.textSecondary }}>{edu.field}</p>
                    )}
                    <p className="font-normal mt-1" style={{ color: theme.text }}>{edu.institution}</p>
                    <p className="text-sm mt-1 font-normal font-mono" style={{ color: theme.textSecondary }}>
                      {edu.start_year} - {edu.end_year || 'Present'}
                    </p>
                    {edu.description && (
                      <p className="text-sm mt-2 font-normal" style={{ color: theme.textSecondary }}>{edu.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
