<script lang="ts">
  import * as Alert from "$lib/components/ui/alert";
  import Button from "./ui/button/button.svelte";
  import { X } from "lucide-svelte";

  let isVisible = true;

  const hideAlert = () => {
    isVisible = false;
  };
</script>

{#if isVisible}
  <div class="container grid items-center mt-4">
    <Alert.Root>
      <div class="flex items-center justify-between">
        <Alert.Description>
          Help us enhance your experience!
        </Alert.Description>
        <div class="flex items-center">
          <a href="https://ko-fi.com/sinnedpenguin" target="_blank" rel="noopener noreferrer">
            <Button class="mr-2"> 
              <svg viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2">
                <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
              </svg> Support
            </Button>
          </a>
          <button on:click={hideAlert}>
            <X class="h-4 w-4" />
          </button>
        </div>
      </div>
    </Alert.Root>
  </div>
{/if}