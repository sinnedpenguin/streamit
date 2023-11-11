<script>
	import Search from "./search.svelte";
	import Button from "./ui/button/button.svelte";
	import { page } from '$app/stores';
	import Avatar from "./user/avatar.svelte";
	
  const navItems = [
		{ href: '/home', label: 'Home' },
		{ href: '/movie', label: 'Movies' },
		{ href: '/tv', label: 'TV Shows' }
	];

	let current = '/'; 
	$: current = $page.url.pathname;
</script>

<nav class="hidden items-center space-x-2 md:flex">
  {#each navItems as item (item.href)}
    <a href={item.href}>
      <Button variant="ghost" class="p-3">
        <span class={current === item.href && current !== '/' ? 'text-primary' : ''}>{item.label}</span>
      </Button>
    </a>
  {/each}
  <Search />
	<Avatar />
</nav>