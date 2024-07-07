// the interfaces to represent the xml structure

export interface Mapping {
    ActionMaps: ActionMaps;
}

export interface ActionMaps {
    CustomisationUIHeader: CustomisationUIHeader;
    deviceoptions:         Deviceoption[];
    options:               ActionMapsOption[];
    modifiers:             string;
    actionmap:             Actionmap[];
    _version:              string;
    _optionsVersion:       string;
    _rebindVersion:        string;
    _profileName:          string;
}

export interface CustomisationUIHeader {
    devices:      Devices;
    categories:   Categories;
    _label:       string;
    _description: string;
    _image:       string;
}

export interface Categories {
    category: Category[];
}

export interface Category {
    _label: string;
}

export interface Devices {
    keyboard: Keyboard;
    mouse:    Keyboard;
    joystick: Keyboard[];
}

export interface Keyboard {
    _instance: string;
}

export interface Actionmap {
    action: ActionElement[] | PurpleAction;
    _name:  string;
}

export interface ActionElement {
    rebind: RebindElement[] | PurpleRebind;
    _name:  string;
}

export interface RebindElement {
    _input:           string;
    _activationMode?: ActivationMode;
}

export enum ActivationMode {
    DoubleTap = "double_tap",
    Press = "press",
}

export interface PurpleRebind {
    _input:           string;
    _multiTap?:       string;
    _activationMode?: ActivationMode;
}

export interface PurpleAction {
    rebind: ActionRebindClass;
    _name:  string;
}

export interface ActionRebindClass {
    _input:     string;
    _multiTap?: string;
}

export interface Deviceoption {
    option: DeviceoptionOption[];
    _name:  string;
}

export interface DeviceoptionOption {
    _input:         string;
    _deadzone?:     string;
    _saturation?:   string;
    _acceleration?: string;
}

export interface ActionMapsOption {
    _type:     string;
    _instance: string;
    _Product:  string;
}
