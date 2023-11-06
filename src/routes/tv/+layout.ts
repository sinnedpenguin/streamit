import type { LayoutLoad } from "./$types";

export const load = (async ({ fetch, params }) => {
  const fetchDetails = async () => {
    const { id } = params;
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
    if (!response.ok) {
      console.error(`Failed to fetch TV details: ${response.status}`);
      return null; 
    }
    const data = await response.json();
    return data;
  }

  const fetchRecommendations = async (id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      console.error(`Failed to fetch TV recommendations: ${response.status}`);
      return null; 
    }
    const data = await response.json();
    return data.results; 
  }
  
  const fetchSimilar = async (id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      console.error(`Failed to fetch similar TV shows: ${response.status}`);
      return null; 
    }
    const data = await response.json();
    return data.results; 
  }
  
  const fetchCasts = async (id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      console.error(`Failed to fetch TV casts: ${response.status}`);
      return null; 
    }
    const data = await response.json();
    return data.cast;
  }

  const fetchTVShowGenres = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      console.error(`Failed to fetch TV genres: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data.genres;
  }
  
  const fetchTVShowsByGenre = async (genreId: number) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`);
    if (!response.ok) {
      console.error(`Failed to fetch TV shows for genre ${genreId}: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data.results;
  }

  const { id } = params;
  const [details, recommendations, similar, casts, genres] = await Promise.all([
    fetchDetails(),
    fetchRecommendations(id),
    fetchSimilar(id),
    fetchCasts(id),
    fetchTVShowGenres()
  ]);

  const tvShowsByGenre = await Promise.all(genres.map((genre: { id: number; }) => fetchTVShowsByGenre(genre.id)));
  
  return {
    details,
    recommendations,
    similar,
    casts,
    genres,
    tvShowsByGenre
  };
}) satisfies LayoutLoad;