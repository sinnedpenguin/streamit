<script lang="ts">
  import { loading } from "./loading";
  import { Loader2 } from "lucide-svelte";
</script>

<style>
  .overlay {
    --size: 100px;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader-container {
    border-radius: var(--size);
    height: var(--size);
    width: var(--size);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @keyframes moveLoader {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(50%);
    }
  }
</style>

{#if $loading}
  <div class="overlay">
    <div class="loader-container">
      <Loader2 class="h-16 w-16 text-primary animate-spin" />
    </div>
  </div>
{/if}
