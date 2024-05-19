<template>
  <v-container fluid>
    <v-row dense justify="center">
      <v-col class="d-flex flex-column grow-1 ma-2 ml-4 mr-4 fixed-size-cell" v-for="(item, index) in items"
        :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
        <EmptyCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EmptyCard from './CardDetail/EmptyCard.vue';
export default {
  data() {
    return {
      items: [
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' }, 
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' }, 
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' }, 
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' }, 
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' }, 
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
         { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
         { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' }, 
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
         { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        // Agrega más elementos según necesites
      ]
    };
  },
};
</script>

<style scoped>
.fixed-size-cell {
  width: 15rem;
  height: 20rem;
  overflow: hidden;
}
</style>
