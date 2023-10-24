<script lang="ts">
	import type { Movie } from "$lib/types/movie";
	import type { TV } from "$lib/types/tv";

  export let data: { 
    trendingMovies: Movie[], 
    trendingTVShows: TV[],
    popularMovies: Movie[],
    popularTVShows: TV[]
  }; 

  const { trendingMovies, trendingTVShows, popularMovies, popularTVShows } = data;
</script>

<section class="container grid items-center gap-2 md:py-2">
  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
    Trending <span class="text-white">Movies</span> 
  </h3>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
    {#each trendingMovies.slice(0, 18) as trendingMovie (trendingMovie.id)}
      <a href="movie/{trendingMovie.id}"> 
        <img src={`https://image.tmdb.org/t/p/w500${trendingMovie.poster_path}`} alt={trendingMovie.title} />
      </a>
    {/each}
  </div>

  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
    Trending <span class="text-white">TV Shows</span> 
  </h3>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
    {#each trendingTVShows.slice(0, 18) as trendingTVShow (trendingTVShow.id)}
      <a href="tv/{trendingTVShow.id}"> 
        <img src={`https://image.tmdb.org/t/p/w500${trendingTVShow.poster_path}`} alt={trendingTVShow.name} />
      </a>
    {/each}
  </div>

   <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
    Popular <span class="text-white">Movies</span> 
  </h3>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
    {#each popularMovies.slice(0, 18) as popularMovie (popularMovie.id)}
      <a href="movie/{popularMovie.id}"> 
        <img src={`https://image.tmdb.org/t/p/w500${popularMovie.poster_path}`} alt={popularMovie.title} />
      </a>
    {/each}
  </div>

  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mt-6 mb-2">
    Popular <span class="text-white">TV Shows</span> 
  </h3>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
    {#each popularTVShows.slice(0, 18) as popularTVShow (popularTVShow.id)}
      <a href="tv/{popularTVShow.id}"> 
        <img src={`https://image.tmdb.org/t/p/w500${popularTVShow.poster_path}`} alt={popularTVShow.name} />
      </a>
    {/each}
  </div>
</section>