<script>
  import "../app.postcss";
	import SiteHeader from "$lib/components/site-header.svelte";
	import SiteFooter from "$lib/components/site-footer.svelte";
	import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<SiteHeader />
<slot />
<SiteFooter />