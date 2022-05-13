import { atom } from 'recoil';
import { MovieItemDefinition } from '../types/movie.d';

// 검색 영화 상태
export const moviesState = atom<MovieItemDefinition[]>({
  key: '#moviesState',
  default: [],
});

// 검색창 상태
export const keywordState = atom<string>({
  key: '#keywordState',
  default: '',
});

// 북마크 상태
export const bookMarkState = atom<MovieItemDefinition[]>({
  key: '#bookmarkState',
  default: [],
});
