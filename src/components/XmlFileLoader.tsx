// src/components/XmlFileLoader.tsx
import React, {useState} from 'react'
import xmlJs from 'xml-js';

interface Mapping {
    ActionMaps: {
        version: string
        optionsVersion: string
        rebindVersion: string
        profileName: string
        CustomisationUIHeader: {
            label: string
            description: string
            image: string
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
            name: string
            option: Array<{
                input: string
                deadzone?: string
                saturation?: string
                acceleration?: string
            }>
        }>
        options: Array<{
            type: string
            instance: string
            Product: string
        }>
        actionmap: Array<{
            name: string
            action: Array<{
                name: string
                rebind: Array<{
                    input: string
                    activationMode?: string
                    multiTap?: string
                }>
            }>
        }>
    }
}

const XmlFileLoader: React.FC = () => {
    const [xmlData, setXmlData] = useState<Mapping | null>(null)

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const text = await file.text() // Read file content as text
            const jsonData = xmlJs.xml2js(text, { compact: true }) as Mapping
            setXmlData(jsonData)
            console.log(xmlData)
        } catch (error) {
            console.error('Error parsing XML file:', error)
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept=".xml" />
            {xmlData ? (
                <div>
                    {/* */}
                    <pre>{JSON.stringify(xmlData, null, 2)}</pre>
                </div>
            ) : (
                <div>No XML file uploaded yet.</div>
            )}
        </div>
    )
}

export default XmlFileLoader