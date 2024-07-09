export interface Device {
    deviceName: string,
    deviceType: string,
    instance: string,
    prefix: string,
    inputs: Input | { }, // 0-135
    deviceOptions: DeviceOption | { }
}

export interface Input {
    [input: string]: {
        [action: string]: {
            category: string,
            activationmode?: string,
            multitap?: string
            inputSet?: Array<string>
        }
    }
}

export interface DeviceOption {
    [input: string]: {
        deadzone?: string,
        saturation?: string,
        acceleration?: string
    }
}

export interface PrefixIndex {
    [prefix: string]: string;
}