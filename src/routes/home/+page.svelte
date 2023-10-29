<script lang="ts">
  import Carousel from "$lib/components/carousel.svelte";
	import type { Movie } from "$lib/types/movie";
	import type { TV } from "$lib/types/tv";
  import '@splidejs/svelte-splide/css';

  export let data: { 
    trendingMovies: Movie[], 
    trendingTVShows: TV[],
    popularMovies: Movie[],
    popularTVShows: TV[]
  }; 
  
  const { trendingMovies, trendingTVShows, popularMovies, popularTVShows } = data;
</script>

<section class="container grid items-center gap-2 md:py-2 mt-4">
  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
    Trending <span class="text-white">Movies</span> 
  </h3>
  <Carousel items={trendingMovies} url="movie" title="title" />

  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2 mt-4">
    Trending <span class="text-white">TV Shows</span> 
  </h3>
  <Carousel items={trendingTVShows} url="tv" title="name" />

   <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2 mt-4">
    Popular <span class="text-white">Movies</span> 
  </h3>
  <Carousel items={popularMovies} url="movie" title="title" />

  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2 mt-4">
    Popular <span class="text-white">TV Shows</span> 
  </h3>
  <Carousel items={popularTVShows} url="tv" title="name" />
</section>