// parseXML.ts
import { parseStringPromise, Builder } from 'xml2js';
import { Mapping } from './interfaces/Mapping.ts';

export const parseXML = async (xmlData: string): Promise<Mapping> => {
    try {
        const result = await parseStringPromise(xmlData, { mergeAttrs: false, attrkey:"attributes" });
        return result.ActionMaps as Mapping;
    } catch (error) {
        throw new Error('Failed to parse XML');
    }
};

export const convertToXML = (data: Mapping): string => {
    const builder = new Builder({ rootName: 'ActionMaps', attrkey:"attributes", headless: true });
    const xml = builder.buildObject(data);
    return xml;
};