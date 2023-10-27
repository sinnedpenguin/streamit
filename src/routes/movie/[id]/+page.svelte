<script lang="ts">
	import type { Movie } from "$lib/types/movie";
	import { PlayCircle } from "lucide-svelte";
	import Videoplayer from "../../../lib/components/videoplayer.svelte";

  export let data: {
    details?: Movie;
    similar: Movie[];
  };

  let { details, similar } = data;

  let watchData: Movie | undefined;
  let isLoading = true;
  let isPlaying = false;

  const fetchData = async () => {
    isLoading = true;
    const res = await fetch(`${import.meta.env.VITE_DETAILS_URL}${details?.id}?type=movie`);
    watchData = await res.json();
    isLoading = false;
  };

  $: {
    ({ details, similar } = data);
		fetchData();
  }
</script>

{#if details}
  <section class="container grid items-center">
    {#if isPlaying}
      <Videoplayer 
        url={`${import.meta.env.VITE_WATCH_URL}${watchData?.episodeId}?id=${watchData?.id}`}
      />
    {:else}
      <div class="w-full h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh] relative">
        {#if !isLoading}
          <img
            class="w-full h-full object-cover"
            src={watchData?.cover || `https://image.tmdb.org/t/p/w500/${details.backdrop_path}`}
            alt={details.title}
          />
          <div class="absolute top-0 left-0 w-full h-full" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
            on:click={() => isPlaying = true} 
            on:keydown={(e) => { if (e.key === 'Enter') isPlaying = true; }}
            role="button"
            tabindex="0">
            <PlayCircle class="h-20 w-20 text-primary"/>
          </div>
        {:else}
          <div class="w-full h-full bg-black"></div>
        {/if}
      </div>
    {/if}
  </section>
{/if}
<div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative">
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">{details?.title || 'N/A'}</h1>
  <p class="leading-7 [&:not(:first-child)]:mt-6">{details?.overview || 'Description: N/A'}</p>
  {#if details?.vote_average}
    <p>Rating: {details.vote_average}</p>
  {/if}
  {#if details?.release_date}
    <p>Release date: {details.release_date}</p>
  {/if}
</div>
{#if details && similar}
  <div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative">
    <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
      You may also like:
    </h3>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {#each similar.slice(0, 18) as similarMovie (similarMovie.id)}
        <a href="/movie/{similarMovie.id}">
          <div class="flex flex-col items-center">
            <img src={`https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`} alt={similarMovie.title} />
          </div>
        </a>
      {/each}
    </div>
  </div>
{/if}
