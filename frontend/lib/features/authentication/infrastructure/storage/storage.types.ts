export const JWTTOKEN = 'JWTTOKEN';
export const REFRESHTOKEN = 'REFRESHTOKEN';
export const EMAIL = 'EMAIL';

export interface Storage {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}
