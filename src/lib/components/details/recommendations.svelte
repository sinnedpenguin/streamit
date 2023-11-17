<script lang="ts">
  import type { Movie } from "$lib/types/movie";
  import type { TV } from "$lib/types/tv";
	import Carousel from "$lib/components/carousel.svelte";

  export let recommendations: (Movie | TV)[];
  export let similar: (Movie | TV)[];
  export let content: "movie" | "tv"; 
</script>

<div class="container grid items-center mb-8 mt-6 ">
  {#if recommendations && recommendations.length > 0 || similar && similar.length > 0}
    <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
      You may also like:
    </h3>
    {#if recommendations && recommendations.length > 0}
      <Carousel items={recommendations} url={`/${content}`} title="title" />
    {:else}
      {#if similar && similar.length > 0}
        <Carousel items={similar} url={`/${content}`} title="title" />
      {/if}
    {/if}
  {/if}
</div>
