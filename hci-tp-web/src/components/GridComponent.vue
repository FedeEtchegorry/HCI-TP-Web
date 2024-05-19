<template>
  <v-container fluid>
    <v-row dense justify="start">
      <v-col class="ma-2 fixed-size-cell" v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
        <EmptyCard/>
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
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
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
