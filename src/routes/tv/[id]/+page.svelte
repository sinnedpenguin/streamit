<script lang="ts">
  import type { TV } from "$lib/types/tv";
  import '@splidejs/svelte-splide/css';
  import { Button } from "$lib/components/ui/button";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { episode } from "$lib/stores/episode";
  import Details from "$lib/components/details/details.svelte";
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