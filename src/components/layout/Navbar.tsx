import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Qualification', href: '#qualification' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: <FaLinkedinIn />, href: 'https://linkedin.com/in/vijay-a-1a83b4221', label: 'LinkedIn' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { darkMode, toggleDarkMode, theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'skills', 'qualification', 'projects', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-10% 0px -10% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navBg = scrolled ? theme.navBg : 'transparent';
  const mobileBg = theme.navBg;
  const textColor = '#ffffff';
  const textMuted = darkMode ? '#ffffff' : 'rgba(28,43,58,0.7)';

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-md shadow-sm' : ''
      }`}
      style={{ background: navBg }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Mobile hamburger - left side */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className="block h-0.5 transition-transform"
              style={{ background: textColor, transform: mobileOpen ? 'rotate(45deg) translateY(8px)' : 'none' }}
            />
            <span
              className="block h-0.5 transition-opacity"
              style={{ background: textColor, opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block h-0.5 transition-transform"
              style={{ background: textColor, transform: mobileOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }}
            />
          </div>
        </button>

        <ul className="hidden md:flex gap-20">
          {NAV_ITEMS.map((item, i) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                <a
                  href={item.href}
                  className="text-[17px] font-normal transition-colors"
                  style={{
                    color: isActive ? textColor : textMuted,
                    textShadow: isActive ? (darkMode ? '0 0 12px rgba(255,255,255,0.4)' : '0 0 12px rgba(28,43,58,0.2)') : 'none',
                  }}
                >
                  {item.label}
                </a>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          className="hidden md:flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl transition-colors"
              style={{ color: textMuted }}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
          <button
            onClick={toggleDarkMode}
            className="text-xl transition-colors p-1"
            style={{ color: textMuted }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </motion.div>

        <div className="md:hidden" />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Right side panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 left-0 h-full w-[70%] max-w-[300px] z-50 md:hidden flex flex-col"
              style={{ background: mobileBg }}
            >
              <ul className="flex flex-col py-6">
                {NAV_ITEMS.map((item, i) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <a
                        href={item.href}
                        className="block px-6 py-3 font-normal text-[17px]"
                        style={{
                          color: isActive ? textColor : textMuted,
                          background: isActive ? (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(28,43,58,0.08)') : 'transparent',
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileOpen(false);
                          const sid = item.href.replace('#', '');
                          setTimeout(() => {
                            document.getElementById(sid)?.scrollIntoView({ behavior: 'smooth' });
                          }, 350);
                        }}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto flex items-center gap-5 px-6 pb-8">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl transition-colors"
                    style={{ color: textMuted }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
                <button
                  onClick={toggleDarkMode}
                  className="text-xl transition-colors p-1"
                  style={{ color: textMuted }}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
