<script lang="ts">
  import { Button } from "./ui/button";
  import { Bookmark, Loader2, X } from "lucide-svelte";
  import { collection, doc, getDoc, deleteDoc, query, where, getDocs, setDoc } from "firebase/firestore"; 
  import { db } from "$lib/config/firebase";
  import { userAuth } from '$lib/stores/auth';
  import type { Movie } from "$lib/types/movie";
  import type { TV } from "$lib/types/tv";
  import { toast } from 'svoast';

  export let details: Movie | TV;

  let isInWatchlist = false;
  let isLoading = false;

  async function checkWatchlist() {
    if ($userAuth.user && details) {
      const userId = $userAuth.user.uid;
      const mediaId = details.id.toString(); 
      const userDocRef = doc(db, 'users', userId);
      const watchlistCollection = collection(userDocRef, 'watchlist');
      const q = query(watchlistCollection, where('mediaId', '==', mediaId));
      const querySnapshot = await getDocs(q);
      
      isInWatchlist = !querySnapshot.empty;
    }
  }

  async function addToWatchList() {
    if ($userAuth.user && details) {
      isLoading = true;

      const userId = $userAuth.user.uid;
      const mediaId = details.id.toString(); 
      const userDocRef = doc(db, 'users', userId);
      const watchlistCollection = collection(userDocRef, 'watchlist');

      const animeDocRef = doc(watchlistCollection, mediaId);

      const animeDocSnapshot = await getDoc(animeDocRef);

      if (!animeDocSnapshot.exists()) {
        await setDoc(animeDocRef, {
          mediaId: mediaId,
        });

        isInWatchlist = true;
        isLoading = false;
        toast.success('Added to Watchlist!');
      }
    }
  }

  async function removeFromWatchlist() {
    if ($userAuth.user && details) {
      isLoading = true;

      const userId = $userAuth.user.uid;
      const mediaId = details.id.toString(); 
      const userDocRef = doc(db, 'users', userId);
      const watchlistCollection = collection(userDocRef, 'watchlist');
      const q = query(watchlistCollection, where('mediaId', '==', mediaId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(docToDelete.ref);

        isInWatchlist = false;
        isLoading = true;
        toast.error('Removed from Watchlist!');
      }

      setTimeout(() => {
        isLoading = false;
      }, 1000);
    }
  }

  $: {
    checkWatchlist();
    details;
  }
</script>

<Button 
  variant={isInWatchlist ? "destructive" : "secondary"} 
  on:click={() => isLoading ? null : (isInWatchlist ? removeFromWatchlist() : addToWatchList())} 
  disabled={isLoading}
>
  {#if isLoading} 
    <Loader2 class="h-4 w-4 animate-spin" />
  {:else} 
    {#if isInWatchlist} 
      <X class="h-4 w-4" /> 
    {:else} 
      <Bookmark class="h-4 w-4" /> 
    {/if} 
  {/if}
</Button>