<script>
  import * as Sheet from "$lib/components/ui/sheet";
	import Search from "./search.svelte";
	import Button from "./ui/button/button.svelte";
	import { page } from '$app/stores';
	import { items } from "$lib/config/nav";
  import { MenuIcon, Github } from "lucide-svelte";

	let current = '/'; 
	$: current = $page.url.pathname;
</script>

<header class="sticky top-0 z-40 w-full border-b bg-background">
  <div class="container flex h-16 items-center">
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
      </nav>
    </a>
    <Search />
    <div class="mt-1 ml-auto">
      <Sheet.Root>
        <Sheet.Trigger>
          <MenuIcon class="h-6 w-6 ml-2" />
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>STREAMit!</Sheet.Title>
            <a 
              target="_blank"
              href="https://github.com/sinnedpenguin/streamit"
            >
              <Button variant="ghost">
                <Github class="h-5 w-5" />
              </Button>
            </a>
            {#each items as item (item.href)}
              <a href={item.href}>
                <Button variant="ghost" class="p-3">
                  <span class={current === item.href && current !== '/' ? 'text-primary' : ''}>{item.label}</span>
                </Button>
              </a>
            {/each}
          </Sheet.Header>
        </Sheet.Content>
      </Sheet.Root>
    </div>
  </div>
</header>