<script>
  import "../app.postcss";
	import SiteHeader from "$lib/components/site-header.svelte";

  if (typeof localStorage !== 'undefined') {
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<SiteHeader />
<slot></slot>