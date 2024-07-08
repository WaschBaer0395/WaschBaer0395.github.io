// the interface to represent the xml structure

export interface Mapping {
    ActionMaps: {
        attributes: {
            version: string
            optionsVersion: string
            rebindVersion: string
            profileName: string
        }
        CustomisationUIHeader: {
            attributes: {
                label: string
                description: string
                image: string
            }
            devices: {
                keyboard: {
                    attributes: {
                        instance: string
                    }
                }
                mouse: {
                    attributes: {
                        instance: string
                    }
                }
                joystick: Array<{
                    attributes: {
                        instance: string
                    }
                }>
            }
            categories: {
                category: Array<{
                    attributes: {
                        label: string
                    }
                }>
            }
        }
        deviceoptions: Array<{
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
        }>
        options: Array<{
            attributes: {
                type: string
                instance: string
                Product: string
            }
        }>
        actionmap: Array<{
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
        }>
    }
}