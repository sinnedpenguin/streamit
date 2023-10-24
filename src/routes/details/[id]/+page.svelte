<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  interface Details {
    title: string;
    overview: string;
    vote_average: number;
    release_date: string;
  }

  let id: string;
  let details: Details;

  onMount(async () => {
    const { params } = $page; 
    id = params.id; 

    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
      console.log(response);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      details = await response.json();
    } catch (error) {
      console.error(error);
    }
  });
</script>

{#if details}
<article>
  <h1>{details.title}</h1>
  <p>{details.overview}</p>
  <p>Rating: {details.vote_average}</p>
  <p>Release date: {details.release_date}</p>
</article>
{/if}