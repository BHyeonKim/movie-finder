import axios from 'axios';
import { MovieAPIResDefinition } from '../types/movie.d';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getMoviesFromApi = async (word: string, page: number) => {
  const response = await axios.get<MovieAPIResDefinition>(
    `${BASE_URL}/?apikey=${process.env.REACT_APP_API_KEY}&s=${word}&page=${page}`
  );
  // eslint-disable-next-line no-console

  return response.data.Search.map((movie) => {
    return { ...movie, title: movie.Title, year: movie.Year, type: movie.Type, poster: movie.Poster };
  });
};
