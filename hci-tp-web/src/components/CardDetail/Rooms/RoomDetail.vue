<template>
    <EmptyCard class="custom-empty-card" @click="">
        <v-card class=custom-card>
            <div class="custom-title">
                <h1>{{ room.name }}</h1>
            </div>
            <v-icon class="custom-icon" :icon="room.meta.icon"></v-icon>
            <div class="custom-qty-devices">
                <h2>DEVICES</h2>
            </div>
            <div >
                <h2>{{ qtyDevicesByRoom }}</h2>
            </div>
        </v-card>
    </EmptyCard>
</template>

<script setup>
import { useRoomStore } from '@/stores/roomStore';
import { ref, onMounted } from 'vue';

const props = defineProps({
    room: Object,
})

const roomStore = useRoomStore();

const myRoom = ref(props.room);
let qtyDevicesByRoom = ref(0);

onMounted(async () => {
   const result = await roomStore.getDevicesByRoom(myRoom.value.id);
   qtyDevicesByRoom.value = result.length;
});




</script>


<style scoped>
.custom-empty-card {
    background-color: rgb(var(--v-theme-primary_v));
}

.custom-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(var(--v-theme-primary_v));
    border: none;
    box-shadow: none;
    user-select: none;
}

.custom-title {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    padding: 1rem;
}

.custom-icon {
    font-size: 4rem;
    margin-top: 2.5rem;
}

.custom-qty-devices {
    padding-top: 3rem;
}

.custom-qty {

}

h2 {
    margin: 0;
    /* Elimina cualquier margen adicional alrededor del h2 */
    padding: 0;
    /* Ajusta el padding si es necesario */
}
</style>
