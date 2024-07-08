// parseXML.ts
import { parseStringPromise, Builder } from 'xml2js';
import { ActionMaps } from './interfaces/ActionMaps.ts';

export const parseXML = async (xmlData: string): Promise<ActionMaps> => {
    try {
        const result = await parseStringPromise(xmlData, { mergeAttrs: false, attrkey:"attributes" });
        return result.ActionMaps as ActionMaps;
    } catch (error) {
        throw new Error('Failed to parse XML');
    }
};

export const convertToXML = (data: ActionMaps): string => {
    const builder = new Builder({ rootName: 'ActionMaps', attrkey:"attributes", headless: true });
    const xml = builder.buildObject(data);
    return xml;
};