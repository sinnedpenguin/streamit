<script>
	import MainNav from "./main-nav.svelte";
</script>

<header class="sticky top-0 z-40 w-full border-b bg-background">
  <div class="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-4">
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
          class=" h-6 w-6 text-primary mx-2"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
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