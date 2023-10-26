<script lang="ts">
  import type { Movie } from "$lib/types/movie";

  export let data: {
    details?: Movie;
    similar: Movie[];
  };

  let { details, similar } = data;

  let watchData: Movie | undefined;
  let isLoading = true;

  const fetchData = async () => {
    isLoading = true;
    const res = await fetch(`${import.meta.env.VITE_DETAILS_URL}${details?.id}?type=movie`);
    watchData = await res.json();
    isLoading = false;
  };
	
  $: {
    ({ details, similar } = data);
		fetchData();
  }
</script>

{#if details}
	<div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative">
		<div class="w-full h-[60vh] relative">
			{#if isLoading}
				<div class="w-full h-full bg-black"></div>
			{:else}
				<img
					class="w-full h-full object-cover"
					src={watchData?.cover || `https://image.tmdb.org/t/p/w500/${details.backdrop_path}`}
					alt={details.title}
				/>
			{/if}
			<div class="absolute top-0 left-0 w-full h-full" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));"></div>
		</div>
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">{details.title || 'N/A'}</h1>
		<p class="leading-7 [&:not(:first-child)]:mt-6">{details.overview || 'Description: N/A'}</p>
		{#if details.vote_average}
			<p>Rating: {details.vote_average}</p>
		{:else}
			<p>Rating: N/A</p>
		{/if}
		{#if details.release_date}
			<p>Release date: {details.release_date}</p>
		{:else}
			<p>Release date: N/A</p>
		{/if}
	</div>
{:else}
	<div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative">
		<h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
			An error occurred.
		</h3>
	</div>
{/if}

{#if details && similar}
  <div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative">
    <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
      You may also like:
    </h3>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {#each similar.slice(0, 18) as similarMovie (similarMovie.id)}
        <a href="/movie/{similarMovie.id}">
          <div class="flex flex-col items-center">
            <img src={`https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`} alt={similarMovie.title} />
          </div>
        </a>
      {/each}
    </div>
  </div>
{/if}