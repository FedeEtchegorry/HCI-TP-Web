<template>
    <v-container class="no-padding">
      <v-form>
        <v-select
          ref="homeSelect"
          v-model="selectedOption"
          :items="options"
          required
          rounded
          hide-selected
          variant="outlined"    
        ></v-select>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedOption: 'Casa 1', // Set the initial value to the first home
        options: [
          'Casa 1',
          'Casa 2',
          'Casa 3',
          'Casa 4'
        ]
      };
    },
    mounted() {
      console.log(this.$refs.homeSelect);
    }
  };
  </script>
  
  <style scoped>
  .no-padding {
    padding: 0;
    border-radius: 1.5rem;

  }

  </style>
  <!--label="Hogar en el que se encuentra"-->