<script lang="ts">
	import type { Movie } from "$lib/types/movie";
  import '@splidejs/svelte-splide/css';
  import Details from "$lib/components/details/details.svelte";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

  export let data: {
    details?: Movie;
    recommendations: Movie[];
    similar: Movie[];
    casts: Movie[];
  };

  let { details, recommendations, similar, casts } = data;

  let watchData: Movie | undefined;
  let isLoading = true;

  const fetchData = async () => {
    isLoading = true;
    const response = await fetch(`${import.meta.env.VITE_DETAILS_URL}${details?.id}?type=movie`);
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
  <Details let:Cover let:Title let:Description let:Recommendations>
    {#if isLoading}
    <div class="container grid items-center mt-4">
      <div class="w-full h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh] relative">
        <Skeleton class="h-full w-full" />
      </div>
    </div>
    {:else}
      <Cover {details} {watchData} />
    {/if}
    <Title>{details?.title || 'N/A'}</Title>
    <Description {details} {casts} />
    <Recommendations {recommendations} {similar} content="movie" />
  </Details>
{/if}