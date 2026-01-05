import React, { useState } from 'react';
import Tabs from '../../components/ui/Tabs';
import Asymptotic from './Asymptotic';
import Classes from './Classes';

const ComplexityLayout = () => {
    const [activeTab, setActiveTab] = useState('asymptotic');

    const tabs = [
        { id: 'asymptotic', label: '1. Asimptotik Notasyonlar' },
        { id: 'classes', label: '2. Karmaşıklık Sınıfları' },
    ];

    return (
        <div>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === 'asymptotic' && <Asymptotic />}
            {activeTab === 'classes' && <Classes />}
        </div>
    );
};

export default ComplexityLayout;
