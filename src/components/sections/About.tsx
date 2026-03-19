import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { getAbout } from '../../services/aboutService';
import Section from '../layout/Section';
import Spinner from '../ui/Spinner';

const About: React.FC = () => {
  const { data: about, loading, error } = useFetch(getAbout);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!about) return null;

  return (
    <Section id="about" title="About Me">
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 max-w-4xl mx-auto">
        {about.profile_image_url && (
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <img
              src={about.profile_image_url}
              alt="Profile"
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover ring-4 ring-light-border"
              style={{ transform: 'scale(0.95)' }}
            />
          </motion.div>
        )}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <p className="text-white font-normal text-base sm:text-lg leading-relaxed whitespace-pre-line text-center md:text-left">
            {about.bio}
          </p>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
