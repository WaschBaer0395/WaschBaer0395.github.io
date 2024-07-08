// the interface to represent the xml structure

export interface ActionMaps {
    version: string
    optionsVersion: string
    rebindVersion: string
    profileName: string
    CustomisationUIHeader: {
        label: string
        description: string
        image: string
        devices: {
            keyboard: {
                _instance: string
            }
            mouse: {
                _instance: string
            }
            joystick: Array<{
                _instance: string
            }>
        }
        categories: {
            category: Array<{
                _label: string
            }>
        }
    }
    deviceoptions: Array<{
        name: string
        option: Array<{
            input: string
            deadzone?: string
            saturation?: string
            acceleration?: string
        }>
    }>
    options: Array<{
        type: string
        instance: string
        Product: string
    }>
    actionmap: Array<{
        name: string
        action: Array<{
            name: string
            rebind: Array<{
                input: string
                activationMode?: string
                multiTap?: string
            }>
        }>
    }>
}