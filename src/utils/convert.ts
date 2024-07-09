import {Actionmap, MappingDeviceOption, Mapping} from "./interfaces/Mapping.ts";
import {Device, DeviceOption, Input, PrefixIndex} from "./interfaces/Device.ts";
import {capitalize} from "../utils.ts";



/**
 * @param {Mapping} mapping - The mapping containing devices data.
 * @returns {Device[]} - The containing data fitted into an Array of Device
 */
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
            let deviceName = getDeviceName(mapping, deviceType, instance);
            if (deviceName === "") { // Use capitalized device type as name, if name was not found
                deviceName = capitalize(deviceType)
            }
            const deviceOptions: DeviceOption = {}
            const inputs: Input = {}
            returnValue[deviceCount] = {
                deviceName: deviceName,
                deviceType: deviceType,
                instance: instance,
                prefix: prefix,
                inputs: inputs,
                deviceOptions: deviceOptions
            }
            deviceCount++;
        }

    }

    const actionmaps = mapping.actionmap
    const deviceoptions = mapping.deviceoptions
    getInputs(returnValue, actionmaps)
    getDeviceOptions(returnValue, deviceoptions)

    return returnValue;
};
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * @param {Mapping} mapping - The mapping containing the name of respective device.
 * @param {string} deviceType - string containing the type of respective device.
 * @param {string} instance - string containing the instance of respective device.
 * @returns {string} - The name of respective device or empty string, if not found.
 */
const getDeviceName = (mapping: Mapping, deviceType: string, instance: string): string => {
    const options = mapping.options
    const indices = Object.entries(options)
    for (const index in indices){
        const option = options[index].attributes;
        if(option.type === deviceType && option.instance === instance) {
            //return option['Product']
            return option.Product.trim()
        }

    }
    return ""
}

/**
 * @param {Device[]} devices - An empty array of type Device to be filled by the function
 * @param {Actionmap[]} actionmaps - An array of action maps to be fitted into the given Device Array
 * @returns {void} - Does not return a value, but passes actionmaps into given array, if possible
 */
const getInputs = (devices: Device[], actionmaps: Array<Actionmap>): void => {
    if (actionmaps) {
        const prefixIndex: PrefixIndex = {};
        const inputs = new Array<Input>()

        for (const [index, entry] of Object.entries(devices)) {
            prefixIndex[entry.prefix] = index
            inputs[Number(index)] = {}
        }

        for (const [_, actionmap] of Object.entries(actionmaps)) {
            const category = actionmap.attributes.name

            for (const [_, action] of Object.entries(actionmap.action)) {

                const prefix = action.rebind[0].attributes.input.substring(0,
                    action.rebind[0].attributes.input.indexOf('_') + 1);
                const inputString =action.rebind[0].attributes.input.substring(
                    action.rebind[0].attributes.input.indexOf('_') + 1);

                // split multiple inputs
                const inputArray = inputString.split("+")
                for (const [_, input] of Object.entries(inputArray)) {
                    if (prefix in prefixIndex) {
                        const index = prefixIndex[prefix]
                        const actionName = action.attributes.name;
                        const mTap = action.rebind[0].attributes.multiTap;
                        const aMod = action.rebind[0].attributes.activationMode;
                        if (!inputs[Number(index)][input]) {
                            inputs[Number(index)][input] = {}
                        }
                        inputs[Number(index)][input][actionName] = {
                            category : category
                        }
                        if (aMod) inputs[Number(index)][input][actionName].activationmode = aMod
                        if (mTap) inputs[Number(index)][input][actionName].category = mTap
                        if (inputArray.length>1) inputs[Number(index)][input][actionName].inputSet = inputArray
                    }
                }
            }
        }
        for (const [index, _] of Object.entries(devices)) {
            devices[Number(index)].inputs = inputs[Number(index)];
        }
    }
    return;
}


/**
 * @param {Device[]} devices - An empty array of type Device to be filled by the function
 * @param {MappingDeviceOption[]} deviceoptions - An array of deviceoptions maps to be fitted into the given Device Array
 * @returns {void} - Does not return a value, but passes deviceoptions into given array, if possible
 */
const getDeviceOptions = (devices: Device[], deviceoptions: Array<MappingDeviceOption>): void => {
    if(deviceoptions) {
        const prefix: PrefixIndex = {};
        const nameIndex: PrefixIndex = {};
        const deviceOptions = new Array<DeviceOption>()
        for (const [_, mappingDeviceOption] of Object.entries(deviceoptions)) {
            for (const [index, entry] of Object.entries(devices)) {
                if (mappingDeviceOption.attributes.name.trim() === entry.deviceName) {
                    nameIndex[mappingDeviceOption.attributes.name.trim()] = index
                    prefix[mappingDeviceOption.attributes.name.trim()] = entry.prefix
                    deviceOptions[Number(index)] = {}
                }
                /* Since the device name is set to capitalized device type, if name was not found, this is not necessary.
                else {
                    if (mappingDeviceOption.attributes.name.trim() === capitalize(entry.deviceType)) {
                        nameIndex[mappingDeviceOption.attributes.name.trim()] = index
                        prefix[mappingDeviceOption.attributes.name.trim()] = entry.prefix
                        deviceOptions[Number(index)] = {}

                    }
                }*/
            }
            if (nameIndex[mappingDeviceOption.attributes.name.trim()]) {
                const index = nameIndex[mappingDeviceOption.attributes.name.trim()]
                for (const [_, option] of Object.entries(mappingDeviceOption.option)) {
                    const inputName = option.attributes.input
                    deviceOptions[Number(index)][inputName] = {}
                    if (option.attributes.deadzone) deviceOptions[Number(index)][inputName].deadzone = option.attributes.deadzone
                    if (option.attributes.saturation) deviceOptions[Number(index)][inputName].saturation = option.attributes.saturation
                    if (option.attributes.acceleration) deviceOptions[Number(index)][inputName].acceleration = option.attributes.acceleration
                }
            }
        }
        for (const [index, _] of Object.entries(devices)) {
            if (deviceOptions[Number(index)]) {
                devices[Number(index)].deviceOptions = deviceOptions[Number(index)];
            }
            else
            {
                devices[Number(index)].deviceOptions = {}
            }
        }
    }
    return;
}


/**
 * @param {string} device - The device type
 * @param {string} instance - The device instance
 * @returns {string} - The combined resulting prefix
 */
const getPrefix = (device: string, instance: string): string => {
    switch ( device ) {
        case "keyboard":
            return "kb".concat(instance).concat("_");
        case "mouse":
            return "mo".concat(instance).concat("_");
        case "joystick":
            return "js".concat(instance).concat("_");
        case "gamepad":
            return "gp".concat(instance).concat("_");
        default:
            return "unknown"
    }
}
