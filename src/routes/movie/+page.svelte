<script lang="ts">
	import type { Movie } from "$lib/types/movie";

  export let data: { popularMovies: Movie[]}

  const { popularMovies } = data;
</script>

<section class="container grid items-center gap-2 md:py-2">
  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
    Popular <span class="text-white">Movies</span> 
  </h3>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
    {#each popularMovies.slice(0, 18) as popularMovie (popularMovie.id)}
      <a href="movie/{popularMovie.id}"> 
        <img src={`https://image.tmdb.org/t/p/w500${popularMovie.poster_path}`} alt={popularMovie.title} />
      </a>
    {/each}
  </div>
</section>