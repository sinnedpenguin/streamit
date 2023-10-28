<script>
	import Search from "./search.svelte";
import Button from "./ui/button/button.svelte";
	import { User } from "lucide-svelte";

	const navItems = [
		{ href: '/home', label: 'Home' },
		{ href: '/movie', label: 'Movies' },
		{ href: '/tv', label: 'TV Shows' }
	];
</script>

<nav class="hidden items-center space-x-2 md:flex">
  {#each navItems as item (item.href)}
    <a href={item.href}>
      <Button variant="ghost">{item.label}</Button>
    </a>
  {/each}
  <Search />
  <Button variant="ghost">
    <User class="h-6 w-6" />
  </Button>
</nav>