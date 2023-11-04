<script lang="ts">
  import type { Movie } from "$lib/types/movie";
  import type { TV } from "$lib/types/tv";
  import { PlayCircle } from "lucide-svelte";
  import { goto } from '$app/navigation';

  export let details: Movie | TV;
  export let watchData: Movie | TV | undefined;

  const isMovie = (details: Movie | TV): details is Movie => {
    return (details as Movie).title !== undefined;
  };

  const scrollToSeasons = () => {
    const seasonsElement = document.getElementById('seasons-section');
    seasonsElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClick = () => {
    if (isMovie(details)) {
      goto(`/movie/watch/${details.id}`);
    } else {
      scrollToSeasons();
    }
  };
</script>

<div class="container grid items-center mt-4">
  <div class="w-full h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh] relative">
    <img
      class="w-full h-full object-cover rounded"
      src={watchData?.cover || `https://image.tmdb.org/t/p/w500/${details.backdrop_path}`}
      alt={isMovie(details) ? details.title : details.name}
    />
    <div class="absolute top-0 left-0 w-full h-full" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <button on:click={handleClick}>
        <PlayCircle class="h-14 w-14 text-primary transition-all hover:scale-105"/>
      </button>
    </div>
  </div>
</div>