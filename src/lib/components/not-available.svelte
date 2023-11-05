<script lang="ts">
  import Button from './ui/button/button.svelte';
  import { ChevronLeft, RefreshCw } from 'lucide-svelte';

  export let message = 'An error occurred.';
</script>

<div class="w-full h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh] relative bg-black-500 flex flex-col justify-center items-center">
  <span class="text-center mb-4">{message}</span>
  <div>
    <a href="/home" aria-label="Homepage">
      <Button variant="outline">
        <ChevronLeft class="h-4 w-4 mr-2" /> Homepage
      </Button>
    </a>
    <button on:click={() => location.reload()} aria-label="Refresh">
      <Button variant="outline">
        <RefreshCw class="h-4 w-4 mr-2" /> Refresh
      </Button>
    </button>
  </div>
</div>