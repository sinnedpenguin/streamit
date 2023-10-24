import type { PageServerLoad } from './$types';

const fetchData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

export const load: PageServerLoad = async () => {
  const apiBaseUrl = "https://api.themoviedb.org/3";
  const apiKey = import.meta.env.VITE_API_KEY;

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
};
