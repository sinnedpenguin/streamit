<script lang="ts">
  import { options } from "$lib/config/carousel";
  import type { CarouselItem } from "$lib/types/carousel";
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';

  export let items: CarouselItem["items"];
  export let url: CarouselItem["url"];
  export let title: CarouselItem["title"];
</script>

<Splide options={{ ...options, drag: "free" }}>
  {#each items as item (item.id)}
    <SplideSlide>
      <a href="{`${url}/${item.id}`}">
        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item[title]} />
      </a>
    </SplideSlide>
  {/each}
</Splide>