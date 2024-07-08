export interface Devices{
    deviceName: string,
    deviceType: string,
    instance: string,
    prefix: string,
    inputs: Inputs[], // 0-135

}
export interface Inputs{
    name: string,
    activationmode?: string
    multitap?: string
}