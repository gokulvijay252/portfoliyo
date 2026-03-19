import { Skill } from '../types';
import { skills } from '../data';

export const getSkills = async (): Promise<Skill[]> => {
  return skills;
};
