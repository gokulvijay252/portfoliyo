import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { getHero } from '../../services/heroService';
import { getAbout } from '../../services/aboutService';
import Spinner from '../ui/Spinner';
import { FaDownload } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';
import Confetti from '../ui/Confetti';

const Hero: React.FC = () => {
  const { data: hero, loading, error } = useFetch(getHero);
  const { data: about } = useFetch(getAbout);
  const { darkMode, theme } = useTheme();

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center py-20">{error}</p>;

  const stars = [
    { top: '-8%', left: '-8%', size: 28, delay: 0 },
    { top: '5%', right: '-12%', size: 22, delay: 0.6 },
    { bottom: '-6%', left: '10%', size: 18, delay: 1.2 },
    { bottom: '10%', right: '-10%', size: 14, delay: 1.8 },
    { top: '50%', left: '-14%', size: 16, delay: 2.4 },
  ];

  const btnBg = darkMode ? '#ffffff' : '#1c2b3a';
  const btnText = darkMode ? '#1c2b3a' : '#ffffff';
  const btnShadow = darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(28,43,58,0.25)';

  return (
    <section id="hero" className="relative min-h-screen" style={{ background: theme.bg }}>
      <Confetti />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4 sm:mb-6"
              style={{ color: theme.heading, fontFamily: "'Times New Roman', serif" }}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {hero?.name || 'Vijay A'}
            </motion.h1>
            <motion.p
              className="font-extrabold text-lg sm:text-xl leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ color: theme.text, fontFamily: "'Times New Roman', serif" }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              Software Developer / Fullstack Developer
            </motion.p>
            <motion.p
              className="hidden sm:block font-bold leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ fontSize: '17px', color: theme.textSecondary, fontFamily: "'Times New Roman', serif" }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            >
              I am a dedicated Software Developer with 4+ years of experience in full-stack development, specializing in React.js, Node.js, and MySQL. I have developed scalable and secure web applications and high-performance REST APIs, with strong expertise in writing clean, maintainable code and implementing security best practices. I work closely with cross-functional teams to deliver robust solutions that drive business growth.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <a
                href="#projects"
                className="w-full sm:w-auto inline-block px-6 sm:px-10 py-3 sm:py-4 font-bold text-base sm:text-lg rounded-full hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-300 text-center"
                style={{ background: btnBg, color: btnText, boxShadow: `0 4px 12px ${btnShadow}` }}
              >
                See My Projects
              </a>
              <a
                href="/VIJAY.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-3 sm:py-4 font-bold text-base sm:text-lg rounded-full hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-300"
                style={{ background: btnBg, color: btnText, boxShadow: `0 4px 12px ${btnShadow}` }}
              >
                <FaDownload size={16} />
                Download Resume
              </a>
            </motion.div>
          </div>

          <motion.div
            className="flex-shrink-0 order-first lg:order-last"
            initial={{ opacity: 0, scale: 0.8, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="relative">
              {stars.map((star, i) => {
                const { size, delay, ...pos } = star;
                return (
                  <motion.div
                    key={i}
                    className="absolute animate-float pointer-events-none z-10"
                    style={{ ...pos, color: theme.text, animationDelay: `${delay}s` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.15, ease: 'backOut' }}
                  >
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                    </svg>
                  </motion.div>
                );
              })}
              <div className="w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-avatar">
                {about?.profile_image_url ? (
                  <img
                    src={about.profile_image_url}
                    alt={hero?.name || 'Vijay A'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-light-lighter/80">
                    <svg className="w-20 h-20 sm:w-32 sm:h-32" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
