<script>
	import Button from "./ui/button/button.svelte";
	import { Search, User } from "lucide-svelte";

	const navItems = [
		{ href: '/home', label: 'Home' },
		{ href: '/movies', label: 'Movies' },
		{ href: '/tv', label: 'TV Shows' }
	];
</script>

<nav class="hidden items-center space-x-2 md:flex">
  {#each navItems as item (item.href)}
    <a href={item.href}>
      <Button variant="ghost">{item.label}</Button>
    </a>
  {/each}
  <Button variant="ghost">
    <Search class="h-5 w-5" />
  </Button>
  <Button variant="ghost">
    <User class="h-6 w-6" />
  </Button>
</nav>