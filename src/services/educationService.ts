import { Education } from '../types';
import { education } from '../data';

export const getEducation = async (): Promise<Education[]> => {
  return education;
};
