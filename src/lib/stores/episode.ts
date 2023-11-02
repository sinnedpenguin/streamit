import { writable } from 'svelte/store';

function createEpisodeStore() {
  const { subscribe, set } = writable<number | null>(null);

  return {
    subscribe,
    setEpisode: (id: number) => set(id),
  };
}

export const episode = createEpisodeStore();