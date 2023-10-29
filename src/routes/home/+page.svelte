<script lang="ts">
	import { options } from "$lib/config/carousel";
	import type { Movie } from "$lib/types/movie";
	import type { TV } from "$lib/types/tv";
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
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
  <Splide options={{ ...options, drag: "free" }}>
    {#each trendingMovies as trendingMovie (trendingMovie.id)}
      <SplideSlide>
        <a href="movie/{trendingMovie.id}">
          <img src={`https://image.tmdb.org/t/p/w500${trendingMovie.poster_path}`} alt={trendingMovie.title} />
        </a>
      </SplideSlide>
    {/each}
  </Splide>

  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2 mt-4">
    Trending <span class="text-white">TV Shows</span> 
  </h3>
  <Splide options={{ ...options, drag: "free" }}>
    {#each trendingTVShows as trendingTVShow (trendingTVShow.id)}
      <SplideSlide>
        <a href="tv/{trendingTVShow.id}"> 
          <img src={`https://image.tmdb.org/t/p/w500${trendingTVShow.poster_path}`} alt={trendingTVShow.name} />
        </a>
      </SplideSlide>
    {/each}
  </Splide>

   <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2 mt-4">
    Popular <span class="text-white">Movies</span> 
  </h3>
  <Splide options={{ ...options, drag: "free" }}>
    {#each popularMovies as popularMovie (popularMovie.id)}
      <SplideSlide>
        <a href="movie/{popularMovie.id}"> 
          <img src={`https://image.tmdb.org/t/p/w500${popularMovie.poster_path}`} alt={popularMovie.title} />
        </a>
      </SplideSlide>
    {/each}
  </Splide>

  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2 mt-4">
    Popular <span class="text-white">TV Shows</span> 
  </h3>
  <Splide options={{ ...options, drag: "free" }}>
    {#each popularTVShows as popularTVShow (popularTVShow.id)}
      <SplideSlide>
        <a href="tv/{popularTVShow.id}"> 
          <img src={`https://image.tmdb.org/t/p/w500${popularTVShow.poster_path}`} alt={popularTVShow.name} />
        </a>
      </SplideSlide>
    {/each}
  </Splide>
</section>