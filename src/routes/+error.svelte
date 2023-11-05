<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
  import { ChevronLeft } from 'lucide-svelte';

  function returnToPreviousPage() {
    history.back(); 
  }
</script>

{#if $page.error}
  <div class="flex flex-col justify-center h-[75vh] items-center mt-4">
    <h1>{$page.error.message.toLocaleUpperCase()}</h1>
    <div class="mt-4">
      <Button variant="outline" on:click={() => returnToPreviousPage()}>
        <ChevronLeft class="h-4 w-4 mr-2"/> Previous page
      </Button>
      <a href="/home">
        <Button variant="outline">
          <ChevronLeft class="h-4 w-4 mr-2"/> Homepage
        </Button>
      </a>
    </div>
  </div>
{/if}