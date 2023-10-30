<script lang="ts">
  import Carousel from "$lib/components/carousel.svelte";
	import type { Movie } from "$lib/types/movie";
	import type { TV } from "$lib/types/tv";
  import '@splidejs/svelte-splide/css';

  export let data: { 
    topRatedMovies: Movie[], 
    topRatedTVShows: TV[],
    trendingMovies: Movie[],
    trendingTVShows: TV[]
  }; 
  
  const { topRatedMovies, topRatedTVShows, trendingMovies, trendingTVShows } = data;
</script>

<section class="container grid items-center gap-2 md:py-2 mt-4">
  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
    Top Rated <span class="text-white">Movies</span> 
  </h3>
  <Carousel items={topRatedMovies} url="movie" title="title" />

  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2 mt-4">
    Top Rated <span class="text-white">TV Shows</span> 
  </h3>
  <Carousel items={topRatedTVShows} url="tv" title="name" />

   <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2 mt-4">
    Trending <span class="text-white">Movies</span> 
  </h3>
  <Carousel items={trendingMovies} url="movie" title="title" />

  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2 mt-4">
    Trending <span class="text-white">TV Shows</span> 
  </h3>
  <Carousel items={trendingTVShows} url="tv" title="name" />
</section>