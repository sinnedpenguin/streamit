<script lang="ts">
	import type { TV } from "$lib/types/tv";
  import '@splidejs/svelte-splide/css';
  import { Skeleton } from "$lib/components/ui/skeleton";
	import { Button } from "$lib/components/ui/button";
	import VideoPlayer from "$lib/components/videoplayer.svelte";
  import { episode } from "$lib/stores/episode";
  import { onDestroy } from 'svelte';
  import Details from "$lib/components/details/details.svelte";
  import Cover from "$lib/components/details/cover.svelte";
  import Recommendations from "$lib/components/details/recommendations.svelte";

  export let data: {
    details?: TV;
    recommendations: TV[];
    similar: TV[];
    casts: TV[];
  };

  let { details, recommendations, similar, casts } = data;

  let watchData: TV | undefined;
  let isLoading = true;
  let selectedSeason: number = 1; 
  let episodeId: number | null;

  const unsubscribe = episode.subscribe(value => {
    episodeId = value;
  });

  const fetchData = async () => {
    isLoading = true;
    const response = await fetch(`${import.meta.env.VITE_DETAILS_URL}${details?.id}?type=tv`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details: ${response.status}`);
    }
    watchData = await response.json();

    isLoading = false;
    selectedSeason = 1; 
  };

  const selectEpisode = (id: number) => {
    episode.setEpisode(id);
  };

  $: {
    ({ details, recommendations, similar, casts } = data);
    fetchData();
  }
  
  onDestroy(unsubscribe);
</script>

{#if details}
  <section class="container grid items-center mt-4">
    {#if watchData}
      {#key episodeId}
        <VideoPlayer 
          url={`${import.meta.env.VITE_WATCH_URL}${episodeId}?id=${watchData.id}`}
        />
      {/key}
    {:else}
      <div class="w-full h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh] relative">
        {#if !isLoading}
          <Cover {details} {watchData} />
          <div class="absolute top-0 left-0 w-full h-full" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));"></div>
        {:else}
          <Skeleton class="h-full w-full" />
        {/if}
      </div>
    {/if}
  </section>
  
  <Details let:Title let:Description>
    <Title>{details?.name || 'N/A'}</Title>
    <Description {details} {casts} />
  </Details>

  <div id="seasons-section" class="container grid items-center mt-8">
    <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-4">
      Seasons:
    </h3>
  </div>

  {#if isLoading}
    <div class="container flex items-center space-x-1 overflow-x-auto">
      {#each Array(details?.number_of_seasons) as _}
        <Skeleton class="w-12 h-10" /> 
      {/each}
    </div> 
  {:else}
    {#if watchData}
      <div class="container grid items-center">
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
      <div class="container">
        {#each watchData.seasons as season (season.season)}
          {#if selectedSeason === season.season}
            <div class="my-8">
              <div class="grid grid-cols-1 gap-2">
                {#each season.episodes as episode (season.season + '-' + episode.episode)}
                <a href={`/tv/watch/${details.id}`} on:click={() => selectEpisode(episode.id)}>
                    <div class="flex items-start space-x-4 hover:bg-secondary rounded p-2">
                      {#if episode.img && episode.img.mobile}
                        <img class="w-36 h-20 object-cover sm:w-64 sm:h-36" src={episode.img.mobile} alt={episode.title}/>
                      {/if}
                      <div class="flex-grow">
                        <small>S{season.season} / EP{episode.episode}</small>
                        <p class="text-md text-primary font-semibold">{episode.title}</p>
                        <p class="text-sm hidden sm:inline-block">{episode.description}</p>
                      </div>
                    </div>
                  </a>
                {/each}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  {/if}
  
  <Recommendations {recommendations} {similar} content="tv" />
{/if}