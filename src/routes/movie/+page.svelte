<script lang="ts">
  import type { Movie } from "$lib/types/movie";
  import { onMount } from "svelte";
  import { page } from '$lib/stores/page';
	import { Button } from "$lib/components/ui/button";
  import { ChevronLeft, ChevronRight } from "lucide-svelte";

  let popularMovies: Movie[] = [];

  const fetchData = async () => {
    const pageNumber = $page;
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${pageNumber}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();

    popularMovies = data.results;
  };

  const goToPage = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    page.setPage(pageNumber);
    fetchData();
  };

  onMount(fetchData);
</script>

<section class="container grid items-center gap-2 md:py-2">
  <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
    Popular <span class="text-white">Movies</span> 
  </h3>
  <div class="grid grid-cols-2 gap-[0.1rem] sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-7">
    {#each popularMovies as popularMovie (popularMovie.id)}
      <a href="movie/{popularMovie.id}"> 
        <img 
          src={`https://image.tmdb.org/t/p/w500${popularMovie.poster_path}`} 
          alt={popularMovie.title} 
        />
      </a>
    {/each}
  </div>
  <div class="flex justify-center mt-6">
    <Button 
      variant="ghost"
      on:click={() => goToPage($page - 1)} disabled={$page === 1} 
    >
      <ChevronLeft class="h-4 w-5" />
    </Button>
    {#each Array.from({ length: 5 }, (_, i) => $page - 2 + i) as pageNumber}
      <Button 
        variant={$page === pageNumber ? 'secondary' : 'ghost'} 
        on:click={() => goToPage(pageNumber)}
      >
        {pageNumber}
      </Button>
    {/each}
    <Button 
      variant="ghost"
      on:click={() => goToPage($page + 1)}
    >
      <ChevronRight class="h-4 w-5" />
    </Button>
  </div>
</section>
