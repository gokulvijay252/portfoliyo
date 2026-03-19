import { Project } from '../types';
import { projects } from '../data';

export const getProjects = async (): Promise<Project[]> => {
  return projects;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const project = projects.find((p) => p.id === Number(id));
  if (!project) throw new Error('Project not found');
  return project;
};
