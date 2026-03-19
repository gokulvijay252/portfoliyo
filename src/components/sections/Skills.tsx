import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const SKILLS = [
  { name: 'HTML', image: '/HTML.svg' },
  { name: 'CSS', image: '/CSS.svg' },
  { name: 'JavaScript', image: '/JAVASCRIPT.svg' },
  { name: 'TypeScript', image: '/TYPESCRIPT.svg' },
  { name: 'React.js', image: '/REACTJS.svg' },
  { name: 'AngularJS', image: '/ANGULARJS.svg' },
  { name: 'Node.js', image: '/NODEJS.svg' },
  { name: 'PHP', image: '/PHP.svg' },
  { name: 'MySQL', image: '/MYSQL.svg' },
  { name: 'MongoDB', image: '/MONGODB.svg' },
];

const INNER = SKILLS.slice(0, 5);
const OUTER = SKILLS.slice(5);

const orbitCSS = `
.skills-orbit {
  --inner-r: 65px;
  --outer-r: 150px;
}
@media (min-width: 640px) {
  .skills-orbit {
    --inner-r: 95px;
    --outer-r: 200px;
  }
}
@media (min-width: 768px) {
  .skills-orbit {
    --inner-r: 120px;
    --outer-r: 250px;
  }
}
@keyframes orbit-cw {
  from { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
  to { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); }
}
@keyframes orbit-ccw {
  from { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
  to { transform: rotate(-360deg) translateX(var(--orbit-r)) rotate(360deg); }
}
.orbit-inner {
  --orbit-r: var(--inner-r);
  animation: orbit-cw 50s linear infinite;
  will-change: transform;
}
.orbit-outer {
  --orbit-r: var(--outer-r);
  animation: orbit-ccw 60s linear infinite;
  will-change: transform;
}

@keyframes globe-spin {
  from { transform: rotateY(0deg) rotateX(-20deg); }
  to   { transform: rotateY(360deg) rotateX(-20deg); }
}
.globe-wrapper {
  perspective: 800px;
}
.globe {
  transform-style: preserve-3d;
  animation: globe-spin 30s linear infinite;
}
.globe-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
}
@keyframes globe-glow {
  0%, 100% { box-shadow: 0 0 40px rgba(255,255,255,0.05), inset 0 0 40px rgba(255,255,255,0.02); }
  50%      { box-shadow: 0 0 80px rgba(255,255,255,0.1), inset 0 0 60px rgba(255,255,255,0.04); }
}
.globe-shell {
  animation: globe-glow 5s ease-in-out infinite;
}
`;

const Skills: React.FC = () => {
  const { darkMode, theme } = useTheme();
  const ringColor = darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(28,43,58,0.15)';
  const dashColor = darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(28,43,58,0.2)';
  const orbBg = darkMode ? '#ffffff' : '#ffffff';

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden w-full"
      style={{ paddingBottom: '11rem', background: theme.bg }}
    >
      <style>{orbitCSS}</style>
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
            Skills
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
          I am a passionate Full-Stack Developer skilled in building modern web applications.
          I specialize in crafting responsive interfaces and robust backend systems.
        </motion.p>

        <motion.div
          className="skills-orbit relative mx-auto w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="globe-wrapper" style={{ width: '85%', height: '85%' }}>
              <div className="globe relative w-full h-full">
                <div
                  className="globe-shell absolute inset-0 rounded-full"
                  style={{
                    border: `1.5px solid ${ringColor}`,
                    background: `radial-gradient(circle at 35% 35%, ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(28,43,58,0.06)'} 0%, transparent 60%)`,
                  }}
                />
                {[0, 30, 60, 90, 120, 150].map((deg) => (
                  <div key={`y${deg}`} className="globe-ring" style={{ transform: `rotateY(${deg}deg)`, border: `1px solid ${ringColor}` }} />
                ))}
                <div className="globe-ring" style={{ transform: 'rotateX(90deg)', border: `1px solid ${ringColor}` }} />
                <div className="globe-ring" style={{ transform: 'rotateX(90deg) translateZ(22%) scale(0.78)', border: `1px solid ${ringColor}` }} />
                <div className="globe-ring" style={{ transform: 'rotateX(90deg) translateZ(-22%) scale(0.78)', border: `1px solid ${ringColor}` }} />
                <div className="globe-ring" style={{ transform: 'rotateX(90deg) translateZ(42%) scale(0.5)', border: `1px solid ${ringColor}` }} />
                <div className="globe-ring" style={{ transform: 'rotateX(90deg) translateZ(-42%) scale(0.5)', border: `1px solid ${ringColor}` }} />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute rounded-full w-[130px] h-[130px] sm:w-[190px] sm:h-[190px] md:w-[240px] md:h-[240px]"
              style={{ border: `1px dashed ${dashColor}` }}
            />
            <div
              className="absolute rounded-full w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]"
              style={{ border: `1px dashed ${dashColor}` }}
            />
          </div>

          {INNER.map((skill, i) => (
            <div
              key={skill.name}
              className="orbit-inner absolute top-1/2 left-1/2"
              style={{
                marginLeft: '-24px',
                marginTop: '-32px',
                animationDelay: `${-(50 / INNER.length) * i}s`,
              }}
            >
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                style={{ background: orbBg, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
              >
                <img src={skill.image} alt={skill.name} className="w-7 h-7 sm:w-9 sm:h-9 object-contain" />
              </div>
              <span
                className="block text-center mt-1 text-[8px] sm:text-[10px] font-bold tracking-wide whitespace-nowrap"
                style={{ color: theme.text }}
              >
                {skill.name}
              </span>
            </div>
          ))}

          {OUTER.map((skill, i) => (
            <div
              key={skill.name}
              className="orbit-outer absolute top-1/2 left-1/2"
              style={{
                marginLeft: '-24px',
                marginTop: '-32px',
                animationDelay: `${-(60 / OUTER.length) * i}s`,
              }}
            >
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                style={{ background: orbBg, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
              >
                <img src={skill.image} alt={skill.name} className="w-7 h-7 sm:w-9 sm:h-9 object-contain" />
              </div>
              <span
                className="block text-center mt-1 text-[8px] sm:text-[10px] font-bold tracking-wide whitespace-nowrap"
                style={{ color: theme.text }}
              >
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
