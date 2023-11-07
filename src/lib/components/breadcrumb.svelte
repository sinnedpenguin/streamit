<script lang="ts">
  import { page } from '$app/stores';

  let crumbs: Array<{ label: string, href: string }> = [];

  $: {
    const tokens = $page.url.pathname.split('/').filter((t) => t !== '' && t !== 'home' && t !== 'watch');
    let tokenPath = '';

    crumbs = tokens.map((t) => {
      tokenPath += '/' + t;
      t = t.charAt(0).toUpperCase() + t.slice(1);
      if (t.toLowerCase() === 'movie') {
        t = 'Movies';
      }

      if (t.toLowerCase() === 'tv') {
        t = 'TV Shows';
      }
      
      return { label: t, href: tokenPath };
    });

    if (crumbs.length > 0) {
      crumbs.unshift({ label: 'Home', href: '/home' });
    }
  }
</script>

<div class="container items-center mt-2">
  {#each crumbs as crumb (crumb.href)}
    <a href="{crumb.href}">
      <span class="text-secondary hover:text-secondary">
        / <small class="text-secondary hover:text-primary"> {crumb.label}</small>
      </span>  
    </a>
  {/each}
</div>