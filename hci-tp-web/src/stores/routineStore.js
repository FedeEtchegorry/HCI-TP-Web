import { ref } from 'vue'
import { defineStore } from 'pinia'
import {Routine, RoutineApi } from '@/api/routines'

export const useRoutineStore = defineStore('routine', () => {
    const routines = ref([]);

    async function add(routine) {
        const result = await RoutineApi.add(routine);
        await getAll()
        return Object.assign(new Routine(), result)
    }
    
    async function modify(routine) {
        const result = await RoutineApi.modify(routine)
        await getAll()
        return result
    }

    async function execute(routineId) {
        const result = await RoutineApi.execute(routineId)
        await getAll()
        return result
    }

    async function remove(id) {
        const result = await RoutineApi.remove(id)
        await getAll()
        return result
    }

    async function get(id) {
        const result = await RoutineApi.get(id);
        await getAll()
        return Object.assign(new Routine(), result);
    }

    async function getAll(controller = null) {
        let result = await RoutineApi.getAll(controller);
        result = result.map((routine) => Object.assign(new Routine(), routine));
        routines.value = result
        return result
    }

    return { routines, add, modify, execute, remove, get, getAll }
})
