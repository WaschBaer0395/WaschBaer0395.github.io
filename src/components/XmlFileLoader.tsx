// src/components/XmlFileLoader.tsx
import React, {useState} from 'react'
import {Mapping} from '../utils/interfaces/Mapping.ts'
import {convertToXML, parseXML} from '../utils/parseXML.ts';
import {Device} from "../utils/interfaces/Device.ts";
import {parseDevices} from "../utils/convert.ts";


const XmlFileLoader: React.FC = () => {
    const [data, setData] = useState<Mapping | null>(null)
    const [error, setError] = useState<string | null>(null)


    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [devices, setDevices] = useState<Device[]>([])


    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const fileText = await file.text();
                const parsedData =  await parseXML(fileText)
                setData(parsedData);
                setDevices(parseDevices(parsedData));
                while(devices.length)
                    console.log("Devices: ",devices)

            } catch (err) {
                setError('Failed to parse XML');
            }
        }
    };


    const handleDownload = () => {
        if (data) {
            const xml = convertToXML(data);
            const blob = new Blob([xml], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'converted_file.xml';
            a.click();
            URL.revokeObjectURL(url);
        }
    };
    /* eslint-enable @typescript-eslint/no-unused-vars */


    return (
        <div>
            <h1>Upload XML File</h1>
            <input type="file" onChange={handleFileUpload} accept=".xml" />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={handleDownload}>Download XML</button>
        </div>
    )
}

export default XmlFileLoader