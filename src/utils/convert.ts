import {Actionmap, Mapping} from "./interfaces/Mapping.ts";
import {Device, Input, PrefixIndex} from "./interfaces/Device.ts";


/* eslint-enable @typescript-eslint/no-unused-vars */
export const parseDevices = (mapping: Mapping): Array<Device> => {
    /*
        meta info that is not preserved here:
        mapping.attributes
        mapping['CustomisationUIHeader'][0].attributes
        mapping['CustomisationUIHeader'][0].categories
        mapping['modifiers'] // <- this one is strange,
     */
    const returnValue = new Array<Device>()

    const devices = mapping['CustomisationUIHeader'][0].devices[0]
    let deviceCount = 0
    //for (const deviceType in devices){
    for (const [deviceType, subDevices] of Object.entries(devices)) {
        for (const [_, subDevice] of Object.entries(subDevices)) {
            const instance = subDevice.attributes.instance;
            const prefix = getPrefix(deviceType, instance)
            const deviceName = getDeviceName(mapping, deviceType, instance);
            const inputs: Input = {}
            returnValue[deviceCount] = {
                deviceName: deviceName,
                deviceType: deviceType,
                instance: instance,
                prefix: prefix,
                inputs: inputs
            }
            deviceCount++;
        }

    }

    const  actionmaps = mapping.actionmap
    getInputs(returnValue,actionmaps)

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

const getInputs = (devices: Device[], actionmaps: Array<Actionmap>): void => {

    const prefixIndex: PrefixIndex = {};
    const inputs = new Array<Input>()

    for (const [index, entry] of Object.entries(devices)) {
        prefixIndex[entry.prefix] = index
        inputs[Number(index)] = {}
    }

    for (const [_, actionmap] of Object.entries(actionmaps)) {
        const category = actionmap.attributes.name

        for (const [_, action] of Object.entries(actionmap.action)) {

            const input = action.rebind[0].attributes.input;
            const prefix = input.substring(0,input.indexOf('_') + 1);
            if (prefix in prefixIndex) {
                const inputName = input.substring(input.indexOf('_') + 1);
                const index = prefixIndex[prefix]
                const actionName = action.attributes.name;
                const mTap = action.rebind[0].attributes.multiTap;
                const aMod = action.rebind[0].attributes.activationMode;
                if(!inputs[Number(index)][inputName]){
                    inputs[Number(index)][inputName] = {}
                }
                inputs[Number(index)][inputName][actionName] = {
                    category: category,
                    activationmode: aMod,
                    multitap: mTap
                }
            }
        }
    }
    for (const [index, _] of Object.entries(devices)) {
        devices[Number(index)].inputs = inputs[Number(index)];
    }
    return;
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
