import React, { useState } from 'react';
import Tabs from '../../components/ui/Tabs';
import { PageHeader } from '../../components/ui/Common';
import TreeTheory from './TreeTheory';
import TreeVisualizer from './TreeVisualizer';

const TreesLayout = () => {
    const [activeTab, setActiveTab] = useState('theory');

    const tabs = [
        { id: 'theory', label: '1. Ağaç & Heap Teorisi' },
        { id: 'visualizer', label: '2. İnteraktif Görselleştirici' }
    ];

    return (
        <div>
            <PageHeader
                title="8. Ağaçlar & Heap"
                subtitle="Hiyerarşik veri yapılarını ve bellek yönetiminde kritik rol oynayan Heap yapılarını inceleyin."
            />
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            <div style={{ marginTop: '20px' }}>
                {activeTab === 'theory' && <TreeTheory />}
                {activeTab === 'visualizer' && <TreeVisualizer />}
            </div>
        </div>
    );
};

export default TreesLayout;
