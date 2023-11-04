<script lang="ts">
  import Cover from "./cover.svelte";
  import Title from "./title.svelte";
  import Description from "./description.svelte";
  import Recommendations from "./recommendations.svelte";

</script>

<div class="mt-2">
  <slot {Cover} {Title} {Description} {Recommendations} />
</div>