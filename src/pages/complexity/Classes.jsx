import React, { useState } from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { CornerDownRight, ChevronsUp, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

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
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', marginBottom: '25px', flexWrap: 'wrap' }}>
                <div style={{ padding: 'clamp(8px, 2vw, 10px)', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <CornerDownRight size={window.innerWidth <= 768 ? 20 : 24} />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <h2 className="text-subheading" style={{ margin: 0, fontWeight: '700' }}>3.2 Karmaşıklık Sınıfları</h2>
                    <p className="text-small" style={{ margin: 0, color: 'var(--text-secondary)' }}>Algoritma dünyasının hız limitleri. O(1)'den O(n^n)'e uzanan performans hiyerarşisi.</p>
                </div>
            </div>

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

            <h2 className="text-subheading" style={{ marginBottom: 'var(--space-lg)' }}>📊 Büyüme Hızı Karşılaştırması (10 Sınıf)</h2>

            <Card style={{ padding: 'clamp(16px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 4vw, 20px)' }}>
                <div style={{ height: 'clamp(400px, 100vw, 500px)', minHeight: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                            barGap={8}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-light)" />
                            <XAxis type="number" hide domain={[0, 1000]} />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={window.innerWidth <= 768 ? 80 : 110}
                                stroke="var(--text-primary)"
                                tick={{ fontSize: window.innerWidth <= 768 ? 11 : 14, fontWeight: 700, fill: 'var(--text-primary)' }}
                                interval={0}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--bg-card)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                    color: 'var(--text-primary)'
                                }}
                                cursor={{ fill: 'var(--bg-secondary)', opacity: 0.4 }}
                                formatter={(value, name, props) => [props.payload.desc, 'Sınıf']}
                                labelStyle={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '4px' }}
                            />
                            <Bar
                                dataKey="val"
                                radius={[0, 6, 6, 0]}
                                barSize={26}
                                animationDuration={1800}
                                animationEasing="ease-out"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={getColor(entry.type)}
                                        style={{ transition: 'all 0.3s ease' }}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend / Açıklama Alt Bilgisi - Geliştirilmiş Tasarım */}
                <div style={{
                    padding: 'clamp(12px, 4vw, 20px)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-light)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
                    gap: 'clamp(12px, 3vw, 16px)',
                }}>
                    {data.map((d) => (
                        <div key={d.name} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            padding: '8px',
                            borderRadius: '8px',
                            transition: 'background 0.2s',
                            cursor: 'default'
                        }}
                            className="hover-bg-subtle"
                        >
                            <div style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: getColor(d.type),
                                marginTop: '4px',
                                flexShrink: 0,
                                boxShadow: `0 0 8px ${getColor(d.type)}44`
                            }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{d.name}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: '1.4' }}>{d.detail}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

        </div>
    );
};

export default Classes;
