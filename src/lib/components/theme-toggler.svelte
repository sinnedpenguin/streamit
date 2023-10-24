<script>
  import { Button } from "$lib/components/ui/button";
  import { Sun, Moon } from 'lucide-svelte';

  let isDarkMode = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') === 'dark' : false;

  function toggleTheme() {
    isDarkMode = !isDarkMode;

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    const html = document.documentElement;

    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
</script>

<Button variant="ghost" on:click={toggleTheme}>
  {#if isDarkMode}
    <Moon size="20" /> 
  {:else}
    <Sun size="20" /> 
  {/if}
</Button>