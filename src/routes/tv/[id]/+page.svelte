<script lang="ts">
  import type { TV, Cast } from "$lib/types/tv";
  import { PlayCircle, Star, Clock, Tv } from "lucide-svelte";
  import Carousel from "$lib/components/carousel.svelte";
  import '@splidejs/svelte-splide/css';
	import { Button } from "$lib/components/ui/button";

  export let data: {
    details?: TV;
    recommendations: TV[];
    similar: TV[];
    casts: Cast[];
  };

  let { details, recommendations, similar, casts } = data;

  let watchData: TV | undefined;
  let isLoading = true;
  let selectedSeason: string = '1';

  const fetchData = async () => {
    isLoading = true;
    const res = await fetch(`${import.meta.env.VITE_DETAILS_URL}${details?.id}?type=tv`);
    watchData = await res.json();
    console.log(watchData?.seasons);
    isLoading = false;
  };

  $: {
    ({ details, recommendations, similar, casts } = data);
    fetchData();
  }
</script>

{#if details}
  <section class="container grid items-center">
    <div class="w-full h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh] relative">
    {#if !isLoading}
      <img
        class="w-full h-full object-cover"
        src={watchData?.cover || `https://image.tmdb.org/t/p/w500/${details.backdrop_path}`}
        alt={details.name}
      />
      <div class="absolute top-0 left-0 w-full h-full" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <a href="/tv/watch/{details.id}">
        <PlayCircle class="h-20 w-20 text-primary"/>
      </a>
      </div>
      {:else}
        <div class="w-full h-full bg-black"></div>
      {/if}
    </div>
  </section>
{/if}

{#if details}
	<div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">{details?.name || 'N/A'}</h1>
		<span class="flex items-center">
			<Tv class="h-4 w-4 mr-2 text-primary"/>
			TV
			<Star class="h-4 w-4 mx-2 text-primary"/>
			{details?.vote_average.toFixed(1)}
			<Clock class="h-4 w-4 mx-2 text-primary"/>
			{details?.number_of_seasons} SS / {details?.number_of_episodes} EPs
		</span>
		<blockquote class="italic">
			{details?.tagline || ''}
		</blockquote>
		<p>{details?.overview || ''}</p>
		<p>Released: {details?.first_air_date}</p>
		<p>Genres: {details?.genres.map(genre => genre.name).join(', ')}</p>
		<p>Casts: {casts.slice(0, 5).map(cast => cast.name).join(', ')}</p>
	</div>
{/if}

{#if watchData}
  <div class="container grid items-center mt-8">
    <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-4">
      Seasons:
    </h3>
    <div class="flex space-x-1 overflow-x-auto">
      {#each watchData.seasons as season (season.season)}
        <Button
          variant="outline"
          class="whitespace-nowrap hover:text-white"
          on:click={() => selectedSeason = season.season}
        >
          S{season.season}
        </Button>
      {/each}
    </div>
  </div>
  <div class="container grid items-center mt-4">
    {#each watchData.seasons as season (season.season)}
      {#if selectedSeason === season.season}
        <div class="mb-8">
          <div class="grid grid-cols-1">
            {#each season.episodes as episode (season.season + '-' + episode.episode)}
              <div class="p-1 shadow-md flex space-x-4 items-center">
                {#if episode.img && episode.img.mobile}
                  <img src={episode.img.mobile} alt={episode.title} />
                {/if}
                <div class="w-3/4">
                  <p>
                    {episode.title}
                  </p>
                  <p>
                    {episode.releaseDate}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  </div>
{/if}

{#if ((recommendations && recommendations.length > 0) || (similar && similar.length > 0))}
  <div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative mt-8">
    <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
      You may also like:
    </h3>
    {#if recommendations && recommendations.length > 0}
      <Carousel items={recommendations} url="/tv" title="name" />
    {:else}
      <Carousel items={similar} url="/tv" title="name" />
    {/if}
  </div>
{/if}