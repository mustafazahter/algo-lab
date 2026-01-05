import React, { useState } from 'react';
import Tabs from '../../components/ui/Tabs';
import AlgorithmProperties from './AlgorithmProperties';
import DataModels from './DataModels';
import BigData from './BigData';

const BasicsLayout = () => {
    const [activeTab, setActiveTab] = useState('algo');

    const tabs = [
        { id: 'algo', label: '1.1 Algoritma Özellikleri' },
        { id: 'models', label: '1.2 Veri Modelleri' },
        { id: 'bigdata', label: '1.3 Big Data (5V)' },
    ];

    return (
        <div>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === 'algo' && <AlgorithmProperties />}
            {activeTab === 'models' && <DataModels />}
            {activeTab === 'bigdata' && <BigData />}
        </div>
    );
};

export default BasicsLayout;
