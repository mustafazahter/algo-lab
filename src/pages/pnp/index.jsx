import React, { useState } from 'react';
import Tabs from '../../components/ui/Tabs';
import { PageHeader } from '../../components/ui/Common';
import PnpTheory from './PnpTheory';
import PnpVisualizer from './PnpVisualizer';

const PnpLayout = () => {
    const [activeTab, setActiveTab] = useState('theory');

    const tabs = [
        { id: 'theory', label: '9. Karmaşıklık Teorisi (P vs NP)' },
        { id: 'visualizer', label: 'TSP Simülasyonu' }
    ];

    return (
        <div>
            <PageHeader
                title="9. Karmaşıklık Teorisi (P vs NP)"
                subtitle="Bilgisayar bilimlerinin en derin problemlerinden biri olan P vs NP ve zor problemlerin dünyasına giriş yapın."
            />
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
