import {Mapping} from "./interfaces/Mapping.ts";
import {Devices,Inputs} from "./interfaces/Devices.ts";


/* eslint-enable @typescript-eslint/no-unused-vars */
export const getDevices = (mapping: Mapping): Array<Devices> => {
    const returnValue = new Array<Devices>()

    console.log("--- getDevices-Debug --- START")

    console.log(mapping['attributes']['profileName']) //Need to save that info somewhere too
    const devices = mapping['CustomisationUIHeader'][0].devices[0]
    const keys = Object.keys(devices)
    for (const index in keys){
        const device = keys[index];
        const instance = getInstance({obj: devices, key: device});
        const prefix = getPrefix(device)
        const inputs = getInputs(mapping, prefix, instance);
        returnValue[index] = {
            deviceName: keys[index],
            inputs: inputs,
            instance: instance,
            prefix: getPrefix(device)
        }
    }

    console.log("--- getDevices-Debug --- END")

    return returnValue;
};
/* eslint-enable @typescript-eslint/no-unused-vars */

const getInputs = (mapping: Mapping, prefix: string, instance: number): Inputs[] => {
    console.log(mapping,prefix,instance)
    // TODO
    return []
}

const getInstance = ({obj, key}: { obj: any, key: string }): number => {
    return obj[key][0]['attributes']['instance'];
}

const getPrefix = (device: string): string => {
    switch ( device ) {
        case "keyboard":
            return "k"
        case "mouse":
            return "m"
        case "joystick":
            return "js"
        default:
            return "unknown"
    }
}
