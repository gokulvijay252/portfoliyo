import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { getProjects } from '../../services/projectService';
import Spinner from '../ui/Spinner';
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const ProjectCard: React.FC<{
  project: {
    id: number;
    title: string;
    description: string;
    tech_stack: string[];
    image_url: string | null;
    live_url: string | null;
    github_url: string | null;
  };
  index: number;
}> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  return (
    <motion.div
      className="w-full sm:w-[calc(50%-0.75rem)]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex flex-col h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-400"
        style={{
          background: isHovered ? theme.cardBgHover : theme.cardBg,
          boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.08)',
          border: isHovered ? theme.cardBorderHover : theme.cardBorder,
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {project.image_url && (
          <div className="overflow-hidden">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-40 sm:h-48 object-cover transition-transform duration-500"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            />
          </div>
        )}
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <h3
            className="text-base sm:text-lg font-extrabold mb-1 transition-colors duration-300"
            style={{ color: theme.text }}
          >
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-extrabold flex-1 mb-2 line-clamp-3" style={{ color: theme.textSecondary }}>
            {project.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex gap-4">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-sm font-extrabold transition-opacity duration-300 hover:opacity-70"
                  style={{ color: theme.text }}
                >
                  <FaExternalLinkAlt size={12} /> Live
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-sm font-extrabold transition-opacity duration-300 hover:opacity-70"
                  style={{ color: theme.text }}
                >
                  <FaGithub size={14} /> Source
                </a>
              )}
            </div>
            <Link
              to={`/project/${project.id}`}
              className="flex items-center gap-1 text-sm font-extrabold transition-opacity duration-300 hover:opacity-70"
              style={{ color: theme.text }}
            >
              Details <FaArrowRight size={10} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { data: projects, loading, error } = useFetch(getProjects);
  const { theme } = useTheme();

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="projects"
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
            Projects
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
          Here are some of the projects I have worked on, showcasing my skills
          in building modern web applications.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
