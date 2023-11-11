<script>
	import { Button } from "$lib/components/ui/button";
	import { Tv } from "lucide-svelte";
</script>

<section 
	class="h-[80vh] flex items-center justify-center mx-5 mt-2">
	<div class="flex flex-col items-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class=" h-28 w-28 text-primary mb-2"
		>
			<polygon points="5 3 19 12 5 21 5 3"></polygon>
		</svg>
		<h1 class="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl"><span class="text-primary">STREAM</span>it!</h1>
		<p class="mt-4 text-2xl">Watch the latest and popular <span class="text-primary">MOVIES</span> / <span class="text-primary">TV SHOWS </span>for <span class="text-primary">FREE</span>!
		<div class="mt-4">
			<Button href="/home">
        <Tv class="h-5 w-5 mr-2"/> Start Browsing
      </Button>
		</div>
	</div>
</section>