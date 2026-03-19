import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { getQualifications } from '../../services/qualificationService';
import Spinner from '../ui/Spinner';
import { FaStar, FaCalendarAlt, FaUniversity } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const Qualification: React.FC = () => {
  const { data: qualifications, loading, error } = useFetch(getQualifications);
  const { theme } = useTheme();

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!qualifications || qualifications.length === 0) return null;

  return (
    <section
      id="qualification"
      className="relative py-16 sm:py-20 md:py-24 px-6 sm:px-8 w-full"
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
            Qualification
          </h2>
        </motion.div>

        <motion.p
          className="text-center font-normal max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
          style={{ color: theme.textSecondary, fontSize: '17px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          My academic qualifications and certifications.
        </motion.p>

        <div className="mx-auto flex flex-col gap-6" style={{ maxWidth: '893px' }}>
          {qualifications.map((qual, i) => (
            <motion.div
              key={qual.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
            >
              <div
                className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:translate-y-[-4px]"
                style={{
                  background: theme.cardBg,
                  border: theme.cardBorder,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: theme.iconBg }}
                  >
                    <FaStar style={{ color: theme.heading }} className="text-xl sm:text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-extrabold" style={{ color: theme.heading }}>
                      {qual.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <FaUniversity size={13} style={{ color: theme.textSecondary }} />
                      <span className="font-normal" style={{ color: theme.textSecondary, fontSize: '15px' }}>
                        {qual.organization}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <FaCalendarAlt size={13} style={{ color: theme.textSecondary }} />
                      <span className="font-normal font-mono" style={{ color: theme.textSecondary, fontSize: '14px' }}>
                        {qual.start_year} - {qual.end_year || 'Present'}
                      </span>
                    </div>
                    {qual.description && (
                      <p className="mt-3 leading-relaxed" style={{ color: theme.textSecondary, fontSize: '15px' }}>
                        {qual.description}
                      </p>
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

export default Qualification;
