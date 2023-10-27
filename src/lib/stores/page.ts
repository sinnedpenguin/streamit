import { writable } from 'svelte/store';

function createPage() {
  const { subscribe, set } = writable(1);

  return {
    subscribe,
    setPage: (page: number) => set(page),
  };
}

export const page = createPage();