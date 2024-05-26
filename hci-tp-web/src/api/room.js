import { Api } from "./api";

class RoomApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/rooms${slug ? `/${slug}` : ""}`;
    }

    static async add(room, controller) {
        return await Api.post(RoomApi.getUrl(), room, controller);
    }


    static async modify(room, controller) {
        return await Api.put(RoomApi.getUrl(room.id), room, controller);
    }

    static async remove(id, controller) {
        return await Api.delete(RoomApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(RoomApi.getUrl(id), controller);
    }

    static async addDeviceToRoom(roomId, deviceId, controller) {
        return await Api.post(RoomApi.getUrl(roomId + '/devices/' + deviceId), null, controller);
    }
    static async removeDeviceFromRoom(deviceId, controller) {
        return await Api.delete(RoomApi.getUrl('devices/' + deviceId), controller);
    }

    static async getDevicesByRoom(roomId, controller){
        return await Api.get(RoomApi.getUrl(roomId + '/devices'),controller);
    }

    static async getAll(controller) {
        return await Api.get(RoomApi.getUrl(), controller);
    }
}

class Room {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.meta = meta;
    }
    toString() {
        return JSON.stringify(this, null, 2);
    }
}
class RoomMeta {
    constructor(logo) {
        this.logo = logo;
    }
}
export { RoomApi, Room, RoomMeta };
