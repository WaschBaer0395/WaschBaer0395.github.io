import {Mapping} from "./interfaces/Mapping.ts";
import {Devices,Inputs} from "./interfaces/Devices.ts";


/* eslint-enable @typescript-eslint/no-unused-vars */
export const getDevices = (mapping: Mapping): Array<Devices> => {
    /*
        meta info that is not preserved here:
        mapping.attributes
        mapping['CustomisationUIHeader'][0].attributes
        mapping['CustomisationUIHeader'][0].categories
        mapping['modifiers'] // <- this one is strange,
     */
    const returnValue = new Array<Devices>()
    console.log("--- getDevices-Debug --- START")
    console.log("Mapping: ",mapping)
    const devices = mapping['CustomisationUIHeader'][0].devices[0]
    let count = 0
    //for (const deviceType in devices){
    for (const [deviceType, subDevices] of Object.entries(devices)) {
        for (const [_, subDevice] of Object.entries(subDevices)) {
            const instance = subDevice.attributes.instance;
            const prefix = getPrefix(deviceType, instance)
            const deviceName = getDeviceName(mapping, deviceType, instance);
            const inputs = getInputs(mapping, prefix, instance);
            returnValue[count] = {
                deviceName: deviceName,
                deviceType: deviceType,
                instance: instance,
                prefix: prefix,
                inputs: inputs
            }
            count++;
        }

    }

    console.log("--- getDevices-Debug --- END")
    console.log("getDevices(mapping): ",returnValue)
    return returnValue;
};
/* eslint-enable @typescript-eslint/no-unused-vars */

const getDeviceName = (mapping: Mapping, deviceType: string, instance: string): string => {
    const options = mapping['options']
    const indices = Object.entries(options)
    for (const index in indices){
        const option = options[index]['attributes'];
        if(option['type'] === deviceType && option['instance'] === instance) {
            return option['Product']
        }
    }
    return ""
}

const getInputs = (mapping: Mapping, prefix: string, instance: string): Inputs[] => {
    console.log(mapping,prefix,instance)
    // TODO
    return []
}


const getPrefix = (device: string, instance: string): string => {
    switch ( device ) {
        case "keyboard":
            return "kb".concat(instance).concat("_");
        case "mouse":
            return "mo".concat(instance).concat("_");
        case "joystick":
            return "js".concat(instance).concat("_");
        default:
            return "unknown"
    }
}
