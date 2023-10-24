<script lang="ts">
  import { onMount } from 'svelte';
  import type { Movie } from "$lib/types/movie";
	import type { TV } from '$lib/types/tv';

  let popularMovies: Movie[] = [];
  let popularTVShows: TV[] = [];

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
  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
    Popular <span class="text-white">Movies</span> 
  </h3>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
    {#each popularMovies.slice(0, 12) as movie (movie.id)}
      <a href="movie/{movie.id}"> 
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </a>
    {/each}
  </div>
  
  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mt-6 mb-2">
    Popular <span class="text-white">TV Shows</span> 
  </h3>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
    {#each popularTVShows.slice(0, 12) as tvshow (tvshow.id)}
      <a href="tv/{tvshow.id}"> 
        <img src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`} alt={tvshow.name} />
      </a>
    {/each}
  </div>
</div>