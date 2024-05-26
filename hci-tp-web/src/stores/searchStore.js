// stores/searchStore.js
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    search: '',
    selected: '',
    items: []  // Nueva propiedad para las opciones del v-select
  }),
  getters: {
    getSearch: (state) => state.search,
    getSelected: (state) => state.selected,
    getItems: (state) => state.items  // Getter para las opciones del v-select
  },
  actions: {
    updateSearch(value) {
      this.search = value;
    },
    updateSelected(value) {
      this.selected = value;
    },
    setItems(items) {  // Nueva acción para actualizar las opciones del v-select
      this.items = items;
    }
  }
});
