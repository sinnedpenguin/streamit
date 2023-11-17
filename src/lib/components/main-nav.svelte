<script>
	import Search from "./search.svelte";
	import Button from "./ui/button/button.svelte";
	import { page } from '$app/stores';
	import { items } from "$lib/config/nav";
  import { Github } from "lucide-svelte";

	let current = '/'; 
	$: current = $page.url.pathname;
</script>

<header class="sticky top-0 z-40 w-full border-b bg-background">
  <div class="container flex h-16 items-center justify-between">
    <div class="flex items-center">
      <a href="/home">
        <nav class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 text-primary mr-2"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span class="font-bold sm:inline text-primary">STREAM<span class="text-white mr-4">it!</span></span>
        </nav>
      </a>
			{#each items as item (item.href)}
			<a href={item.href}>
				<Button variant="ghost" class="p-3">
					<span class={current === item.href && current !== '/' ? 'text-primary' : ''}>{item.label}</span>
				</Button>
			</a>
		{/each}
    </div>
    <nav class="hidden items-center space-x-2 md:flex">
      <Search />
      <a 
        target="_blank"
        href="https://github.com/sinnedpenguin/streamit"
      >
        <Button variant="ghost">
          <Github class="h-5 w-5" />
        </Button>
      </a>
    </nav>
  </div>
</header>