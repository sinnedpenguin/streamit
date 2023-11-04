<script>
	import MainNav from "./main-nav.svelte";
</script>

<header class="sticky top-0 z-40 w-full border-b bg-background">
  <div class="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-4">
    <a href="/home">
      <nav class="flex items-center">
        <span class="font-bold sm:inline text-primary">STREAM<span class="text-white">it!</span></span>
      </nav>
    </a>
    <MainNav />
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    view-transition-name: header;
  }
</style>