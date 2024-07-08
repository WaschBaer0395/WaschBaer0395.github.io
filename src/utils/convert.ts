import {Mapping} from "./interfaces/Mapping.ts";
import {Devices,Inputs} from "./interfaces/Devices.ts";


// @ts-ignore
export const getDevices = (mapping: Mapping): Array<Devices> => {
    let returnValue = new Array<Devices>()

    console.log("--- getDevices-Debug --- START")

    console.log(mapping['attributes']['profileName']) //Need to save that info somewhere too
    let devices = mapping['CustomisationUIHeader'][0].devices[0]
    let keys = Object.keys(devices)
    for (let index in keys){
        let device = keys[index];
        let instance = getInstance({obj: devices, key: device});
        let prefix = getPrefix(device)
        let inputs = getInputs(mapping, prefix, instance);
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
