import type { PageServerLoad } from './$types';
import { TMDB_API_KEY } from '$env/static/private';

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  const data = await response.json();
  
  return data.results;
};

export const load = (async () => {
  const apiBaseUrl = "https://api.themoviedb.org/3";
  const apiKey = TMDB_API_KEY;

  const topRatedMovies = fetchData(`${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`);
  const topRatedTVShows = fetchData(`${apiBaseUrl}/tv/top_rated?api_key=${apiKey}`);
  const trendingMovies = fetchData(`${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`);
  const trendingTVShows = fetchData(`${apiBaseUrl}/trending/tv/day?api_key=${apiKey}`);
  const popularMovies = fetchData(`${apiBaseUrl}/movie/popular?api_key=${apiKey}`);
  const popularTVShows = fetchData(`${apiBaseUrl}/tv/popular?api_key=${apiKey}`);

  return {
    topRatedMovies,
    topRatedTVShows,
    trendingMovies,
    trendingTVShows,
    popularMovies,
    popularTVShows
  };
}) satisfies PageServerLoad;