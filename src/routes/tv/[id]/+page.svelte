<script lang="ts">
	import type { TV } from "$lib/types/tv";
	import { PlayCircle } from "lucide-svelte";

  export let data: TV;
  const details = data;
</script>

{#if details}
  <div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative">
    <div class="w-full h-[60vh] relative">
      <img
        class="w-full h-full object-cover"
        src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
        alt={details.name}
      />
      <div class="absolute top-0 left-0 w-full h-full" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <PlayCircle class="w-16 h-16 text-primary" />
      </div>
    </div>
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">{details.name}</h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">{details.overview}</p>
    <p>Rating: {details.vote_average}</p>
    <p>Release date: {details.first_air_date}</p>
  </div>
{/if}