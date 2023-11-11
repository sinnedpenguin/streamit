import { writable } from 'svelte/store';

function createSelectedEpisodeStore() {
  const { subscribe, set } = writable<number | null>(null);

  return {
    subscribe,
    setSelectedEpisode: (id: number) => set(id),
  };
}

export const selectedEpisode = createSelectedEpisodeStore();