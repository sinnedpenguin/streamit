import type { LayoutLoad } from "./$types";

export const load = (async ({ fetch, params }) => {
	const fetchDetails = async () => {
    const { id } = params;
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
    if (!response.ok) {
      console.error(`Failed to fetch details: ${response.status}`);
      return null;
    }
    const data = await response.json();

    return data;
  }

  const fetchRecommendations = async (id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      console.error(`Failed to fetch recommendations: ${response.status}`);
      return null; 
    }
    const data = await response.json();

    return data.results; 
  }
  
  const fetchSimilar = async (id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      console.error(`Failed to fetch similar movies: ${response.status}`);
      return null;
    }
    const data = await response.json();

    return data.results; 
  }
  
  const fetchCasts = async (id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      console.error(`Failed to fetch casts: ${response.status}`);
      return null; 
    }
    const data = await response.json();

    return data.cast;
  }

  const { id } = params;
  const [details, recommendations, similar, casts] = await Promise.all([
    fetchDetails(),
    fetchRecommendations(id),
    fetchSimilar(id),
    fetchCasts(id),
  ]);
  
  return {
    details,
    recommendations,
    similar,
    casts,
  };
}) satisfies LayoutLoad;