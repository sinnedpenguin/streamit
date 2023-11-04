<script lang="ts">
  import Carousel from "$lib/components/carousel.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import type { Movie } from "$lib/types/movie";
	import type { TV } from "$lib/types/tv";
	import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import '@splidejs/svelte-splide/css';
	import { Clock, Star, Tv, Play, Bookmark } from "lucide-svelte";
	import { onMount } from "svelte";

  export let data: { 
    topRatedMovies: Movie[], 
    topRatedTVShows: TV[],
    trendingMovies: Movie[],
    trendingTVShows: TV[],
  }; 

  let isLoading = true;

  const fetchData = async () => {
    const requests = trendingMovies.map(async (movie, i) => {
      const res1 = fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
      const res2 = fetch(`${import.meta.env.VITE_DETAILS_URL}${movie.id}?type=movie`);

      const [data1, data2] = await Promise.all([res1, res2].map(async res => (await res).json()));
      trendingMovies[i] = { ...movie, ...data2, ...data1 };
    });

    await Promise.all(requests);
    isLoading = false;
  };

  const formatRuntime = (runtime: number | undefined) => {
    if (runtime === undefined) {
      return '';
    }
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };
  
  const { topRatedMovies, topRatedTVShows, trendingMovies, trendingTVShows } = data;
  
  onMount(fetchData);
</script>

<section class="container grid items-center mt-4">
  {#if isLoading}
    <Skeleton class="w-full h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh]"></Skeleton>
  {:else}
  <Splide options={{
      type: "loop", 
      autoplay: true, 
      pagination: false, 
      perPage: 1, 
      arrows: false, 
      focus: "center", 
      gap: "1rem"}}
    >
    {#each trendingMovies.slice(0, 5) as movie}
      <SplideSlide>
        <div class="w-full h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh] relative">
          <img
            class="w-full h-full object-cover rounded"
            src={movie.cover || `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={movie.title}
          />
          <div class="absolute inset-0 bg-black opacity-60"></div> 
          {#if !isLoading}
            <div class="absolute bottom-0 left-0 text-white p-4 text-xl mx-4">
              <h1 class="mt-2 text-lg font-extrabold tracking-tight text-primary md:text-3xl lg:text-3xl">{movie.title}</h1>
              <span class="flex items-center mt-4">
                <Tv class="h-4 w-4 mr-2 text-primary"/>
                <span class="text-sm">MOVIE</span>
                <Star class="h-4 w-4 mx-2 text-primary"/>
                <span class="text-sm">{movie.vote_average.toFixed(1)}</span>
                <Clock class="h-4 w-4 mx-2 text-primary"/>
                <span class="text-sm">{formatRuntime(movie.runtime)}</span>
              </span>
                <span class="text-sm italic">
                  {movie.tagline || ''}
                </span>
              <span class="mt-2 line-clamp-2 overflow-hidden text-ellipsis text-sm">{movie.overview}</span>
              <div class="flex space-x-2 mt-4">
                <a href="/movie/{movie.id}"> 
                  <Button>
                    <Play class="h-4 w-4 mr-1" /> Watch
                  </Button>
                </a>
                <Button variant="secondary">
                  <Bookmark class="h-4 w-4" />
                </Button>
              </div>
            </div> 
          {/if}
        </div>
      </SplideSlide>
    {/each}
  </Splide>
  {/if}
</section>

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