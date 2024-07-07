// src/components/XmlFileLoader.tsx
import React from 'react';
import {
    Mapping,
} from './Mapping.ts';


interface XmlFileLoaderProps {
    onMappingLoaded: (mapping: Mapping) => void;
}

const XmlFileLoader: React.FC<XmlFileLoaderProps> = () => {


    return (
         <div>
             <input type="file" accept=".xml" />
         </div>
     );
};

export default XmlFileLoader;