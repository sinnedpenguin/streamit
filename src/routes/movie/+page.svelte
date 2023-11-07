<script lang="ts">
  import type { Movie } from "$lib/types/movie";
  import Carousel from "$lib/components/carousel.svelte";

  export let data: {
    genres: { id: number, name: string }[],
    moviesByGenre: Movie[][];
  }

  const { genres, moviesByGenre } = data;

  let movies: { [key: string]: Movie[] } = {};

  $: if (genres && moviesByGenre) {
    genres.forEach((genre, index) => {
      movies[genre.name] = moviesByGenre[index];
    });
  }
</script>

{#if genres}
  {#each genres as genre (genre.id)}
    <section class="container grid items-center mt-4">
      <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
        {#if genre.name === "TV Movie"}
          TV <span class="text-white">Movies</span>
        {:else}
          {genre.name} <span class="text-white">Movies</span>
        {/if}
      </h3>
      <Carousel items={movies[genre.name]} url="movie" title="title" />
    </section>
  {/each}
{/if}
