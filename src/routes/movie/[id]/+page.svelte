<script lang="ts">
	import type { Movie } from "$lib/types/movie";
	import { PlayCircle } from "lucide-svelte";

  export let data: {
    details: Movie,
    similar: Movie[],
  };
  
  let { details, similar } = data;

  $: {
    ({ details, similar } = data);
  }
</script>

{#if details}
  <div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative">
    <div class="w-full h-[60vh] relative">
      <img
        class="w-full h-full object-cover"
        src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
        alt={details.title}
      />
      <div class="absolute top-0 left-0 w-full h-full" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <PlayCircle class="w-16 h-16 text-primary" />
      </div>
    </div>
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">{details.title}</h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">{details.overview}</p>
    <p>Rating: {details.vote_average}</p>
    <p>Release date: {details.release_date}</p>
  </div>
{/if}

{#if similar}
  <div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative">
    <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
      You may also like:
    </h3>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {#each similar.slice(0, 18) as similarMovie (similarMovie.id)}
        <a href="/movie/{similarMovie.id}"> 
          <img src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`} alt={similarMovie.title} />
        </a>
      {/each}
    </div>
  </div>
{/if}