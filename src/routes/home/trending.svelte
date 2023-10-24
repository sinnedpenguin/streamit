<script lang="ts">
  import { onMount } from 'svelte';
  import type { Movie } from "$lib/types/movie";
	import type { TVShow } from '$lib/types/tvshow';

  let trendingMovies: Movie[] = [];
  let trendingTVShows: TVShow[] = [];

  async function fetchData(endpoint: string, setter: (data: any[]) => void) {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/${endpoint}/day?api_key=${import.meta.env.VITE_API_KEY}`);
      const data = await response.json();
      setter(data.results);
    } catch (error) {
      console.error(`Failed to fetch trending ${endpoint}`, error);
    }
  }

  onMount(() => {
    fetchData('movie', (data) => trendingMovies = data);
    fetchData('tv', (data) => trendingTVShows = data);
  });
</script>

<div>
  <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Trending Movies</h3>
  <div class="grid grid-cols-2 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8">
    {#each trendingMovies.slice(0, 16) as movie (movie.id)}
      <a href="details/{movie.id}"> 
        <img class="h-64 w-40" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </a>
    {/each}
  </div>
  
  <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Trending TV Shows</h3>
  <div class="grid grid-cols-2 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8">
    {#each trendingTVShows.slice(0, 16) as tvshow (tvshow.id)}
      <img class="h-64 w-40" src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`} alt={tvshow.name} />
    {/each}
  </div>
</div>