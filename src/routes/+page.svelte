<script>
	import { Button } from "$lib/components/ui/button";
	import { Tv } from "lucide-svelte";
</script>

<section 
	class="h-[80vh] flex items-center justify-center mx-5 mt-2" 
	style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/banner.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"
>
	<div class="text-center text-white">
		<img src="/logo.svg" alt="STREAMit!" class="h-32 mx-auto mb-4" />
		<h1 class="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl"><span class="text-primary">STREAM</span>it!</h1>
		<p class="mt-4 text-2xl">Watch the latest and popular <span class="text-primary">MOVIES</span> / <span class="text-primary">TV SHOWS </span>for <span class="text-primary">FREE</span>!
		<div class="mt-4">
			<Button href="/home">
        <Tv class="h-5 w-5 mr-2"/> Start Browsing
      </Button>
		</div>
	</div>
</section>