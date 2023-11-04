<script>
  import "../app.postcss";
	import SiteHeader from "$lib/components/site-header.svelte";
	import SiteFooter from "$lib/components/site-footer.svelte";
	import { ModeWatcher } from "mode-watcher";
	import { onNavigate } from '$app/navigation';
	import PageLoader from "$lib/components/page-loader.svelte";

	onNavigate((navigation) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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