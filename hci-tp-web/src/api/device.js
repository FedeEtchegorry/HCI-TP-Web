import { Api } from "./api";

class DeviceApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(device , controller) {
        return await Api.post(DeviceApi.getUrl(), device, controller);
    }

    static async addDeviceToRoom(roomId, deviceId, controller) {
        return await Api.post(RoomApi.getUrl(roomId + '/devices/' + deviceId), null, controller);
    }

    static async addDeviceWithRoom(device, roomId, controller){
        let result = await DeviceApi.add(device, controller);
        await DeviceApi.addDeviceToRoom(roomId, device.id, controller);
        return result;
    }

    static async execute(id, action, data, controller){
        return await Api.put(DeviceApi.getUrl(id + '/' + action), data, controller);
    }

    static async modify(device, controller) {
        return await Api.put(DeviceApi.getUrl(device.id), device, controller);
    }

    static async remove(id, controller) {
        return await Api.delete(DeviceApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(DeviceApi.getUrl(id), controller);
    }

    static async getAll(controller) {
        return await Api.get(DeviceApi.getUrl(), controller);
    }

}

//Clase padre de todos los dispositvos con informacion general menos el id especifico de cada tipo de dispostivo
class Device {
    constructor(name, meta) {
        this.name = name;
        this.type = new DeviceType();
        this.meta = new DeviceMeta();
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}

//============================Devices Soportados===============================
class Vacuum extends Device{
    constructor(...args) {
        super(...args)
        this.type.id = "ofglvd9gqx8yfl3l";
        this.meta.logo = 'mdi-vacuum'
    }
}

class Door extends Device{
    constructor(...args) {
        super(...args)
        this.type.id = "lsf78ly0eqrjbz91";
        this.meta.logo = 'mdi-door'
    }
}

class Refrigerator extends Device{
    constructor(...args) {
        super(...args)
        this.type.id = "rnizejqr2di0okho";
        this.meta.logo = 'mdi-fridge'
    }
}

class Blind extends Device{
    constructor(...args) {
        super(...args)
        this.type.id = "eu0v2xgprrhhg41g";
        this.meta.logo = 'mdi-blinds'
    }
}

class Alarm extends Device{
    constructor(... args){
        super(...args)
        this.type.id = "mxztsyjzsrq7iaqc";
        this.meta.logo = 'mdi-shield-lock'
    }
}

//------------------------------------Info de Device-----------------------------
class DeviceType {
    constructor(id, name, powerUsage) {
        this.id = id;
        this.name = name;
        this.powerUsage = powerUsage;
    }
}


class DeviceMeta {
    constructor(logo) {
        this.logo = logo;
    }
}

export { DeviceApi, Device, Vacuum, Alarm, Door, Refrigerator, Blind, DeviceMeta};