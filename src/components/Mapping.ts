// the interface to represent the xml structure

export interface Mapping {
    ActionMaps: {
        _version: string
        _optionsVersion: string
        _rebindVersion: string
        _profileName: string
        CustomisationUIHeader: {
            _label: string
            _description: string
            _image: string
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
            _name: string
            option: Array<{
                _input: string
                _deadzone?: string
                _saturation?: string
                _acceleration?: string
            }>
        }>
        options: Array<{
            _type: string
            _instance: string
            _Product: string
        }>
        actionmap: Array<{
            _name: string
            action: Array<{
                _name: string
                rebind: Array<{
                    _input: string;
                    _activationMode?: string
                    _multiTap?: string
                }>
            }>
        }>
    }
}

