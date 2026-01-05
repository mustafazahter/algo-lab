import React from 'react';
import { Card } from '../../components/ui/Common';
import { CornerDownRight } from 'lucide-react';

const FIVE_V = [
    { letter: 'V', word: 'ariety', title: 'Çeşitlilik', desc: 'Farklı veri tipleri: Yapısal (SQL), Yarı-Yapısal (JSON), Yapısal Olmayan (Log).', color: 'var(--primary)' },
    { letter: 'V', word: 'olume', title: 'Hacim', desc: 'Veri boyutunun devasa olması (Terabyte, Petabyte, Exabyte).', color: 'var(--accent)' },
    { letter: 'V', word: 'elocity', title: 'Hız', desc: 'Verinin üretim ve işlenme hızı. (Streaming data, IOT).', color: 'var(--success)' },
    { letter: 'V', word: 'eracity', title: 'Doğruluk', desc: 'Verinin güvenilirliği, temizliği ve tutarlılığı.', color: 'var(--warning)' },
    { letter: 'V', word: 'alue', title: 'Değer', desc: 'İşlenen veriden anlamlı bilgi ve ekonomik kazanç elde edilmesi.', color: 'var(--danger)' }
];

const BigData = () => {
    return (
        <div className="animate-fade-in">
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <div style={{ padding: '10px', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <CornerDownRight size={24} />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>1.3. Büyük Veri (Big Data)</h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>5V Kuralı: Modern dünyada büyük veriyi tanımlayan 5 temel bileşen.</p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {FIVE_V.map((item, idx) => (
                    <Card key={idx} className="hover-scale" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-lg)',
                        borderLeft: `4px solid ${item.color}`
                    }}>
                        <div style={{
                            fontSize: '3rem',
                            fontWeight: '900',
                            color: item.color,
                            width: '120px',
                            textAlign: 'center',
                            lineHeight: 1
                        }}>
                            {item.letter}
                            <span style={{ fontSize: '1rem', fontWeight: '400', display: 'block', color: 'var(--text-secondary)' }}>{item.word}</span>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-xs)' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{item.desc}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BigData;
