import React, { useState } from 'react';
import Tabs from '../../components/ui/Tabs';
import PnpTheory from './PnpTheory';
import PnpVisualizer from './PnpVisualizer';

const PnpLayout = () => {
    const [activeTab, setActiveTab] = useState('theory');

    const tabs = [
        { id: 'theory', label: '9. Karmaşıklık Teorisi (P vs NP)' },
        { id: 'visualizer', label: 'TSP Simülasyonu' }
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            <div style={{ marginTop: '20px' }}>
                {activeTab === 'theory' ? <PnpTheory /> : <PnpVisualizer />}
            </div>
        </div>
    );
};

export default PnpLayout;
