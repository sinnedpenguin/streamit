<script lang="ts">
  import * as Avatar from '$lib/components/ui/avatar';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { onMount } from 'svelte';
  import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
  import { User } from 'lucide-svelte';
  import { Button } from '../ui/button';
  import { userAuth } from '$lib/stores/auth';
  import { auth } from '$lib/config/firebase';

  const signOutUser = async () => {
    try {
      await signOut(auth);
      userAuth.setUser(null);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      userAuth.setUser(user);
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  onMount(() => {
    auth.onAuthStateChanged((currentUser) => {
      userAuth.setUser(currentUser);
    });
  });
</script>

<div>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Button variant="ghost" class="p-3">
        <Avatar.Root class="h-6 w-6 bg-secondary">
          {#if $userAuth.user}
            {#if $userAuth.user.photoURL}
              <Avatar.Image src={$userAuth.user.photoURL} alt={$userAuth.user.displayName} />
            {:else}
              <User class="h-6 w-6" />
            {/if}
          {:else}
            <User class="h-6 w-6" />
          {/if}
        </Avatar.Root>
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Group>
        <DropdownMenu.Label>Account</DropdownMenu.Label>
        <DropdownMenu.Separator />
        {#if $userAuth.user} 
          <DropdownMenu.Item>
            <a href="/watchlist">
              Watchlist
            </a>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <a href="/sign-out" on:click|preventDefault={signOutUser}>
              Sign out
            </a>
          </DropdownMenu.Item>
        {:else}
          <DropdownMenu.Item on:click={signInWithGoogle}>
            Sign in with Google
          </DropdownMenu.Item>
        {/if}
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>