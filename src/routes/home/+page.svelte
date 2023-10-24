<script lang="ts">
  import Popular from "./popular.svelte";
  import Trending from "./trending.svelte";
</script>

<section class="container grid items-center gap-2 md:py-2">
  <Trending />
  <div class="mt-16">
    <Popular />
  </div>
</section>