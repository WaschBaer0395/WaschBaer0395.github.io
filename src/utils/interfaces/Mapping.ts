// the interface to represent the xml structure

export interface Mapping {
    attributes: {
        version: string
        optionsVersion: string
        rebindVersion: string
        profileName: string
    }
    CustomisationUIHeader: Array<{
        attributes: {
            label: string
            description: string
            image: string
        }
        devices: Array<{
            keyboard: Array<{
                attributes: {
                    instance: string
                }
            }>
            mouse: Array<{
                attributes: {
                    instance: string
                }
            }>
            joystick: Array<{
                attributes: {
                    instance: string
                }
            }>
        }>
        categories: {
            category: Array<{
                attributes: {
                    label: string
                }
            }>
        }
    }>
    deviceoptions: Array<MappingDeviceOption>
    options: Array<{
        attributes: {
            type: string
            instance: string
            Product: string
        }
    }>
    actionmap: Array<Actionmap>
}

export interface MappingDeviceOption {
    attributes: {
        name: string
    }
    option: Array<{
        attributes: {
            input: string
            deadzone?: string
            saturation?: string
            acceleration?: string
        }
    }>
}

export interface Actionmap {
    attributes: {
        name: string
    }
    action: Array<{
        attributes: {
            name: string
        }
        rebind: Array<{
            attributes: {
                input: string
                activationMode?: string
                multiTap?: string
            }
        }>
    }>
}