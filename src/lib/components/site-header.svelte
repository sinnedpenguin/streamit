<script>
  import MainNav from "./main-nav.svelte";
  import MobileNav from "./mobile-nav.svelte";
</script>

<div class="hidden sm:flex">
  <MainNav />
</div>
<div class="flex ml-auto sm:hidden">
  <MobileNav />
</div>