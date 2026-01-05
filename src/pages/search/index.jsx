import React, { useState } from 'react';
import Tabs from '../../components/ui/Tabs';
import { PageHeader } from '../../components/ui/Common';
import SearchVisualizer from './SearchVisualizer';
import SearchTheory from './SearchTheory';

const SearchLayout = () => {
    const [activeTab, setActiveTab] = useState('theory');

    const tabs = [
        { id: 'theory', label: '1. Algoritma Teorisi ve Notlar' },
        { id: 'visualizer', label: '2. Hazine Avı Simülasyonu' }
    ];

    return (
        <div>
            <PageHeader
                title="5. Arama Algoritmaları"
                subtitle="Veri kümeleri içinde belirli bir elemanı bulmak için kullanılan yöntemleri keşfedin."
            />
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            <div style={{ marginTop: '20px' }}>
                {activeTab === 'visualizer' && <SearchVisualizer />}
                {activeTab === 'theory' && <SearchTheory />}
            </div>
        </div>
    );
};

export default SearchLayout;
