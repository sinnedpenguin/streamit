<script lang="ts">
  import { Tv, Star, Clock } from "lucide-svelte";
  import type { Movie } from "$lib/types/movie";
  import type { TV } from "$lib/types/tv";

  export let details: Movie | TV;
  export let casts: Movie[] | TV[];

  const formatRuntime = (runtime: number | undefined) => {
    if (runtime === undefined) {
      return 'N/A';
    }
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };
</script>

<div class="container grid items-center mt-4">
  <div class="flex flex-col gap-4">
    <span class="flex items-center">
      <Tv class="h-4 w-4 mr-2 text-primary"/>
      {details?.runtime ? 'MOVIE' : 'TV'}
      <Star class="h-4 w-4 mx-2 text-primary"/>
      {details?.vote_average.toFixed(1)}
      <Clock class="h-4 w-4 mx-2 text-primary"/>
      {details?.runtime ? formatRuntime(details?.runtime) : `${details?.number_of_seasons} SS / ${details?.number_of_episodes} EPs`}
    </span>
    <span class="italic">
      {details?.tagline || ''}
    </span>
    <span>{details?.overview || ''}</span>
    <span>
      <span class="text-primary">Released:</span> {details?.release_date || details?.first_air_date}
    </span>
    <span>
      <span class="text-primary">Genres:</span> {details?.genres.map(genre => genre.name).join(', ')}
    </span>
    <span>
      <span class="text-primary">Casts:</span> {casts.slice(0, 5).map(cast => cast.name).join(', ')}
    </span>
  </div>
</div>