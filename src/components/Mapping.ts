// the interface to represent the xml structure

export interface ActionMaps {
    _attributes: {
        version: string
        optionsVersion: string
        rebindVersion: string
        profileName: string
    }
    CustomisationUIHeader: {
        _attributes: {
            label: string
            description: string
            image: string
        }
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
        _attributes: {
            name: string
        }
        option: Array<{
            _attributes: {
                input: string
                deadzone?: string
                saturation?: string
                acceleration?: string
            }
        }>
    }>
    options: Array<{
        _attributes: {
            type: string
            instance: string
            Product: string
        }
    }>
    actionmap: Array<{
        _attributes: {
            name: string
        }
        action: Array<{
            _attributes: {
                name: string
            }
            rebind: Array<{
                _attributes: {
                    input: string
                    activationMode?: string
                    multiTap?: string
                }
            }>
        }>
    }>
}