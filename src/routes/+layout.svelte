<script>
  import "../app.postcss";
	import SiteHeader from "$lib/components/site-header.svelte";
	import SiteFooter from "$lib/components/site-footer.svelte";
	import { ModeWatcher } from "mode-watcher";
	import { onNavigate } from '$app/navigation';
	import PageLoader from "$lib/components/page-loader.svelte";

	onNavigate((navigation) => {
			// @ts-ignore
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
				// @ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<PageLoader />
<ModeWatcher />
<SiteHeader />
<slot />
<SiteFooter />