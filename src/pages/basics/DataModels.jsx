import React, { useState } from 'react';
import { Card, PageHeader } from '../../components/ui/Common';

const MODELS = [
    {
        id: 'hierarchical',
        title: 'Sıradüzensel (Hiyerarşik)',
        desc: 'Bir ata (parent) - çok çocuk (child) ilişkisi. Ağaç yapısıdır.',
        detail: 'En eski modeldir. Verilere yukarıdan aşağıya (kökten yaprağa) erişilir. Dosya sistemleri buna örnektir.',
        visual: (
            <svg width="200" height="150" viewBox="0 0 200 150">
                <circle cx="100" cy="20" r="15" fill="var(--primary)" />
                <circle cx="60" cy="80" r="15" fill="var(--bg-card)" stroke="var(--primary)" strokeWidth="2" />
                <circle cx="140" cy="80" r="15" fill="var(--bg-card)" stroke="var(--primary)" strokeWidth="2" />
                <circle cx="40" cy="130" r="10" fill="var(--bg-card)" stroke="var(--text-secondary)" />
                <circle cx="80" cy="130" r="10" fill="var(--bg-card)" stroke="var(--text-secondary)" />
                {/* Lines */}
                <line x1="100" y1="35" x2="60" y2="65" stroke="var(--text-secondary)" />
                <line x1="100" y1="35" x2="140" y2="65" stroke="var(--text-secondary)" />
                <line x1="60" y1="95" x2="40" y2="120" stroke="var(--text-secondary)" />
                <line x1="60" y1="95" x2="80" y2="120" stroke="var(--text-secondary)" />
            </svg>
        )
    },
    {
        id: 'network',
        title: 'Ağ (Network) Modeli',
        desc: 'Çoklu ebeveyn ilişkisine izin verir. Esnek yapıdadır.',
        detail: 'Hiyerarşik modelin kısıtlamalarını (tek ebeveyn) aşmak için geliştirilmiştir. Graf yapısındadır.',
        visual: (
            <svg width="200" height="150" viewBox="0 0 200 150">
                <circle cx="100" cy="20" r="15" fill="var(--primary)" />
                <circle cx="50" cy="70" r="15" fill="var(--accent)" />
                <circle cx="150" cy="70" r="15" fill="var(--bg-card)" stroke="var(--primary)" strokeWidth="2" />
                <circle cx="100" cy="130" r="15" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="2" />

                <line x1="100" y1="35" x2="50" y2="55" stroke="var(--text-secondary)" />
                <line x1="100" y1="35" x2="150" y2="55" stroke="var(--text-secondary)" />
                <line x1="50" y1="85" x2="100" y2="115" stroke="var(--text-secondary)" />
                <line x1="150" y1="85" x2="100" y2="115" stroke="var(--text-secondary)" />
                <line x1="50" y1="70" x2="150" y2="70" stroke="var(--text-secondary)" strokeDasharray="4" />
            </svg>
        )
    },
    {
        id: 'relational',
        title: 'İlişkisel (Relational)',
        desc: 'Veriler tablolar (satır/sütun) halindedir. Standarttır.',
        detail: 'SQL veritabanlarının temelidir. Veriler "primary key" ve "foreign key" ile birbirine bağlanır.',
        visual: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%', alignItems: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', width: '80%' }}>
                    {[1, 2, 3].map(i => <div key={i} style={{ height: '20px', background: 'var(--primary)', opacity: 0.8, borderRadius: '2px' }} />)}
                </div>
                {[1, 2, 3].map(row => (
                    <div key={row} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', width: '80%' }}>
                        {[1, 2, 3].map(col => <div key={col} style={{ height: '20px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '2px' }} />)}
                    </div>
                ))}
            </div>
        )
    },
    {
        id: 'object',
        title: 'Nesneye Yönelik (O-O)',
        desc: 'Veri + Metot bir aradadır (Sınıf/Nesne).',
        detail: 'Miras alma (Inheritance), Kapsülleme (Encapsulation) gibi özellikler barındırır.',
        visual: (
            <div style={{ position: 'relative', width: '100%', height: '150px' }}>
                <div style={{ position: 'absolute', top: 10, left: 40, width: '100px', height: '100px', border: '2px solid var(--primary)', borderRadius: '8px', padding: '10px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold' }}>CLASS Araba</div>
                    <div style={{ width: '100%', height: '1px', background: 'var(--primary)', margin: '5px 0' }} />
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>- renk<br />- model</div>
                    <div style={{ width: '100%', height: '1px', background: 'var(--border-light)', margin: '5px 0' }} />
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>+ sür()<br />+ dur()</div>
                </div>
                <div style={{ position: 'absolute', top: 30, left: 80, width: '100px', height: '100px', border: '2px solid var(--accent)', borderRadius: '8px', background: 'var(--bg-glass)', zIndex: 2 }}>
                </div>
            </div>
        )
    }
];

const DataModels = () => {
    return (
        <div className="animate-fade-in">
            <PageHeader
                title="1.2 Veri Modelleri"
                subtitle="Verinin organize edilmesi ve saklanması için kullanılan 4 temel yapı."
            />

            <div className="grid-responsive">
                {MODELS.map((model) => (
                    <Card key={model.id} className="hover-scale" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ height: '160px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
                            {model.visual}
                        </div>
                        <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-xs)' }}>{model.title}</h3>
                        <p style={{ marginBottom: 'var(--space-sm)', fontWeight: 500 }}>{model.desc}</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{model.detail}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DataModels;
