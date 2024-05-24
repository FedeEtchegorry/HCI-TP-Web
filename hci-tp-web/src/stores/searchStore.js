import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    search: ''
  }),
  actions: {
    updateSearch(newSearch) {
      this.search = newSearch;
    }
  },
  getters: {
    getSearch: (state) => state.search
  }
});
