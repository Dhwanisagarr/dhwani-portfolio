'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ProjectModal from '../components/ProjectModal';
import { getProjectCaseStudy } from '../data/projectCaseStudies';

const ProjectModalContext = createContext({
  activeProject: null,
  openProject: () => {},
  closeProject: () => {}
});

export function ProjectModalProvider({ children }) {
  const [activeProject, setActiveProject] = useState(null);

  const openProject = useCallback((projectArg) => {
    let caseStudyData = null;

    if (!projectArg) return;

    if (typeof projectArg === 'string') {
      caseStudyData = getProjectCaseStudy(projectArg);
    } else if (typeof projectArg === 'object') {
      if (projectArg.brief && projectArg.thinking) {
        caseStudyData = projectArg;
      } else {
        const identifier = projectArg.slug || projectArg.id || projectArg.title;
        caseStudyData = getProjectCaseStudy(identifier);
      }
    }

    if (caseStudyData) {
      setActiveProject(caseStudyData);
    }
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
  }, []);

  // Lock body scroll when modal is open & listen to Escape key
  useEffect(() => {
    if (activeProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          closeProject();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeProject, closeProject]);

  // Listen to custom window event 'open-project-modal' & URL query parameter ?project=slug
  useEffect(() => {
    const handleCustomEvent = (e) => {
      if (e.detail) {
        openProject(e.detail);
      }
    };

    // Check URL query parameters
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const projectParam = params.get('project');
      if (projectParam) {
        openProject(projectParam);
      }
    }

    window.addEventListener('open-project-modal', handleCustomEvent);
    return () => window.removeEventListener('open-project-modal', handleCustomEvent);
  }, [openProject]);


  return (
    <ProjectModalContext.Provider value={{ activeProject, openProject, closeProject }}>
      {children}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={closeProject} />
      )}
    </ProjectModalContext.Provider>
  );
}

export function useProjectModal() {
  const context = useContext(ProjectModalContext);
  if (!context) {
    return {
      activeProject: null,
      openProject: (projectArg) => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('open-project-modal', { detail: projectArg }));
        }
      },
      closeProject: () => {}
    };
  }
  return context;
}
