import {ActionMaps} from "./interfaces/ActionMaps.ts";
import {Devices} from "./interfaces/Devices.ts";


// @ts-ignore
export const getDevices = (actionMap: ActionMaps): Array<Devices> => {
    let devices = new Array<Devices>()
    console.log("--- getDevices-Debug --- START")

    console.log(actionMap['attributes']['version'])

    console.log("--- getDevices-Debug --- END")
    return devices;
};
