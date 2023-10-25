<script>
  import "../app.postcss";
	import SiteHeader from "$lib/components/site-header.svelte";
	import SiteFooter from "$lib/components/site-footer.svelte";
</script>

<SiteHeader />
<slot></slot>
<SiteFooter />