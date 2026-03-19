import { Qualification } from '../types';
import { qualifications } from '../data';

export const getQualifications = async (): Promise<Qualification[]> => {
  return qualifications;
};
