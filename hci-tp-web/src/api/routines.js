import { Api } from "./api";

class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ""}`;
    }

    static async add(routine, controller) {
        return await Api.post(RoutineApi.getUrl(), routine, controller);
    }

    static async modify(routine, controller) {
        return await Api.put(RoutineApi.getUrl(routine.id), routine, controller);
    }

    static async remove(id, controller) {
        return await Api.delete(RoutineApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(RoutineApi.getUrl(id), controller);
    }

    static async getAll(controller) {
        return await Api.get(RoutineApi.getUrl(), controller);
    }
}

class Routine {
    constructor() {
      
    }
    toString() {
        return JSON.stringify(this, null, 2);
    }
}
class RoutineMeta {
    constructor() {
       //Agregar informacion extra si se desea
    }
}
export { RoutineApi, Routine, RoutineMeta };
