import React, { useState } from 'react';
import GraphTheory from './GraphTheory';
import MSTTheory from './MSTTheory';
import GraphVisualizer from './GraphVisualizer';
import Tabs from '../../components/ui/Tabs';
import { PageHeader } from '../../components/ui/Common';

const GraphAlgorithmsLayout = () => {
    const [activeTab, setActiveTab] = useState('theory');

    const tabs = [
        { id: 'theory', label: '1. Graf Teorisi' },
        { id: 'mst-theory', label: '2. Algoritmalar & Trace' },
        { id: 'visualizer', label: '3. MST Simülasyonu' }
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="7. Graf Algoritmaları"
                subtitle="Düğüm ve kenarlardan oluşan karmaşık ağ yapılarını ve en kısa yol/minimum yayılan ağaç problemlerini keşfedin."
            />
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            <div style={{ marginTop: '20px', minHeight: '600px' }}>
                {activeTab === 'theory' && <GraphTheory />}
                {activeTab === 'mst-theory' && <MSTTheory />}
                {activeTab === 'visualizer' && <GraphVisualizer />}
            </div>
        </div>
    );
};

export default GraphAlgorithmsLayout;
