export interface Devices{
    instance: number,
    prefix: string,
    deviceName: string,
    inputs: Inputs[], // 0-135

}
export interface Inputs{
    name: string,
    activationmode?: string
    multitap?: string
}