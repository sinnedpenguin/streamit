<script lang="ts">
	import type { Movie } from "$lib/types/movie";

  export let data: {
    details?: Movie;
  };
  
  let { details } = data;
  $: {
    ({ details } = data);
  }
</script>

{#if details}
	<div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative">
		<div class="w-full h-[60vh] relative">
			<img
				class="w-full h-full object-cover"
				src={details.cover}
				alt={details.title}
			/>
			<div class="absolute top-0 left-0 w-full h-full" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));"></div>
		</div>
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">{details.title || 'N/A'}</h1>
		<p class="leading-7 [&:not(:first-child)]:mt-6">{details.description || 'Description: N/A'}</p>
		{#if details.rating}
			<p>Rating: {details.rating}</p>
		{:else}
			<p>Rating: N/A</p>
		{/if}
		{#if details.releaseDate}
			<p>Release date: {details.releaseDate}</p>
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

{#if details && details.similar}
	<div class="container grid items-center gap-4 pb-8 pt-6 md:py-2 relative">
		<h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight mb-2">
			You may also like:
		</h3>
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
			{#each details.similar.slice(0, 18) as similarMovie (similarMovie.id)}
				<a href="/tv/{similarMovie.id}"> 
					<img src={similarMovie.image} alt={similarMovie.title} />
				</a>
			{/each}
		</div>
	</div>
{/if}