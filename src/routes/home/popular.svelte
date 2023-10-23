<script lang="ts">
  import { onMount } from 'svelte';
  import type { Movie } from "$lib/types/movie";
	import type { TVShow } from '$lib/types/tvshow';

  let popularMovies: Movie[] = [];
  let popularTVShows: TVShow[] = [];

  async function fetchData(endpoint: string, setter: (data: any[]) => void) {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/${endpoint}/popular/?api_key=${import.meta.env.VITE_API_KEY}`);
      const data = await response.json();
      setter(data.results);
    } catch (error) {
      console.error(`Failed to fetch trending ${endpoint}`, error);
    }
  }

  onMount(() => {
    fetchData('movie', (data) => popularMovies = data);
    fetchData('tv', (data) => popularTVShows = data);
  });
</script>

<div>
  <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Popular Movies</h3>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
    {#each popularMovies as movie (movie.id)}
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    {/each}
  </div>
  
  <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Popular TV Shows</h3>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
    {#each popularTVShows as tvshow (tvshow.id)}
        <img src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`} alt={tvshow.name} />
    {/each}
  </div>
</div>