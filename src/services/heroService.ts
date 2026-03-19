import { Hero } from '../types';
import { hero } from '../data';

export const getHero = async (): Promise<Hero | null> => {
  return hero;
};
