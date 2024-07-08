export interface Devices{
    instance: string,
    prefix: string,
    deviceName: string,
    inputs: Inputs[], // 0-135

}
interface Inputs{
    name: string,
    activationmode?: string
    multitap?: string
}