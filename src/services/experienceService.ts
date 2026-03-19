import { Experience } from '../types';
import { experience } from '../data';

export const getExperience = async (): Promise<Experience[]> => {
  return experience;
};
