import React, { useState } from 'react';
import Tabs from '../../components/ui/Tabs';
import { Card, PageHeader } from '../../components/ui/Common';

import BruteForce from './BruteForce';
import DivideConquer from './DivideConquer';
import DynamicProgramming from './DynamicProgramming';
import Greedy from './Greedy';
import Recursion from './Recursion';
import Backtracking from './Backtracking';

const DesignLayout = () => {
    const [activeTab, setActiveTab] = useState('brute');

    const tabs = [
        { id: 'brute', label: '1. Brute Force' },
        { id: 'divide', label: '2. Divide & Conquer' },
        { id: 'dp', label: '3. Dynamic Programming' },
        { id: 'greedy', label: '4. Greedy' },
        { id: 'recursion', label: '5. Recursion' },
        { id: 'backtrack', label: '6. Backtracking' },
    ];

    return (
        <div>
            <PageHeader
                title="2. Tasarım Yöntemleri"
                subtitle="Problem çözme yaklaşımlarını ve farklı algoritma tasarım tekniklerini interaktif olarak inceleyin."
            />
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === 'brute' && <BruteForce />}
            {activeTab === 'divide' && <DivideConquer />}
            {activeTab === 'dp' && <DynamicProgramming />}
            {activeTab === 'greedy' && <Greedy />}
            {activeTab === 'recursion' && <Recursion />}
            {activeTab === 'backtrack' && <Backtracking />}
        </div>
    );
};

export default DesignLayout;
