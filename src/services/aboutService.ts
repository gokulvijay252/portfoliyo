import { About } from '../types';
import { about } from '../data';

export const getAbout = async (): Promise<About | null> => {
  return about;
};
