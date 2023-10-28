<script lang="ts">
	import type { Media } from "$lib/types/media";
	import { Input } from "./ui/input";
  import { SearchIcon } from "lucide-svelte"

  let query = '';
  let results: Media[] = [];

  const fetchData = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`);
    const data = await res.json();

    results = data.results.filter((result: any) => result.media_type !== 'person');
  };

  $: fetchData(), query;
</script>

<form class="flex w-full max-w-sm items-center space-x-2">
  <div class="flex items-center space-x-2 w-full">
    <div class="relative w-full">
      <Input bind:value={query} type="text" placeholder="Search..." class="pl-10 pr-4 py-2" />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon class="h-4 w-4" />
      </div>
      
      {#if results.length > 0}
        <div class="absolute w-full mt-2 bg-white text-black overflow-auto max-h-[50vh]">
          <ul class="p-4 space-y-2">
            {#each results as result (result.id)}
              <li class="flex items-center space-x-2 mb-2 pb-2 border-b border-gray-200">
                <a 
                  class="flex items-center space-x-2 w-full"
                  href={`/${result.media_type}/${result.id}`} 
                  on:click={() => {
                    query = ''; 
                  }}
                >
                  {#if result.poster_path}
                    <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt="" class="w-10 h-auto" />
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