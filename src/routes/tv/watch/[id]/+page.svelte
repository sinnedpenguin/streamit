<script lang="ts">
	import type { TV } from "$lib/types/tv";
  import '@splidejs/svelte-splide/css';
  import { Skeleton } from "$lib/components/ui/skeleton";
	import VideoPlayer from "$lib/components/videoplayer.svelte";
  import { episode } from "$lib/stores/episode";
  import { onDestroy } from 'svelte';
  import Details from "$lib/components/details/details.svelte";
  import Cover from "$lib/components/details/cover.svelte";
  import Recommendations from "$lib/components/details/recommendations.svelte";
	import NotAvailable from "$lib/components/not-available.svelte";
	import Seasons from "$lib/components/details/seasons.svelte";
  import SupportAlert from "$lib/components/support-alert.svelte"

  export let data: {
    details?: TV;
    recommendations: TV[];
    similar: TV[];
    casts: TV[];
  };

  let { details, recommendations, similar, casts } = data;

  let watchData: TV | undefined;
  let isLoading = true;
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
  };

  $: {
    ({ details, recommendations, similar, casts } = data);
    fetchData();
  }
  
  onDestroy(unsubscribe);
</script>

{#if details}
  <SupportAlert />
  <section class="container grid items-center mt-4">
    {#if watchData}
      {#key episodeId}
        {#if episodeId !== undefined}
          <VideoPlayer 
            url={`${import.meta.env.VITE_WATCH_URL}${episodeId}?id=${watchData.id}`}
          />
        {:else}
          <NotAvailable />
        {/if}
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
  
  <div class="container grid items-center mt-8">
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
    <Seasons {watchData} data={{details}} mode="tv" />
  {/if}
  <Recommendations {recommendations} {similar} content="tv" />
{/if}