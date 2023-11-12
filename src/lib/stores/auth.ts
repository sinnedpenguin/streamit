import type { User as FirebaseUser } from 'firebase/auth';
import { writable } from 'svelte/store';

type AuthStore = {
  user: FirebaseUser | null;
}

function createAuthStore() {
  const { subscribe, set } = writable<AuthStore>({ user: null });

  return {
    subscribe,
    setUser: (userData: FirebaseUser | null) => set({ user: userData }),
    clearUser: () => set({ user: null }),
  };
}

export const userAuth = createAuthStore();