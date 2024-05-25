import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    search: '',
    selected: '' // Agregar la propiedad para el valor seleccionado del dropdown
  }),
  actions: {
    updateSearch(newSearch) {
      this.search = newSearch;
    },
    updateSelected(newSelected) { // Método para actualizar el valor seleccionado del dropdown
      this.selected = newSelected;
    }
  },
  getters: {
    getSearch: (state) => state.search,
    getSelected: (state) => state.selected // Getter para obtener el valor seleccionado del dropdown
  }
});
