<script lang="ts">
  import type { Media } from "$lib/types/media";
  import { Input } from "./ui/input";
  import { SearchIcon } from "lucide-svelte"

  let query = '';
  let results: Media[] = [];
  let debounceTimeout: number | undefined;

  const fetchData = async () => {
    if (query === '') {
      results = [];
      return;
    }

    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch search data: ${response.status}`);
    }
    const data = await response.json();

    results = data.results.filter((result: { media_type: string; }) => result.media_type !== 'person');
  };

  const debounceSearch = () => {
    if (typeof window !== 'undefined') {
      clearTimeout(debounceTimeout);
      debounceTimeout = window.setTimeout(() => {
        fetchData();
      }, 500);
    }
  };

  const clearInputAndResults = () => {
    query = '';
    results = [];
  };

  $: debounceSearch(), query;
</script>

<form class="flex w-full max-w-sm items-center space-x-2">
  <div class="flex items-center space-x-2 w-full">
    <div class="relative w-full">
      <Input bind:value={query} type="text" placeholder="Search..." class="pl-10 pr-4 py-2 w-60 sm:w-72" />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon class="h-4 w-4" />
      </div>
      {#if results.length > 0}
        <div class="absolute w-full mt-2 bg-[#0C0A09] text-white overflow-auto max-h-[50vh] rounded">
          <ul class="p-4 space-y-2">
            {#each results as result (result.id)}
              <li class="flex items-center space-x-2 mb-2 pb-2 border-b border-gray-200">
                <a 
                  class="flex items-center space-x-2 w-full"
                  href={`/${result.media_type}/${result.id}`} 
                  on:click={() => {
                    clearInputAndResults();
                  }}
                >
                  {#if result.poster_path}
                    <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt="" class="w-10 h-auto" />
                    {:else}
                    <div class="w-10 h-auto bg-black-200"></div>
                  {/if}
                  <div>
                    <div><small>{result.media_type === 'movie' ? result.title : result.name}</small></div>
                    <div><small>{result.media_type?.toUpperCase()}</small></div>
                  </div>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </div>
</form>