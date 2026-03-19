import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const COLORS = ['#FDB902', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1', '#DDA0DD', '#F7DC6F', '#FF8C00', '#00CED1', '#FF69B4'];

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
  shape: 'circle' | 'square' | 'strip';
  delay: number;
  duration: number;
  drift: number;
  sway: number;
}

const generateParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    shape: (['circle', 'square', 'strip'] as const)[Math.floor(Math.random() * 3)],
    delay: Math.random() * 3,
    duration: 5 + Math.random() * 4,
    drift: (Math.random() - 0.5) * 20,
    sway: (Math.random() - 0.5) * 40,
  }));

const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setParticles(generateParticles(60));
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            left: `${p.x}%`,
            top: '-5%',
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            left: [
              `${p.x}%`,
              `${p.x + p.sway * 0.5}%`,
              `${p.x - p.sway * 0.3}%`,
              `${p.x + p.sway * 0.6}%`,
              `${p.x - p.sway * 0.4}%`,
              `${p.x + p.drift}%`,
            ],
            top: ['-5%', '15%', '35%', '55%', '80%', '110%'],
            rotate: [0, p.rotation * 0.3, p.rotation * 0.6, p.rotation, p.rotation * 1.5, p.rotation * 2],
            opacity: [0, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'linear',
            times: [0, 0.15, 0.35, 0.55, 0.8, 1],
          }}
          className="absolute"
          style={{
            width: p.shape === 'strip' ? p.size * 0.4 : p.size,
            height: p.shape === 'strip' ? p.size * 2 : p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'strip' ? '2px' : '1px',
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
