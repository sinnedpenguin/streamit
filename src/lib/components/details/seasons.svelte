<script lang="ts">
  import type { TV } from "$lib/types/tv";
  import { episode } from "$lib/stores/episode";
  import { selectedEpisode } from "$lib/stores/selectedEpisode";
  import { Button } from "../ui/button";

  export let data: {
    details?: TV;
  };

  let { details } = data;
  export let watchData: TV | undefined;
  export let selectedSeason: number = 1;
  export let mode: 'tv' | 'watch'; 

  const selectEpisode = (id: number) => {
    episode.setEpisode(id);
    selectedEpisode.setSelectedEpisode(id);
  };

  $: selectedEpisodeId = $selectedEpisode;
</script>

{#if watchData}
  <div class="container grid items-center">
    <div class="flex space-x-1 overflow-x-auto">
      {#each watchData.seasons as season (season.season)}
        <Button
        variant="outline"
        class="whitespace-nowrap hover:text-white {selectedSeason === season.season ? 'text-primary' : ''}"
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
              <a href={`/${mode === 'watch' ? 'watch' : 'tv'}/watch/${details?.id}`} on:click={() => selectEpisode(episode.id)}>
                <div class={`flex items-start space-x-4 rounded p-2 ${selectedEpisodeId === episode.id ? 'bg-secondary' : 'hover:bg-secondary'}`}>
                  {#if episode.img && episode.img.mobile}
                    <img class="w-36 h-20 object-cover sm:w-64 sm:h-36" src={episode.img.mobile} alt={episode.title}/>
                  {:else}
                    <img class="w-36 h-20 object-cover sm:w-64 sm:h-36" src={watchData.cover} alt={episode.title} />
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
