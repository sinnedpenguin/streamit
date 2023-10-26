<script lang="ts">
  import { navigating } from "$app/stores";
	import { loading } from "$lib/components/loading";
  import Loading from "$lib/components/Loading.svelte";

  $: $loading = !!$navigating;
</script>

<slot />
<Loading />