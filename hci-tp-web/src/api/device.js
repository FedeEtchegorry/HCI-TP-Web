import { Api } from "./api";

class DeviceApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(device , controller) {
        return await Api.post(DeviceApi.getUrl(), device, controller);
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
        this.id = undefined;
        this.name = name;
        this.type = new DeviceType();
        this.state = new DeviceState();
        this.meta = meta;
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}

class Vacuum extends Device{
    constructor(...args) {
        super(...args)
        this.type.id = ofglvd9gqx8yfl3l;
    }
}

class Door extends Device{
    constructor(...args) {
        super(...args)
        this.type.id = lsf78ly0eqrjbz91;
    }
}

class Refrigerator extends Device{
    constructor(...args) {
        super(...args)
        this.type.id = rnizejqr2di0okho;
    }
}

class Blind extends Device{
    constructor(...args) {
        super(...args)
        this.type.id = eu0v2xgprrhhg41g;
    }
}

class DeviceType {
    constructor(id, name, powerUsage) {
        this.id = id;
        this.name = name;
        this.powerUsage = powerUsage;
    }
}

class DeviceState {
    constructor(status, color, brightness) {
        this.status = status;
        this.color = color;
        this.brightness = brightness;
    }
}

class DeviceMeta {
    constructor() {
        //json con informacion extra acerca del dispositivo
    }
}

export { DeviceApi, Vacuum, Door, Refrigerator, Blind, DeviceMeta};