export async function load({ fetch, params }) {
  const fetchDetails = async () => {
    const { id } = params;
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
    const data = await res.json();

    return data;
  }

  const fetchSimilar = async () => {
    const { id } = params;
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.VITE_API_KEY}`);
    const data = await res.json();
    return data.results;
  }

  return {
    details: await fetchDetails(),
    similar: await fetchSimilar()
  }
}