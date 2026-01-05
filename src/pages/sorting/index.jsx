import React, { useState } from 'react';
import Tabs from '../../components/ui/Tabs';
import SortVisualizer from './SortVisualizer';
import SortTheory from './SortTheory';
import SortRace from './SortRace';

const SortingLayout = () => {
    const [activeTab, setActiveTab] = useState('theory'); // Teori öncelikli

    const tabs = [
        { id: 'theory', label: '1. Teori & Notlar' },
        { id: 'visualizer', label: '2. Simülasyon' },
        { id: 'race', label: '3. Algoritma Yarışı (VS)' }
    ];

    return (
        <div>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            <div style={{ marginTop: '20px' }}>
                {activeTab === 'visualizer' && <SortVisualizer />}
                {activeTab === 'theory' && <SortTheory />}
                {activeTab === 'race' && <SortRace />}
            </div>
        </div>
    );
};

export default SortingLayout;
