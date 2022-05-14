import axios from 'axios';

import { MovieAPIResDefinition } from '../types/movie.d';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getMoviesFromApi = async (word: string, page: number) => {
  let response;
  try {
    response = await axios.get<MovieAPIResDefinition>(
      `${BASE_URL}/?apikey=${process.env.REACT_APP_API_KEY}&s=${word}&page=${page}`
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error('Api 호출과정에서 에러가 발생했습니다.');
  }

  if (!response) {
    throw new Error('서버가 응답하지 않습니다.');
  }

  if (response.data.Response === 'False') {
    throw new Error('검색결과가 없습니다');
  }

  return response.data.Search.map((movie) => {
    return {
      ...movie,
      title: movie.Title,
      year: movie.Year,
      type: movie.Type,
      poster: movie.Poster,
      bookmarked: false,
    };
  });
};
