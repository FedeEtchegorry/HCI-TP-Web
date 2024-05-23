<template>
  <v-container fluid>
    <v-row dense justify="center">
      <template v-for="(item, index) in items" :key="index">
        <slot :item="item"></slot>
      </template>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

