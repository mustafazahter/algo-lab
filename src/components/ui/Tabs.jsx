import React from 'react';

const Tabs = ({ tabs, activeTab, onChange }) => {
    return (
        <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-light)',
            marginBottom: 'var(--space-xl)',
            overflowX: 'auto',
            gap: 'var(--space-sm)',
            paddingBottom: '2px'
        }}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        style={{
                            padding: 'var(--space-sm) var(--space-md)',
                            borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                            fontWeight: isActive ? 600 : 500,
                            fontSize: '0.95rem',
                            whiteSpace: 'nowrap',
                            transition: 'all var(--duration-fast)',
                            backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                            borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                            opacity: isActive ? 1 : 0.7
                        }}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
