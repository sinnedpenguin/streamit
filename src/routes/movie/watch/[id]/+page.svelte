<script lang="ts">
	import type { Movie } from "$lib/types/movie";
  import '@splidejs/svelte-splide/css';
  import { Skeleton } from "$lib/components/ui/skeleton";
  import NotAvailable from "$lib/components/not-available.svelte";
	import VideoPlayer from "$lib/components/videoplayer.svelte";
  import Details from "$lib/components/details.svelte";
  import Cover from "$lib/components/cover.svelte";

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
    const res = await fetch(`${import.meta.env.VITE_DETAILS_URL}${details?.id}?type=movie`);
    watchData = await res.json();
    isLoading = false;
  };

  $: {
    ({ details, recommendations, similar, casts } = data);
    fetchData();
  }
</script>

{#if details}
  <section class="container grid items-center mt-4">
    {#if watchData}
      {#if watchData.episodeId !== undefined}
      <VideoPlayer 
        url={`${import.meta.env.VITE_WATCH_URL}${watchData.episodeId}?id=${watchData.id}`}
      />
      {:else}
        <NotAvailable />
      {/if}
    {:else}
      <div class="w-full h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh] relative">
        {#if !isLoading}
          <Cover {details} {watchData} />
        {:else}
          <Skeleton class="h-full w-full" />
        {/if}
      </div>
    {/if}
  </section>
  <Details let:Title let:Description let:Recommendations>
    <Title>{details?.title || 'N/A'}</Title>
    <Description {details} {casts} />
    <Recommendations {recommendations} {similar} content="movie" />
  </Details>
{/if}