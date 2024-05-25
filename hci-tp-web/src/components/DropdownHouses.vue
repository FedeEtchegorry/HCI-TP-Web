<template>
    <v-container class="no-padding">
      <v-form>
        <v-select ref="homeSelect" v-model="selectedOption" :items="options" required rounded hide-selected variant="outlined"></v-select>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedOption: 'Casa en la ciudad', // Set the initial value to the first home
        options: [
          'Casa en la ciudad',
          'Casa en el country',
          'Casa en la costa',
          'Casa en China'
        ]
      };
    },
  };
  </script>
  
  <style scoped>
  .no-padding {
    padding: 0;
    border-radius: 1.5rem;

  }

  </style>
  <!--label="Hogar en el que se encuentra"-->