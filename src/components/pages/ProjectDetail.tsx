import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getProjectById } from '../../services/projectService';
import Spinner from '../ui/Spinner';
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from 'react-icons/fa';
import { SiReact, SiAngular, SiNodedotjs, SiNestjs, SiTypescript, SiMysql, SiMongodb, SiExpress, SiTailwindcss, SiPhp } from 'react-icons/si';
import { useCallback } from 'react';
import { useTheme } from '../../hooks/useTheme';

const techIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  'React.js': { icon: <SiReact />, color: '#61DAFB' },
  'React Js': { icon: <SiReact />, color: '#61DAFB' },
  'AngularJS': { icon: <SiAngular />, color: '#DD0031' },
  'Node.js': { icon: <SiNodedotjs />, color: '#339933' },
  'Node Js': { icon: <SiNodedotjs />, color: '#339933' },
  'NestJS': { icon: <SiNestjs />, color: '#E0234E' },
  'TypeScript': { icon: <SiTypescript />, color: '#3178C6' },
  'MySQL': { icon: <SiMysql />, color: '#4479A1' },
  'MongoDB': { icon: <SiMongodb />, color: '#47A248' },
  'Express.js': { icon: <SiExpress />, color: '#ffffff' },
  'Tailwind CSS': { icon: <SiTailwindcss />, color: '#06B6D4' },
  'PHP': { icon: <SiPhp />, color: '#777BB4' },
};

const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const safeId = id && /^\d+$/.test(id) ? id : '0';
  const fetchProject = useCallback(() => getProjectById(safeId), [safeId]);
  const { data: project, loading, error } = useFetch(fetchProject);
  const { darkMode, theme } = useTheme();

  const accentColor = darkMode ? '#DAA520' : '#1c2b3a';
  const borderColor = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(28,43,58,0.1)';

  const handleBackToProjects = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: theme.bg }}>
        <Spinner />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: theme.bg }}>
        <p className="text-red-500 text-lg mb-4">{error || 'Project not found'}</p>
        <Link
          to="/"
          className="flex items-center gap-2 transition-colors"
          style={{ color: accentColor }}
        >
          <FaArrowLeft size={14} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: theme.bg }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-6 sm:pb-8">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"
          style={{ color: accentColor }}
        >
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-4">
          {project.live_url && isValidUrl(project.live_url) && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold rounded-full transition-all text-sm"
              style={{ background: accentColor, color: darkMode ? '#111122' : '#ffffff' }}
            >
              <FaExternalLinkAlt size={12} /> Live Demo
            </a>
          )}
          {project.github_url && isValidUrl(project.github_url) && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold rounded-full transition-all text-sm"
              style={{ border: theme.cardBorder, color: theme.textSecondary }}
            >
              <FaGithub size={14} /> View Source
            </a>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {project.image_url && isValidUrl(project.image_url) && (
          <div className="mb-10 rounded-xl overflow-hidden" style={{ border: `1px solid ${borderColor}` }}>
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: theme.heading }}>About this project</h2>
          {(() => {
            const lines = project.description.split('\n').filter((l) => l.trim());
            const heading = lines[0];
            const bullets = lines.slice(1);
            return (
              <>
                {heading && (
                  <p className="text-base sm:text-lg font-medium mb-4" style={{ color: theme.textSecondary }}>
                    {heading}
                  </p>
                )}
                {bullets.length > 0 && (
                  <ul className="list-disc list-outside pl-5 space-y-2">
                    {bullets.map((line, i) => (
                      <li key={i} className="text-sm sm:text-base leading-relaxed" style={{ color: theme.textSecondary }}>
                        {line.replace(/^[-•]\s*/, '')}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          })()}
        </div>

        <div className="mt-10 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: theme.heading }}>Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {project.tech_stack.map((tech) => {
              const techInfo = techIcons[tech];
              return (
                <div
                  key={tech}
                  className="rounded-xl p-4 flex flex-col items-center gap-2"
                  style={{
                    background: theme.cardBg,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  {techInfo && (
                    <span className="text-2xl" style={{ color: techInfo.color }}>
                      {techInfo.icon}
                    </span>
                  )}
                  <span className="font-medium text-sm" style={{ color: theme.text }}>{tech}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
          <button
            onClick={handleBackToProjects}
            className="inline-flex items-center gap-2 transition-colors font-medium"
            style={{ color: accentColor }}
          >
            <FaArrowLeft size={14} /> Back to all projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
