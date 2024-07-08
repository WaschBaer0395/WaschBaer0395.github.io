// parseXML.ts
import { parseStringPromise, Builder } from 'xml2js';
import { ActionMaps } from './Mapping.ts';

const cleanParsedData = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) return obj;

    if (Array.isArray(obj)) {
        return obj.map(cleanParsedData);
    }

    const cleanedObj: any = {};
    for (const key in obj) {
        if (key === '_attributes') {
            Object.assign(cleanedObj, obj[key]);
        } else {
            cleanedObj[key] = cleanParsedData(obj[key]);
        }
    }

    return cleanedObj;
};

export const parseXML = async (xmlData: string): Promise<ActionMaps> => {
    try {
        const result = await parseStringPromise(xmlData, { mergeAttrs: true });
        return cleanParsedData(result.ActionMaps) as ActionMaps;
    } catch (error) {
        throw new Error('Failed to parse XML');
    }
};

export const convertToXML = (data: ActionMaps): string => {
    const builder = new Builder({ rootName: 'ActionMaps', headless: true });
    const xml = builder.buildObject(data);
    return xml;
};