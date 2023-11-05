<script lang="ts">
  import type { Movie } from "$lib/types/movie";
  import { onMount } from "svelte";
  import Carousel from "$lib/components/carousel.svelte";

  let genres: {id: number, name: string}[] = [];
  let movies: Record<string, Movie[]> = {};

  const fetchGenres = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
    const data = await response.json();
    genres = data.genres;
    for (const genre of genres) {
      movies[genre.name] = [];
    }
  };

  const fetchData = async () => {
    for (const genre of genres) {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${genre.id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const data = await response.json();

      movies[genre.name] = data.results;
    }
  };

  onMount(async () => {
    await fetchGenres();
    fetchData();
  });
</script>

{#each genres as genre (genre.id)}
  <section class="container grid items-center mt-2">
    <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
      {genre.name} <span class="text-white">Movies</span> 
    </h3>
    <Carousel items={movies[genre.name]} url="movie" title="title" />
  </section>
{/each}