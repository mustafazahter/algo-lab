import React, { useState } from 'react';
import { Card, PageHeader, Badge } from '../../components/ui/Common';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { ChevronsUp, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

const Classes = () => {
    // 3.2. Karmaşıklık Sınıfları (Küçükten Büyüğe Sıralama) - 10 MADDE
    const data = [
        { name: 'O(1)', val: 1, type: 'best', desc: 'Sabit', detail: 'Veri artsa da süre değişmez. (Örn: Diziden eleman çekmek)' },
        { name: 'O(log n)', val: 3, type: 'good', desc: 'Logaritmik', detail: 'Veri ikiye katlansa bile işlem 1 artar. (Örn: Binary Search)' },
        { name: 'O(log^k n)', val: 5, type: 'good', desc: 'Polilogaritmik', detail: 'Logaritmanın kuvveti.' },
        { name: 'O(n)', val: 10, type: 'fair', desc: 'Lineer', detail: 'Veriyle birebir artar. (Örn: Döngü)' },
        { name: 'O(n log n)', val: 33, type: 'fair', desc: 'Lineer-Log', detail: 'Sıralama algoritmalarının standardı. (Örn: Merge Sort)' },
        { name: 'O(n²)', val: 100, type: 'poor', desc: 'Karesel', detail: 'İç içe iki döngü. Tehlikeli alan başlangıcı.' },
        { name: 'O(n^k)', val: 150, type: 'poor', desc: 'Polinom', detail: 'Daha yüksek dereceli döngüler.' },
        { name: 'O(2ⁿ)', val: 500, type: 'bad', desc: 'Üssel', detail: 'Veri her adımda ikiye katlanır. Çözülemez hale gelir.' },
        { name: 'O(n!)', val: 720, type: 'worst', desc: 'Faktöriyel', detail: 'Olasılıkların permütasyonu. (Örn: Gezgin Satıcı)' },
        { name: 'O(nⁿ)', val: 1000, type: 'worst', desc: 'Geo Kombinatorik', detail: 'Kabus senaryosu.' },
    ];

    const getColor = (type) => {
        if (type === 'best') return 'var(--success)';
        if (type === 'good') return 'var(--success)'; // Biraz daha açık yeşil olabilir CSS'te
        if (type === 'fair') return 'var(--warning)';
        if (type === 'poor') return 'var(--danger)'; // Turuncu-kırmızı
        if (type === 'bad') return 'var(--danger)';
        if (type === 'worst') return '#7f1d1d'; // Dark Red
        return '#888';
    };

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="3.2 Karmaşıklık Sınıfları"
                subtitle="Algoritma dünyasının hız limitleri. O(1)'den O(n^n)'e uzanan performans hiyerarşisi."
            />

            <div className="grid-responsive" style={{ marginBottom: 'var(--space-2xl)' }}>
                <Card>
                    <h3 style={{ color: 'var(--success)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle size={20} /> Yeşil Bölge (İdeal)
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        Bu algoritmalar devasa verilerle bile (Milyonlarca kullanıcı) şimşek hızında çalışır.
                    </p>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <li><strong>O(1)</strong> - Anlık Erişim</li>
                        <li><strong>O(log n)</strong> - Telefon rehberinde isim aramak gibi.</li>
                    </ul>
                </Card>

                <Card>
                    <h3 style={{ color: 'var(--warning)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={20} /> Sarı Bölge (Kabul Edilebilir)
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        Günlük hayatta en sık karşılaştığımız algoritmalar. Veri çok büyürse biraz bekletebilir.
                    </p>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <li><strong>O(n)</strong> - Kitabın tüm sayfalarını tek tek çevirmek.</li>
                        <li><strong>O(n log n)</strong> - Karışık iskambil kağıtlarını sıraya dizmek.</li>
                    </ul>
                </Card>

                <Card>
                    <h3 style={{ color: 'var(--danger)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={20} /> Kırmızı Bölge (Tehlike)
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        Bu algoritmalar veri birazcık artsa bile sistemi kilitler. Mümkünse kaçın!
                    </p>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <li><strong>O(n²)</strong> - Herkesin herkesle tokalaşması.</li>
                        <li><strong>O(2ⁿ)</strong> - Satrançtaki tüm hamleleri hesaplamak (İmkansız).</li>
                    </ul>
                </Card>
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-lg)' }}>📊 Büyüme Hızı Karşılaştırması (10 Sınıf)</h2>

            <Card style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, minHeight: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-light)" />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={100}
                                stroke="var(--text-primary)"
                                tick={{ fontSize: 13, fontWeight: 600 }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-primary)' }}
                                cursor={{ fill: 'var(--bg-secondary)' }}
                                formatter={(value, name, props) => [props.payload.desc, 'Sınıf']}
                                labelStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                            />
                            <Bar dataKey="val" radius={[0, 4, 4, 0]} barSize={35} animationDuration={1500}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getColor(entry.type)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend / Açıklama Alt Bilgisi */}
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '10px',
                    fontSize: '0.85rem'
                }}>
                    {data.map((d) => (
                        <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: getColor(d.type) }}></div>
                            <span style={{ fontWeight: 'bold', minWidth: '60px' }}>{d.name}:</span>
                            <span style={{ color: 'var(--text-muted)' }}>{d.detail}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Classes;
