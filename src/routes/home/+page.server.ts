import type { PageServerLoad } from './$types';
import { TMDB_API_KEY } from '$env/static/private';

const fetchData = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }
  const data = await res.json();
  
  return data.results;
};

export const load = (async () => {
  const apiBaseUrl = "https://api.themoviedb.org/3";
  const apiKey = TMDB_API_KEY;

  const trendingMovies = fetchData(`${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`);
  const trendingTVShows = fetchData(`${apiBaseUrl}/trending/tv/day?api_key=${apiKey}`);
  const popularMovies = fetchData(`${apiBaseUrl}/movie/popular?api_key=${apiKey}`);
  const popularTVShows = fetchData(`${apiBaseUrl}/tv/popular?api_key=${apiKey}`);

  return {
    trendingMovies,
    trendingTVShows,
    popularMovies,
    popularTVShows,
  };
}) satisfies PageServerLoad;