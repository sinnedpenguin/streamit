<script>
	import ThemeToggler from "./theme-toggler.svelte";

</script>
<header class="sticky top-0 z-40 w-full border-b bg-background">
  <div class="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-4">
    <span class="font-bold sm:inline">Streamit!</span>
    <div class="flex flex-1 items-center justify-end space-x-2">
      <div class="flex w-full items-center space-x-2 sm:w-auto">
        <ThemeToggler />
      </div>
    </div>
  </div>
</header>