<script lang="ts">
  import { navigating } from "$app/stores";
  import { loading } from "$lib/stores/loading";
	import Loader from "$lib/components/loader.svelte";

  $: $loading = !!$navigating;
</script>

<slot />
<Loader />