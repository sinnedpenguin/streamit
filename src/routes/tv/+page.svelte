<script lang="ts">
  import Carousel from "$lib/components/carousel.svelte";
  import type { TV } from "$lib/types/tv";

  export let data: {
    genres: { id: number, name: string }[],
    tvShowsByGenre: TV[][];
  }

  const { genres, tvShowsByGenre } = data;

  let tvShows: { [key: string]: TV[] } = {};

  $: if (genres && tvShowsByGenre) {
    genres.forEach((genre, index) => {
      tvShows[genre.name] = tvShowsByGenre[index];
    });
  }
</script>

{#if genres}
  {#each genres as genre (genre.id)}
    <section class="container grid items-center mt-4">
      <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
        {genre.name} <span class="text-white">TV Shows</span>
      </h3>
      <Carousel items={tvShows[genre.name]} url="tv" title="name" />
    </section>
  {/each}
{/if}