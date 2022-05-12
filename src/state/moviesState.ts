import { atom } from 'recoil';
import { MovieItemDefinition } from '../types/movie.d';

export const moviesState = atom<MovieItemDefinition[]>({
  key: '#moviesState',
  default: [],
});

export const keywordState = atom<string>({
  key: '#keywordState',
  default: '',
});

export const bookMarkState = atom<MovieItemDefinition[]>({
  key: '#bookmarkState',
  default: [],
});
