<script lang="ts">
  import type { TV } from "$lib/types/tv";
  import '@splidejs/svelte-splide/css';
  import { Skeleton } from "$lib/components/ui/skeleton";
  import Details from "$lib/components/details/details.svelte";
  import Recommendations from "$lib/components/details/recommendations.svelte";
	import Seasons from "$lib/components/details/seasons.svelte";

  export let data: {
    details?: TV;
    recommendations: TV[];
    similar: TV[];
    casts: TV[];
  };

  let { details, recommendations, similar, casts } = data;

  let watchData: TV | undefined;
  let isLoading = true;

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
</script>

{#if details}
  <Details let:Cover let:Title let:Description>
    {#if isLoading}
      <div class="container grid items-center mt-4">
        <div class="w-full h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh] relative">
          <Skeleton class="h-full w-full" />
        </div>
      </div>
    {:else}
      <Cover {details} {watchData} />
    {/if}
    <Title>{details?.name || 'N/A'}</Title>
    <Description {details} {casts} />
  </Details>
  <div id="seasons-section"></div>
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