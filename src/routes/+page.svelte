<script>
	import { Button } from "$lib/components/ui/button";
	import { Tv } from "lucide-svelte";
</script>

<section class="h-[80vh] flex items-center justify-center mx-5 mt-2 text-center">
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
		<h1 class="scroll-m-20 text-4xl lg:text-5xl font-extrabold tracking-tight">
			<span class="text-primary">STREAM</span>it!
		</h1>
		<p class="mt-4 text-xl lg:text-2xl">
			Watch <span class="text-primary">MOVIES</span> and <span class="text-primary">TV SHOWS </span>for <span class="text-primary">FREE</span>!
		</p>
		<p class="mt-2 text-xl lg:text-2xl">
			No <span class="text-primary">SIGN UP</span> or <span class="text-primary">REGISTRATION </span>needed!
		</p>
		<div class="mt-4">
			<Button href="/home">
        <Tv class="h-4 w-4 mr-2"/> Start Browsing
      </Button>
		</div>
	</div>
</section>