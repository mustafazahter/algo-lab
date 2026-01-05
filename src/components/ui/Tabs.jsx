import React, { useState, useEffect } from 'react';

const Tabs = ({ tabs, activeTab, onChange }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mobilde label'ları kısalt
    const formatLabel = (label) => {
        if (!isMobile) return label;

        // "1. Brute Force" -> "1. Brute Force"
        // "2. Divide & Conquer" -> "2. D&C"
        // Uzun isimleri kısalt
        return label
            .replace('Divide & Conquer', 'D&C')
            .replace('Dynamic Programming', 'DP')
            .replace('Backtracking', 'Backtrack')
            .replace('Recursion', 'Recurs.');
    };

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            borderBottom: '1px solid var(--border-light)',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            overflowX: 'auto',
            overflowY: 'hidden',
            gap: 'clamp(4px, 1vw, 8px)',
            paddingBottom: '2px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--border-light) transparent',
            msOverflowStyle: '-ms-autohiding-scrollbar'
        }}
            className="tabs-container"
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        style={{
                            padding: 'clamp(6px, 1.5vw, 8px) clamp(10px, 2.5vw, 16px)',
                            borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                            fontWeight: isActive ? 600 : 500,
                            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                            whiteSpace: 'nowrap',
                            transition: 'all var(--duration-fast)',
                            backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                            borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                            opacity: isActive ? 1 : 0.7,
                            flexShrink: 0,
                            cursor: 'pointer',
                            border: 'none',
                            outline: 'none'
                        }}
                        title={isMobile ? tab.label : undefined}
                    >
                        {formatLabel(tab.label)}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
