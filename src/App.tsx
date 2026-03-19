import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Spinner from './components/ui/Spinner';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { useTheme } from './hooks/useTheme';

const Skills = lazy(() => import('./components/sections/Skills'));
const Qualification = lazy(() => import('./components/sections/Qualification'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));
const ProjectDetail = lazy(() => import('./components/pages/ProjectDetail'));
const NotFound = lazy(() => import('./components/pages/NotFound'));

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<Spinner />}>
          <Skills />
          <Qualification />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </main>
    </>
  );
}

function App() {
  const { theme } = useTheme();
  return (
    <ErrorBoundary>
      <div className="min-h-screen transition-all duration-500" style={{ background: theme.bg, color: theme.text }}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
